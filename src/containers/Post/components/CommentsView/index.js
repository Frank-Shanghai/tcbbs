import React, { Component } from 'react';
import "./style.css";
import { getFormatDate } from '../../../../utils/date';

class CommentsView extends Component {
    render() {
        const { comments } = this.props;
        return (
            <ul className="commentsView">
                {
                    comments.map((item) => {
                        return (
                            item.author ? (
                                <li key={item.id}>
                                    <div>{item.content}</div>
                                    <div className="sub">
                                        <span>{item.author.username}</span>
                                        <span>.</span>
                                        <span>{getFormatDate(item.updatedAt)}</span>
                                    </div>
                                </li>
                            ) : null
                        );
                    })
                }
            </ul>
        );
    }
}

export default CommentsView;