import { combineReducers } from "redux";
import BooksReducer from "./booksReducer";
import BookDetailsReducer from "./bookDetailsReducer";
import PagesReducer from "./pagesReducer";

let rootReducer = combineReducers({
    books:BooksReducer,
    bookDetails:BookDetailsReducer,
    pages:PagesReducer
})

export default rootReducer;