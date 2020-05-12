import React, { Component } from 'react';
import PostsView from "./components/PostsView";
import { getLoggedUser } from '../../redux/modules/auth';
import { getPostListWithAuthors } from '../../redux/modules';
import {isAddDialogOpen} from '../../redux/modules/ui';
import { bindActionCreators } from 'redux';
import { actions as postActions } from '../../redux/modules/posts';
import {actions as uiActions } from '../../redux/modules/ui';
import { connect } from "react-redux";
import PostEditor from '../Post/components/PostEditor';
import "./style.css";

class PostList extends Component {
    componentDidMount() {
        this.props.fetchAllPosts(); // get post list
    }

    handleSave = data => {
        this.props.createPost(data.title, data.content);
    }

    handleCancel = () => {
        this.props.closeAddDialog();
    }

    handleCreateNewPost = () => {
        this.props.openAddDialog();
    }

    render() {
        const { posts, user, isAddDialogOpen } = this.props;
        return (
            <div className="postList">
                <div>
                    <h2>Topic List</h2>
                    {
                        user.userId ? (
                            <button onClick={this.handleCreateNewPost}>New Post</button>
                        ) : 
                        null
                    }
                </div>
                {
                    isAddDialogOpen ? (
                        <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
                    ) : null
                }
                <PostsView posts={posts} />
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        posts: getPostListWithAuthors(state),
        user: getLoggedUser(state),
        isAddDialogOpen: isAddDialogOpen(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postActions, dispatch),
        ...bindActionCreators(uiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

