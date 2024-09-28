import React from 'react';
import '../html/css/TypeNumContainer.css'; // Import the CSS file

export default function TypeNumContainer({
  dataForTypeNum,
  summary
}) {
  return (
    <div className="container">
      <div className="content">
        <div className="left-column">
          {/* Display dynamic big text */}
          <div className="big-text">{dataForTypeNum}</div>
        </div>
        <div className="right-column">
          {/* Display dynamic summary */}
          <div className="bullet-list" dangerouslySetInnerHTML={{ __html: summary }} />

        </div>
      </div>
    </div>
  );
}
