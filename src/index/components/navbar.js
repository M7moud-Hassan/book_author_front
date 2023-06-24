import '../css/navbar.css';
import { NavLink } from 'react-router-dom';

function NavBar(){
  const authorData = JSON.parse(localStorage.getItem('userData'));
  var hideAuthor=window.location.pathname=='/author_book' || window.location.pathname.includes('editBook')
  console.log("from navbar");
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
                  <a class="navbar-brand"><i class="fa fa-book" aria-hidden="true"></i> Books</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul class="nav navbar-nav mu-menu navbar-right">
                        {authorData?<li> <NavLink onClick={()=>{
                          window.location='/home'
                        }}>Home</NavLink></li>:<li> <NavLink to="/" onClick={
                          ()=>{
                            window.location="/"
                          }
                        }>Home</NavLink></li>}
                         {authorData?authorData.group=="Authors"?<li><NavLink onClick={
                          ()=>{
                            window.location='/author_book'
                          }
                         }>My Books</NavLink></li>:<></>:<></>}
                        {authorData?<li><a href="#mu-book-overview">{window.location.pathname.includes('editBook')?"Pages":"Books"}</a></li>:<></>}
                        {hideAuthor?<></>:<li><a href="#mu-Authors">Author</a></li>}
                       {authorData? <li> <NavLink onClick={
                          ()=>{
                            window.localStorage.removeItem('userData');
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