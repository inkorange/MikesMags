import React from 'react'
import { render } from 'react-dom'

// model
import Store from '../models/Store';

const StatItem = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            data: {},
            label: '',
            show: false
        }
    },

    clickMetric: function() {
        $('.StatItem').attr('data-show', false);
        /*
        when the individual stat item is clicked, we will pass through the data to the configured click
        function when this component was instantiated (from PlayerState.js).
         */
        this.setState({
            show: !this.state.show
        },
            () => this.props.clickFn(this.state.label, this.state.show)
        );
    },

    componentDidMount: function() {
        this.setState({
           label: this.props.label,
           show: this.props.show
        });
    },

    // simply draws each aggregated stat on the bottom of the page.

    render() {
        return (
            <div className="StatItem" onClick={this.clickMetric} data-show={this.state.show}>
                <label>{this.props.label}</label>
                <em>{this.props.data}</em>
            </div>
        )
    }

});

module.exports = StatItem;