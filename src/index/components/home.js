import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from '../../actions/index'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styles from '../css/home.module.css';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import { Pagination } from '@mui/material';


function HomePage(props) {
    const [openDialog, handleDisplay] = useState(false);
    const [title, setTitle] = useState('');
    const imageInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const authorData = JSON.parse(localStorage.getItem('authorData'));
    const handleClose = (e) => {
        e.preventDefault()
        handleDisplay(false);
        setTitle('')
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        props.getBooks(page);
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
            "author": authorData.user.id,
            "accessToken": authorData.access_token,
            "image": image
        }
        setTitle('')
        props.createBook(data)
    };


    useEffect(() => {

        if (authorData) {
            props.isTokenTxpired({ "token": authorData.access_token });
        } else {
            window.location = '/'
        }
        props.getBooks(1);
    }, []);


    return <>
        <section id="mu-hero">
            <div class="container">
                <div class="row">

                    <div class="col-md-6 col-sm-6 col-sm-push-6">
                        <div class="mu-hero-right">
                            <img src="assets/images/ebook.png" alt="Ebook img" />
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-6 col-sm-pull-6">
                        <div class="mu-hero-left">
                            <h1>Perfect Landing Page Template to Present Your eBook</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam saepe, recusandae quidem nulla! Eveniet explicabo perferendis aut, ab quos omnis labore laboriosam quisquam hic deserunt ipsum maxime aspernatur velit impedit.</p>
                            <a onClick={openDialogBox} class="mu-primary-btn">Download Now!</a>
                            <span>*Avaliable in PDF, ePUB, Mobi & Kindle.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <main role="main">


            <section id="mu-counter">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mu-counter-area">

                                <div class="mu-counter-block">
                                    <div class="row">


                                        <div class="col-md-3 col-sm-6">
                                            <div class="mu-single-counter">
                                                <i class="fa fa-files-o" aria-hidden="true"></i>
                                                <div class="counter-value" data-count="650">0</div>
                                                <h5 class="mu-counter-name">Total Pages</h5>
                                            </div>
                                        </div>

                                        <div class="col-md-3 col-sm-6">
                                            <div class="mu-single-counter">
                                                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                                                <div class="counter-value" data-count="422">0</div>
                                                <h5 class="mu-counter-name">Chapters</h5>
                                            </div>
                                        </div>

                                        <div class="col-md-3 col-sm-6">
                                            <div class="mu-single-counter">
                                                <i class="fa fa-users" aria-hidden="true"></i>
                                                <div class="counter-value" data-count="1055">0</div>
                                                <h5 class="mu-counter-name">Active Readers</h5>
                                            </div>
                                        </div>

                                        <div class="col-md-3 col-sm-6">
                                            <div class="mu-single-counter">
                                                <i class="fa fa-trophy" aria-hidden="true"></i>
                                                <div class="counter-value" data-count="03">0</div>
                                                <h5 class="mu-counter-name">Got Awards</h5>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="mu-book-overview">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mu-book-overview-area">

                                <div class="mu-heading-area">
                                    <h2 class="mu-heading-title">Book Overview</h2>
                                    <span class="mu-header-dot"></span>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
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

            <section id="mu-testimonials">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mu-testimonials-area">
                                <div class="mu-heading-area">
                                    <h2 class="mu-heading-title">What Our Readers Says</h2>
                                    <span class="mu-header-dot"></span>
                                </div>

                                <div class="mu-testimonials-block">
                                    <ul class="mu-testimonial-slide">

                                        <li>
                                            <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
                                            <img class="mu-rt-img" src="assets/images/reader-1.jpg" alt="img" />
                                            <h5 class="mu-rt-name"> - Alice Boga</h5>
                                            <span class="mu-rt-title">CEO, Apple Inc.</span>
                                        </li>

                                        <li>
                                            <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
                                            <img class="mu-rt-img" src="assets/images/reader-2.jpg" alt="img" />
                                            <h5 class="mu-rt-name"> - Jhon Doe</h5>
                                            <span class="mu-rt-title">Director, Google Inc.</span>
                                        </li>

                                        <li>
                                            <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
                                            <img class="mu-rt-img" src="assets/images/reader-3.jpg" alt="img" />
                                            <h5 class="mu-rt-name"> - Jessica Doe</h5>
                                            <span class="mu-rt-title">Web Developer</span>
                                        </li>

                                    </ul>
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
    </>
}

let mapStateToProps = (state) => {
    // console.log(state)
    return {
        books: state.books
    };
};

export default connect(mapStateToProps, actions)(HomePage);