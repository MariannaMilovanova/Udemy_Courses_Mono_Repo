import React, {Component} from 'react';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

class PostsShow extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(this.props.match.params.id)
    }
    onDeleteClick() {
        const id = this.props.match.params.id;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }
    render() {
        const {post} = this.props;
        //this.props === ownProps
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to='/'>Back to Index</Link>
                <button className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                >
                    Delete
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps({posts}, ownProps) {
    console.log('ownProps', ownProps);
    return {post: posts[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);