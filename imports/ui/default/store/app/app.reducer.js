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

        case 'SET_APP_VAR': {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        }

        default: {
            return state;
        }
    }
};

export default appReducer;