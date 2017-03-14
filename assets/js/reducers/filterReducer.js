export default function (state = null, action) {
    switch (action.type) {
        case 'ACTIVITY_FILTERED':
            return action.payload;
            break;
    }
    return state;
}
