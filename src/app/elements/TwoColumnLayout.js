import React from 'react'
import { render } from 'react-dom'
var StylePropable = require('material-ui/lib/mixins/style-propable');

var mainPadding = 20;
const style = {
    display: '-webkit-box; display: -webkit-flex; display: flex',
    flexWrap: 'wrap',
    marginBottom: mainPadding + 'px',
    left: {
    width:'calc(50% - ' + mainPadding/2 + 'px)',
        marginRight:  mainPadding + 'px',
        textAlign: 'left'
    },
    right: {
        width:'calc(50% - ' + mainPadding/2 + 'px)',
            textAlign: 'left'
    }
};

const TwoColumnLayout = React.createClass({

    mixins: [StylePropable], // making styling relative to this component instance

    getDefaultProps: function () {
        return {
            columnOne: '',
            columnTwo: '',
            columnOneWidth: '50%',
            columnTwoWidth: '50%',
            columnOneStyle: {},
            columnTwoStyle: {}
        }
    },

    getInitialState: function () {
        return {
            styleLeft: style.left,
            styleRight: style.right
        }
    },

    render() {
        if(this.props.columnOneWidth) {
            Object.assign(this.state.styleLeft, {
                width: 'calc('+this.props.columnOneWidth+' - ' + mainPadding/2 + 'px)'
            });
        }
        if(this.props.columnTwoWidth) {
            Object.assign(this.state.styleRight, {
                width: 'calc('+this.props.columnTwoWidth+' - ' + mainPadding/2 + 'px)'
            });
        }

        var styleLeft = this.mergeStyles(this.state.styleLeft, this.props.columnOneStyle);
        var styleRight = this.mergeStyles(this.state.styleRight, this.props.columnTwoStyle);

        return (
            <section className="TwoColumnLayout" style={style}>
                <div style={styleLeft}>{this.props.columnOne}</div>
                <div style={styleRight}>{this.props.columnTwo}</div>
            </section>
        )
    }

});

module.exports = TwoColumnLayout;