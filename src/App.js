import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import NavBar from './index/components/navbar';
import Index from './index/components';
import Footer from './index/components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './index/components/home';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <ToastContainer />
       <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/login' element={<Index/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
       </Routes>
       <Footer/>
    </BrowserRouter>
  );
}

export default App;
