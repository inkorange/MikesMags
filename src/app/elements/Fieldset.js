import React from "react";

var mainPadding = 20;

const style = {
    border: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    label : {
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        margin: mainPadding + 'px' + ' 0 0 0',
        display: 'block',
        color: '#416d99',
        fontWeight: '200'
    }
};

var StylePropable = require('material-ui/lib/mixins/style-propable');

var Fieldset = React.createClass({

    mixins: [StylePropable], // making styling relative to this component instance

    getDefaultProps: function () {
        return {
            style: {}
        };
    },

    getInitialState: function() {
        return { };
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    render() {
        return (<fieldset style={this.mergeStyles(style, this.props.style)}>
                <label style={style.label}>{this.props.title}</label>
                {this.props.children}
            </fieldset>
        )
    }
});

module.exports = Fieldset;
