export const filterActivity = (activity) => {
    console.log(activity);

    return {
        type: 'ACTIVITY_FILTERED',
        payload: activity
    }
};

export const setActivityPickerFilter = (active) => {
    console.log(active);

    return {
        type: 'ACTIVITY_PICKER',
        active
    }
};


