
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import * as actions from '../actions/index'
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import '../css/main.css'
import $ from 'jquery';
import CarouselAuthor from './carouselAuthor';
function Index(props) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [image, setImage] = useState(null);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isUsernameValid, setIsUsernameValid] = useState(true);
	const imageInputRef = useRef(null);
	const [typeUser, SetTypeUser] = useState(0);
	const isLoginPage = window.location.pathname.includes('/login');
	const userData = JSON.parse(localStorage.getItem('userData'));

	useEffect(() => {
		if (userData) {
			window.location = "/home"
		}
		if (imageInputRef.current && !isLoginPage) {
			$(imageInputRef.current).dropify();
			$(imageInputRef.current).on('change', (e) => {
				setImage(e.target.files[0]);

			});
		}
		props.getIndex()
	}, [typeUser]);

	const handleSubmitSignUp = (e) => {
		e.preventDefault();
		const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!passwordPattern.test(password)) {
			setIsPasswordValid(false);
			return;
		} else {
			setIsPasswordValid(true);
		}

		const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
		if (!usernamePattern.test(username)) {
			setIsUsernameValid(false);
			return;
		}
		setIsUsernameValid(true);
		var data = {
			"username": username,
			"email": email,
			"password": password,
			"image": image,
			"userType": typeUser
		}

		props.SignUp(data);
		// console.log(data);
	};
	const handleSubmitLogIn = (e) => {
		e.preventDefault()
		var data = {
			"username": username,
			"password": password
		}
		props.Login(data)
	}
	return userData ? <></> : <>
		<section id="mu-hero">
			<div class="container">
				<div class="row">

					<div class="col-md-6 col-sm-6 col-sm-push-6">
						<div class="mu-hero-right">
							<img src='assets/images/ebook.gif' className='imageRigth' alt="Ebook img" />
						</div>
					</div>

					<div class="col-md-6 col-sm-6 col-sm-pull-6">
						<div class="mu-hero-left">

							{!isLoginPage ? (<Form onSubmit={handleSubmitSignUp} className="text-center" enctype="multipart/form-data">
								<Form.Group controlId="username" className='text-left'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
									{!isUsernameValid && (
										<Form.Text className="text-danger">
											Username must contain only alphanumeric characters and underscores (3-20 characters).
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group controlId="email" className='text-left'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="password" className='text-left'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									{!isPasswordValid && (
										<Form.Text className="text-danger">
											Password must contain at least one uppercase letter, one digit, and be at least 8 characters long.
										</Form.Text>
									)}
								</Form.Group>
								<div class="wrapper">
									<input type="radio" name="select" id="option-1" checked={typeUser == 0} />
									<input type="radio" name="select" id="option-2" checked={typeUser == 1} />
									<label for="option-1" class="option option-1" onClick={() => {
										SetTypeUser(0)
									}}>
										<div class="dot"></div>
										<div className='name_options'>Author</div>
									</label>
									<label for="option-2" class="option option-2" onClick={() => {
										SetTypeUser(1)
									}}>
										<div class="dot"></div>
										<div className='name_options'>Reader</div>
									</label>
								</div>
								{typeUser == 0 ? <Form.Group controlId="image" className='text-left'>
									<Form.Label>Image</Form.Label>
									<input
										type="file"
										className="dropify"
										data-allowed-file-extensions="png jpg jpeg"
										ref={imageInputRef}
										required
									/>
								</Form.Group>
									: <></>}
								<Button variant="primary" type="submit" className='btn-submit btn-width'>
									Register
								</Button>
							</Form>) : (<>
								<h1 className='text-center'>LogIn</h1>
								<Form onSubmit={handleSubmitLogIn} className="text-center">
									<Form.Group controlId="username" className='text-left'>
										<Form.Label>Username</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											required
										/>
									</Form.Group>
									<Form.Group controlId="password" className='text-left'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Enter password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>
									<Button variant="primary" type="submit" className='btn-submit btn-width'>
										Login
									</Button>
								</Form>
							</>)}
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
	</>
}



let mapStateToProps = (state) => {
	// console.log(state)
	return {
		result: state.result,
		index: state.index,
		authors: state.authors
	};
};



export default connect(mapStateToProps, actions)(Index);