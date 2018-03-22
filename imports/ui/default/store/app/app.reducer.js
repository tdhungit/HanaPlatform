/**
 * init app reducer
 * @param state
 * @param action
 * @returns {*}
 */
const appReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true
            }
        }

        case 'SET_LOADED': {
            return {
                ...state,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
};

export default appReducer;