import { connect } from "react-redux";
import * as actions from '../../actions/index'
import { useEffect, useRef, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import styles from '../css/home.module.css';
import { Pagination } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
function AuthorBooks(props){
    const [openDialog, handleDisplay] = useState(false);
    const imageInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [image, setImage] = useState(null);
    const [titleBook, setTitleBook] = useState('');
    const [id_book, SetIdBook] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleClose = (e) => {
        e.preventDefault()
        handleDisplay(false);
        setTitle('')
    };
    useEffect(()=>{
        if (userData) {
            props.isTokenTxpired({ "token": userData.access_token });
        } else if (userData.group!='Authors')
        {
            window.location = '/home'
        } else {
            window.location = '/'
        }
         var data={
            "currentPage":currentPage,
            "id":userData.user.id,
            "accessToken": userData.access_token,
        }
        props.getBooksAuthor(data)
    },[])

    const handleDelete = () => {
        setOpenDelete(true);
      };


      const handlePageChange = (event, page) => {
        setCurrentPage(page);
        var data={
            "currentPage":currentPage,
            "id":userData.user.id,
            "accessToken": userData.access_token,
        }
        props.getBooksAuthor(data)
    };

    const openDialogBox = () => {

        handleDisplay(true);
        setTimeout(() => {
            if (imageInputRef.current) {
                $(imageInputRef.current).dropify();
                $(imageInputRef.current).on('change', (e) => {
                    setImage(e.target.files[0]);

                });
            }
        }, 100)
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();
        handleDisplay(false);
        var data = {
            "title": title,
            "author": userData.user.id,
            "accessToken": userData.access_token,
            "image": image,
            "currentPage":currentPage
        }
        setTitle('')
        props.createBook(data,props)
    };

       const handleConfirmDelete = () => {
        var data={
            "currentPage":currentPage,
            "id":userData.user.id,
            "accessToken": userData.access_token,
            "id_book":id_book
        }
        props.deleteBook(data,props)
        setOpenDelete(false);
      };

      const handleCloseDelete = () => {
        setOpenDelete(false);
      };
    

    return <>
     <section id="mu-hero">
            <div class="container">
                <div class="row">

                   {userData.group=='Authors'?( <>
                    <div class="col-md-6 col-sm-6 col-sm-push-6">
                        <div class="mu-hero-right">
                            <img src={`http://localhost:8000${userData.user.image}`} className="imageRigth"  alt="Ebook img" />
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-6 col-sm-pull-6">
                        <div class="mu-hero-left">
                            <h1>Wellcome {userData.username} in  Page of Your Books add Book Now</h1>
                            <p>From this Home Page Can you Create Book Or Edit Book and manage yout pages</p>
                            <a onClick={openDialogBox} class="mu-primary-btn">Create Book</a>
                        </div>
                    </div></>):<></>}

                </div>
            </div>
        </section>
        <main role="main">
               <section id="mu-book-overview">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mu-book-overview-area">

                                <div class="mu-heading-area">
                                    <h2 class="mu-heading-title">Your Books</h2>
                                    <span class="mu-header-dot"></span>
                                </div>


                                <div class="mu-book-overview-content">
                                    <div class="row">
                                        {props.books.results ? props.books.results.map((ele) => {
                                            console.log(ele);
                                            return <div class="col-md-3 col-sm-6">
                                                <div class="mu-book-overview-single">
                                                    <span class="mu-book-overview-icon-box">
                                                        <img src={"http://localhost:8000" + ele.image} style={{
                                                            height: "200px"
                                                        }} />
                                                    </span>
                                                    <h4>{ele.title}</h4>
                                                    <div>
                                                    <i  class="fa fa-trash fa-icon-delete" onClick={
                                                        ()=>{
                                                            SetIdBook(ele.id)
                                                          setTitleBook(ele.title)
                                                          handleDelete()
                                                        }
                                                    } aria-hidden="true"></i>
                                                    <i class="fas fa-edit fa-icon-edit" onClick={()=>{
                                                      window.location="/editBook/"+ele.id
                                                    }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        }) : <></>}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination
                                            count={Math.ceil(props.books.count / 8)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>

        <Dialog onClose={handleClose} open={openDialog}>
            <DialogTitle> Add Book </DialogTitle>
            <Form onSubmit={handleSave} className={styles.form}>
                <Form.Group className={styles.inputTitle}>
                    <Form.Label className={styles.label}>Book Title:</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>Image</Form.Label>
                    <input
                        type="file"
                        className="dropify"
                        data-allowed-file-extensions="png jpg jpeg"
                        ref={imageInputRef}
                        required
                    />
                </Form.Group>

                <div>
                    <Button variant="primary" type="submit" className={styles.saveButton}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleClose} className={styles.cancelButton}>
                        Cancel
                    </Button>
                </div>
            </Form>

        </Dialog>

        <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText style={{
            fontSize:'20px'
          }}>
            Are you sure you want to delete Book {titleBook}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
}
let mapStateToProps = (state) => {
    return {
        books: state.books,
    };
};

export default connect(mapStateToProps, actions)(AuthorBooks);