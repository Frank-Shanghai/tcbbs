import React, { Component } from 'react';
import PostView from "./components/PostView";
import { getLoggedUser } from '../../redux/modules/auth';
import { getPostDetail } from "../../redux/modules";
import { actions as postActions } from '../../redux/modules/posts';
import { actions as uiActions, isEditDialogOpen } from "../../redux/modules/ui";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

// import {actions as uiActions, isEditDialogOpen} from "../../redux/modules/ui";
import "./style.css";
import PostEditor from './components/PostEditor';

class Post extends Component {
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);

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

    render() {
        const { post, user, isEditDialogOpen } = this.props;
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
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: getLoggedUser(state),
        post: getPostDetail(state, props.match.params.id),
        isEditDialogOpen: isEditDialogOpen(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(postActions, dispatch),
        ...bindActionCreators(uiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);