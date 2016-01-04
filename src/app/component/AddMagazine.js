import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

// elements
const MagListing = require('../elements/MagListing');
const MagEdit = require('../elements/MagEdit');

// model
import Store from '../models/Store';
import Global from '../models/Global';

const magItems = Global.magazines;

const magConditions = [
    { payload: '', text: 'Select a Condition...' },
    { payload: 'Mint', text: 'Mint' },
    { payload: 'Excellent', text: 'Excellent' },
    { payload: 'Very Good', text: 'Very Good' },
    { payload: 'Good', text: 'Good' }
];

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

    _getAppData: function(filter) {
        var _this = this;
        var apiURL = Global.apiEndpoint;
        $.when(
            $.ajax({
                url: apiURL + 'getMags.php',
                data: filter
            })
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

    updateFilter: function(filter) {
        this._getAppData(filter);
    },

    componentDidMount: function() {
        this._getAppData();
        Store.subscribe('updated', this._getAppData);
        Store.subscribe('updatefilter', this.updateFilter);
    },

    render() {
        return (
            <section className="magazineContent">
                <MagListing magItems={magItems} magdata={this.state.magdata}/>
                <MagEdit magItems={magItems} magConditions={magConditions} />
            </section>
        )
    }

});

module.exports = AddMagazine;