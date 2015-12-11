import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

// page components
const Layout = require("./component/Layout");
const Magazines = require("./component/Magazines");
const AddMagazine = require("./component/AddMagazine");

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const history = useBasename(createHistory)({
    basename: '/'
});

render((
    <Router history={history} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Magazines}/>
            // Trailer Loads  Routes
            <Route name="addMag" path="/addMag" component={AddMagazine} />
            <Redirect from="/addMag/" to="/addMag" />

            <Route path="*" component={Magazines}/>
        </Route>
    </Router>
),  document.getElementById('app'))