const initialValue = {
    userData : []
}
export default function Reducer(state = initialValue, action) {
    switch(action.type){
        case 'USER_DATA':
            return {...state, userData : [...state.userData, action.value]};
        default:
            return state;
    }
}
