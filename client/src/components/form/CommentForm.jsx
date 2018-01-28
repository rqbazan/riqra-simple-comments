import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      btnIsDisabled: true
    }
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  async handleAddComment() {
    const content = this.state.content;
    await this.props.addCommentMutation({
      variables: {
        content
      },
      update: (store, { data: { addComment } }) => {
        this.props.updateStoreAfterAddComment(store, addComment);
        this.setState({
          content: '',
          btnIsDisabled: true
        });
      }
    })
  }

  handleChangeComment(event) {
    let content = event.target.value; 
    this.setState({
      content: content,
      btnIsDisabled: content.trim() === ''
    });
  }

  onEnterPress(event) {
    if(event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      this.handleAddComment();
    }
  }

  render() {
    return (
      <div className="comment-form">
        <div className="container-text-area">
          <textarea 
            className="text-area" 
            onChange={this.handleChangeComment} 
            value={this.state.content} 
            autoFocus={true} 
            placeholder={this.props.placeholder}
            onKeyDown={this.onEnterPress}>
          </textarea>
        </div>
        <div className="container-send-button">
          <button className="btn send-button" onClick={this.handleAddComment} disabled={this.state.btnIsDisabled}>ENVIAR COMENTARIO</button>
        </div>
      </div>
    );  
  }
}

const ADD_COMMENT_MUTATION = gql`
  mutation AddCommentMutation($content: String!) {
    addComment(content: $content) {
      id
      content
    }
  }
`;

const CommentFormWithMutation = graphql(ADD_COMMENT_MUTATION, {
  name: 'addCommentMutation'
})(CommentForm);

export default CommentFormWithMutation;