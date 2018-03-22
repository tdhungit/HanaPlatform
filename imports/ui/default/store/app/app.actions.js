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
