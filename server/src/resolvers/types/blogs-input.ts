import { Field, InputType, ID } from 'type-graphql';
import { Blogs } from '../../models/blogs.model';

@InputType()
export class BlogsInput implements Partial<Blogs> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  isArchived: boolean;
}
