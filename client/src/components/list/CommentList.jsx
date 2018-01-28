import React from 'react';


const Comment = ({comment, removeComment}) => {
  return (
    <li className="list-item">
        <p className="list-content">{comment.content}</p>
        <button className="remove-button" onClick={() => removeComment(comment.id)}>ELIMINAR</button>
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