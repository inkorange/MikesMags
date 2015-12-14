import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

// elements
const MagListing = require('../elements/MagListing');
const MagEdit = require('../elements/MagEdit');

// model
import Store from '../models/Store';
import Global from '../models/Global';

const AddMagazine = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function () {
        return {

        };
    },

    _getAppData: function() {
        var _this = this;
        var apiURL = Global.apiEndpoint;
        $.when(
            $.ajax(apiURL + 'getMags.php')
        ).done(function(data) {
                Store.setStore('magdata', JSON.parse(data), {persist: true},
                    _this.setState({
                        'magdata' : JSON.parse(data)
                    })
                );
            })
            .fail(function() {
                // if failed internet connection, get it from localStorage
                _this.setState({
                    'magdata' : Store.getStore('magdata')
                })
            });
    },

    componentDidMount: function() {
        this._getAppData();
    },

    render() {
        return (
            <section className="magazineContent">
                <MagListing magdata={this.state.magdata}/>
                <MagEdit />


            </section>
        )
    }

});

module.exports = AddMagazine;