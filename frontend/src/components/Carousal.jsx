import React from "react";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpeg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpeg";

function Carousal() {
  return (
    <div>
      <div className="carousel w-full">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full h-[600px]">
          <img src={food1} className="w-full object-cover h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="absolute text-5xl font-bold text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Food 1
          </h1>
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full h-[600px]">
          <img src={food2} className="w-full object-cover h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="absolute text-5xl font-bold text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Food 2
          </h1>
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full h-[600px]">
          <img src={food3} className="w-full object-cover h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="absolute text-5xl font-bold text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Food 3
          </h1>
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full h-[600px]">
          <img src={food4} className="w-full object-cover h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="absolute text-5xl font-bold text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Food 4
          </h1>
          <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousal;
