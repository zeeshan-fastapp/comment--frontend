import React, { useState, useEffect } from "react";
import instance from "../axios";
import jwt from "jwt-decode";

function Comment() {
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [editCommentActive, setEditCommentActive] = useState(false);
  const [replyCommentActive, setReplyCommentActive] = useState(false);
  const [activeId, setActiveid] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    instance.get("/api/comments").then((res) => {
      setComments(res.data);
    });
    const token = window.localStorage.getItem("token");
    const { id } = jwt(token);
    setUserId(id);
  }, []);
  const saveReply = () => {
    const payload = {
      text: replyComment,
      parent: activeId,
      authorId: userId,
    };

    instance.post("/api/comments", payload).then((res) => {
      console.log(res);
    });
  };

  const saveEditComment = () => {
    const id = activeId;
    const payload = {
      text: editComment,
    };
    instance.patch(`/api/comments/${id}`, payload).then((res) => {
      console.log(res);
    });
  };
  // const editComment
  // const openReplyComment = (id) => {
  //   console.log(id);
  //   const payload
  //   instance.post('/api/comments')
  // };
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="px-5 py-2 border flex flex-col relative">
            {editCommentActive && comment.authorId === userId && (
              <div className="w-full h-full absolute inset-0">
                <textarea
                  className="w-full h-full"
                  onChange={(e) => {
                    setEditComment(e.target.value);
                  }}
                  value={editComment}
                ></textarea>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      saveEditComment();
                    }}
                    className="mr-3"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditCommentActive(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <p>{comment.text}</p>
            <div className="flex items-center text-sm mt-2">
              <button
                onClick={() => {
                  setReplyCommentActive(true);
                  setActiveid(comment._id);
                  setEditCommentActive(false);
                }}
                className="mr-3"
              >
                Reply
              </button>
              {userId === comment.authorId && (
                <button
                  onClick={() => {
                    setEditCommentActive(true);
                    setReplyCommentActive(false);
                    setEditComment(comment.text);
                    setActiveid(comment._id);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            {replyCommentActive && comment._id === activeId && (
              <div className="mt-5">
                <textarea
                  className="w-full h-full"
                  onChange={(e) => {
                    setReplyComment(e.target.value);
                  }}
                  value={replyComment}
                ></textarea>
                <div className="flex items-center">
                  <button onClick={() => saveReply()} className="mr-3">
                    Save
                  </button>
                  <button onClick={() => setReplyCommentActive(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Comment;
