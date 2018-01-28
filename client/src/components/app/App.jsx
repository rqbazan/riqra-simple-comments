import React from 'react';
import CommentForm from '../form/CommentForm.jsx';
import CommentList from '../list/CommentList.jsx';

window.id = 0;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleRemoveComment = this.handleRemoveComment.bind(this);
  }

  handleAddComment(content) {
    let newComment = {
      id: window.id + 1,
      content: content
    }
    window.id = window.id + 1,
    this.state.comments.push(newComment)
    this.setState({
      comments: this.state.comments
    })
  }

  handleRemoveComment(id) {
    const remainder = this.state.comments.filter((comment) => {
      if(comment.id !== id) return comment;
    });
    this.setState({
      comments: remainder
    });
  }

  render() {
    return (
      <div className="container">
        <CommentForm addComment={this.handleAddComment}/>
        <CommentList comments={this.state.comments} removeComment={this.handleRemoveComment}/>
      </div>
    );
  }
} 