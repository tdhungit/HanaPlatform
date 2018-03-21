import React, {Component} from 'react';

import Settings from '/imports/collections/Settings/Settings';
import {AppListStrings} from '/imports/common/AppListStrings';

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
                return <span></span>
            } else if (AppListStrings[options]) {
                const appListString = AppListStrings[options];
                if (appListString[value]) {
                    return <span>{appListString[value]}</span>
                }
                return <span></span>
            }
        }
    }
}
