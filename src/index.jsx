import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.less';
import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import BlogService from './services/blog-service';
import ApiBlogService from './services/blog-fetch';

import { BlogServiceProvider } from "./components/blog-service-context";

import store from './store';

const blogService = new BlogService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BlogServiceProvider value={blogService}>
                <Router>
                    <App />
                </Router>
            </BlogServiceProvider>
        </ErrorBoundary>
    </Provider>
    , document.getElementById('root'));