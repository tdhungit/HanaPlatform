import React, {Component} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {
    Input,
    Button
} from 'reactstrap';

import {t} from '../../../../common/Translation';
import {ImageTag} from '../tags/MediaImage';
import Medias from '../../../../collections/Medias/Medias';
import {ArrayFieldView} from './ArrayFieldHelper';
import {utilsHelper} from '../utils/utils';

/**
 * upload one image
 */
export class ImageInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        type: PropTypes.string,
        className: PropTypes.string,
        btnClass: PropTypes.string,
        btnColor: PropTypes.string,
        btnIcon: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        renderImages: PropTypes.object,
        renderUpload: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            uploadedId: ''
        };

        this.upload = this.upload.bind(this);
    }

    componentWillMount() {
        this.state.uploading = false;
        this.state.uploadedId = this.props.value || '';
    }

    upload(event) {
        const target = event.target;
        const file = target.files && target.files[0] || false;
        if (file) {
            Medias.upload(file, 'Local', () => {
                this.setState({uploading: true});
            }, (error, fileObj) => {
                this.setState({uploading: false});
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    this.setState({uploadedId: fileObj._id});
                    if (this.props.onChange) {
                        const eventOutput = {
                            target: {
                                name: this.props.name,
                                type: this.props.type,
                                value: this.state.uploadedId
                            }
                        };

                        this.props.onChange(eventOutput);
                    }
                }
            });
        }
    }

    renderUpload() {
        const {renderUpload, btnClass, btnColor, btnIcon} = this.props;

        if (renderUpload) {
            return renderUpload;
        }

        return (
            <div className="imageUploadContainer">
                <Button type="button" className={btnClass || ''} color={btnColor || 'secondary'}>
                    {this.state.uploading ? <i className="fa fa-refresh fa-spin"/> : <i className={btnIcon || 'fa fa-image'}/>}
                    <Input type="file" onChange={this.upload}/>
                </Button>
            </div>
        );
    }

    renderImages() {
        const renderImages = this.props.renderImages;
        if (renderImages) {
            return renderImages;
        }

        if (!this.state.uploadedId) {
            return null;
        }

        return (
            <ul className="imagePreview">
                <li>
                    <ImageTag media={this.state.uploadedId}/>
                    <Button type="button"
                            color="link"
                            className="remove text-danger"
                            onClick={() => this.setState({uploadedId: ''})}>
                        <i className="fa fa-remove"/>
                    </Button>
                </li>
            </ul>
        );
    }

    render() {
        const {className} = this.props;

        return (
            <div className={className || 'imagesInput'}>
                {this.renderUpload()}
                {this.renderImages()}
            </div>
        );
    }
}

/**
 * view image field
 */
export class ImageView extends Component {
    render() {
        return (
            <span></span>
        );
    }
}

/**
 * upload multiple images
 */
export class ImagesInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        type: PropTypes.string,
        className: PropTypes.string,
        btnClass: PropTypes.string,
        btnColor: PropTypes.string,
        btnIcon: PropTypes.string,
        value: PropTypes.array,
        onChange: PropTypes.func,
        renderImages: PropTypes.object,
        renderUpload: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            uploadedIds: []
        };

        this.upload = this.upload.bind(this);
    }

    componentWillMount() {
        this.state.uploading = false;
        this.state.uploadedIds = this.props.value || [];
    }

    upload(event) {
        const target = event.target;
        const files = target.files || [];

        let uploadedIds = this.state.uploadedIds;
        const length = files.length;
        let count = 0;
        _.each(files, (file) => {
            Medias.upload(file, 'Local', () => {
                this.setState({uploading: true});
            }, (error, fileObj) => {
                this.setState({uploading: false});
                count = count + 1;
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    uploadedIds.push(fileObj._id);
                }

                if (count === length) {
                    this.setState({uploadedIds: uploadedIds});
                    if (this.props.onChange) {
                        const eventOutput = {
                            target: {
                                name: this.props.name,
                                type: this.props.type,
                                value: this.state.uploadedIds
                            }
                        };

                        this.props.onChange(eventOutput);
                    }
                }
            });
        });
    }

    remove(removeMediaId) {
        let uploadedIds = this.state.uploadedIds;
        _.each(uploadedIds, (mediaId, i) => {
            if (removeMediaId === mediaId) {
                uploadedIds.splice(i, 1);
                return true;
            }
        });

        this.setState({uploadedIds: uploadedIds});
        if (this.props.onChange) {
            const eventOutput = {
                target: {
                    name: this.props.name,
                    type: this.props.type,
                    value: this.state.uploadedIds
                }
            };

            this.props.onChange(eventOutput);
        }
    }

    renderUpload() {
        const {renderUpload, btnClass, btnColor, btnIcon} = this.props;

        if (renderUpload) {
            return renderUpload;
        }

        return (
            <div className="imageUploadContainer">
                <Button type="button" className={btnClass || ''} color={btnColor || 'secondary'}>
                    {this.state.uploading ? <i className="fa fa-refresh fa-spin"/> : <i className={btnIcon || 'fa fa-image'}/>}
                    <Input type="file" onChange={this.upload}/>
                </Button>
            </div>
        );
    }

    renderImages() {
        const renderImages = this.props.renderImages;
        if (renderImages) {
            return renderImages;
        }

        return (
            <ul className="imagePreview">
                {this.state.uploadedIds.map((mediaId) => {
                    return (
                        <li key={mediaId}>
                            <ImageTag media={mediaId}/>
                            <Button type="button"
                                    color="link"
                                    className="remove text-danger"
                                    onClick={() => this.remove(mediaId)}>
                                <i className="fa fa-remove"/>
                            </Button>
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        const {className} = this.props;

        return (
            <div className={className || 'imagesInput'}>
                {this.renderUpload()}
                {this.renderImages()}
            </div>
        );
    }
}

/**
 * view multiple images field
 */
export class ImagesView extends Component {
    static propTypes = {
        value: PropTypes.array
    };

    renderRow(record) {
        const {fields} = this.props;

        let fieldsRender = [];
        _.each(fields, (field) => {
            fieldsRender.push(
                <div key={field}>
                    <ImageTag mediaId={record}/>
                </div>
            )
        });

        return fieldsRender;
    }

    render() {
        const {value} = this.props;

        return (
            <ArrayFieldView
                fields={false}
                value={value}
                renderRow={(record) => this.renderRow(record)}/>
        );
    }
}
