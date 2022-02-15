import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { typeDefs } from 'graphql-scalars';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  typeDefs,
  watch: true,
});
