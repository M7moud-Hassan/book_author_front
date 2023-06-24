import '../../css/navbar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const authorData = JSON.parse(localStorage.getItem('userData'));
  var hideAuthor = window.location.pathname == '/author_book' || window.location.pathname.includes('editBook')
  var hideDuringViewBook = window.location.pathname.includes('view_book');

  return (<header id="mu-header" className="" role="banner">
    <div className="container">
      <nav className="navbar navbar-default mu-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand"><i className="fa fa-book" aria-hidden="true"></i> Books</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav mu-menu navbar-right">
              {authorData ? <li> <NavLink onClick={() => {
                window.location = '/home'
              }}>Home</NavLink></li> : <li> <NavLink to="/" onClick={
                () => {
                  window.location = "/"
                }
              }>Home</NavLink></li>}
              {authorData ? authorData.group == "Authors" ? <li><NavLink onClick={
                () => {
                  window.location = '/author_book'
                }
              }>My Books</NavLink></li> : <></> : <></>}
              {!hideDuringViewBook ? authorData ? <li><a href="#mu-book-overview">{window.location.pathname.includes('editBook') ? "Pages" : "Books"}</a></li> : <></> : <></>}
              {!hideDuringViewBook ? hideAuthor ? <></> : <li><a href="#mu-Authors">Authors</a></li> : <></>}
              {authorData ? <li> <NavLink onClick={
                () => {
                  window.localStorage.removeItem('userData');
                  window.location = "/"
                }
              } >Logout</NavLink></li> : <li> <NavLink to="/login" onClick={
                () => {

                  window.location = "/login"
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