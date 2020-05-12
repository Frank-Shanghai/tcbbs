import React, {Component} from 'react';
import "./style.css";

class PostEditor extends Component {
    constructor(props) {
        super(props);
        const {post} = this.props;
        this.state = {
            title: (post && post.title) || "",
            content: (post && post.content) || ""
        };
    }

    handleChange = (e) => {
        const name = e.target.name;
        if(name === "title"){
            this.setState({
                title: e.target.value
            });
        }
        else if(name === "content"){
            this.setState({
                content: e.target.value
            });
        }
    }

    handleCancelClick = () => {
        this.props.onCancel();
    }

    handleSaveClick = () => {
        const data = {
            title: this.state.title,
            content: this.state.content
        };

        this.props.onSave(data);
    }

    render() {
        return (
            <div className="postEditor">
                <input 
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <textarea 
                name="content"
                placeholder="Content..."
                value={this.state.content}
                onChange={this.handleChange}
                />
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleSaveClick}>Save</button>
            </div>            
        );
    }
}

export default PostEditor;