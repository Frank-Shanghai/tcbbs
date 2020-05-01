import React, { Component } from "react";

// React高阶组件（HOC：High Order Component), React优化，按需加载
// https://www.jianshu.com/p/e00f9ea88c97
export default function asyncComponent(importComponent){
    return class AsyncComponent extends Component{
        constructor(props){
            super(props);
            this.state = {
                component: null
            };
        }

        componentDidMount() {
            importComponent().then((mod) => {
                this.setState({
                    // 同时兼容ES6 and CommonJS模块
                    component: mod.default ? mod.default : mod
                });
            });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}