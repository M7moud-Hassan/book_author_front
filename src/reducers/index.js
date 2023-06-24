import { combineReducers } from "redux";
import BooksReducer from "./booksReducer";
import BookDetailsReducer from "./bookDetailsReducer";
import PagesReducer from "./pagesReducer";
import IndexReducer from "./indexReducer";
import AuthorsReducer from "./authorsReducer";
import BookDetailsViewReducer from "./bookDetailsViewReducer";

let rootReducer = combineReducers({
    books:BooksReducer,
    pages:PagesReducer,
    index:IndexReducer,
    authors:AuthorsReducer,
    bookDetails:BookDetailsReducer,
    book:BookDetailsViewReducer
})

export default rootReducer;