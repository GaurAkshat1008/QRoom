"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const constants_1 = require("./constants");
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const room_1 = require("./resolvers/room");
const Room_1 = require("./entities/Room");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "whatsapp",
        username: "whatsapp",
        password: "akshat",
        logging: !constants_1.__prod__,
        synchronize: true,
        entities: [User_1.User, Room_1.Room],
    });
    await conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: "lax"
        },
        secret: 'kjbkcbajkcbkjasbc',
        saveUninitialized: false,
        resave: false
    }));
    const server = new apollo_server_express_1.ApolloServer({
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, user_1.UserResolver, room_1.RoomResolver],
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
//# sourceMappingURL=index.js.map