import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
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

import 'react-select/dist/react-select.css';

class SelectHelper extends Component {
    renderOptions(options) {
        if (typeof options == 'undefined') {
            return [];
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
        return (
            <Input type="select" name={this.props.name} id={this.props.id} onChange={this.props.onChange}
                   required={this.props.required} value={this.props.value}>
                <option value="">{this.props.placeholder}</option>
                {this.renderOptions(this.props.options)}
            </Input>
        );
    }
}

class Select2Helper extends Component {
    getOptions(options) {
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

    handleChange(selectedOption) {
        const event = {
            selectedOption: selectedOption,
            target: {
                name: this.props.name,
                type: 'select',
                value: selectedOption.value
            }
        };
        this.props.onChange(event);
    }

    renderOptionsImg(option) {
        let img = <img src={Meteor.absoluteUrl('img/avatars/1.jpg')} className="rounded" style={{width: 24, height: 24}}/>;
        if (option.media) {
            img = <ImageTag media={option.media} style={{width: 24, height: 24}}/>
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
        if (this.props.imgOption) {
            optionRenderer = this.renderOptionsImg;
            valueRenderer = this.renderOptionsImg;
        }
        if (this.props.async) {
            return (
                <Async name={this.props.name} placeholder={this.props.placeholder} value={this.props.value}
                       onChange={this.handleChange.bind(this)}
                       loadOptions={this.props.loadOptions}
                       optionRenderer={optionRenderer} valueRenderer={valueRenderer}/>
            );
        } else {
            return (
                <Select name={this.props.name} placeholder={this.props.placeholder} value={this.props.value}
                        onChange={this.handleChange.bind(this)}
                        options={this.getOptions(this.props.options)}
                        optionRenderer={optionRenderer} valueRenderer={valueRenderer}/>
            );
        }
    }
}

class SelectGroupHelper extends Component {
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
        if (this.props.value) {
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
                <DropdownItem key={selected} onClick={this.onItemChange.bind(this, item)}>
                    {item.icon ? <i className={item.icon}/> : null}
                    {item.label}
                </DropdownItem>
            );
        }

        return dropdownItem;
    }

    render() {
        return (
            <InputGroup>
                {this.props.first ? <Input type="text" name={this.props.name} disabled={this.state.active.selected ? false : true}
                                           placeholder={this.props.placeholder} value={this.state.text}
                                           onChange={this.onInputChange.bind(this)}/> : null}
                <InputGroupAddon addonType="prepend">
                    <ButtonDropdown isOpen={this.state.isOpen}
                                    toggle={() => {
                                        this.setState({isOpen: !this.state.isOpen});
                                    }}>
                        <DropdownToggle caret color="gray-200">{this.state.active.label}</DropdownToggle>
                        <DropdownMenu className={this.state.isOpen ? "show" : ""}>{this.renderDropdownItem()}</DropdownMenu>
                    </ButtonDropdown>
                </InputGroupAddon>
                {!this.props.first ? <Input type="text" name={this.props.name} disabled={this.state.active.selected ? false : true}
                                            placeholder={this.props.placeholder} value={this.state.text}
                                            onChange={this.onInputChange.bind(this)}/> : null}
                <Button type="button" color="warning"
                        onClick={this.onItemDefault.bind(this)}><i className="fa fa-remove"/></Button>
            </InputGroup>
        );
    }
}

export {
    SelectHelper,
    Select2Helper,
    SelectGroupHelper
};
