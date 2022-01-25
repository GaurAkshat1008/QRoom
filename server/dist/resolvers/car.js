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
exports.CarResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
let CarOptions = class CarOptions {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "modelY", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "carType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "carModel", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "km", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CarOptions.prototype, "desc", void 0);
CarOptions = __decorate([
    (0, type_graphql_1.InputType)()
], CarOptions);
let CarResolver = class CarResolver {
    async cars() {
        const cars = await Car_1.Car.find({ order: { id: "DESC" } });
        return cars;
    }
    async createQuery(options) {
        const result = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .insert()
            .into(Car_1.Car)
            .values({
            modelY: options.modelY,
            carModel: options.carModel,
            owner: options.owner,
            carType: options.carType,
            desc: options.desc,
            km: options.km
        })
            .returning("*")
            .execute();
        return result.raw[0];
    }
    async searchByType(type) {
        const cars = await Car_1.Car.find({ where: { carType: type } });
        if (!cars) {
            return null;
        }
        return cars;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Car_1.Car]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarResolver.prototype, "cars", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Car_1.Car),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CarOptions]),
    __metadata("design:returntype", Promise)
], CarResolver.prototype, "createQuery", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [Car_1.Car], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarResolver.prototype, "searchByType", null);
CarResolver = __decorate([
    (0, type_graphql_1.Resolver)(Car_1.Car)
], CarResolver);
exports.CarResolver = CarResolver;
//# sourceMappingURL=car.js.map