import constants from '../constatnts/constatnts'

const initialState = {
    posts: [],
    loading: true,
    error: null,
    currentArticle: {},
    loadingArticle: true,
    errorArticle: null,
    addFormArticle: false,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
            return {
                ...state,
                posts: [],
                loading: true,
                error: null
            };
        case 'FETCH_POSTS_SUCCESS':
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_POSTS_FAILURE':
            return {
                ...state,
                posts: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_CURRENT-ARTICLE_REQUEST':
            return {
                ...state,
                currentArticle: {},
                loadingArticle: true,
                errorArticle: null
            };
        case 'FETCH_CURRENT-ARTICLE_SUCCESS':
            return {
                ...state,
                currentArticle: action.payload,
                loadingArticle: false,
                errorArticle: null
            };
        case constants.ADD_NEW_COMMENT:
            return {
                ...state,
                currentArticle: {
                    ...state.currentArticle,
                    comments: [
                        ...state.currentArticle.comments.concat(action.payload)
                    ]
                },
                loadingArticle: false,
                errorArticle: null
            };
        case 'FETCH_CURRENT-ARTICLE_FAILURE':
            return {
                ...state,
                currentArticle: {},
                loadingArticle: false,
                errorArticle: action.payload
            };
        case 'ADD_FORM-ARTICLE_UNHIDE':
            return {
                ...state,
                addFormArticle: true,
            };
        case 'ADD_FORM-ARTICLE_HIDE':
            return {
                ...state,
                addFormArticle: false,
            };

        default:
            return state
    }
};

export default reducer;