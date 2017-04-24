import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';

// 主页
import HomePage from '../Pages/HomePage';

class MainView extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default (
    <Router history={hashHistory}>
        <Route path="/" component={MainView}>
            <IndexRoute component={HomePage}/>
            <Route path="/homePage" component={HomePage}/>
        </Route>
    </Router>
);
