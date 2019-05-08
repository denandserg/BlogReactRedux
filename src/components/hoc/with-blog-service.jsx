import React from 'react';
import {BlogServiceConsumer} from '../blog-service-context';

const withBlogService = () => (Wrapped) => {
    return (props) => {
        return (
            <BlogServiceConsumer>
                {
                    (BlogService) => {
                        return (
                            <Wrapped {...props} blogService={BlogService}/>
                        )
                    }
                }
            </BlogServiceConsumer>
        )
    }
};

export default withBlogService;
