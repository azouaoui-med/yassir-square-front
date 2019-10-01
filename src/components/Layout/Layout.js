import React from 'react';
import Navbar from '../UI/Navbar/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="container pt-4">Content</main>
    </div>
  );
};

export default Layout;
