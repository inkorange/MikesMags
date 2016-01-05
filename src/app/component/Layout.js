import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'

// elements
const TextField = require('material-ui/lib/text-field');
const SelectField = require('material-ui/lib/select-field');
const DropDownMenu =    require('material-ui/lib/drop-down-menu');
const MenuItem =        require('material-ui/lib/menus/menu-item');

// model
import Store from '../models/Store';
import Global from '../models/Global';

const Layout = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    mixins: [ History ],

    getInitialState: function() {
        return {
            filter: {
                search: '',
                magid: 0
            }
        };
    },
    
    getDefaultProps: function () {
        return { 

        };
    },

    componentDidMount: function() {
        this.setState({
            filter: Store.getStore('updatefilter')
        });
    },

    updateSearch: function(e) {
        var searchString = $(e.target).val();
        this.setState({
            filter: $.extend(this.state.filter, {search: searchString})
            }, () => Store.setStore('updatefilter', this.state.filter, {persist: true})
        );
    },

    updateMagazine: function(e,pos, magid) {
        this.setState({
                filter: $.extend(this.state.filter, {magid: magid})
            }, () => Store.setStore('updatefilter', this.state.filter, {persist: true})
        );

    },

    render() {

        let magItems = Global.magazines;

        var magOptions = [];
        magItems.map(function(option,key) {
            magOptions.push(<MenuItem value={option.payload} key={key} primaryText={option.text}/>);
        });

        return (
            <article className="MainLayout">
                <header>
                    <img src="images/mikesmagslogo.svg" />
                    <nav>
                        <div>
                        <TextField
                            hintText="Narrow Your Search..."
                            value={this.state.filter.search}
                            onChange={this.updateSearch}
                            style={{marginRight: '20px'}}
                        />
                        <DropDownMenu
                            onChange={this.updateMagazine}
                            style={{height: '45px'}}
                            value={this.state.filter.magid}
                        >
                            {magOptions}
                        </DropDownMenu>
                        </div>
                    </nav>
                </header>
                {this.props.children}
            </article>
        )
    }
 
});

module.exports = Layout;