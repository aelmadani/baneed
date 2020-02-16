import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "./Slideshow.css";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

const Slideshow = (props) => {
  const imageLinks = props.imageLinks;

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {imageLinks.map((link, i) => {
          return (
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${link})` }}></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default Slideshow;
