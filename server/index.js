import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';

const PORT = process.env.PORT || 4000;
const server = Express();

server.use(cors());
server.use('/graphql', bodyParser.json(), GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

server.listen(PORT, ()=> {
  console.log(`GraphQL Server listening on port ${PORT}`);
});
