import React, {Component} from 'react';
import PostView from "./components/PostView";
import { getLoggedUser } from '../../redux/modules/auth';
import {getPostDetail, getPostListWithAuthors} from "../../redux/modules";
import {actions as postActions} from '../../redux/modules/posts';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

// import {actions as uiActions, isEditDialogOpen} from "../../redux/modules/ui";
import "./style.css";

class Post extends Component {
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);

    }

    render() {
        const { post, user } = this.props;
        if(!post) return null;

        return (
            <div className="post">
                <PostView
                    post={post}

                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: getLoggedUser(state),
        post: getPostDetail(state, props.match.params.id),

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(postActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);