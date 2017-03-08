/**
 * Created by ingrskar on 3/7/2017.
 */
export default function reducer(state={
    activities: []
    }, action) {

    switch (action.type) {
      case "FETCH_ACTIVITY_FULFILLED": {
        return {
          ...state,
          activities: [...state.activity, action.payload]
        }
      }
    }
    return state
}
