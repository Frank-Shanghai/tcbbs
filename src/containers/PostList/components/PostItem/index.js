import React from "react";
import './style.css';
import like from '../../../../images/like.png';
import {getFormatDate} from '../../../../utils/date';

// 无状态组件
function PostItem(props) {
    const { post } = props;
    return (
        <li className="postItem">
            <div className="title">{post.title}</div>
            <div>
                {/* 注意这里是username而不是userName，因为这是服务器端返回的author信息，不是我们自定义的userName  */}
                创建人： <span>{post.author.username}</span>
            </div>
            <div>
                更新时间： <span>{getFormatDate(post.updatedAt)}</span>
            </div>
            <div className="like">
                <span>
                    <img alt='vote' src={like} />
                </span>
                <span>{post.vote}</span>
            </div>
        </li>
    );
}

export default PostItem;