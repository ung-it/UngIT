/**
 * Created by ingrskar on 3/7/2017.
 */


export default function reducer(state={
    activities: []
    }, action) {

    console.log('reducer');


    switch (action.type) {
      case "FETCH_ACTIVITY_FULFILLED": {
        return {
            ...state,
            activities: [...state, action.payload]
        }
      }
    }
    return state
}
