import React, { Component } from 'react';
import Header from "../../components/Header";
import connectRoute from "../../utils/connectRoute";
import asyncComponent from '../../utils/AsyncComponent';
import { getLoggedUser } from '../../redux/modules/auth';
import { bindActionCreators } from 'redux';
import {actions as authActions} from "../../redux/modules/auth";
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

const AsyncPostList = connectRoute(asyncComponent(() => import("../PostList")));
const AsyncPost = connectRoute(asyncComponent(() => import('../Post')));

class Home extends Component {
    constructor(props) {
        super(props);


    }

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        const {match, location, user} = this.props;
        const userName = user && user.userName ? user. userName : '';

        return (
            <div>
                <Header userName={userName} 
                location={location} 
                onLogout={this.handleLogout} 
                />
                <Route path={match.url}
                    exact
                    render={props => <AsyncPostList {...props} />}
                />
                <Route path={`${match.url}/:id`}
                    render={props => <AsyncPost {...props} />}
                />
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        user: getLoggedUser(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);