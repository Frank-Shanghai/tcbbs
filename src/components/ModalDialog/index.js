import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class ModalDialog extends React.Component {
    constructor(props){
        super(props);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    componentWillUnmount(){
        document.body.removeChild(this.container);
    }

    render(){
        return ReactDOM.createPortal(
            <div className="modalDialog">
                <span className="close" onClick={this.props.onClose}>
                    &times;
                </span>
                <div className="message">{this.props.children}</div>
            </div>,
            this.container
        );
    }
}

export default ModalDialog;