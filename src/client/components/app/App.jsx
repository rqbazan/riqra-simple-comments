import React from 'react';
import CommentForm from '../form/CommentForm.jsx';
import CommentList from '../list/CommentList.jsx';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateStoreAfterRemoveComment = this.updateStoreAfterRemoveComment.bind(this);
    this.updateStoreAfterAddComment = this.updateStoreAfterAddComment.bind(this);
  }

  updateStoreAfterRemoveComment(store, id) {
    let data = store.readQuery({
      query: ALL_COMMENTS_QUERY
    });
    data.getAllComments = data.getAllComments.filter(comment => comment.id !== id);
    store.writeQuery({
      query: ALL_COMMENTS_QUERY, 
      data
    });
  }

  updateStoreAfterAddComment(store, comment) {
    const data = store.readQuery({
      query: ALL_COMMENTS_QUERY
    });
    data.getAllComments.unshift(comment);
    store.writeQuery({
      query: ALL_COMMENTS_QUERY, 
      data
    });
  }

  render() {
    if (this.props.query && this.props.query.loading) {
      //TODO: Agregar una vista de espera mientras cargan los comentarios
      return (
        <div>
          Loading UI
        </div>
      );
    }
    if (this.props.query && this.props.query.error) {
      //TODO: Agregar una vista de error
      return (
        <div>
          Error
        </div>
      );
    }
    return (
      <div className="container">
        <CommentForm placeholder="Escribe tu comentario" updateStoreAfterAddComment={this.updateStoreAfterAddComment}/>
        <CommentList comments={this.props.query.getAllComments} updateStoreAfterRemoveComment={this.updateStoreAfterRemoveComment}/>
      </div>
    );
  }
}

const ALL_COMMENTS_QUERY = gql`
  query {
    getAllComments {
      id,
      content
    }
  } 
`;

const AppWithQuery = graphql(ALL_COMMENTS_QUERY, {
  name: 'query'
})(App);

export default AppWithQuery;