import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';
import {Aggregation} from '../models/DataTransformer';

// elements
const LineChart = require('react-d3').LineChart;

const StatsGraph = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            data: [],
            show: false,
            width: 400
        }
    },

    _bind: function() {
        var _this = this;
        /*
        every time we re-size the screen, we need to reset the LineChart width state, forcing a refresh.
         */
        $( window ).resize(function() {
            _this.setState({width: $('.GameByGame').width() });
        } );
    },

    componentDidMount: function() {
        this.setState({width: $('.GameByGame').width() });
        this._bind();
    },

    render() {
        var lineData = [];
        if(this.props.graphData) {
            lineData.push(this.props.graphData);
        }
        //console.log('lineData: ', lineData, this.state.width);

        return (
                <article className="GameByGame">
                    <h1>Game by Game Trends | {lineData.length ? lineData[0].name : 'Select a Stat below...'}</h1>
                    <LineChart
                        legend={false}
                        data={lineData}
                        width={this.state.width}
                        height={300}
                        viewBoxObject={{
                            x: 0,
                            y: 0,
                            width: this.state.width,
                            height: 300
                        }}
                        yAxisLabel={lineData.length ? lineData[0].name : ''}
                        xAxisLabel="Games Played"
                        gridHorizontal={true}
                    />

                </article>
        )
    }

});

module.exports = StatsGraph;