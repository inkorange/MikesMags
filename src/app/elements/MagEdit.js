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
const MenuItem =        require('material-ui/lib/menus/menu-item');

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
            magiderror: '',
            priceerror: '',
            dateerror: '',
            puberror: {},
            conditionerror: {}
        }
    },

    deleteRecord: function() {

    },

    update: function() {
        //console.log(this.refs.publisher, this.refs.publisher.state.value, this.refs.condition.state.value);
        var apiURL = Global.apiEndpoint;
        var mdate = m(this.state.magdata.date);
        var updatedValues = {
            id: this.state.magdata.id,
            publisher_id: this.state.magdata.publisher_id,
            summary: this.state.magdata.summary,
            date: mdate.format("YYYY-MM-DD"),
            image: this.state.magdata.image,
            price: this.state.magdata.price,
            condition: this.state.magdata.condition
        };
        var _this = this;

        //console.log('updated values: ', updatedValues);

        if( updatedValues.id != '' &&
            updatedValues.price != '' &&
            updatedValues.date != "" &&
            updatedValues.publisher_id != 0 &&
            updatedValues.condition != ""
        ) {
            $.when(
                $.post(apiURL + 'updateRecord.php', updatedValues)
            ).done(function (data) {
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
                        },
                        magiderror: "",
                        priceerror: "",
                        dateerror: {},
                        puberror: {},
                        conditionerror: {}
                    });
                })
                .fail(function () {
                    console.log('save failed.');
                });
        } else {
            this.setState({
                magiderror: updatedValues.id == "" ? "The ID field is required." : "",
                priceerror: updatedValues.price == "" ? "The price is required." : "",
                dateerror: updatedValues.date == "" ? "The date field is required." : "",
                puberror: updatedValues.publisher_id == "0" ? {borderColor:'red'} : {},
                conditionerror: updatedValues.condition == "" ? {borderColor:'red'} : {}
            });
        }
    },

    cancelEdit: function() {
        this.replaceState(this.getInitialState());
    },

    updateMagazine: function(e,pos, magid) {
        this.setState({
            magdata: $.extend(this.state.magdata, {publisher_id: magid})
        });
    },

    updateCondition: function(e,pos, condition) {
        this.setState({
            magdata: $.extend(this.state.magdata, {condition: condition})
        });
    },

    updateDate: function(e) {
        var datestr = $(e.target).val();
        this.setState({
            magdata: $.extend(this.state.magdata, {date: datestr})
        });
    },

    updateID: function(e) {
        var idstr = $(e.target).val();
        this.setState({
            magdata: $.extend(this.state.magdata, {id: idstr})
        });
    },

    updateSummary: function(e) {
        var summarystr = $(e.target).val();
        this.setState({
            magdata: $.extend(this.state.magdata, {summary: summarystr})
        });
    },

    updatePrice: function(e) {
        var price = $(e.target).val();
        this.setState({
            magdata: $.extend(this.state.magdata, {price: price})
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
            magdata: $.extend(this.state.magdata, data),
            magiderror: "",
            priceerror: "",
            dateerror: "",
            puberror: {},
            conditionerror: {}
        });
    },

    componentDidMount: function() {
        Store.subscribe('clickededit', this.ApplyClickedData);
    },

    render() {

        var magOptions = [];
        this.props.magItems.map(function(option,key) {
            magOptions.push(<MenuItem value={option.payload} key={key} primaryText={option.text}/>);
        });

        var conditionOptions = [];
        this.props.magConditions.map(function(option,key) {
            conditionOptions.push(<MenuItem value={option.payload} key={key} primaryText={option.text}/>);
        });

        const ColumnOne = (
            <div>
                <Fieldset title="Magazine ID">
                <TextField
                    hintText="Add Custom MagID..."
                    fullWidth={true}
                    value={this.state.magdata.id}
                    onChange={this.updateID}
                    errorText={this.state.magiderror}
                />
                </Fieldset>
                <Fieldset title="Select Magazine Publisher">
                    <DropDownMenu
                        autoWidth={true}
                        style={{width: '100%', marginLeft: '-20px'}}
                        value={this.state.magdata.publisher_id}
                        onChange={this.updateMagazine}
                        underlineStyle={this.state.puberror}>
                        {magOptions}
                    </DropDownMenu>
                </Fieldset>

                <Fieldset title="Magazine Date (YYYY-MM-DD)">
                    <TextField
                        value={this.state.magdata.date}
                        onChange={this.updateDate}
                        hintText="Select date..."
                        fullWidth={true}
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
                        value={this.state.magdata.summary}
                        onChange={this.updateSummary}
                        ref="summary" />
                </Fieldset>

                <Fieldset title="Pricing">
                    <TextField
                        hintText="Add Price..."
                        fullWidth={true}
                        value={this.state.magdata.price}
                        onChange={this.updatePrice}
                        errorText={this.state.priceerror}
                        ref="price" />
                </Fieldset>

                <Fieldset title="Condition">
                    <DropDownMenu
                        style={{width:'100%', marginLeft: '-20px'}}
                        value={this.state.magdata.condition}
                        onChange={this.updateCondition}
                        underlineStyle={this.state.conditionerror} >
                        {conditionOptions}
                    </DropDownMenu>
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
                            <FlatButton onTouchTap={this.cancelEdit} secondary={true} label="Cancel" />
                        </div>
                    )}
                    columnTwoStyle={{textAlign: 'right'}}
                />
            </Paper>
        )
    }

});

module.exports = MagEdit;