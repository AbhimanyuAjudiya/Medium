import { Hono } from 'hono'

const app = new Hono()
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

app.post('/api/v1/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  const body = await c.req.json();
  try {
    const user = prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })
    return c.text("jwt token");
  } catch {
    return c.text("403")
  }
})
app.post('/api/v1/signin', (c) => {
  return c.text('Sign in!')
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
