import {compose} from 'react-komposer';
import {Tracker} from 'meteor/tracker';

/**
 * getTrackerLoader
 * @param reactiveMapper
 * @returns {function(*=, *=, *=)}
 */
const getTrackerLoader = reactiveMapper => (
    (props, onData, env) => {
        let trackerCleanup = null;
        const handler = Tracker.nonreactive(() => Tracker.autorun(() => {
            trackerCleanup = reactiveMapper(props, onData, env);
        }));

        return () => {
            if (typeof trackerCleanup === 'function') trackerCleanup();
            return handler.stop();
        };
    });

/**
 * push data from db to props of a React component. Use for Meteor subscribe
 * @param composer
 * @param Component
 * @param options
 * @returns {*}
 */
export default function container(composer, Component, options = {}) {
    return compose(getTrackerLoader(composer), options)(Component);
}
