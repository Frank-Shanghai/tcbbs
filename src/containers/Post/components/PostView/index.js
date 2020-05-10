import React from 'react';
import like from "../../../../images/like.png";
import "./style.css";

// 无状态组件
function PostView(props) {
    const { post, editable, onEditClick } = props;

    return (
        <div className="postView">
            <div>
                <h2>{post.title}</h2>
                <div className="mark">
                    <span className="author">{post.author.username}</span>
                    <span>.</span>
                    <span>{post.updatedAt}</span>
                    {editable ? (
                        <span>
                            .<button onClick={onEditClick}>Edit</button>
                        </span>
                    ): null}
                </div>
                <div className="content">{post.content}</div>
            </div>
            <div className="vote">
                <span>
                    <img alt="vote" src={like} />
                </span>
                <span>{post.vote}</span>
            </div>
        </div>
    );
}

export default PostView;