
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Index = props => (<div>
  <Header />
  { props.children }
  <Footer />
</div>
);

export default Index;
