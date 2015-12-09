import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';
import {Aggregation} from '../models/DataTransformer';

// elements
const StatsGraph = require('./StatsGraph');
const StatItem = require('./StatItem');

const PlayerStats = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            data: [],
            show: false,
            aggregatedData: [],
            graphData: null
        }
    },

    /*
    created plugin adapters to create new statistics within the data model.
    easily plug and play different converters based on sport, team.
     */
    avgFn: {
        label: 'AVG',
        calcFn: function(d) {
            return (d.H/d.AB).toFixed(3)*1;
        }
    },

    opsFn: {
        label: 'OPS',
        calcFn: function(d) {
            var dividen = d.AB * (d.H + d.BB + d.HBP) + d.TB * (d.AB + d.BB + d.SF + d.HBP);
            var divisor = d.AB * (d.AB + d.BB + d.SF + d.HBP);
            return (dividen / divisor).toFixed(3)*1;
        }
    },

    /*
    Player was clicked and this function is called to build the model and set the component's state with
    that data, triggering a view refresh.
     */
    renderData: function(data) {
        var startkey = Store.getStore('statkey');
        var pdataAgg = Aggregation.getAggregatedStats(data, [this.avgFn, this.opsFn]);
        var statHash = Aggregation.convertToHash(data, [this.avgFn, this.opsFn]);
        this.setState({
            aggregatedData: pdataAgg,
            data: statHash,
            show: true
        },() => this.addToGraph(startkey ? startkey : 'AVG', true));
    },

    /*
    Once the data state is set, this callback is executed to draw the D3 Linegraph
    This function is also added to each StatItem to be called when that StatItem is clicked form the UI.
     */
    addToGraph: function(key) {
            var extractedStat = Aggregation.extractStat(this.state.data, key);
            Store.setStore('statkey', key);
            this.setState({
               graphData: extractedStat
            });
    },

    componentDidMount: function() {
        Store.subscribe("displayPlayerData", this.renderData);
    },

    render() {
        var dataObj = this.state.aggregatedData;
        var _this = this;
        return (
            <section className="PlayerStats" data-show={this.state.show}>
                <article className="PlayerHeader">
                    {(this.state.data[0]) &&
                        <div>
                            <img className="playerpic" src={this.state.data[0].playerImage} />
                            <img className="teampic" src={this.state.data[0].teamImage} />
                        </div>
                    }
                    <h3>
                        {this.state.data[0] ? this.state.data[0].fullName : ''}<em>{this.state.data[0] ? this.state.data[0].team : ''}</em>
                    </h3>
                </article>

                <StatsGraph graphData={this.state.graphData} />
                <article className="TotalStats">
                    <h1>Aggregated Stats</h1>
                    <p>Click a stat below to graph the game by game aggregation to the chart.</p>
                    <section className="stat_holder">
                        {Object.keys(dataObj).map(function (key) {
                                return (
                                    <StatItem
                                        key={key}
                                        clickFn={_this.addToGraph}
                                        data={dataObj[key]}
                                        label={key}
                                        show={key === 'AVG' ? true : false}
                                    />
                                )
                            })
                        }
                    </section>
                </article>
            </section>
        )
    }

});

module.exports = PlayerStats;