import React from 'react';
import { Route, Switch } from 'react-router';
import { HomePage, PostPage } from '../pages'
import Header from '../header'
import './app.less';

const App = () => {
    return (
        <div className='blog-app'>
            <Header />
            <Switch>
                <Route path='/'
                       component={HomePage}
                       exact
                />
                <Route path='/posts/:id'
                       render={({ match }) => {
                           const { id } = match.params;
                           return <PostPage itemId={id}/>
                       }}
                />
            </Switch>
        </div>

    )
};

export default App;