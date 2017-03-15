//import { activityReducer } from "activityReducer";
//import { setActivityPickerFilter } from "../actions/filterActions";

export default function (state = null, action) {
    switch (action.type) {
        case 'ACTIVITY_FILTERED':
            return action.payload;

        case 'ACTIVITY_PICKER':

            console.log(action.payload);

            //tempActivites = [];
            /*activityReducer.filter( (activity) => {
               activity.description.includes()
            });
*/
            return {
                ...state,
                active: [action.payload]
            }
    }
    return state;
}
