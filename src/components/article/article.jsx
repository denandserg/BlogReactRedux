import React from 'react';
import { connect } from 'react-redux';
import compose from '../../utils/compose';
import withBlogService from '../hoc'
import './article.less';
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator/error-indicator";
import {
    currentArticleRequest,
    currentArticleLoaded,
    currentArticleError,
} from "../../actions";

class Article extends React.Component {
    componentDidMount () {
        const { apiBlogService,
            currentArticleRequest,
            currentArticleLoaded,
            currentArticleError,
            post
        } = this.props;

        currentArticleRequest();
        apiBlogService.getCurrentPost(post.itemId)
            .then(data => currentArticleLoaded(data))
            .catch(error => currentArticleError(error));
    }

    render() {
        debugger;
        const { currentArticle, loadingArticle, errorArticle } = this.props;
        const { id, date, title, body, author, comments } = currentArticle;
        if(loadingArticle) {
            return <Spinner />
        }

        if(errorArticle) {
            return <ErrorIndicator />
        }
        return (
            <React.Fragment>
                <ul className='article-list'>
                    <li key={id}>
                        <div className='article-list-item'>
                            <div className='article-list-item__date'>{date}</div>
                            <div className='article-list-item__title'>{title}</div>
                            <div className='article-list-item__body'>{body}</div>
                            <div className='article-list-item__author'>{author}</div>
                        </div>
                    </li>
                </ul>
                <div>
                    <ul className='article-list'>
                       {
                           comments.map((com)=>{
                               return (
                                   <li key={com.id}>
                                       {com.body}
                                   </li>
                               );
                           })
                       }
                    </ul>
                </div>
                <div>
                    <button className='btn'>Add comments</button>
                </div>
            </React.Fragment>
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
    currentArticleError,
    currentArticleLoaded,
    currentArticleRequest
};

export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Article);