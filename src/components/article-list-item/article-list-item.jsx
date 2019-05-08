import React, {Fragment} from 'react';
import './article-list-item.less';

const ArticleListItem = ({post}) => {
    const { title, body, author, data } = post;
    return (
        <Fragment>
            <span>{data}</span>
            <span>{title}</span>
            <span>{body}</span>
            <span>{author}</span>
        </Fragment>
    )
};

export default ArticleListItem;