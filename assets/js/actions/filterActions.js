export const filterActivity = (activity) => {
    console.log(activity);

    return {
        type: 'ACTIVITY_FILTERED',
        payload: activity
    }
};

// export const setActivityPickerFilter = (active) => {
//     console.log("set activity picker -" + active);
//     return {
//         type: 'ACTIVITY_PICKER',
//         active
//     }
// };

export function setActivityPickerFilter(active) {
  console.log("set activity picker filter - " + active);
    return (dispatch) => {
        type: 'ACTIVITY_PICKER',
        active
    }
}



