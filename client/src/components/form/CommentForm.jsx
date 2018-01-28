import React from 'react';


export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      btnIsDisabled: true
    }
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }

  handleAddComment() {
    let content = this.state.content;
    this.props.addComment(content);
    this.setState({
      content: '',
      btnIsDisabled: true
    })
  }

  handleChangeComment(event) {
    let content = event.target.value; 
    this.setState({
      content: content,
      btnIsDisabled: content.trim() === '' 
    });
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
            placeholder="Ingresa tu comentario">
          </textarea>
        </div>
        <div className="container-send-button">
          <button className="btn send-button" onClick={this.handleAddComment} disabled={this.state.btnIsDisabled}>ENVIAR COMENTARIO</button>
        </div>
      </div>
    );  
  }
}