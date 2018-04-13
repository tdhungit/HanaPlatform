/**
 * loading for system
 * @param loading
 * @returns {*}
 */
export const appLoading = (loading = true) => {
    if (loading == false) {
        return {
            type: 'SET_LOADED'
        }
    }

    return {
        type: 'SET_LOADING'
    }
};

export const appSetVar = (name, value) => {
    return {
        type: 'SET_APP_VAR',
        payload: {
            name: name,
            value: value
        }
    };
};
