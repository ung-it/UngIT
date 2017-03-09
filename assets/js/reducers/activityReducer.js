/**
 * Created by ingrskar on 3/7/2017.
 */



import getUpcomingActivities from '../APIFunctions';



/*
* A reducer is just a little pice of data that we want to return
* It gets notified from all Action creators when they are fired, with the action type
* Thus, the reducer can listen for action type, and if it's something the reducer wants to handle and return some
* data. It can do so.
* */

export default function reducer(state={
    activities:
        [
            {
                id: 1,
                title: 'Sigve',
                provider: 'Skaugvoll',
                adaptions: 'Nada',
                age: '22',
                location: 'Gård',
                description: 'Male',
                price: 'Expensive',
                date: new Date(),
                timeStart: new Date('2017','03','02'),
                timeEnd: new Date('2017', '04', '02'),
                images: null,
                videos: null,


            },
            {
                id: 2,
                title: 'Ellen',
                provider: 'Bakksjo',
                adaptions: 'Nada',
                age: '21',
                location: 'by',
                description: 'Female',
                price: 'Expensive',
                date: new Date(),
                timeStart: new Date('2017','03','02'),
                timeEnd: new Date('2017', '04', '02'),
                images: null,
                videos: null,



            }
        ]
}, action) {

    console.log('Activityreducer');


    switch (action.type) {
        case "ACTIVITY_FETCHED": {
            return {
                ...state,
                activities: [...state, action.payload]
            }
        }
    }

    // use the api function to get all data from the db, and save in activities array
    // so that we do not need to query for each request.





    return state
}
