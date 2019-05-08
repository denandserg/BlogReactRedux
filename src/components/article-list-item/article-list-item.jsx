import React from 'react';
import './article-list-item.less';

const ArticleListItem = ({post}) => {
    const { title, body, author, date } = post;
    return (
        <div className='article-list-item'>
            <div className='article-list-item__date'>{date}</div>
            <div className='article-list-item__title'>{title}</div>
            <div className='article-list-item__body'>{body}</div>
            <div className='article-list-item__author'>{author}</div>
        </div>
    )
};

export default ArticleListItem;