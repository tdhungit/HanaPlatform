import React, {Component} from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import {Helmet} from 'react-helmet';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';

import container from '/imports/common/Container';
import Settings from '/imports/collections/Settings/Settings';

// Translation
i18n.setLocale('en-US');
const T = i18n.createComponent();
const t = i18n;

// SEO
const seoURL = path => Meteor.absoluteUrl(path);

const getMetaTags = ({
                         title,
                         description,
                         url,
                         contentType,
                         published,
                         updated,
                         category,
                         tags
                     }) => {
    const metaTags = [
        {itemprop: 'name', content: title},
        {itemprop: 'description', content: description},
        {name: 'description', content: description}
    ];

    if (published) metaTags.push({name: 'article:published_time', content: published});
    if (updated) metaTags.push({name: 'article:modified_time', content: updated});
    if (category) metaTags.push({name: 'article:section', content: category});
    if (tags) metaTags.push({name: 'article:tag', content: tags});

    return metaTags;
};

class SEO extends Component {
    render() {
        const {
            schema,
            title,
            description,
            path,
            contentType,
            published,
            updated,
            category,
            tags,
            settings
        } = this.props;

        let pageTitle = settings && ((settings['Systems:title'] && settings['Systems:title'].value) || 'Penguin Platform');

        if (title) {
            pageTitle = title + ' | ' + pageTitle;
        }

        return (
            <Helmet
                htmlAttributes={{
                    lang: 'en',
                    itemscope: undefined,
                    itemtype: `http://schema.org/${schema}`,
                }}
                title={pageTitle}
                link={[
                    {rel: 'canonical', href: seoURL(path)},
                ]}
                meta={getMetaTags({
                    title,
                    description,
                    contentType,
                    url: seoURL(path),
                    published,
                    updated,
                    category,
                    tags
                })}
            />
        )
    }
}

SEO.defaultProps = {
    schema: '',
    title: '',
    description: '',
    path: '/',
    contentType: '',
    published: '',
    updated: '',
    category: '',
    tags: [],
    settings: {}
};

SEO.propTypes = {
    schema: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
    contentType: PropTypes.string,
    published: PropTypes.string,
    updated: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.array,
    settings: PropTypes.object
};

const PT = container((props, onData) => {
    const subscription = Meteor.subscribe('settings.getSetting', 'Systems', 'title');
    if (subscription && subscription.ready()) {
        const SystemSettings = Settings.find({category: 'Systems', name: 'title'}).fetch();

        let settings = {};
        for (let idx in SystemSettings) {
            let setting = SystemSettings[idx];
            let key = setting.category + ':' + setting.name;
            settings[key] = setting;
        }

        onData(null, {
            settings: settings
        });
    }
}, SEO);

export {
    T,
    t,
    PT
}
