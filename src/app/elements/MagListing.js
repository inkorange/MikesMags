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

    mutateDate: function(data) {
        data.date = new Date(data.date);
        return data;
    },

    render() {
        return (
            <section className="MagListing">
                {this.props.magdata.map(function(mdata, key) {
                    return (
                        <MagItem key={key} magItems={this.props.magItems} magData={mdata} />
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = MagListing;