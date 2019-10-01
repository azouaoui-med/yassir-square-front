import React from 'react';
import apple from '../../../assets/apple.svg';
import android from '../../../assets/android.svg';

const Footer = () => {
  return (
    <div className="footer">
      <h5>Available on</h5>
      <img src={apple} />
      <img src={android} />
    </div>
  );
};

export default Footer;
