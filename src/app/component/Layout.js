import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'

// elements
const TextField = require('material-ui/lib/text-field');
const SelectField = require('material-ui/lib/select-field');

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
    },

    updateSearch: function(e) {
        var searchString = $(e.target).val();
        this.setState({
            filter: $.extend(this.state.filter, {search: searchString})
            }, () => Store.setStore('updatefilter', this.state.filter)
        );
    },

    updateMagazine: function(e,magid, magobj) {
        this.setState({
                filter: $.extend(this.state.filter, {magid: magobj.payload})
            }, () => Store.setStore('updatefilter', this.state.filter)
        );

    },

    render() {

        let magItems = Global.magazines;

        return (
            <article className="MainLayout">
                <header>
                    <img src="images/mikesmagslogo.svg" />
                    <nav>
                        <div>
                        <TextField
                            hintText="Narrow Your Search..."
                            defaultValue={this.state.search}
                            onChange={this.updateSearch}
                            style={{marginRight: '20px'}}
                        />
                        <SelectField
                            style={{position: 'relative', top: '18px'}}
                            menuItems={magItems}
                            onChange={this.updateMagazine}
                        />
                        </div>
                    </nav>
                </header>
                {this.props.children}
            </article>
        )
    }
 
});

module.exports = Layout;