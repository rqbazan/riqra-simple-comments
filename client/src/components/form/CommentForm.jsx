import React from 'react';


export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }

  handleAddComment() {
    let content = this.state.content;
    this.props.addComment(content);
    this.setState({
      content: ''
    })
  }

  handleChangeComment(event) {
    this.setState({
      content: event.target.value 
    });
  }

  render() {
    return (
      <div className="comment-form">
        <textarea className="text-area" onChange={this.handleChangeComment} value={this.state.content}></textarea>
        <button className="send-button" onClick={this.handleAddComment}>ENVIAR COMENTARIO</button>
      </div>
    );  
  }
}