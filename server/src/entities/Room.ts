import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Room extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  owner!: number

  @Field()
  @Column()
  name!:string

  @Field()
  @Column()
  token!: string
  
  // @Field()
  @Column()
  password!: string


  @Field()
  @CreateDateColumn()
  createdAt: Date
}