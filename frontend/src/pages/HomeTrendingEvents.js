import React from "react";
import '../html/css/bootstrap.min.css';
import '../html/css/swiper-bundle.min.css';
import '../html/css/main.css';

export default function HomeTrendingEvents () {

  return (
    <section className="sectionPadding">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-8">
            <h3 className="h5 text-uppercase">Trending Events</h3>
          </div>
          <div className="col-xl-4 col-4 text-end">
            <a href="#" className="simpleLink text-uppercase font14">
              View all <i className="fa-solid fa-circle-arrow-right"></i>
            </a>
          </div>
          <div className="col-xl-12 mb-4">
            <hr className="my-0" />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
            <div className="newsBoxOne">
              <a href="#">
                <img
                  src="images/svgs/1000x630.svg"
                  alt="1000x630"
                  className="img-fluid"
                />
              </a>
              <h6 className="lightGreenBorder d-inline-block my-3 pb-1">Business</h6>
              <a href="#" className="newsBoxOneHead mb-3">
                ’Afterpay Day’ – a Shopping Event Results In 35% Growth in New Customers for the BNPL Giant
              </a>
              <ul>
                <li>
                  <span className="trendNumber">7</span>
                  <span>Trending Pulse</span>
                </li>
                <li>
                  <span className="trendNumber">9</span>
                  <span>Disruption Potential</span>
                </li>
                <li>
                  <span className="trendNumber">8</span>
                  <span>Predictive Momentum</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
            <div className="newsBoxOne">
              <a href="#">
                <img
                  src="images/svgs/1000x630.svg"
                  alt="1000x630"
                  className="img-fluid"
                />
              </a>
              <h6 className="purpleBorder d-inline-block my-3 pb-1">Sports</h6>
              <a href="#" className="newsBoxOneHead mb-3">
                ’Afterpay Day’ – a Shopping Event Results In 35% Growth in New Customers for the BNPL Giant
              </a>
              <ul>
                <li>
                  <span className="trendNumber">7</span>
                  <span>Trending Pulse</span>
                </li>
                <li>
                  <span className="trendNumber">9</span>
                  <span>Disruption Potential</span>
                </li>
                <li>
                  <span className="trendNumber">8</span>
                  <span>Predictive Momentum</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
            <div className="newsBoxOne">
              <a href="#">
                <img
                  src="images/svgs/1000x630.svg"
                  alt="1000x630"
                  className="img-fluid"
                />
              </a>
              <h6 className="cyanBorder d-inline-block my-3 pb-1">Inspiration</h6>
              <a href="#" className="newsBoxOneHead mb-3">
                ’Afterpay Day’ – a Shopping Event Results In 35% Growth in New Customers for the BNPL Giant
              </a>
              <ul>
                <li>
                  <span className="trendNumber">7</span>
                  <span>Trending Pulse</span>
                </li>
                <li>
                  <span className="trendNumber">9</span>
                  <span>Disruption Potential</span>
                </li>
                <li>
                  <span className="trendNumber">8</span>
                  <span>Predictive Momentum</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
            <div className="newsBoxOne">
              <a href="#">
                <img
                  src="images/svgs/1000x630.svg"
                  alt="1000x630"
                  className="img-fluid"
                />
              </a>
              <h6 className="redBorder d-inline-block my-3 pb-1">Technology</h6>
              <a href="#" className="newsBoxOneHead mb-3">
                ’Afterpay Day’ – a Shopping Event Results In 35% Growth in New Customers for the BNPL Giant
              </a>
              <ul>
                <li>
                  <span className="trendNumber">7</span>
                  <span>Trending Pulse</span>
                </li>
                <li>
                  <span className="trendNumber">9</span>
                  <span>Disruption Potential</span>
                </li>
                <li>
                  <span className="trendNumber">8</span>
                  <span>Predictive Momentum</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};