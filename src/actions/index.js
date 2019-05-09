import constants from '../constatnts/constatnts';

const postsLoaded = (newPosts) => {
    return {
        type: 'FETCH_POSTS_SUCCESS',
        payload: newPosts,
    }
};

const postsRequested = () => {
    return {
        type: 'FETCH_POSTS_REQUEST'
    }
};

const postsError = (error) => {
    return {
        type: 'FETCH_POSTS_FAILURE',
        payload: error
    }
};

const currentArticleLoaded = (newArticle) => {
    return {
        type: 'FETCH_CURRENT-ARTICLE_SUCCESS',
        payload: newArticle,
    }
};

const currentArticleError = (error) => {
    return {
        type: 'FETCH_CURRENT-ARTICLE_FAILURE',
        payload: error
    }
};

const currentArticleRequest = () => {
    return {
        type: 'FETCH_CURRENT-ARTICLE_REQUEST'
    }
};

const addFormArticleShow = () => {
    return {
        type: 'ADD_FORM-ARTICLE_UNHIDE'
    }
};

const addFormArticleHide = () => {
    return {
        type: 'ADD_FORM-ARTICLE_HIDE'
    }
};


export const addNewComment = payload => ({type: constants.ADD_NEW_COMMENT, payload});

export {
    postsLoaded,
    postsRequested,
    postsError,
    currentArticleError,
    currentArticleLoaded,
    currentArticleRequest,
    addFormArticleHide,
    addFormArticleShow,
};