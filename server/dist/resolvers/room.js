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
exports.RoomResolver = void 0;
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const Room_1 = require("../entities/Room");
const isAuth_1 = require("../middelwares/isAuth");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let LinkProvider = class LinkProvider {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LinkProvider.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LinkProvider.prototype, "link", void 0);
LinkProvider = __decorate([
    (0, type_graphql_1.ObjectType)()
], LinkProvider);
let PasswordMatcher = class PasswordMatcher {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], PasswordMatcher.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], PasswordMatcher.prototype, "isThere", void 0);
PasswordMatcher = __decorate([
    (0, type_graphql_1.ObjectType)()
], PasswordMatcher);
let roomVar = class roomVar {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], roomVar.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], roomVar.prototype, "password", void 0);
roomVar = __decorate([
    (0, type_graphql_1.InputType)()
], roomVar);
let RoomResolver = class RoomResolver {
    async room(token) {
        return await Room_1.Room.findOne({ where: { token: token } });
    }
    async rooms() {
        return Room_1.Room.find({});
    }
    async newRoom(input, token, { req }) {
        return Room_1.Room.create(Object.assign(Object.assign({}, input), { owner: req.session.userId, token: token })).save();
    }
    async enterRoom(name, password, token, { redis }) {
        const room = await Room_1.Room.findOne({ where: { name, password } });
        if (!room) {
            return "/";
        }
        await redis.set(constants_1.CREATE_ROOM + token, room.id, "ex", 1000 * 60 * 60 * 24);
        return `http://localhost:3000/rooms/${token}`;
    }
    async enterExistingRoom(name) {
        const room = await Room_1.Room.findOne({ where: { name } });
        if (!room) {
            return {
                error: [
                    {
                        field: "name",
                        message: "no room found"
                    }
                ]
            };
        }
        return { link: `http://localhost:3000/rooms/${room.token}` };
    }
    async matchPassword(token, password) {
        const room = await Room_1.Room.findOne({ where: { token } });
        if (!room) {
            return {
                error: [
                    {
                        field: "room",
                        message: "room not found"
                    }
                ]
            };
        }
        if (room.password !== password) {
            return {
                error: [{
                        field: "password",
                        message: "password incorrect"
                    }]
            };
        }
        return { isThere: true };
    }
    async deleteRoom(id, { req }) {
        const room = await Room_1.Room.findOne(id);
        if (!room) {
            return false;
        }
        if (room.owner !== req.session.userId) {
            throw Error('not Autherised');
        }
        await Room_1.Room.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Room_1.Room, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "room", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Room_1.Room),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Arg)("token")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roomVar, String, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "newRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Arg)("token")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "enterRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "enterExistingRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "matchPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "deleteRoom", null);
RoomResolver = __decorate([
    (0, type_graphql_1.Resolver)(Room_1.Room)
], RoomResolver);
exports.RoomResolver = RoomResolver;
//# sourceMappingURL=room.js.map