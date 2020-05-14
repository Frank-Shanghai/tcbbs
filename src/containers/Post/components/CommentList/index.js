import React from 'react';
import CommentsView from '../CommentsView';
import "./style.css";

class CommentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleClick = () => {
        const content = this.state.value;

        if(content.length > 0){
            this.props.onSubmit(content);
            this.setState({
                value: ''
            });
        }
        else {
            alert("Comments cannot be empty!");
        }
    };

    render() {
        const {comments, editable} = this.props;

        return (
            <div className="commentList">
                <div className="title">Comments</div>
                {
                    editable ? (
                        <div className="editor">
                            <textarea
                                placeHolder="Comments..."
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <button onClick={this.handleClick}>Submit</button>
                        </div>
                    ) : null
                }
                <CommentsView comments={comments} />
            </div>
        );
    }
}

export default CommentList;