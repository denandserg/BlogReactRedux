import React from 'react';
import { connect } from 'react-redux';
import compose from '../../utils/compose';
import './article-list.less';
import ArticleListItem from "../article-list-item/article-list-item";
import withBlogService from '../hoc'
import { postsLoaded, postsRequested, postsError, addFormArticleShow, addFormArticleHide } from "../../actions";
import { withRouter } from 'react-router'

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator/error-indicator";
import { Link } from 'react-router-dom';
import AddArticle from "../add-article/add-article";

const ArticleList = (props) => {

    return (
        <React.Fragment>
            <button className='btn btn--long'
                    onClick={()=>props.addFormArticleShow()}
            >
                Add new article
            </button>
            <ul className='article-list'>
                {
                    props.posts.map( article => {
                        return (
                            <Link key={article.id} style={{textDecoration: 'none', color: 'black'}} to={`/posts/${article.id}?_embed=comments`}>
                                <li key={article.id}><ArticleListItem post={article}/></li>
                            </Link>
                        )
                    })
                }
            </ul>
        </React.Fragment>

    )
};

class ArticleListContainer extends React.Component {
    componentDidMount () {
        const { apiBlogService,
                postsLoaded,
                postsRequested,
                postsError } = this.props;

        postsRequested();
        apiBlogService.getAllPosts()
            .then(data => postsLoaded(data))
            .catch(error => postsError(error));
    }

    render() {
        const { posts, loading, error, addFormArticle, addFormArticleShow, addFormArticleHide } = this.props;

        if(addFormArticle) {
            return <AddArticle addFormArticleHide={addFormArticleHide}/>
        }

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <ErrorIndicator />
        }

        return(
            <ArticleList posts={posts} addFormArticleShow={addFormArticleShow}/>
        );
    }
}

const mapStateToProps = ({posts, loading, error, addFormArticle}) => {
    return {
        posts: posts,
        loading: loading,
        error: error,
        addFormArticle: addFormArticle
    }
};

const mapDispatchToProps = {
    postsLoaded,
    postsRequested,
    postsError,
    addFormArticleHide,
    addFormArticleShow
};

export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(ArticleListContainer));

