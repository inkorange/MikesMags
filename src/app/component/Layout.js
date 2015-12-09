import React from 'react'
import { render } from 'react-dom'

// elements
const LeftNav = require('material-ui/lib/left-nav');

// model
import Store from '../models/Store';

const Player = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            magdata: {}
        }
    },    
    
    getDefaultProps: function () {
        return { 

        };
    },

    _getAppData: function() {
        $.when(
            $.ajax('api/getMags.php')
        ).done(function(data) {
            Store.setStore('magdata', data, {persist: true});
        });
    },

    componentDidMount: function() {
        this._getAppData();
    },

    _triggerLeftNav: function() {
        this.refs.leftNav.toggle();
    },
    
    render() {

        var menuItems = [
            { route: 'get-started', text: 'Get Started' },
            { route: 'customization', text: 'Customization' },
            { route: 'components', text: 'Components' }
        ];

        return (
            <article className="MainLayout">
                <LeftNav ref="leftNav" docked={true} menuItems={menuItems} />
                <header>
                    <div onClick={this._triggerLeftNav}>=</div>
                    MIKESMAGS!!!
                </header>
            </article>
        )
    }
 
});

module.exports = Player;