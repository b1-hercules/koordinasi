import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Form from "./form"
import history from './history';
import Home from "./App";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/form" component={Form} />
                </Switch>
            </Router>
        )
    }
}

