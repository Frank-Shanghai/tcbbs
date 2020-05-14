import React, { Component } from 'react';
import PostView from "./components/PostView";
import { getLoggedUser } from '../../redux/modules/auth';
import { getPostDetail, getCommentsWithAuthors } from "../../redux/modules";
import { actions as postActions } from '../../redux/modules/posts';
import { actions as uiActions, isEditDialogOpen } from "../../redux/modules/ui";
import {actions as commentActions} from '../../redux/modules/comments';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

// import {actions as uiActions, isEditDialogOpen} from "../../redux/modules/ui";
import "./style.css";
import PostEditor from './components/PostEditor';
import CommentList from './components/CommentList';

class Post extends Component {
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);
        this.props.fetchComments(postId);
    }

    handleEditClick = () => {
        // dispatch open edit dialog action
        this.props.openEditDialog();
    }

    handlePostCancel = () => {
        this.props.closeEditDialog();
    }

    handlePostSave = (data) => {
        const id = this.props.match.params.id;
        this.props.updatePost(id, data);
    }

    handleCommentSubmit = (content) => {
        const comment = {
            author: this.props.user.userId,
            post: this.props.match.params.id,
            content: content
        };

        this.props.createComment(comment);
    };

    render() {
        const { post, user, isEditDialogOpen, comments } = this.props;
        if (!post) return null;

        return (
            <div className="post">
                {isEditDialogOpen ? (
                    <PostEditor
                        post={post}
                        onSave={this.handlePostSave}
                        onCancel={this.handlePostCancel}
                    />
                ) :
                    (
                        <PostView
                            post={post}
                            editable={Boolean(user.userId)}
                            onEditClick={this.handleEditClick}
                        />
                    )
                }
                <CommentList 
                    comments={comments}
                    editable={Boolean(user.userId)}
                    onSubmit = {this.handleCommentSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: getLoggedUser(state),
        post: getPostDetail(state, props.match.params.id),
        isEditDialogOpen: isEditDialogOpen(state),
        comments: getCommentsWithAuthors(state, props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(postActions, dispatch),
        ...bindActionCreators(uiActions, dispatch),
        ...bindActionCreators(commentActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);