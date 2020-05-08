import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import "./style.css";

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
        // 从非登录状态变为登录状态, 要回到from的页面，即跳转到登录页面的上一个页面
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
        e.preventDefault();
        const userName = this.state.userName;
        const password = this.state.password;

        if(!userName || !password) {
            alert("User Name and Password are required.");
            return;
        }

        // 如果当前已有用户登录，先注销
        if(this.props.user.userId) {
            this.props.logout();
        }

        this.props.login(userName, password);
    };

    render() {
        const { from } = this.props.location.state || { from: {pathname: "/" }};
        const { redirectToReferrer } = this.state;
        if(redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <div>
                    <label>User Name: </label>
                    <input name="userName" type="text" value={this.state.userName} 
                    onChange={this.handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input name="password" type="password" value={this.state.password} 
                    onChange={this.handleChange} />
                </div>
                <input type="submit" value="login" />
            </form>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


