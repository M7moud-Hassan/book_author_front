import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Index from './components';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/home';
import EditBook from './components/editBook';
import AuthorBooks from './components/authorBooks';
import ViewBook from './components/viewBook';
import ErrorPage from './components/Error';

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
