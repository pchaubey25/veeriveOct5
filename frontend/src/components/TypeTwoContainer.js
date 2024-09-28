import React from 'react';
import '../html/css/TypeTwoContainer.css';

export default function TypeTwoContainer({
  contextTitle,
  summary,
  postTitles,
  bannerShow,
  homePageShow,
  themes,
}) {
  return (
    <div className="article-container">

      {/* Dynamically display the contextTitle as the main headline */}
      <h2>{contextTitle || 'Default Headline'}</h2>

      <div className="bullet-list" dangerouslySetInnerHTML={{ __html: summary }} />


      <div className="subheadings">
        {/* Dynamically display the first two post titles as subheadings */}
        {postTitles.slice(0, 2).map((title, index) => (
          <div className="subheading" key={index}>
            <h3>{title}</h3>
          </div>
        ))}
      </div>
        <div>
        <hr/>
        </div>
    </div>
  );
}
