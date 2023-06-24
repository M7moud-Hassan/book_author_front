let IndexReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "INDEX"){
        return action.payload;
    }
    return state;
}

export default IndexReducer;