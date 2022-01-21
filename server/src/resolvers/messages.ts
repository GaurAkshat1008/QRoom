import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Messages } from "../entities/Messages";
import { User } from "../entities/User";
import { isAuth } from "../middelwares/isAuth";
import { MyContext } from "../types";


@Resolver(Messages)
export class MessageResolver{
  @Query(() => [Messages])
  @UseMiddleware(isAuth)
  async messagesByRoom(
    @Arg("token") token:string
  ){
  const messages = await Messages.find({where:{roomToken:token}})
  if(!messages){
    return null
  }
  return messages
}

  @Mutation(()=>Messages)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("token") token:string,
    @Arg("text") text:string,
    @Ctx() {req}:MyContext
  ):Promise<Messages>{
    const user = await User.findOne(req.session.userId)
      const message = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Messages)
      .values({
        message: text,
        owner: user?.username,
        roomToken:token,
      })
      .returning("*")
      .execute()
      return message.raw[0]
    
  }
}