const postsLoaded = (newPosts) => {
    return {
        type: 'POSTS_LOADED',
        payload: newPosts,
    }
};

const postsRequested = () => {
    return {
        type: 'POSTS_REQUESTED'
    }
};

const postsError = (error) => {
    return {
        type: 'POSTS_ERROR',
        payload: error
    }
};

export {
    postsLoaded,
    postsRequested,
    postsError
};