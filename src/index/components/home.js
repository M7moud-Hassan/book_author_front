import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from '../../actions/index'
function HomePage(props){
    const authorData = JSON.parse(localStorage.getItem('authorData'));
    useEffect(()=>{
       
        if(authorData){
            props.isTokenTxpired({"token":authorData.access_token});
        }else{
            window.location='/'
        }
    },[]);
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
						<a href="#" class="mu-primary-btn">Download Now!</a>
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

export default connect(mapStateToProps, actions)(HomePage);