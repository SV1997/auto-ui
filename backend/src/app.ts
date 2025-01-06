import express from "express";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import userRoutes from "./routes/userRoute";
import fileRoutes from "./routes/fileRoute";
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
const cookieParser =require( "cookie-parser")
import { Jwt } from "jsonwebtoken";
dotenv.config();
const RedisStore = connectRedis(session);
const redisClient = createClient({
  legacyMode: true,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1); // Exit the application if Redis connection fails
  }
})();

const app = express();
app.use(cookieParser())
app.use(express.json());

const store = new RedisStore({ client: redisClient as any });
app.use(cookieParser());

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use(cors({
  origin: 'https://auto-ui-wbyo-dvpjkkt85-saharsh-vahsishthas-projects.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','WithCredentials'],
}));
interface CustomError extends Error {
  status?: number;
}
app.use('/api/v1/code', userRoutes);
app.use('/api/v1/file', fileRoutes);
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send('Something broke!');
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
