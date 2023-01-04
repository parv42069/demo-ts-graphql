import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType({ description: 'The Blogs Model' })
@modelOptions({ schemaOptions: { collection: 'bvlogs', timestamps: true } })
export class Blogs {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ type: () => String, required: true })
  title: string;

  @Field()
  @Property({ type: () => String, required: true })
  description: string;

  @Field({ nullable: true })
  @Property({ type: Boolean, required: false })
  isArchived: boolean;

  @Field()
  @Property({ required: true, default: Date.now })
  createdAt: Date;

  @Field()
  @Property({ required: true, default: Date.now })
  updatedAt: Date;
}

export const BlogsModel = getModelForClass(Blogs);
