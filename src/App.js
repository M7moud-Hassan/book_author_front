import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Index from './components/index';
import Footer from './components/index/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/home/home';
import EditBook from './components/author_op/editBook';
import AuthorBooks from './components/author_op/authorBooks';
import ViewBook from './components/home/viewBook';
import ErrorPage from './components/index/Error';
import NavBar from './components/index/navbar'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <ToastContainer />
       <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/login' element={<Index/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/editBook/:id' element={<EditBook/>}></Route>
        <Route path='/author_book' element={<AuthorBooks/>} />
        <Route path='/view_book/:id' element={<ViewBook/>} />
        <Route path='*' element={<ErrorPage/>}/>
       </Routes>
       <Footer/>
    </BrowserRouter>
  );
}

export default App;
