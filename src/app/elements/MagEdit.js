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
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
const DropDownMenu =    require('material-ui/lib/drop-down-menu');
const FontIcon = require('material-ui/lib/font-icon');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');


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
                selected_magid: 0,
                price: '',
                condition: '',
                selected_condition: 0
            }
        }
    },

    _deleteRecord: function() {

    },

    update: function() {

    },

    applyValues: function() {
        this.refs.datePicker.setDate(this.state.magdata.date);
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

        let magItems = [
            { payload: '0', text: 'All Magazines' },
            { payload: '1', text: 'Life' },
            { payload: '2', text: 'Woman\'s Day' },
            { payload: '3', text: 'Playboy' }
        ];

        let magConditions = [
            { payload: '0', text: 'Mint' },
            { payload: '1', text: 'Excellent' },
            { payload: '2', text: 'Very Good' },
            { payload: '3', text: 'Good' }
        ];
        const ColumnOne = (
            <div>
                <Fieldset title="Select Magazine Publisher">
                    <DropDownMenu
                        autoWidth={true}
                        menuItems={magItems}
                        style={{width: '100%'}}
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
                        value={this.state.magdata.summary}
                        fullWidth={true}
                        multiLine={true}
                        ref="summary" />
                </Fieldset>

                <Fieldset title="Pricing">
                    <TextField
                        hintText="Add Magazine Name..."
                        value={this.state.magdata.price}
                        fullWidth={true}
                        ref="price" />
                </Fieldset>

                <Fieldset title="Condition">
                    <DropDownMenu
                        menuItems={magConditions}
                        style={{width:'100%'}}
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
                        <FlatButton onTouchTap={this._deleteRecord} secondary={true} label="Delete" labelPosition="after">
                            <FontIcon style={{top: '6px',marginRight: '-5px'}} className="remove-icon material-icons" color={'red'}>cancel</FontIcon>
                        </FlatButton>
                    )}
                    columnTwo={(
                        <div>
                            <FlatButton onTouchTap={this._applyFilter} secondary={true} label="Add/Update" />
                            <FlatButton onTouchTap={this._cancelFilter} secondary={true} label="Cancel" />
                        </div>
                    )}
                    columnTwoStyle={{textAlign: 'right'}}
                />
            </Paper>
        )
    }

});

module.exports = MagEdit;