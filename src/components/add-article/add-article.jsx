import React from 'react';
import { Link } from 'react-router-dom';
import './add-article.less'
class AddArticle extends React.Component {
    render() {
        return (
            <form className='add-form-comments form'>
                <label className='headLabel'>
                    Create new post
                </label>
                <input type='text'
                       placeholder='Enter date posts'
                       className='form-control control'
                />
                <input type='text'
                       placeholder='Enter title posts'
                       className='form-control control'
                />
                <input type='text'
                       placeholder='Enter body posts'
                       className='form-control control'
                />
                <input type='text'
                       placeholder='Enter author posts'
                       className='form-control control'
                />
                <Link to='/'>
                    <button className='btn btn--long'>
                        Save
                    </button>
                </Link>
            </form>
        )
    }
}

export default AddArticle;