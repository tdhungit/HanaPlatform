import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';

/**
 * a text editor input. user Draft editor
 */
export class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.focus = () => this.editor.focus();
        // this.onChange = (editorState) => this.setState({editorState});
        this.onChange = this._onChange.bind(this);
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    componentWillMount() {
        if (this.props.value) {
            const blocksFromHTML = convertFromHTML(this.props.value);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );

            this.state.editorState = EditorState.createWithContent(state);
        }
    }

    _onChange(editorState) {
        this.setState({editorState});
        const contentState = editorState.getCurrentContent();
        const contentRaw = convertToRaw(contentState);
        const contentHTML = stateToHTML(contentState);
        const event = {
            editorState: editorState,
            contentRaw: contentRaw,
            contentHTML: contentHTML,
            target: {
                name: this.props.name,
                type: 'texteditor',
                value: contentHTML
            }
        };
        this.props.onChange(event);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        return (
            <div className={'TextEditor ' + (this.props.className || '')}>
                <BlockStyleControls
                    editorState={this.state.editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={this.state.editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className="TextEditorContainer">
                    <Editor editorState={this.state.editorState} placeholder={this.props.placeholder}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            ref={(ref) => this.editor = ref}
                            spellCheck={true}/>
                </div>
            </div>
        );
    }
}

class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'TextEditor-styleButton';
        if (this.props.active) {
            className += ' TextEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="TextEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

let INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    let currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="TextEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'TextEditor-blockquote';
        default:
            return null;
    }
}
