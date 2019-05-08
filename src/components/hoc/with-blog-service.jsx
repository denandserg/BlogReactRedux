import React from 'react';
import {BlogServiceConsumer} from '../blog-service-context';

const withBlogService = () => (Wrapped) => {
    return (props) => {
        return (
            <BlogServiceConsumer>
                {
                    (apiBlogService) => {
                        return (
                            <Wrapped {...props} apiBlogService={apiBlogService}/>
                        )
                    }
                }
            </BlogServiceConsumer>
        )
    }
};

export default withBlogService;
