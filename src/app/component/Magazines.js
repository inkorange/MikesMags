import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

// elements
const LeftNav = require('material-ui/lib/left-nav');
const TextField = require('material-ui/lib/text-field');
const SelectField = require('material-ui/lib/select-field');

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

// model
import Store from '../models/Store';

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

    _getAppData: function() {
        var _this = this;
        $.when(
            $.ajax('api/getMags.php')
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

    _triggerLeftNav: function() {
        this.refs.leftNav.toggle();
    },

    _updateSearch: function(e) {
        console.log(e.target.value);
    },
    _handleMagValueChange: function(a,b) {
        console.log(a,b);
    },

    render() {
        let magItems = [
            { payload: '0', text: 'All' },
            { payload: '1', text: 'Life' },
            { payload: '2', text: 'Woman\'s Day' },
            { payload: '3', text: 'Playboy' }
        ];
        console.log('map data: ', this.state.magdata);
        return (
            <section className="magazineContent">
                {this.state.magdata.map(function(mdata, key) {
                    return (
                        <Card key={key} className="magCard">
                            <CardMedia
                                overlay={<CardTitle title="Magazine" subtitle={mdata.date}/>}
                            >
                                <img src="images/magimage.jpg"/>
                            </CardMedia>
                            <CardText expandable={false} style={{height: '50px'}}>
                                {mdata.summary}
                            </CardText>
                        </Card>
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = Magazines;