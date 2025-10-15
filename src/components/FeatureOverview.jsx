import React from 'react';

const FeatureOverview = ({ title, children }) => (
  <section className="feature-overview">
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
);

export default FeatureOverview;
