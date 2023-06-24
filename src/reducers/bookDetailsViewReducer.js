let BookDetailsViewReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "BOOK"){
        return action.payload;
    }
    return state;
}

export default BookDetailsViewReducer;