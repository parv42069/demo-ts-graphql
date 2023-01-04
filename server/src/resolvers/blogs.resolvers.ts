import { Resolver, Mutation, Arg, Query, ID } from 'type-graphql';
import { BlogsModel, Blogs } from '../models/blogs.model';
import { BlogsInput } from './types/blogs-input';

@Resolver((_of) => Blogs)
export class BlogsResolver {
  @Query((_returns) => Blogs, { nullable: false, name: 'blogs' })
  async getBlogsById(@Arg('id') id: string) {
    return await BlogsModel.findById({ _id: id });
  }

  @Query(() => [Blogs], { name: 'blogsList', description: 'Get List of Blogs' })
  async getAllBlogs() {
    return await BlogsModel.find();
  }

  @Mutation(() => Blogs, { name: 'createBlogs' })
  async createBlogs(
    @Arg('newBlogsInput') { title, description }: BlogsInput
  ): Promise<Blogs> {
    const blogs = (
      await BlogsModel.create({
        title,
        description,
        isArchived: false,
      })
    ).save();

    return blogs;
  }

  @Mutation(() => Blogs, { name: 'updateBlogs' })
  async updateBlogs(
    @Arg('editBlogsInput') { id, title, description, isArchived }: BlogsInput
  ) {
    const blogs = await BlogsModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        isArchived: false,
      }
    );
    return blogs;
  }

  @Mutation(() => String, { name: 'deleteBlogs' })
  async deleteBlogs(@Arg('id') id: string): Promise<String> {
    const result = await BlogsModel.deleteOne({ _id: id });

    if (result.acknowledged) return id;
    else return '';
  }
}
