import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css';

class Header extends Component{
    render() {
        const {userName, onLogout, location} = this.props;

        return (
            <div className="header">
                <div className="nav">
                    <span className="left-link">
                        <Link to="/">Home</Link>
                    </span>
                    {(userName && userName.length > 0) ? (
                        // Pay attention to the styling name, should use camel format without dash
                        // style用了两个大括号，第一个大括号表示style的值是一个JavaScript表达式;第二个大括号
                        // 表示这个JavaScript表达式是一个对象。 《React进阶之路》P29
                        <span className="user" style={{marginRight: "5px"}}>
                            当前用户： {userName} <button onClick={onLogout}>注销</button>
                        </span>                        
                    ) : (
                        <span className="right-link">
                            <Link to={{pathname: "/login", state: {from: location}}}>
                                登录
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default Header;