import React from 'react';
import { connect } from 'react-redux';
import './article-list.less';
import ArticleListItem from "../article-list-item/article-list-item";
import withBlogService from '../hoc'
import { postsLoaded } from "../../actions";

class ArticleList extends React.Component {
    componentDidMount () {
        const { apiBlogService } = this.props;
        const data = apiBlogService.getAllPosts().then(data => {
            this.props.postsLoaded(data);
        });
    }

    render() {
        const { posts } = this.props;
        return(
            <ul className='article-list'>
                {
                    posts.map( article => {
                        return (
                            <li><ArticleListItem post={article}/></li>
                        )
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = ({posts}) => {
    return {
        posts: posts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsLoaded: (newPosts) => {
            dispatch(postsLoaded(newPosts))
        }
    };
};

export default withBlogService()(
    connect(mapStateToProps, mapDispatchToProps)(ArticleList));

