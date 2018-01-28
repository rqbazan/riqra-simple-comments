import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Comment = ({comment, removeComment}) => {
  return (
    <li className="list-item">
      <div className="container-list-content">
        <p className="list-content">{comment.content}</p>
      </div>
      <div className="container-remove-button">
        <button className="btn remove-button" onClick={() => removeComment(comment.id)}>ELIMINAR</button>
      </div>
    </li>
  );
};


class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveComment = this.handleRemoveComment.bind(this);
  }

  async handleRemoveComment(id) {
    await this.props.deleteCommentMutation({
      variables: {
        id
      },
      update: (store, data) => {
        this.props.updateStoreAfterRemoveComment(store, id);
      }
    })
  }

  render() {
    const commentList = this.props.comments.map((comment) => {
      return (<Comment key={comment.id} comment={comment} removeComment={this.handleRemoveComment}/>);
    });
    return (
      <div className="comment-list">
        <ul>
          {commentList}
        </ul>
      </div>
    );
  }
}

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

const CommentListWithMutation = graphql(DELETE_COMMENT_MUTATION, {
  name: 'deleteCommentMutation'
})(CommentList);

export default CommentListWithMutation;