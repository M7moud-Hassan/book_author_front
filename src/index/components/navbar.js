import '../css/navbar.css';
import { NavLink } from 'react-router-dom';

function NavBar(){
  const authorData = JSON.parse(localStorage.getItem('authorData'));
    return (	<header id="mu-header" class="" role="banner">
    <div class="container">
        <nav class="navbar navbar-default mu-navbar">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="index.html"><i class="fa fa-book" aria-hidden="true"></i> Kindle</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul class="nav navbar-nav mu-menu navbar-right">
                        {authorData?<li> <NavLink to="/home">Home</NavLink></li>:<li> <NavLink to="/" onClick={
                          ()=>{
                            window.location="/"
                          }
                        }>Home</NavLink></li>}
                        <li><a href="#mu-book-overview">OVERVIEW</a></li>
                        <li><a href="#mu-testimonials">TESTIMONIALS</a></li>
                       {authorData? <li> <NavLink onClick={
                          ()=>{
                            window.localStorage.removeItem('authorData');
                            window.location="/"
                          }
                        } >Logout</NavLink></li>: <li> <NavLink to="/login" onClick={
                          ()=>{
                            
                            window.location="/login"
                          }
                        } >Login</NavLink></li>}
                      </ul>
                </div>
              </div>
        </nav>
    </div>
</header>)
}

export default NavBar;