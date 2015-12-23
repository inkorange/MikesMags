import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';
import Global from '../models/Global';

// elements
const TextField = require('material-ui/lib/text-field');
const TwoColumnLayout = require('./TwoColumnLayout');
const Fieldset = require('./Fieldset');
const SelectField = require('material-ui/lib/select-field');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DropDownMenu =    require('material-ui/lib/drop-down-menu');
const FontIcon = require('material-ui/lib/font-icon');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');
import m from 'moment'

const MagEdit = React.createClass({
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
            magdata: {
                id: null,
                publisher_id: 0,
                summary: '',
                date: '',
                image: '',
                price: '',
                condition: ''
            },
            selected_magid: 0,
            selected_condition: 0
        }
    },

    deleteRecord: function() {

    },

    update: function() {
        //console.log(this.refs.publisher, this.refs.publisher.state.value, this.refs.condition.state.value);
        var apiURL = Global.apiEndpoint;
        var mdate = m(this.refs.datePicker.getDate());
        var updatedValues = {
            id: this.refs.id.getValue(),
            publisher_id: this.props.magItems[this.refs.publisher.state.selectedIndex].payload,
            summary: this.refs.summary.getValue(),
            date: mdate.format("YYYY-MM-DD"),
            image: this.state.magdata.image,
            price: this.refs.price.getValue(),
            condition: this.props.magConditions[this.refs.condition.state.selectedIndex].payload
        };
        var _this = this;

        $.when(
            $.post(apiURL + 'updateRecord.php', updatedValues)
        ).done(function(data) {
                Store.setStore('updated', {});
                // clear up data once saved.
                _this.setState({
                    magdata: {
                        id: null,
                        publisher_id: 0,
                        summary: '',
                        date: '',
                        image: '',
                        price: '',
                        condition: ''
                    }
                }, _this.applyValues);
            })
            .fail(function() {
                console.log('save failed.');
            });
    },

    applyValues: function() {
        this.refs.datePicker.setDate(this.state.magdata.date);
        this.refs.price.setValue(this.state.magdata.price);
        this.refs.summary.setValue(this.state.magdata.summary);
        this.refs.id.setValue(this.state.magdata.id);
        this.setState({
            selected_magid: this.getIndexofValue(this.props.magItems, this.state.magdata.publisher_id),
            selected_condition:  this.getIndexofValue(this.props.magConditions, this.state.magdata.condition)
        });
    },

    getIndexofValue: function(array, value) {
        var index = 0;
        array.map(function(val, key) {
            if(val.payload == value) {
                index = key;
            }
        });
        return index;
    },

    ApplyClickedData: function(data) {
        this.setState({
            magdata: $.extend(this.state.magdata, data)
        }, this.applyValues )
    },

    componentDidMount: function() {
        Store.subscribe('clickededit', this.ApplyClickedData);
    },

    render() {

        const ColumnOne = (
            <div>
                <Fieldset title="Magazine ID">
                <TextField
                    hintText="Add Custom MagID..."
                    fullWidth={true}
                    ref="id" />
                </Fieldset>
                <Fieldset title="Select Magazine Publisher">
                    <DropDownMenu
                        autoWidth={true}
                        menuItems={this.props.magItems}
                        style={{width: '100%', marginLeft: '-20px'}}
                        selectedIndex={this.state.selected_magid}
                        ref="publisher"
                    />
                </Fieldset>

                <Fieldset title="Magazine Date">
                    <DatePicker
                        ref="datePicker"
                        className="MagDatePicker"
                        hintText="Select date..."
                        mode="landscape"
                    />
                </Fieldset>
            </div>
        );
        const ColumnTwo = (
            <div>
                <Fieldset title="Magazine Summary">
                    <TextField
                        hintText="Add Magazine Summary..."
                        fullWidth={true}
                        multiLine={true}
                        ref="summary" />
                </Fieldset>

                <Fieldset title="Pricing">
                    <TextField
                        hintText="Add Price..."
                        fullWidth={true}
                        ref="price" />
                </Fieldset>

                <Fieldset title="Condition">
                    <DropDownMenu
                        menuItems={this.props.magConditions}
                        style={{width:'100%', marginLeft: '-20px'}}
                        selectedIndex={this.state.selected_condition}
                        ref="condition"
                    />
                </Fieldset>
            </div>
        );
        var header = this.state.magdata.id ? "Updating ID: " + this.state.magdata.id : "Create a New Magazine Record";
        return (
            <Paper className="MagEdit" zDepth={2}>

                <h3>{header}</h3>
                <TwoColumnLayout
                    columnOne={ColumnOne} columnOneWidth="50%"
                    columnTwo={ColumnTwo} columnTwoWidth="50%"
                />
                <TwoColumnLayout
                    columnOne={(
                        <FlatButton onTouchTap={this.deleteRecord} secondary={true} label="Delete" labelPosition="after">
                            <FontIcon style={{top: '6px',marginRight: '-5px'}} className="remove-icon material-icons" color={'red'}>cancel</FontIcon>
                        </FlatButton>
                    )}
                    columnTwo={(
                        <div>
                            <FlatButton onTouchTap={this.update} secondary={true} label="Add/Update" />
                            <FlatButton onTouchTap={this.cancelFilter} secondary={true} label="Cancel" />
                        </div>
                    )}
                    columnTwoStyle={{textAlign: 'right'}}
                />
            </Paper>
        )
    }

});

module.exports = MagEdit;