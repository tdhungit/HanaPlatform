import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

/**
 * choose icon from simple icon or awesome icon
 */
export class SelectSimpleLineIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            onClick
        } = this.props;

        return (
            <Row className="helpers-SelectSimpleLineIcon text-center">

                <Col xs="6" sm="4" md="3">
                    <i className="icon-user icons font-2xl d-block mt-4" onClick={onClick}></i>icon-user
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-people icons font-2xl d-block mt-4" onClick={onClick}></i>icon-people
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-user-female icons font-2xl d-block mt-4" onClick={onClick}></i>icon-user-female
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-user-follow icons font-2xl d-block mt-4" onClick={onClick}></i>icon-user-follow
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-user-following icons font-2xl d-block mt-4" onClick={onClick}></i>icon-user-following
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-user-unfollow icons font-2xl d-block mt-4" onClick={onClick}></i>icon-user-unfollow
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-login icons font-2xl d-block mt-4" onClick={onClick}></i>icon-login
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-logout icons font-2xl d-block mt-4" onClick={onClick}></i>icon-logout
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-emotsmile icons font-2xl d-block mt-4" onClick={onClick}></i>icon-emotsmile
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-phone icons font-2xl d-block mt-4" onClick={onClick}></i>icon-phone
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-call-end icons font-2xl d-block mt-4" onClick={onClick}></i>icon-call-end
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-call-in icons font-2xl d-block mt-4" onClick={onClick}></i>icon-call-in
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-call-out icons font-2xl d-block mt-4" onClick={onClick}></i>icon-call-out
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-map icons font-2xl d-block mt-4" onClick={onClick}></i>icon-map
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-location-pin icons font-2xl d-block mt-4" onClick={onClick}></i>icon-location-pin
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-direction icons font-2xl d-block mt-4" onClick={onClick}></i>icon-direction
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-directions icons font-2xl d-block mt-4" onClick={onClick}></i>icon-directions
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-compass icons font-2xl d-block mt-4" onClick={onClick}></i>icon-compass
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-layers icons font-2xl d-block mt-4" onClick={onClick}></i>icon-layers
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-menu icons font-2xl d-block mt-4" onClick={onClick}></i>icon-menu
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-list icons font-2xl d-block mt-4" onClick={onClick}></i>icon-list
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-options-vertical icons font-2xl d-block mt-4" onClick={onClick}></i>icon-options-vertical
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-options icons font-2xl d-block mt-4" onClick={onClick}></i>icon-options
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-down icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-down
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-left icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-left
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-right icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-right
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-up icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-up
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-up-circle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-up-circle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-left-circle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-left-circle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-right-circle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-right-circle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-arrow-down-circle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-arrow-down-circle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-check icons font-2xl d-block mt-4" onClick={onClick}></i>icon-check
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-clock icons font-2xl d-block mt-4" onClick={onClick}></i>icon-clock
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-plus icons font-2xl d-block mt-4" onClick={onClick}></i>icon-plus
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-close icons font-2xl d-block mt-4" onClick={onClick}></i>icon-close
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-trophy icons font-2xl d-block mt-4" onClick={onClick}></i>icon-trophy
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-screen-smartphone icons font-2xl d-block mt-4" onClick={onClick}></i>icon-screen-smartphone
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-screen-desktop icons font-2xl d-block mt-4" onClick={onClick}></i>icon-screen-desktop
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-plane icons font-2xl d-block mt-4" onClick={onClick}></i>icon-plane
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-notebook icons font-2xl d-block mt-4" onClick={onClick}></i>icon-notebook
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-mustache icons font-2xl d-block mt-4" onClick={onClick}></i>icon-mustache
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-mouse icons font-2xl d-block mt-4" onClick={onClick}></i>icon-mouse
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-magnet icons font-2xl d-block mt-4" onClick={onClick}></i>icon-magnet
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-energy icons font-2xl d-block mt-4" onClick={onClick}></i>icon-energy
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-disc icons font-2xl d-block mt-4" onClick={onClick}></i>icon-disc
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-cursor icons font-2xl d-block mt-4" onClick={onClick}></i>icon-cursor
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-cursor-move icons font-2xl d-block mt-4" onClick={onClick}></i>icon-cursor-move
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-crop icons font-2xl d-block mt-4" onClick={onClick}></i>icon-crop
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-chemistry icons font-2xl d-block mt-4" onClick={onClick}></i>icon-chemistry
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-speedometer icons font-2xl d-block mt-4" onClick={onClick}></i>icon-speedometer
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-shield icons font-2xl d-block mt-4" onClick={onClick}></i>icon-shield
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-screen-tablet icons font-2xl d-block mt-4" onClick={onClick}></i>icon-screen-tablet
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-magic-wand icons font-2xl d-block mt-4" onClick={onClick}></i>icon-magic-wand
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-hourglass icons font-2xl d-block mt-4" onClick={onClick}></i>icon-hourglass
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-graduation icons font-2xl d-block mt-4" onClick={onClick}></i>icon-graduation
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-ghost icons font-2xl d-block mt-4" onClick={onClick}></i>icon-ghost
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-game-controller icons font-2xl d-block mt-4" onClick={onClick}></i>icon-game-controller
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-fire icons font-2xl d-block mt-4" onClick={onClick}></i>icon-fire
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-eyeglass icons font-2xl d-block mt-4" onClick={onClick}></i>icon-eyeglass
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-envelope-open icons font-2xl d-block mt-4" onClick={onClick}></i>icon-envelope-open
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-envelope-letter icons font-2xl d-block mt-4" onClick={onClick}></i>icon-envelope-letter
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-bell icons font-2xl d-block mt-4" onClick={onClick}></i>icon-bell
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-badge icons font-2xl d-block mt-4" onClick={onClick}></i>icon-badge
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-anchor icons font-2xl d-block mt-4" onClick={onClick}></i>icon-anchor
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-wallet icons font-2xl d-block mt-4" onClick={onClick}></i>icon-wallet
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-vector icons font-2xl d-block mt-4" onClick={onClick}></i>icon-vector
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-speech icons font-2xl d-block mt-4" onClick={onClick}></i>icon-speech
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-puzzle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-puzzle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-printer icons font-2xl d-block mt-4" onClick={onClick}></i>icon-printer
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-present icons font-2xl d-block mt-4" onClick={onClick}></i>icon-present
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-playlist icons font-2xl d-block mt-4" onClick={onClick}></i>icon-playlist
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-pin icons font-2xl d-block mt-4" onClick={onClick}></i>icon-pin
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-picture icons font-2xl d-block mt-4" onClick={onClick}></i>icon-picture
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-handbag icons font-2xl d-block mt-4" onClick={onClick}></i>icon-handbag
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-globe-alt icons font-2xl d-block mt-4" onClick={onClick}></i>icon-globe-alt
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-globe icons font-2xl d-block mt-4" onClick={onClick}></i>icon-globe
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-folder-alt icons font-2xl d-block mt-4" onClick={onClick}></i>icon-folder-alt
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-folder icons font-2xl d-block mt-4" onClick={onClick}></i>icon-folder
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-film icons font-2xl d-block mt-4" onClick={onClick}></i>icon-film
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-feed icons font-2xl d-block mt-4" onClick={onClick}></i>icon-feed
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-drop icons font-2xl d-block mt-4" onClick={onClick}></i>icon-drop
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-drawer icons font-2xl d-block mt-4" onClick={onClick}></i>icon-drawer
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-docs icons font-2xl d-block mt-4" onClick={onClick}></i>icon-docs
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-doc icons font-2xl d-block mt-4" onClick={onClick}></i>icon-doc
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-diamond icons font-2xl d-block mt-4" onClick={onClick}></i>icon-diamond
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-cup icons font-2xl d-block mt-4" onClick={onClick}></i>icon-cup
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-calculator icons font-2xl d-block mt-4" onClick={onClick}></i>icon-calculator
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-bubbles icons font-2xl d-block mt-4" onClick={onClick}></i>icon-bubbles
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-briefcase icons font-2xl d-block mt-4" onClick={onClick}></i>icon-briefcase
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-book-open icons font-2xl d-block mt-4" onClick={onClick}></i>icon-book-open
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-basket-loaded icons font-2xl d-block mt-4" onClick={onClick}></i>icon-basket-loaded
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-basket icons font-2xl d-block mt-4" onClick={onClick}></i>icon-basket
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-bag icons font-2xl d-block mt-4" onClick={onClick}></i>icon-bag
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-action-undo icons font-2xl d-block mt-4" onClick={onClick}></i>icon-action-undo
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-action-redo icons font-2xl d-block mt-4" onClick={onClick}></i>icon-action-redo
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-wrench icons font-2xl d-block mt-4" onClick={onClick}></i>icon-wrench
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-umbrella icons font-2xl d-block mt-4" onClick={onClick}></i>icon-umbrella
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-trash icons font-2xl d-block mt-4" onClick={onClick}></i>icon-trash
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-tag icons font-2xl d-block mt-4" onClick={onClick}></i>icon-tag
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-support icons font-2xl d-block mt-4" onClick={onClick}></i>icon-support
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-frame icons font-2xl d-block mt-4" onClick={onClick}></i>icon-frame
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-size-fullscreen icons font-2xl d-block mt-4" onClick={onClick}></i>icon-size-fullscreen
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-size-actual icons font-2xl d-block mt-4" onClick={onClick}></i>icon-size-actual
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-shuffle icons font-2xl d-block mt-4" onClick={onClick}></i>icon-shuffle
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-share-alt icons font-2xl d-block mt-4" onClick={onClick}></i>icon-share-alt
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-share icons font-2xl d-block mt-4" onClick={onClick}></i>icon-share
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-rocket icons font-2xl d-block mt-4" onClick={onClick}></i>icon-rocket
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-question icons font-2xl d-block mt-4" onClick={onClick}></i>icon-question
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-pie-chart icons font-2xl d-block mt-4" onClick={onClick}></i>icon-pie-chart
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-pencil icons font-2xl d-block mt-4" onClick={onClick}></i>icon-pencil
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-note icons font-2xl d-block mt-4" onClick={onClick}></i>icon-note
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-loop icons font-2xl d-block mt-4" onClick={onClick}></i>icon-loop
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-home icons font-2xl d-block mt-4" onClick={onClick}></i>icon-home
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-grid icons font-2xl d-block mt-4" onClick={onClick}></i>icon-grid
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-graph icons font-2xl d-block mt-4" onClick={onClick}></i>icon-graph
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-microphone icons font-2xl d-block mt-4" onClick={onClick}></i>icon-microphone
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-music-tone-alt icons font-2xl d-block mt-4" onClick={onClick}></i>icon-music-tone-alt
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-music-tone icons font-2xl d-block mt-4" onClick={onClick}></i>icon-music-tone
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-earphones-alt icons font-2xl d-block mt-4" onClick={onClick}></i>icon-earphones-alt
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-earphones icons font-2xl d-block mt-4" onClick={onClick}></i>icon-earphones
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-equalizer icons font-2xl d-block mt-4" onClick={onClick}></i>icon-equalizer
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-like icons font-2xl d-block mt-4" onClick={onClick}></i>icon-like
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-dislike icons font-2xl d-block mt-4" onClick={onClick}></i>icon-dislike
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-start icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-start
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-rewind icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-rewind
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-play icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-play
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-pause icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-pause
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-forward icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-forward
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-control-end icons font-2xl d-block mt-4" onClick={onClick}></i>icon-control-end
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-volume-1 icons font-2xl d-block mt-4" onClick={onClick}></i>icon-volume-1
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-volume-2 icons font-2xl d-block mt-4" onClick={onClick}></i>icon-volume-2
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-volume-off icons font-2xl d-block mt-4" onClick={onClick}></i>icon-volume-off
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-calendar icons font-2xl d-block mt-4" onClick={onClick}></i>icon-calendar
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-bulb icons font-2xl d-block mt-4" onClick={onClick}></i>icon-bulb
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-chart icons font-2xl d-block mt-4" onClick={onClick}></i>icon-chart
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-ban icons font-2xl d-block mt-4" onClick={onClick}></i>icon-ban
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-bubble icons font-2xl d-block mt-4" onClick={onClick}></i>icon-bubble
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-camrecorder icons font-2xl d-block mt-4" onClick={onClick}></i>icon-camrecorder
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-camera icons font-2xl d-block mt-4" onClick={onClick}></i>icon-camera
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-cloud-download icons font-2xl d-block mt-4" onClick={onClick}></i>icon-cloud-download
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-cloud-upload icons font-2xl d-block mt-4" onClick={onClick}></i>icon-cloud-upload
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-envelope icons font-2xl d-block mt-4" onClick={onClick}></i>icon-envelope
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-eye icons font-2xl d-block mt-4" onClick={onClick}></i>icon-eye
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-flag icons font-2xl d-block mt-4" onClick={onClick}></i>icon-flag
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-heart icons font-2xl d-block mt-4" onClick={onClick}></i>icon-heart
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-info icons font-2xl d-block mt-4" onClick={onClick}></i>icon-info
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-key icons font-2xl d-block mt-4" onClick={onClick}></i>icon-key
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-link icons font-2xl d-block mt-4" onClick={onClick}></i>icon-link
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-lock icons font-2xl d-block mt-4" onClick={onClick}></i>icon-lock
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-lock-open icons font-2xl d-block mt-4" onClick={onClick}></i>icon-lock-open
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-magnifier icons font-2xl d-block mt-4" onClick={onClick}></i>icon-magnifier
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-magnifier-add icons font-2xl d-block mt-4" onClick={onClick}></i>icon-magnifier-add
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-magnifier-remove icons font-2xl d-block mt-4" onClick={onClick}></i>icon-magnifier-remove
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-paper-clip icons font-2xl d-block mt-4" onClick={onClick}></i>icon-paper-clip
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-paper-plane icons font-2xl d-block mt-4" onClick={onClick}></i>icon-paper-plane
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-power icons font-2xl d-block mt-4" onClick={onClick}></i>icon-power
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-refresh icons font-2xl d-block mt-4" onClick={onClick}></i>icon-refresh
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-reload icons font-2xl d-block mt-4" onClick={onClick}></i>icon-reload
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-settings icons font-2xl d-block mt-4" onClick={onClick}></i>icon-settings
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-star icons font-2xl d-block mt-4" onClick={onClick}></i>icon-star
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-symbol-female icons font-2xl d-block mt-4" onClick={onClick}></i>icon-symbol-female
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-symbol-male icons font-2xl d-block mt-4" onClick={onClick}></i>icon-symbol-male
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-target icons font-2xl d-block mt-4" onClick={onClick}></i>icon-target
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-credit-card icons font-2xl d-block mt-4" onClick={onClick}></i>icon-credit-card
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-paypal icons font-2xl d-block mt-4" onClick={onClick}></i>icon-paypal
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-tumblr icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-tumblr
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-twitter icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-twitter
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-facebook icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-facebook
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-instagram icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-instagram
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-linkedin icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-linkedin
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-pinterest icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-pinterest
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-github icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-github
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-gplus icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-gplus
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-reddit icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-reddit
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-skype icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-skype
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-dribbble icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-dribbble
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-behance icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-behance
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-foursqare icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-foursqare
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-soundcloud icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-soundcloud
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-spotify icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-spotify
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-stumbleupon icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-stumbleupon
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-youtube icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-youtube
                </Col>

                <Col xs="6" sm="4" md="3">
                    <i className="icon-social-dropbox icons font-2xl d-block mt-4" onClick={onClick}></i>icon-social-dropbox
                </Col>

            </Row>
        );
    }
}
