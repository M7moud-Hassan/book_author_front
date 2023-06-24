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
import CarouselAuthor from "./carouselAuthor";
import { NavLink } from "react-router-dom";


function HomePage(props) {
    const [openDialog, handleDisplay] = useState(false);
    const [title, setTitle] = useState('');
    const imageInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleClose = (e) => {
        e.preventDefault()
        handleDisplay(false);
        setTitle('')
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        props.getBooks(page)
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


    useEffect(() => {

        if (userData) {
            props.isTokenTxpired({ "token": userData.access_token });
        } else {
            window.location = '/'
        }
       
        props.getBooks(currentPage)
        props.getIndex()
    }, []);

    
    

   

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
                            <h1>Wellcome {userData.username} in Home Page</h1>
                            <p>From this Home Page Can you Create Book Or Edit Book and manage yout pages</p>
                            <a onClick={openDialogBox} class="mu-primary-btn">Create Book</a>
                        </div>
                    </div></>):<>
                    <div class="row">

					<div class="col-md-6 col-sm-6 col-sm-push-6">
						<div class="mu-hero-right">
							<img src='assets/images/ebook.gif' className='imageRigth' alt="Ebook img" />
						</div>
					</div>

					<div class="col-md-6 col-sm-6 col-sm-pull-6">
						<div class="mu-hero-left">
                        <h1>you can browse the books  and if you want to add your Books
                            create account as Author
                        </h1>
						</div>
					</div>

				</div>
                    </>}

                </div>
            </div>
        </section>

        <main role="main">


        <section id="mu-counter">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="mu-counter-area">

								<div class="mu-counter-block containerC">
									<div class="row rowC">


										<div class="col-md-3 col-sm-6" >
											<div class="mu-single-counter">
												<i class="fa fa-files-o" aria-hidden="true"></i>
												<div class="counter-value" data-count={props.index ? props.index.pages : 0}>0</div>
												<h5 class="mu-counter-name">Total Pages</h5>
											</div>
										</div>

										<div class="col-md-3 col-sm-6" >
											<div class="mu-single-counter">
												<i class="fa fa-file-text-o" aria-hidden="true"></i>
												<div class="counter-value" data-count={props.index ? props.index.books : 0}>0</div>
												<h5 class="mu-counter-name">Books</h5>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-single-counter">
												<i class="fa fa-users" aria-hidden="true"></i>
												<div class="counter-value" data-count={props.index ? props.index.authors : 0}>0</div>
												<h5 class="mu-counter-name">Authors</h5>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
                                            <div class="mu-single-counter">
                                                <i class="fa fa-users" aria-hidden="true"></i>
                                                <div class="counter-value" data-count={props.index ? props.index.readers : 0}>0</div>
                                                <h5 class="mu-counter-name">Readers</h5>
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
								</div>


								<div class="mu-book-overview-content">
									<div class="row">

										{props.books.results ? props.books.results.map((ele) => {
											console.log(ele);
											return <NavLink to={`/view_book/${ele.id}`}>
                                                 <div class="col-md-3 col-sm-6">
												<div class="mu-book-overview-single">
													<span class="mu-book-overview-icon-box">
														<img src={"http://localhost:8000" + ele.image} style={{
															height: "200px"
														}} />
													</span>
													<h4>{ele.title}</h4>
													<h5><span style={{ color: 'grey' }}>author: </span>{ele.author.username} </h5>
												</div>
											</div>
                                            </NavLink>
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

            <section id="mu-Authors">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="mu-testimonials-area">
								<div class="mu-heading-area">
									<h2 class="mu-heading-title">Top Authors</h2>
									<span class="mu-header-dot"></span>
								</div>

								<div class="mu-testimonials-block">
									<CarouselAuthor />
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
        books: state.books,
        index: state.index
    };
};

export default connect(mapStateToProps, actions)(HomePage);