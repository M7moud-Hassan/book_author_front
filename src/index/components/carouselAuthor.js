import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as actions from '../../actions/index'

const CarouselAuthor = (props) => {

  
useEffect(()=>{
  props.getTopAuthors()
},[])
 


  const renderSlides = () => {
    const slides = [];
    for (let i = 0; i < props.authors.length; i++) {
      slides.push(
        <div key={i}>
          <img src={props.authors?`http://localhost:8000${props.authors[i].image}`:''} style={{
            height:'400px'
          }} alt='image'/>
          <div className="legend">
            <p>
            Author: {props.authors[i].username}
            </p>
            <p>Books: {props.authors[i].books_count}</p>
            <p>Pages: {props.authors[i].pages_count}</p>
          </div>
        </div>
      );
    }
    return slides;
  };

  return (
    <div>
      <Carousel showThumbs={false} autoPlay={true} interval={2000}>
        {renderSlides()}
        
      </Carousel>
    </div>
  );
};



let mapStateToProps = (state) => {
	return {
		authors:state.authors
	};
};



export default connect(mapStateToProps, actions)(CarouselAuthor);