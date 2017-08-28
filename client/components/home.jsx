import React from 'react';

import Dashboard from './dashboard.jsx';

const Home = () => {
  if (localStorage.user) {
    return <Dashboard />;
  }
  return (
    <blockquote> A small group of thoughtful people could change the world</blockquote>
  );
};

export default Home;
