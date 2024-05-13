import { Hono } from 'hono'

const app = new Hono()
import userRouter from './routes/user'
import blogRouter from './routes/blog';

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app
