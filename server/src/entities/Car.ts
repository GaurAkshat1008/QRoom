import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Car extends BaseEntity{
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  owner!:string

  @Field()
  @Column()
  modelY!: string

  @Field()
  @Column()
  carType!:string

  @Field()
  @Column()
  carModel!:string

  @Field()
  @Column()
  km!:string

  @Field()
  @Column()
  desc!:string
}