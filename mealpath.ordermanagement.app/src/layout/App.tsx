import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router';
import Homepage from '../app/features/home/Homepage';
import CategoryForm from '../app/features/Categories/form/CategoryForm';
import CategoryDetails from '../app/features/Categories/details/CategoryDetails';

function App() {
  return (
    <>
      <Navbar />
      <Container style={{marginTop:'7em'}}>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/categories' Component={CategoryDashboard} />
        </Routes>
      </Container>
                
    </>
  );
}

export default observer(App);
