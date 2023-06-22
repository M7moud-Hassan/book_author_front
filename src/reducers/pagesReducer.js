let PagesReducer = (state = [] , action)=>{
    //Condition ==> Action.type
    if(action.type == "PAGES"){
        return action.payload;
    }
    return state;
}

export default PagesReducer;