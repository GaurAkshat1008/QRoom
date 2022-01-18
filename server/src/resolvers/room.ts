import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { CREATE_ROOM } from "../constants";
import { Room } from "../entities/Room";
import { isAuth } from "../middelwares/isAuth";
import { MyContext } from "../types";

@ObjectType()
class FieldError{
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class LinkProvider{
  @Field(() => [FieldError], {nullable:true})
  error?:FieldError[]
  @Field({nullable:true})
  link?:string
}

@ObjectType()
class PasswordMatcher{
  @Field(() => [FieldError], {nullable:true})
  error?: FieldError[]
  @Field(() => Boolean, {nullable:true})
  isThere?:boolean
}

@InputType()
class roomVar {
  @Field()
  name: string;
  @Field()
  password: string;
}

@Resolver(Room)
export class RoomResolver {
 @Query(() => Room, {nullable:true})
 async room(
  @Arg("token") token:string
 ){
    return await Room.findOne({where:{token:token}})
 }

  @Query(() => [Room])
  async rooms() {
    return Room.find({});
  }

  @Mutation(() => Room)
  @UseMiddleware(isAuth)
  async newRoom(
    @Arg("input") input: roomVar,
    @Arg("token") token: string,
    @Ctx() { req }: MyContext
  ): Promise<Room> {
    return Room.create({
      ...input,
      owner: req.session.userId,
      token:token
    }).save();
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async enterRoom(
    @Arg("name") name: string,
    @Arg("password") password: string,
    @Arg("token") token:string,
    @Ctx() {redis}:MyContext
  ) {
    const room = await Room.findOne({where: {name, password}})
    if(!room){
      // no room found
      return "/" 
    }
    await redis.set(
      CREATE_ROOM + token,
      room.id,
      "ex",
      1000 * 60 * 60 * 24
    ) // available for 1 day
      return `http://localhost:3000/rooms/${token}`
  }


  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async enterExistingRoom(
    @Arg("name") name: string,
  ):Promise<LinkProvider>{
    const room = await Room.findOne({where:{name}})
    if(!room){
      return {
        error:[
          {
            field:"name",
            message:"no room found"
          }
        ]
      }
    }
    return {link:`http://localhost:3000/rooms/${room.token}`} 
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async matchPassword(
    @Arg("token") token:string,
    @Arg("password") password: string
  ):Promise<PasswordMatcher>{
    const room = await Room.findOne({where: {token}})
    if(!room){
      return {
        error:[
          {
            field:"room",
            message:"room not found"
          }
        ]
      }
    }    
    if(room.password !== password){
      return {
        error:[{
          field:"password",
          message:"password incorrect"
        }]
      }
    }
    return {isThere:true}
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteRoom(
    @Arg("id", () => Int) id:number,
    @Ctx() {req}: MyContext
  ){
    const room = await Room.findOne(id)
    if(!room){
      return false
    }
    if(room.owner !== req.session.userId){
      throw Error('not Autherised')
    }
    await Room.delete(id)
    return true
  }
}
