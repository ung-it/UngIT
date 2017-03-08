/**
 * Created by ingrskar on 3/7/2017.
 */


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
                timeStart: new Date(),
                timeEnd: new Date(),
                images: null,
                videos: null

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
                timeStart: new Date(),
                timeEnd: new Date(),
                images: null,
                videos: null


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
