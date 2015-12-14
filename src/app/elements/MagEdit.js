import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';
import Global from '../models/Global';

// elements
const TextField = require('material-ui/lib/text-field');
const SelectField = require('material-ui/lib/select-field');


const MagEdit = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            magdata: []
        };
    },

    getInitialState: function() {
        return {
        }
    },
    update: function() {

    },

    componentDidMount: function() {
    },

    render() {
        return (
            <section className="MagEdit">
               WIll be edit panel
            </section>
        )
    }

});

module.exports = MagEdit;