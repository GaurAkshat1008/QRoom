import { Field, InputType } from "type-graphql";

@InputType()
export class Auths {
  @Field()
  username!: string;
  @Field()
  password!: string;
}
