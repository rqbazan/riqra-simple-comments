import 'babel-core/register';
import 'babel-polyfill';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';

const PORT = process.env.PORT || 3000;
const IS_DEV_ENVIRONMENT = process.env.NODE_ENV == 'dev';
const server = Express();


server.use(Express.static(path.resolve(__dirname, 'client')));
server.use(cors());
server.use('/graphql', bodyParser.json(), GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: IS_DEV_ENVIRONMENT
}));

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

server.listen(PORT, ()=> {
  console.log(`GraphQL Server listening on port ${PORT}`);
});
