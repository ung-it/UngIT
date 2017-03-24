import React from "react"



class Comment extends React.Component {

    render() {
        return (
            <div>
                {this.createActivityItem()}
            </div>
        );
    }
}

export default Comment;
