import React from 'react'
import { render } from 'react-dom'

// renders the left menu player component

const PlayerCard = React.createClass({
    render() {
        return (
            <article className="PlayerCard" data-key={this.props.datakey} onClick={this.props.clickFn}>
                <div className="player_pic" style={{backgroundImage: 'url('+this.props.data.image+')'}} />
                <h3>{this.props.data.name}</h3>
                <h4>{this.props.data.team}</h4>
            </article>
        )
    }
});

module.exports = PlayerCard;