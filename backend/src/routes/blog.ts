import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@abhimanyu_ajudiya/medium-common-validation'

const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECERET : string
	},
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*",async (c, next) =>{
    // extrat the user id 
    // pass it down to route handler
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECERET);
    if(user) {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            message : "You are not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const userId = c.get("userId")
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "wrong input"
        })
    }
    try {
        const blog = await prisma.post.create({
            data : {
                title: body.title,
                content: body.content,
                authorId: userId // we will get from middleware
            }
        });

        return c.json({
            id: blog.id
        })
    } catch (error) {
        c.status(411);
        return c.body("unable to post due to error")
    }
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    try {
        // const offset = 5;
        // const limit = 10; // Number of blogs to load each time

        // Fetch next set of blog posts
        const blogs = await prisma.post.findMany({
            // skip: offset,
            // take: limit
        });
        return c.json({
            blogs
        })
    } catch (error) {
        c.status(411);
        return c.body("unable to fetch")
    }
})

blogRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const id = parseInt(c.req.param("id"));
    try {
        const blog = await prisma.post.findFirst({
            where : {
                id
            }
        });

        return c.json({
            blog
        })
    } catch (error) {
        c.status(411);
        return c.body("error while fetching")
    }
})
blogRouter.put('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "wrong input"
        })
    }
    try {
        const blog = await prisma.post.update({
            where : {
                id: body.id // we will get from middleware
            }, data : {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            blog
        })
    } catch (error) {
        c.status(411);
        return c.body("unable to post due to error")
    }
})


export default blogRouter