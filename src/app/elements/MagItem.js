import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';


const MagItem = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            magdata: {}
        };
    },

    getInitialState: function() {
        return {
        }
    },

    broadcastEdit: function() {
        Store.setStore('clickedit', this.props.magData)
    },

    componentDidMount: function() {
    },

    render() {
        return (
            <div className="magItem" onClick={this.broadcastEdit}>
                {this.props.magData.date} | {this.props.magData.summary}
            </div>
        )
    }

});

module.exports = MagItem;