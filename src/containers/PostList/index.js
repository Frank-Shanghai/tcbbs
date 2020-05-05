import React, { Component } from 'react';
import PostsView from "./components/PostsView";
import { getLoggedUser } from '../../redux/modules/auth';
import { getPostListWithAuthors } from '../../redux/modules';
import { bindActionCreators } from 'redux';
import { actions as postActions } from '../../redux/modules/posts';
import { connect } from "react-redux";
import "./style.css";

class PostList extends Component {
    componentDidMount() {
        this.props.fetchAllPosts(); // get post list
    }

    render() {
        const { posts } = this.props;
        return (
            <div className="postList">
                <div>
                    <h2>Topic List</h2>
                </div>
                <PostsView posts={posts} />
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        posts: getPostListWithAuthors(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

