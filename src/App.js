import React from 'react';
import './App.css';
import { Layout,Header,Navigation,Drawer,Content } from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';

function App() {
  return (
   
    <div className="demo-big-content">

    <Layout fixedHeader>
        <Header  className ='header-color' title="Housy" scroll>
            <Navigation>
            <Link to="/">Home</Link>
                <Link to="/Verhuis">Verhuisstrommen</Link>
                <Link to="/typewonning">Typewonning</Link>
              
            </Navigation>
        </Header>
        <Drawer title="Housy">
            <Navigation>
            <Link to="/">Home</Link>
                <Link to="/Verhuis">Verhuisstrommen</Link>
                <Link to="/typewonning">Typewonning</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
    </Layout>
</div>
   
  );
}

export default App;
// test