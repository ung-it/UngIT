export const filterActivity = (activity) => {
    console.log(activity);

    return {
        type: 'ACTIVITY_FILTERED',
        payload: activity
    }
};
