"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Messages_1 = require("../entities/Messages");
const User_1 = require("../entities/User");
const isAuth_1 = require("../middelwares/isAuth");
let MessageResolver = class MessageResolver {
    async messagesByRoom(token) {
        const messages = await Messages_1.Messages.find({ where: { roomToken: token } });
        if (!messages) {
            return null;
        }
        return messages;
    }
    async createMessage(token, text, { req }) {
        const user = await User_1.User.findOne(req.session.userId);
        const message = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .insert()
            .into(Messages_1.Messages)
            .values({
            message: text,
            owner: user === null || user === void 0 ? void 0 : user.username,
            roomToken: token,
        })
            .returning("*")
            .execute();
        return message.raw[0];
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Messages_1.Messages]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messagesByRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Messages_1.Messages),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __param(1, (0, type_graphql_1.Arg)("text")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
MessageResolver = __decorate([
    (0, type_graphql_1.Resolver)(Messages_1.Messages)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=messages.js.map