import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { COOKIE_NAME, __prod__ } from "./constants";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis  from "ioredis";
import cors from 'cors'
import { RoomResolver } from "./resolvers/room";
import { Room } from "./entities/Room";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "whatsapp",
    username: "__username__",
    password: "__password__",
    logging: !__prod__,
    synchronize: true,
    entities: [User, Room],
  });
  await conn.runMigrations();
  // Room.delete({})
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
      resolvers: [HelloResolver, UserResolver, RoomResolver],
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
