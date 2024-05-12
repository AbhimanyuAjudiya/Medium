import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
		DATABASE_URL: string
    JWT_SECERET : string
	}
}>()
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

app.post('/api/v1/signup',async (c) => {
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
app.post('/api/v1/signin',async (c) => {
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
app.post('/api/v1/blog', (c) => {
  return c.text('blog post!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('get blog!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('put blog!')
})

export default app
