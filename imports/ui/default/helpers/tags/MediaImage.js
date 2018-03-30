import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import Media from '/imports/collections/Media/Media';

/**
 * image tag use media collection
 */
export class ImageTag extends Component {
    static propTypes = {
        media: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        alt: PropTypes.string
    };

    render() {
        const mediaId = this.props.media;
        const media = Media.findOne(mediaId);
        let mediaLink = media && media.link() || false;
        if (!mediaLink) {
            mediaLink = Meteor.absoluteUrl('img/avatars/1.jpg');
        }

        let className = 'rounded';
        if (this.props.className) {
            className = this.props.className;
        }

        return (
            <img src={mediaLink} id={this.props.id} className={className} alt={this.props.alt}
                 style={this.props.style}/>
        );
    }
}
