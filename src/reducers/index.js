const initialState = {
    posts: [],
    loading: true,
    error: null,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'POSTS_REQUESTED':
            return {
                posts: [],
                loading: true,
                error: null
            };
        case 'POSTS_LOADED':
            return {
                posts: action.payload,
                loading: false,
                error: null
            };
        case 'POSTS_ERROR':
            return {
                posts: [],
                loading: false,
                error: action.payload
            };

        default:
            return state
    }
};

export default reducer;