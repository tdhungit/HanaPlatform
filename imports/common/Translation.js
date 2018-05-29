import React, {Component} from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import {Helmet} from 'react-helmet';
import {Meteor} from 'meteor/meteor';

import Settings from '/imports/collections/Settings/Settings';

// Translation
i18n.setLocale('en-US');
/**
 * tag to translate a string
 */
export const T = i18n.createComponent();
/**
 * object to translate a string
 */
export const t = i18n;

/**
 * tag change page title
 * @param path
 * @returns {any}
 */
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

export class PT extends Component {
    static defaultProps = {
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

    static propTypes = {
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
            tags
        } = this.props;

        const SystemSettings = Settings.find({category: 'Systems', name: 'title'}).fetch();

        let settings = {};
        for (let idx in SystemSettings) {
            let setting = SystemSettings[idx];
            let key = setting.category + ':' + setting.name;
            settings[key] = setting;
        }

        let pageTitle = settings && ((settings['Systems:title'] && settings['Systems:title'].value) || 'Hana Platform');

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
