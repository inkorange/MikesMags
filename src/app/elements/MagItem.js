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

    getMagName: function(index) {
        var name = "";
        this.props.magItems.map(function (mag, key) {
            if (index == mag.payload) {
                name = mag.text;
            }
        });
        return name;
    },

    render() {
        return (
            <div className={"magItem publisher" + this.props.magData.publisher_id} onClick={this.broadcastEdit}>
                <p className="magprice">${this.props.magData.price ? this.props.magData.price : '--'}</p>
                <p>{this.props.magData.id} | {this.getMagName(this.props.magData.publisher_id)}</p>
                <p className="magdate">{m(this.props.magData.date).format('MMM YYYY')}</p>
            </div>
        )
    }

});

module.exports = MagItem;