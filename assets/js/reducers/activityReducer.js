/**
 * Created by ingrskar on 3/7/2017.
 */


export default function reducer(state={
    activities: []
    }, action) {

    console.log('reducer');


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
