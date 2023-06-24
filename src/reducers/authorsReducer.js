let AuthorsReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "AUTHORS"){
        return action.payload;
    }
    return state;
}

export default AuthorsReducer