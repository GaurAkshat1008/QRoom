import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from 'cors';
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Messages } from "./entities/Messages";
import { Room } from "./entities/Room";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/messages";
import { RoomResolver } from "./resolvers/room";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "whatsapp",
    username: "whatsapp",
    password: "akshat",
    logging: !__prod__,
    synchronize: true,
    entities: [User, Room, Messages],
  });
  await conn.runMigrations();
  // User.delete({})
  // Room.delete({})
  // Messages.delete({})
  const app = express();
  const RedisStore = connectRedis(session)
  const redis = new Redis()

  app.use(
    cors({
      origin:'http://localhost:3000',
      credentials:true,
    })
  )
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client:redis,
        disableTouch:true
      }),
      cookie:{
        maxAge:1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax"
      },
      secret:'kjbkcbajkcbkjasbc',
      saveUninitialized:false,
      resave:false
    })
  )

  const server = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, RoomResolver, MessageResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis
    }),
  });
  await server.start();
  server.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("server started at 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
