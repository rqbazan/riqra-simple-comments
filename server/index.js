import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';

const PORT = process.env.PORT || 3000;
const server = Express();

server.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

server.listen(PORT, ()=> {
  console.log(`GraphQL Server listening on port ${PORT}`);
});
