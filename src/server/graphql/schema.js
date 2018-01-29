import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql';
import db from '../persistence/db';

const Comment = new GraphQLObjectType({
  name: 'comment',
  description: 'This represents a comment',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (comment) => comment.id
      },
      content: {
        type: GraphQLString,
        resolve: (comment) => comment.content
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields: () => {
    return {
      getAllComments: {
        type: new GraphQLList(Comment),
        resolve: (root, args) => db.models.Comment.findAll({ where: args })
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => {
    return {
      addComment: {
        type: Comment,
        args: {
          content: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (source, args) => db.models.Comment.create({
          content: args.content
        })
      },
      deleteComment: {
        type: Comment,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (source, args) => db.models.Comment.destroy({ where: args })
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;