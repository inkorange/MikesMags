import React from 'react'
import { render } from 'react-dom'

// elements

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
    
    render() {
        return (
            <article className="MainLayout">
                <header>
                    MIKESMAGS
                </header>
            </article>
        )
    }
 
});

module.exports = Player;