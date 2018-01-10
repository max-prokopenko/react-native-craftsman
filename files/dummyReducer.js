export default function reducer(state={
	dummy: true
}, action) {
	switch (action.type) {
		case "DUMMY": {
			return {...state, dummy:true}
		}
		default:
     		return state
	}	
}