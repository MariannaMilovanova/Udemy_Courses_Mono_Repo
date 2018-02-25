export default function({ dispatch }){ //alway have this signature
    return next => action => {
        //console.log(action);
        //if action does not have payload send it om
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        //console.log(`We have a promise`, action);
        //Make sure the action's promise resolved
        action.payload
            .then((response) => {
                //create new action with the old type, but
                //replace the promise with the response data
                const newAction = { ...action, payload: response }
                dispatch(newAction); //send action to run evry midleware again
            })
    };
}

// export default function({ dispatch }){
//     return function(next) {
//         return function(action) {
//             console.log(action);

//             next(action);
//         }
//     }
// }
