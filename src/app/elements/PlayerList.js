import React from 'react'
import { render } from 'react-dom'

// models
import Store from '../models/Store';

// elements
const PlayerCard = require('./PlayerCard');

/*
left nav container for each player name, used for selection to load the stats information on the main
content panel.
 */

const PlayerList = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            data: [],
            show: false
        }
    },

    buildPlayerMeta: function(data) {
        var playerData = {};
        /*
         since this is a prototype, and the player-specific meta data is not identified as such in the supplied
         model, I am using specific known obj positions to get the player's data (Name, team, images).
          */
        playerData.name = data[1];
        playerData.image = data[2];
        playerData.team = data[4];
        playerData.team_image = data[5];
        return playerData;
    },

    update: function(data) {
        this.setState({data: data});
    },

    componentDidMount: function() {
        /*
        subscribing to the playerdata object. When it is updated to the DataStore, it will execute the update
        callback.constructor
         */
        Store.subscribe('playerdata', this.update);
    },

    /*
    when a PlayerCard is clicked, this function is fired which sets the displayPlayerData data object
    in which all subscribers (PlayerState.js) will listen for a change and render the selected player's
    statistics.
    */
    togglePanel: function(a,b) {
        if($(a.currentTarget).attr('data-key')) {
            var pdata = this.state.data[$(a.currentTarget).attr('data-key') * 1];
            Store.setStore("displayPlayerData", pdata, 'launching');
            //console.log(pdata);
        }
        this.setState({show: !this.state.show});
    },

    render() {
        return (
            <section className="PlayerList" data-show={this.state.show}>
                <h3>Select a Player...</h3>
                <div className="trigger" onClick={this.togglePanel}></div>
                {this.state.data.map(function(pdata, key) {
                    return (
                        <PlayerCard clickFn={this.togglePanel} datakey={key} key={key} data={this.buildPlayerMeta(pdata.rows[0])} />
                    )
                }, this)}
            </section>
        )
    }

});

module.exports = PlayerList;