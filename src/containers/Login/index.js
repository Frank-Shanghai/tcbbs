import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "jack",
            password: "123456",
            redirectToReferrer: false
        };
    }

    componentWillReceiveProps(nextProps) {
        // 从非登录状态变为登录状态
        const isLoggedIn = !this.props.user.userId && nextProps.user.userId;
        if(isLoggedIn){
            this.setState({
                redirectToReferrer: true
            });
        }
    }

    handleChange = (e) => {
        if(e.target.name === "userName") {
            this.setState({
                userName: e.target.value
            });
        }
        else if(e.target.name === "password") {
            this.setState({
                password: e.target.password
            });
        }
    };

    handleSubmit= (e) => {

    };

    render() {
        return <div>Login</div>
    }
}

export default Login;