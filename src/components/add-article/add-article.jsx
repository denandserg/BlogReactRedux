import React from 'react';
import { Link } from 'react-router-dom';
import './add-article.less'
import withBlogService from "../hoc";
import { postsError, postsLoaded, postsRequested} from "../../actions";
import {connect} from "react-redux";
import compose from "../../utils/compose";


class AddArticle extends React.Component {

    inputTitle = React.createRef();
    inputDate = React.createRef();
    inputBody = React.createRef();
    inputAuthor = React.createRef();

    saveArticleHandler = () => {
        const { apiBlogService, addFormArticleHide, postsLoaded, postsError, postsRequested } = this.props;
        apiBlogService.createPost(this.inputBody.current.value,
                                    this.inputTitle.current.value,
                                        this.inputDate.current.value,
                                            this.inputAuthor.current.value)
            .then(() => postsRequested())
            .then(() => apiBlogService.getAllPosts())
            .then(data => postsLoaded(data))
            .then(()=>addFormArticleHide())
            .catch(error => postsError(error));

    };

    render() {
        return (
            <form className='add-form-comments form'>
                <label className='headLabel'>
                    Create new post
                </label>
                <input type='text'
                       placeholder='Enter date posts'
                       className='form-control control'
                       defaultValue=''
                       ref={this.inputDate}
                />
                <input type='text'
                       placeholder='Enter title posts'
                       className='form-control control'
                       defaultValue=''
                       ref={this.inputTitle}
                />
                <input type='text'
                       placeholder='Enter body posts'
                       className='form-control control'
                       defaultValue=''
                       ref={this.inputBody}
                />
                <input type='text'
                       placeholder='Enter author posts'
                       className='form-control control'
                       defaultValue=''
                       ref={this.inputAuthor}
                />
                <Link to='/'>
                    <button className='btn btn--long'
                            onClick={this.saveArticleHandler}
                    >
                        Save
                    </button>
                </Link>
            </form>
        )
    }
}

const mapStateToProps = ({posts, loading, error}) => {
    return {
        posts: posts,
        loading: loading,
        error: error,
    }
};

const mapDispatchToProps = {
    postsLoaded,
    postsRequested,
    postsError,
};

export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps))(AddArticle);