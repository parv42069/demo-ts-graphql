import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

//Resolvers
import { BlogsResolver } from './resolvers/blogs.resolvers';

const executeMain = async () => {
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [BlogsResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qcwtqeh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );

  await mongoose.connection;

  const server = new ApolloServer({ schema: schema });
  const expressServer: Express.Application = Express();

  server.applyMiddleware({ app: expressServer });

  expressServer.listen({ port: process.env.PORT }, () =>
    console.log(
      `Server ready and listening at ==> http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
};

executeMain().catch((error) => {
  console.log(error, 'error');
});
