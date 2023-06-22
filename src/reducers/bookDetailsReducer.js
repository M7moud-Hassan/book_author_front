let BookDetailsReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "BOOKDETAIL"){
        return action.payload;
    }
    return state;
}

export default BookDetailsReducer;