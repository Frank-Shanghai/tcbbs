// It is really an import issue to notice.
// Refer to <React进阶之路> P188 ~ P193, react router导致其child每次都会重新渲染，所以这里又封装了一层。
// 在shouldComponentUpdate之中判断，如果location没有变，就不重新render.
import React from "react";

export default function connectRoute(WrappedComponent) {
  return class ConnectRoute extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
