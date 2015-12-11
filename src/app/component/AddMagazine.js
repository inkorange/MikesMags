import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

// elements

// model
import Store from '../models/Store';

const AddMagazine = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function () {
        return {

        };
    },

    componentDidMount: function() {
    },

    render() {

        return (
            <article className="MainLayout">
                <header>
                    <img src="images/mikesmagslogo.svg" />
                </header>

                <section className="addMagazineContent">
                    ADD MAGAZINE
                </section>
            </article>
        )
    }

});

module.exports = AddMagazine;