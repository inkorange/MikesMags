import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';

// elements
const MagItem = require('./MagItem');

const MagListing = React.createClass({
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

    componentDidMount: function() {
    },

    render() {
        return (
            <section className="MagListing">
                {this.props.magdata.map(function(mdata, key) {
                    return (
                        <MagItem key={key} magData={mdata} />
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = MagListing;