import React from 'react';
import { connect } from 'react-redux';
import compose from '../../utils/compose';
import './article-list.less';
import ArticleListItem from "../article-list-item/article-list-item";
import withBlogService from '../hoc'
import { postsLoaded, postsRequested, postsError } from "../../actions";

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator/error-indicator";

const ArticleList = ({posts}) => {
    return (
        <ul className='article-list'>
            {
                posts.map( article => {
                    return (
                        <li key={article.id}><ArticleListItem post={article}/></li>
                    )
                })
            }
        </ul>
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
        const { posts, loading, error } = this.props;

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <ErrorIndicator />
        }

        return(
            <ArticleList posts={posts}/>
        );
    }
}

const mapStateToProps = ({posts, loading, error}) => {
    return {
        posts: posts,
        loading: loading,
        error: error
    }
};

const mapDispatchToProps = {
    postsLoaded,
    postsRequested,
    postsError
};


export default compose(
    withBlogService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ArticleListContainer);

