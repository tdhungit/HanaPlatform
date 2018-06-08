import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Select, {Async} from 'react-select';

import {ImageTag} from '../tags/MediaImage';
import Settings from '/imports/collections/Settings/Settings';
import {AppListStrings} from '/imports/common/AppListStrings';

import 'react-select/dist/react-select.css';
import {utilsHelper} from '../utils/utils';

/**
 * tag input select box with options is app list strings, array or object
 */
export class SelectHelper extends Component {
    renderOptions(options) {
        if (typeof options === 'undefined') {
            return [];
        }

        if (typeof options === 'string') {
            options = Settings.getListStrings(options);
        }

        if (options.constructor === Array) {
            return options.map((option) => {
                if (option.value && option.name) {
                    return (
                        <option key={option.value} value={option.value}>{option.name}</option>
                    );
                } else if (option._id && option.name) {
                    return (
                        <option key={option._id} value={option._id}>{option.name}</option>
                    );
                } else {
                    return (
                        <option key={option} value={option}>{option}</option>
                    );
                }
            });
        } else {
            let optionsFixed = [];
            for (let value in options) {
                optionsFixed.push({
                    name: options[value],
                    value: value
                })
            }
            return optionsFixed.map((option) => {
                return (
                    <option key={option.value} value={option.value}>{option.name}</option>
                );
            });
        }
    }

    render() {
        const props = utilsHelper.objectWithoutProperties(this.props, [
            'type',
            'options'
        ]);

        return (
            <Input type="select" {...props}>
                {!this.props.required ? <option value="">{this.props.placeholder}</option> : null}
                {this.renderOptions(this.props.options)}
            </Input>
        );
    }
}

/**
 * as select but use select2 lib
 */
export class Select2Helper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
    }

    getOptions(options) {
        if (typeof options === 'string') {
            const appListStrings = Settings.getSettings('AppListStrings', options);
            if (appListStrings && appListStrings.value) {
                options = JSON.parse(appListStrings.value);
            } else if (AppListStrings[options]) {
                options = AppListStrings[options];
            } else {
                return [];
            }
        }

        if (options.constructor === Array) {
            if (options[0] && options[0].value && options[0].label) {
                return options;
            }

            let optionsFixed = [];
            options.map((option) => {
                if (option._id && option.name) {
                    optionsFixed.push({
                        value: option._id,
                        label: option.name
                    });
                } else {
                    optionsFixed.push({
                        value: option,
                        label: option
                    });
                }
            });
            return optionsFixed;
        }

        let optionsFixed = [];
        for (let value in options) {
            optionsFixed.push({
                value: value,
                label: options[value]
            })
        }
        return optionsFixed;
    }

    loadOptions(input, cb) {
        const {loadOptions} = this.props;
        loadOptions && loadOptions(input, cb);
    }

    handleChange(selectedOption) {
        const {name, multi, onChange} = this.props;
        let value = selectedOption && selectedOption.value || '';
        if (multi) {
            value = [];
            _.each(selectedOption, (selected) => {
                value.push(selected.value);
            });
        }

        const event = {
            selectedOption: selectedOption,
            target: {
                name: name,
                type: 'select',
                value: value
            }
        };

        this.setState({value});
        onChange && onChange(event);
    }

    renderOptionsImg(option) {
        let img = <img src={Meteor.absoluteUrl('img/avatars/1.jpg')}
                       className="rounded"
                       style={{width: 24, height: 24}}/>;

        if (option.media) {
            img = <ImageTag media={option.media}
                            style={{width: 24, height: 24}}/>
        }

        return (
            <div title={option.label}>
                {img}&nbsp;
                <span>{option.label}</span>
            </div>
        );
    }

    render() {
        let optionRenderer = this.props.optionRenderer;
        let valueRenderer = this.props.valueRenderer;
        const {async, name, value, placeholder,
            options, imgOption, multi, onValueClick} = this.props;

        let autoload = this.props.autoload;
        if (typeof autoload === 'undefined') {
            autoload = true;
        }

        if (imgOption) {
            optionRenderer = this.renderOptionsImg;
            valueRenderer = this.renderOptionsImg;
        }

        if (async) {
            return (
                <Async name={name} placeholder={placeholder}
                       value={value}
                       multi={multi || false}
                       onChange={this.handleChange}
                       loadOptions={this.loadOptions}
                       autoload={autoload}
                       onValueClick={onValueClick}
                       cache={false}

                       onCloseResetsInput={false}
                       optionRenderer={optionRenderer}
                       valueRenderer={valueRenderer}/>
            );
        } else {
            return (
                <Select name={name} placeholder={placeholder}
                        value={value}
                        multi={multi || false}
                        onChange={this.handleChange}
                        onValueClick={onValueClick}
                        options={this.getOptions(options)}
                        optionRenderer={optionRenderer}
                        valueRenderer={valueRenderer}/>
            );
        }
    }
}

/**
 * a group select box
 */
export class SelectGroupHelper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            active: {
                label: '',
                selected: ''
            },
            text: ''
        }
    }

    componentWillMount() {
        this.state.active.label = this.props.label;
        if (this.props.value && this.props.value.label && this.props.value.selected) {
            this.state.active = {
                label: this.props.items[this.props.value.selected].label || this.props.value.selected,
                selected: this.props.value.selected
            };

            this.state.text = this.props.value.text
        }
    }

    onItemChange(item) {
        let active = {
            label: item.label || item.value,
            selected: item.value
        };
        this.setState({active: active});

        if (this.props.onItemChange) {
            this.props.onItemChange(item);
        }
    }

    onItemDefault() {
        this.setState({
            active: {
                label: this.props.label,
                selected: ''
            },
            text: ''
        });

        if (this.props.onRemove) {
            this.props.onRemove();
        }
    }

    onInputChange(event) {
        this.setState({text: event.target.value});

        if (this.props.onChange) {
            const eventChange = {
                selectedItem: this.state.active,
                target: {
                    name: this.props.name,
                    type: 'selectgroup',
                    value: {
                        selected: this.state.active.selected,
                        text: event.target.value
                    }
                }
            };

            this.props.onChange(eventChange);
        }
    }

    renderDropdownItem() {
        let dropdownItem = [];
        for (let selected in this.props.items) {
            let item = this.props.items[selected];
            dropdownItem.push(
                <DropdownItem key={selected}
                              onClick={this.onItemChange.bind(this, item)}>
                    {item.icon ? <i className={item.icon}/> : null}
                    {item.label}
                </DropdownItem>
            );
        }

        return dropdownItem;
    }

    render() {
        const {first, name, placeholder, icon} = this.props;

        return (
            <InputGroup>
                {first ?
                    <Input type="text"
                           name={name}
                           disabled={!this.state.active.selected}
                           placeholder={placeholder}
                           value={this.state.text}
                           onChange={this.onInputChange.bind(this)}/> : null}
                <InputGroupAddon addonType="prepend">
                    <ButtonDropdown isOpen={this.state.isOpen}
                                    toggle={() => {
                                        this.setState({isOpen: !this.state.isOpen});
                                    }}>
                        <DropdownToggle caret color="gray-200">
                            <i className={icon} /> {this.state.active.label}
                            </DropdownToggle>
                        <DropdownMenu
                            className={this.state.isOpen ? "show" : ""}>
                            {this.renderDropdownItem()}
                        </DropdownMenu>
                    </ButtonDropdown>
                </InputGroupAddon>
                {!first ?
                    <Input type="text"
                           name={name}
                           disabled={!this.state.active.selected}
                           placeholder={placeholder}
                           value={this.state.text}
                           onChange={this.onInputChange.bind(this)}/> : null}
                <Button type="button" color="warning"
                        onClick={this.onItemDefault.bind(this)}>
                    <i className="fa fa-remove"/>
                </Button>
            </InputGroup>
        );
    }
}

/**
 * get label of select box
 */
export class SelectValue extends Component {
    render() {
        const {options, value} = this.props;

        if (typeof options === 'undefined') {
            return <span>{value}</span>
        }

        if (typeof options === 'string') {
            const setting = Settings.getSettings('AppListStrings', options);
            if (setting && setting.value) {
                const appListString = JSON.parse(setting.value);
                if (appListString[value]) {
                    return <span>{appListString[value]}</span>
                }

                return <span>{value}</span>;
            } else if (AppListStrings[options]) {
                const appListString = AppListStrings[options];
                if (appListString[value]) {
                    return <span>{appListString[value]}</span>
                }

                return <span>{value}</span>;
            }
        }

        if (options[value]) {
            return <span>{options[value]}</span>;
        }

        for (let idx in options) {
            let option = options[idx];
            if (option._id && option._id === value) {
                return <span>{option.name}</span>;
            }

            if (option.value && option.label && option.value === value) {
                return <span>{option.label}</span>;
            }
        }

        return <span>{value}</span>;
    }
}
