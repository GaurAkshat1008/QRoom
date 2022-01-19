import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Messages extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  owner!: number

  @Field()
  @Column()
  roomToken!: string

  @Field()
  @Column()
  message!:string
}