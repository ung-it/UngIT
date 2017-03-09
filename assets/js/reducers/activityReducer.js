/**
 * Created by ingrskar on 3/7/2017.
 */

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
                id: 23232323,
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
                show: false,

            },
            {
                id: 2131323,
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
                show: false,


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
    return state
}
