export default function (state = null, action) {
    switch (action.type) {
        case 'ACTIVITY_FILTERED':
            return action.payload;

        case 'ACTIVITY_PICKER':
            return action.payload;
    }
    return state;
}
