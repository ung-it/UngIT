//import { activityReducer } from "activityReducer";
//import { setActivityPickerFilter } from "../actions/filterActions";

export default function (state = null, action) {
    console.log(action);
    console.log('^filter reducer');
    switch (action.type) {
        case 'ACTIVITY_FILTERED':
            return action.payload;

        case 'ACTIVITY_PICKER':

            console.log(action);

            //tempActivites = [];
            /*activityReducer.filter( (activity) => {
               activity.description.includes()
            });
*/
            return {
                ...state,
                active: [action]
            }
    }
    return state;
}
