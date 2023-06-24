import { useEffect, useRef, useState } from "react";
import '../css/main.css'
import { Editor } from "@tinymce/tinymce-react";
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import { useParams } from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styles from '../css/home.module.css';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import { Pagination } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
function EditBook(props) {
    const [content, setContent] = useState('')
    const { id } = useParams()
    const [openDialog, handleDisplay] = useState(false);
    const [openDialogPage, handleDisplayPage] = useState(false);
    const [title, setTitle] = useState('');
    const imageInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPage, setNumPage] = useState(1);
    const [idPage, setIdPage] = useState(-1);
    const [openDelete, setOpenDelete] = useState(false);
    const authorData = JSON.parse(localStorage.getItem('userData'));



    const handleClose = (e) => {
        e.preventDefault()
        handleDisplay(false);
    };

    const handleClosePage = (e) => {
        e.preventDefault()
        handleDisplayPage(false);
    };

    const openDialogBoxPage = () => {
        setTimeout(() => {
            handleDisplayPage(true);
        }, 300)
    }

    const openDialogBox = () => {

        handleDisplay(true);
        setTimeout(() => {
            if (imageInputRef.current) {
                $(imageInputRef.current).dropify();
                $(imageInputRef.current).on('change', (e) => {
                    setImage(e.target.files[0]);

                });
                setImage(null)
                setTitle(props.bookDetails.title)
                var ele = document.getElementsByClassName('dropify-preview')[0];
                ele.style.display = 'block';

                const imgElement = document.createElement('img');


                imgElement.src = `http://localhost:8000${props.bookDetails.image}`;
                imgElement.alt = 'Image';


                const targetElement = document.querySelector('.dropify-render')
                if (targetElement) {
                    targetElement.appendChild(imgElement);
                }
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

        }
        if (image) {
            data = {
                "title": title,
                "author": authorData.user.id,
                "accessToken": authorData.access_token,
                "image": image,
                "pk": props.bookDetails.id
            }
        } else {
            data = {
                "title": title,
                "author": authorData.user.id,
                "accessToken": authorData.access_token,
                "pk": props.bookDetails.id
            }
        }
        props.updateBook(data)
    };

    useEffect(() => {
        if (authorData) {
            props.isTokenTxpired({ "token": authorData.access_token });
        } else {
            window.location = '/'
        }

        var data = {
            pk: id,
            "id_author": authorData.user.id,
            accessToken: authorData.access_token
        }
        props.getDetailsBook(data)
        props.getPages(currentPage, id, authorData.access_token)
    }, [])

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        props.getPages(page, id, authorData.access_token);
    };

    const handleChange = (content, editor) => {
        setContent(content);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var data = {
            "accessToken": authorData.access_token,
            "number": numPage,
            "book": id,
            "content": content,
            "cuurentPage": currentPage,
            "pk": idPage
        }
        if (numPage == Number((props.pages.results.length + 1))) {
            props.createPage(data, props)
        } else {
            props.updatePage(data, props)
        }
        handleDisplayPage(false)
        setContent('')
    }


    const handleDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleConfirmDelete = () => {
        var data = {
            "accessToken": authorData.access_token,
            "pk": idPage,
            "book": id,
            "cuurentPage": currentPage,
        }
        props.deletePage(data, props)
        setOpenDelete(false);
    };
    return authorData && props.bookDetails ? <>
        <section id="mu-hero">
            <div class="container">
                <div class="row">

                    <div class="col-md-6 col-sm-6 col-sm-push-6">
                        <div class="mu-hero-right">
                            <img src={`http://localhost:8000${props.bookDetails.image}`} alt="Ebook img" style={{
                                width: '100%',
                                height: '300px'
                            }} />
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-6 col-sm-pull-6">
                        <div class="mu-hero-left">
                            <h1>use can edit book or add some pages to it</h1>
                            <p>you can edit name or photo of book from this button</p>
                            <a onClick={openDialogBox} class="mu-primary-btn">edit book</a>

                        </div>
                    </div>

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
                                    <h2 class="mu-heading-title">Pages of {props.bookDetails.title}</h2>
                                    <span class="mu-header-dot"></span>
                                    <div>
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            setNumPage(props.pages.results ? props.pages.results.length + 1 : 0)
                                            setContent('')
                                            openDialogBoxPage()
                                        }}>
                                            Add Pages
                                        </button>
                                    </div>

                                </div>


                                <div class="mu-book-overview-content">
                                    <div class="row">
                                        {props.pages.results ? props.pages.results.map(ele => {
                                            return <div class="col-md-3 col-sm-6">
                                                <div class="mu-book-overview-single">
                                                    <span class="mu-book-overview-icon-box">
                                                        <i class="fa fa-wpforms" aria-hidden="true"></i>
                                                    </span>
                                                    <h4>Page {ele.number}</h4>
                                                    <div>
                                                        <i class="fa fa-trash fa-icon-delete" onClick={
                                                            () => {
                                                                setNumPage(ele.number)
                                                                setIdPage(ele.id)
                                                                handleDelete()
                                                            }
                                                        } aria-hidden="true"></i>
                                                        <i class="fas fa-edit fa-icon-edit" onClick={() => {
                                                            setNumPage(ele.number)
                                                            setIdPage(ele.id)
                                                            setContent(ele.content)
                                                            handleDisplayPage(true)
                                                        }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        }) : <></>}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination
                                            count={Math.ceil(props.pages.count / 8)}
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

        <Dialog onClose={handleClosePage} open={openDialogPage}>
            <DialogTitle> {numPage == (props.pages.results ? props.pages.results.length + 1 : 0) ? 'Add Page' : 'Update Page'} </DialogTitle>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Page {numPage}</h3>
                <Editor
                    // apiKey={"aul16ni1wyfshcuof1s88xy7ya3jw61q8dh5kfl26bhaxf0z"}
                    value={content}
                    init={{
                        height: 300,
                        menubar: false
                    }}
                    onEditorChange={handleChange}
                />
                <br />
                <div className="text-center">
                    <input type="submit" className="btn btn-primary btn-save" value={numPage == (props.pages.results ? props.pages.results.length + 1 : 0) ? 'Save' : 'Update'} />
                </div>
            </form>
        </Dialog>
        <Dialog onClose={handleClose} open={openDialog}>
            <DialogTitle> Update Book </DialogTitle>
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
                        required={image != null}
                    />

                </Form.Group>

                <div>
                    <Button variant="primary" type="submit" className={styles.saveButton}>
                        Update
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
                    fontSize: '20px'
                }}>
                    Are you sure you want to delete page {numPage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </> : <></>
}

let mapStateToProps = (state) => {
    // console.log(state)
    return {
        bookDetails: state.bookDetails,
        pages: state.pages
    };
};

export default connect(mapStateToProps, actions)(EditBook);