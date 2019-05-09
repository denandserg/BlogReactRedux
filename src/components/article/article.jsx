import React from 'react';
import { connect } from 'react-redux';
import compose from '../../utils/compose';
import withBlogService from '../hoc'
import './article.less';
import Spinner from '../spinner';
import ScrollArea from 'react-scrollbar';
import ErrorIndicator from "../error-indicator/error-indicator";
import { Link } from 'react-router-dom';
import {
    currentArticleRequest,
    currentArticleLoaded,
    currentArticleError,
    postsRequested,
    postsError,
    postsLoaded
} from "../../actions";
import AddFormComments from "../add-form-comments/add-form-comments";

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

    delArticle(id) {
        const { postsRequested, postsError, postsLoaded, apiBlogService } = this.props;
        apiBlogService.deleteCurrentPost(id)
            .then(()=>postsRequested())
            .then(()=>apiBlogService.getAllPosts())
                .then(data => postsLoaded(data))
                .catch(error => postsError(error));
    }

    editArticle(id) {

    }

    render() {
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
                <div className='btn-wrapper'>
                    <button className='btn btn--long'
                            onClick={()=>this.editArticle(id)}
                    >
                        Edit
                    </button>
                    <Link to='/'>
                        <button className='btn btn--long'
                                onClick={()=>this.delArticle(id)}
                        >
                            Delete
                        </button>
                    </Link>
                </div>
                <ul className='article-list'>
                    <li key={id}>
                        <div className='article-list-item article-list-item--long'>
                            <div className='article-list-item__date'>{date}</div>
                            <div className='article-list-item__title'>{title}</div>
                            <div className='article-list-item__body article-list-item__body--long'>{body}</div>
                            <div className='article-list-item__author'>{author}</div>
                        </div>
                    </li>
                </ul>
                <div>
                    <ul className='article-list'>
                        <ScrollArea
                            speed={0.8}
                            className="area"
                            contentClassName="content"
                            horizontal={false}
                            contentWindow={window || {}}
                            ownerDocument={document || {}}
                        >
                            {
                                comments.map((com)=>{
                                    return (
                                        <li key={com.id}>
                                            {com.body}
                                        </li>
                                    );
                                })
                            }
                        </ScrollArea>
                    </ul>
                </div>
                <AddFormComments articleId={id}/>
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
    currentArticleRequest,
    postsRequested,
    postsError,
    postsLoaded
};

export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Article);