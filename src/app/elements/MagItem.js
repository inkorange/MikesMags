import React from 'react'
import { render } from 'react-dom'
import m from 'moment'
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
        Store.setStore('clickededit', this.props.magData);
    },

    componentDidMount: function() {
        //this.props.magdata.date = new Date(this.props.magdata.date);
    },

    render() {
        return (
            <div className="magItem" onClick={this.broadcastEdit}>
                {m(this.props.magData.date).format('ll')} | {this.props.magData.summary}
            </div>
        )
    }

});

module.exports = MagItem;