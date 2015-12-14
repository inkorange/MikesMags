import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';

// elements

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
    update: function() {

    },

    componentDidMount: function() {
    },

    render() {
        return (
            <section className="MagListing">
                {this.props.magdata.map(function(mdata, key) {
                    return (
                        <div key={key} className="magItem">
                            {mdata.date} | {mdata.summary}
                        </div>
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = MagListing;