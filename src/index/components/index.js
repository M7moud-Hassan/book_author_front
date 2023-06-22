
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import * as actions from '../../actions/index'
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import '../css/main.css'
import $ from 'jquery';
function Index(props) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [image, setImage] = useState(null);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isUsernameValid, setIsUsernameValid] = useState(true);
	const imageInputRef = useRef(null);
	const isLoginPage = window.location.pathname.includes('/login');
	
	const authorData = JSON.parse(localStorage.getItem('authorData'));
	useEffect(() => {
		if(authorData){
			window.location="/home"
		}
		if (imageInputRef.current && !isLoginPage) {
			$(imageInputRef.current).dropify();
			$(imageInputRef.current).on('change', (e) => {
				setImage(e.target.files[0]);

			});
		}
	}, []);
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
			"image": image
		}

		props.SignUp(data);
		// console.log(data);
	};
	const handleSubmitLogIn = (e) => {
		e.preventDefault()
		var data = {
			"username":username,
			"password":password
		}
		props.Login(data)
	}
	return authorData?<></>: <>
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

								<Form.Group controlId="image" className='text-left'>
									<Form.Label>Image</Form.Label>
									<input
										type="file"
										className="dropify"
										data-allowed-file-extensions="png jpg jpeg"
										ref={imageInputRef}
										required
									/>
								</Form.Group>

								<Button variant="primary" type="submit" className='btn-submit'>
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
									<Button variant="primary" type="submit" className='btn-submit'>
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


										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-area-chart" aria-hidden="true"></i>
												</span>
												<h4>Chapter One</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-cubes" aria-hidden="true"></i>
												</span>
												<h4>Chapter Two</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-modx" aria-hidden="true"></i>
												</span>
												<h4>Chapter Three</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-files-o" aria-hidden="true"></i>
												</span>
												<h4>Chapter Four</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-file-pdf-o" aria-hidden="true"></i>
												</span>
												<h4>Chapter Five</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-language" aria-hidden="true"></i>
												</span>
												<h4>Chapter Six</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-gg" aria-hidden="true"></i>
												</span>
												<h4>Chapter Seven</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>

										<div class="col-md-3 col-sm-6">
											<div class="mu-book-overview-single">
												<span class="mu-book-overview-icon-box">
													<i class="fa fa-wpforms" aria-hidden="true"></i>
												</span>
												<h4>Chapter Eight</h4>
												<p>Lorem ipsum dolor sit amet, consect adipis elit minim veniam ettis inkeras.</p>
											</div>
										</div>


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
	</>
}

let mapStateToProps = (state) => {
	// console.log(state)
	return {
		result: state.result
	};
};

export default connect(mapStateToProps, actions)(Index);