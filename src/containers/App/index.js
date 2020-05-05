import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import connectRoute from '../../utils/connectRoute';
import asyncComponent from "../../utils/AsyncComponent";
import {actions as appActions} from '../../redux/modules/app';


const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={AsyncHome} />
                        <Route path="/login" component={AsyncLogin} />
                        <Route path="/posts" component={AsyncHome} />                        
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators(appActions, dispatch)
    };
  };

export default connect(undefined, mapDispatchToProps)(App);;