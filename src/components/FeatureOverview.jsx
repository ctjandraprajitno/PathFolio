import React from 'react';

function FeatureOverview({ title, children }) {
  return (
    <section className="feature-overview">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

export default FeatureOverview;
