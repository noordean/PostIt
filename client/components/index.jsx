import React from 'react';

import Header from './header.jsx';
import Footer from './footer.jsx';

const Index = (props) => {
  return (<div>
    <Header />
    { props.children }
    <Footer />
  </div>
  );
};

export default Index;
