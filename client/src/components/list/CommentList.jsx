import React from 'react';


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

const CommentList = ({comments, removeComment}) => {
  const commentList = comments.map((comment) => {
    return (<Comment key={comment.id} comment={comment} removeComment={removeComment}/>);
  });
  return (
    <div className="comment-list">
      <ul>
        {commentList}
      </ul>
    </div>
  );
};

export default CommentList;