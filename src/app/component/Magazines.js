import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import m from 'moment'

// elements
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const TextField = require('material-ui/lib/text-field');
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
const FontIcon = require('material-ui/lib/font-icon');
const Fieldset = require('../elements/Fieldset');

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
            search: (search ? search : ''),
            dialogOpen: false,
            dialog: [],
            sendernameerror: "",
            senderemailerror: ""
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
        this._getAppData(Store.getStore('updatefilter'));
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

    _loadDetail: function(data) {
        console.log(data);
        this.setState({
            dialogOpen: true,
            dialog: data
        });
    },

    handleClose: function() {
        this.setState({dialogOpen: false});
    },

    sendEmail: function() {
        var apiURL = Global.apiEndpoint;
        var username =  this.refs.username.getValue();
        var useremail = this.refs.useremail.getValue();
        var message = this.refs.message.getValue();
        var payload = {
            name: username,
            email: useremail,
            message: message
        };
        var _this = this;
        $.when(
            $.ajax({
                url: apiURL + 'sendContact.php',
                data: payload,
                type: 'POST'
            })
        ).done(function(data) {
            console.log('sent email action: ', data)
            setTimeout(() => {
                _this.setState({dialogOpen: false});
            }, 2000);
        }).fail(() => {console.log('failed email.')} );


    },

    render() {

        console.log('map data: ', this.state.magdata);

        const actions = [

            <FlatButton
                onTouchTap={this.handleClose}
                secondary={true}
                label="Close"
                labelPosition="after">
                <FontIcon style={{top: '6px',marginRight: '-5px'}} className="remove-icon material-icons" color={'red'}>cancel</FontIcon>
            </FlatButton>,
            <FlatButton
                label="Submit Information Request"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.sendEmail} />,
        ];

        return (
            <section className="magazineContent">
                {this.state.magdata.map(function(mdata, key) {
                    return (
                        <Card key={key} className={'magCard'} onClick={() => this._loadDetail(mdata)}>
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
                <Dialog
                    title="Contact MikesMags"
                    actions={actions}
                    modal={false}
                    bodyStyle={{overflow: 'auto'}}
                    open={this.state.dialogOpen}
                    autoDetectWindowHeight={true}
                    onRequestClose={this.handleClose}>
                    <Card className={'emailMagCard'}>
                        <CardMedia overlay={<CardTitle subtitle={this.state.dialog.summary}/>}>
                            <div style={{height: '200px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url(images/' + Global.imageMap[this.state.dialog.publisher_id] + ')'}}>
                            </div>
                        </CardMedia>
                        <CardText expandable={false} style={{height: '50px'}}>
                            <p className="magprice">{this.state.dialog.price ? '$' + this.state.dialog.price : ''}</p>
                            <p className="magdate">{m(this.state.dialog.date).format('MMM D, YYYY')}</p>
                        </CardText>

                        <Fieldset title="Sender's Name" style={{margin: '10px'}}>
                            <TextField
                                hintText="Your name..."
                                ref="username"
                                fullWidth={true}
                                errorText={this.state.sendernameerror}
                            />
                        </Fieldset>
                        <Fieldset title="Email Address" style={{margin: '10px'}}>
                            <TextField
                                ref="useremail"
                                hintText="Enter a valid email address..."
                                fullWidth={true}
                                errorText={this.state.senderemailerror}
                            />
                        </Fieldset>
                        <Fieldset title="Message (optional)" style={{margin: '10px'}}>
                            <TextField
                                ref="message"
                                hintText="Submit a message..."
                                fullWidth={true}
                                multiLine={true}
                            />
                        </Fieldset>
                    </Card>
                </Dialog>
            </section>
        )
    }

});

module.exports = Magazines;