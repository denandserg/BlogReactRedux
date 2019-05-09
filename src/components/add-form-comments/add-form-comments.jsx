import React from 'react';
import withBlogService from '../hoc'
import './add-form-comments.less';
import {currentArticleError, currentArticleLoaded, currentArticleRequest, addNewComment} from '../../actions';
import {connect} from "react-redux";
import compose from "../../utils/compose";

class AddFormComments extends React.Component {

    input = React.createRef();

    onClickButton = () => {
        const { articleId, apiBlogService, addNewComment } = this.props;
        currentArticleRequest();
        apiBlogService.addComment(articleId, this.input.current.value)
            .then(data => {
                addNewComment(data);
            })
            .catch(error => currentArticleError(error));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.input.current.value = '';
    };

    render() {

        return(
            <form className='add-form-comments'
                  onSubmit={this.onSubmit}
            >
                <input type='text'
                       className='form-control'
                       defaultValue =''
                       placeholder='Enter your comment'
                       ref={this.input}
                />
                <button
                    className="btn"
                    onClick={this.onClickButton}
                >ADD</button>
            </form>
        )
    }
}

const mapStateToProps = ({ currentArticle, loadingArticle, errorArticle }) => {
    return {
        currentArticle: currentArticle,
        loadingArticle: loadingArticle,
        errorArticle: errorArticle
    }
};

const mapDispatchToProps = {
    addNewComment,
    currentArticleError,
    currentArticleLoaded,
    currentArticleRequest
};

export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps))
    (AddFormComments)
