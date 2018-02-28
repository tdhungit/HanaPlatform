import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
// import PropTypes from 'prop-types';
import container from '/imports/common/Container';
import Media from '/imports/collections/Media/Media';

class ImageTagClass extends Component {
    render() {
        let mediaLink = this.props.src;
        if (!mediaLink) {
            mediaLink = Meteor.absoluteUrl('img/avatars/6.jpg');
        }

        let className = 'rounded';
        if (this.props.className) {
            className = this.props.className;
        }

        return (
            <img src={mediaLink} id={this.props.id} className={className} alt={this.props.alt} style={this.props.style}/>
        );
    }
}

const ImageTag = container((props, onData) => {
    const mediaId = props.media;
    let mediaLink = '';
    if (mediaId) {
        const subscription = Meteor.subscribe('media.detail', mediaId);
        if (subscription && subscription.ready()) {
            const media = Media.findOne(mediaId);
            if (media) {
                mediaLink = media.link();
            }
        }
    }
    onData(null, {
        src: mediaLink
    });
}, ImageTagClass);

export {
    ImageTag
};
