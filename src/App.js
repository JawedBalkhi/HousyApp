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
            <Link to="/">Over Housy</Link>
                <Link to="/Verhuis">Verhuisstromen</Link>
                <Link to="/Bevolkingsopbouw">Bevolkingsopbouw</Link>
            </Navigation>
        </Header>
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