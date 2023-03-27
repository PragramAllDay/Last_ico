export const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_ADDRESS":
            return {
                ...state,
                address: action.payload,
            };
        case "SET_PROVIDER":
            return {
                ...state,
                provider: action.payload,
            };
        default:
            return state;
    }
}