const initialState = {
    test: 'test value',
    messages: ['testing'],
};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MESSAGES':
            return Object.assign({}, state, {
                messages: action.messages,
            });
        case 'IMPORT_MESSAGES':
            const newMessages = state.messages.slice(0);
            newMessages.unshift(action.message);
            return Object.assign({}, state, {
                messages: newMessages,
            });
        case 'SET_TEST':
            return Object.assign({}, state, {
                test: action.test
            });
        default:
            return state;
    }
};

export default testReducer;