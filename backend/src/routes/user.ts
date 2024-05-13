import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'

const userRouter = new Hono<{
  Bindings: {
		DATABASE_URL: string
    JWT_SECERET : string
	}
}>()

userRouter.post('/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
    }
  })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECERET) 
    return c.json({jwt});
  } catch {
    return c.text("unable to signup")
  }
})
userRouter.post('/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  const body = await c.req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if(!user){
      c.status(403)
      return c.text("incorrect credentials")
    }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECERET) 
    return c.json({jwt});
  } catch {
    return c.text("unable to signin")
  }
})

export default userRouter
