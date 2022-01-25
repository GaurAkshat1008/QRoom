import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Car } from "../entities/Car";

@InputType()
class CarOptions{
  @Field()
  owner!:string
  @Field()
  modelY!: string
  @Field()
  carType!:string
  @Field()
  carModel!:string
  @Field()
  km!:string
  @Field()
  desc!:string
}

@Resolver(Car)
export class CarResolver{

  @Query(()=>[Car])
  async cars():Promise<Car[]>{
    const cars = await Car.find({order:{id:"DESC"}})
    return cars 
  }

  @Mutation(() => Car)
  async createQuery(
    @Arg("options") options:CarOptions
  ){
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Car)
        .values({
          modelY:options.modelY,
          carModel:options.carModel,
          owner:options.owner,
          carType:options.carType,
          desc:options.desc,
          km:options.km
        })
        .returning("*")
        .execute();
      // console.log(result.raw);
    return result.raw[0]
  }

  @Mutation(()=> [Car], {nullable:true})
  async searchByType(
    @Arg("type") type:string
    ){
      const cars = await Car.find({where: {carType:type}})
      if(!cars){
        return null
      }
      return cars
  }

}