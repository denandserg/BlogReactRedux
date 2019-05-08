import React from 'react';
import './article-list-item.less';

class ArticleListItem extends React.Component {
    render() {
        const { title, body, author, date } = this.props.post;
        return (
            <div className='article-list-item'>
                <div className='article-list-item__date'>{date}</div>
                <div className='article-list-item__title'>{title}</div>
                <div className='article-list-item__body'>{body}</div>
                <div className='article-list-item__author'>{author}</div>
            </div>
        )
    }
}

export default ArticleListItem;