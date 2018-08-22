import React from 'react';

const Header = ({ title }) => (
    <div className="instructions">
      <div style={{backgroundColor: "#f44336", height: 71}}><img src="/images/eco-green-apple-icon-152-183645.png" alt="fourscore-logo" height="71" /></div>
      <h1>{title}</h1>
    </div>
);

export default Header;
