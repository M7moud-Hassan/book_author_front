let BooksReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "BOOKS"){
        return action.payload;
    }
    return state;
}

export default BooksReducer;