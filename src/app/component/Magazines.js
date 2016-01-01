import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import m from 'moment'

// elements
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

// model
import Store from '../models/Store';
import Global from '../models/Global';

const Magazines = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        var magid = Store.getStore('magid');
        var search = Store.getStore('search');
        return {
            magdata: [],
            magid: (magid ? magid : 0),
            search: (search ? search : '')

        }
    },

    getDefaultProps: function () {
        return {

        };
    },

    updateFilter: function(filter) {
        this._getAppData(filter);
    },

    _getAppData: function(filter) {
        var _this = this;
        var apiURL = Global.apiEndpoint;
        filter = filter ? filter : {};
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

    componentDidMount: function() {
        this._getAppData();
        Store.subscribe('updatefilter', this.updateFilter);
    },

    _triggerLeftNav: function() {
        this.refs.leftNav.toggle();
    },

    _updateSearch: function(e) {
        console.log(e.target.value);
    },
    _handleMagValueChange: function(a,b) {
        console.log(a,b);
    },
    _formatDate: function(dater) {
        var mdate = m(dater);
        return '';
    },

    render() {

        console.log('map data: ', this.state.magdata);

        return (
            <section className="magazineContent">
                {this.state.magdata.map(function(mdata, key) {
                    return (
                        <Card key={key} className={'magCard'}>
                            <CardMedia
                                overlay={<CardTitle subtitle={mdata.summary}/>}
                            >
                                <img src={'images/' + Global.imageMap[mdata.publisher_id]}/>
                            </CardMedia>
                            <CardText expandable={false} style={{height: '50px'}}>
                                <p className="magprice">{mdata.price ? '$' + mdata.price : ''}</p>
                                {m(mdata.date).format('MMM D, YYYY')}
                            </CardText>
                        </Card>
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = Magazines;