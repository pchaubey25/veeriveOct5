import React from 'react';
import '../../html/css/TypeThreeContainer.css';

export default function TypeThreeContainer({
  contextTitle,
  summary,
  postTitles,
  bannerShow,
  homePageShow,
  themes,
}) {
  return (
    <div className="container">
      <div className="header">
        {bannerShow && <span className="exclusive-label">EXCLUSIVE</span>}
        <h1 className="headline">{contextTitle || 'Default Headline'}</h1>
        <div className="bullet-list" dangerouslySetInnerHTML={{ __html: summary }} />

      </div>

      <div className="card-grid">
        {postTitles.slice(0, 3).map((title, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2 className="card-title">{title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Show theme-related content if themes are available 
      {themes.length > 0 && (
        <div className="themes-section">
          <h3>Themes:</h3>
          <ul>
            {themes.map((theme, index) => (
              <li key={index}>{theme}</li>
            ))}
          </ul>
        </div>
      )}
      */}

    </div>
  );
}
