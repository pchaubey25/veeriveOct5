import React from 'react';
import '../../html/css/TypeOneContainer.css'; // Import the CSS file

export default function TypeOneContainer () {
    return (
        <div className="article-container">
          <div className="image-placeholder">1000 x 630</div>
          <div className="category">
            <span>Lending | Fintech</span>
          </div>
          <h4 className="headline">
            'Fintech company UsPlus unlocks growth opportunities for SMEs in
          </h4>
          <div className="metrics">
            <div className="metric">
              <div className="metric-icon trending">0</div>
              <div>Trending Pulse</div>
            </div>
            <div className="metric">
              <div className="metric-icon disruption">7</div>
              <div>Disruption Potential</div>
            </div>
            <div className="metric">
              <div className="metric-icon predictive">0</div>
              <div>Predictive Momentum</div>
            </div>
          </div>
        </div>
      );
    };

    //////////////////////////
    // ContainerTypeOne.js
// import React from 'react';

// const ContainerTypeOne = ({ article }) => (
//   <div className="container-type-one">
//     <h2>{article.title}</h2>
//     <p>{article.content}</p>
//   </div>
// );

// export default ContainerTypeOne;

///////////////////////////
// ContainerTypeTwo.js
// import React from 'react';

// const ContainerTypeTwo = ({ articles }) => (
//   <div className="container-type-two">
//     {articles.map((article, index) => (
//       <div key={index}>
//         <h2>{article.title}</h2>
//         <p>{article.content}</p>
//       </div>
//     ))}
//   </div>
// );

// export default ContainerTypeTwo;
