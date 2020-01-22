import React from 'react';
import {createGlobalStyle} from'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './components/routing';
import Footer from './components/footer';

const GlobalStyle = createGlobalStyle`

body{
  scroll: smooth;
  padding:0;
  margin:0;
  background: #131419;
  min-height:90vh;
}
`;

function App() {
  return (
    <div>
      <GlobalStyle/>
      <Routing/>
      <div style={{padding:"10px"}}>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
