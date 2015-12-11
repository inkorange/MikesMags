import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'

// elements
const TextField = require('material-ui/lib/text-field');
const SelectField = require('material-ui/lib/select-field');

const Layout = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    mixins: [ History ],

    getInitialState: function() {
        return {

        };
    },
    
    getDefaultProps: function () {
        return { 

        };
    },

    componentDidMount: function() {
    },

    render() {
        var menuItems = [
            { route: 'get-started', text: 'Get Started' },
            { route: 'customization', text: 'Customization' },
            { route: 'components', text: 'Components' }
        ];

        let magItems = [
            { payload: '0', text: 'All Magazines' },
            { payload: '1', text: 'Life' },
            { payload: '2', text: 'Woman\'s Day' },
            { payload: '3', text: 'Playboy' }
        ];
        return (
            <article className="MainLayout">
                <header>
                    <img src="images/mikesmagslogo.svg" />
                    <nav>
                        <div>
                        <TextField
                            hintText="Narrow Your Search..."
                            defaultValue={this.state.search}
                            onChange={this._updateSearch}
                            style={{marginRight: '20px'}}
                        />
                        <SelectField
                            style={{position: 'relative', top: '18px'}}
                            menuItems={magItems} />
                        </div>
                    </nav>
                </header>
                {this.props.children}
            </article>
        )
    }
 
});

module.exports = Layout;