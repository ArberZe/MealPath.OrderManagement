import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router';
import Homepage from '../app/features/home/Homepage';
import LoginForm from '../app/features/Users/LoginForm';
import TestErrors from '../app/features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../app/features/errors/NotFound';
import ServerError from '../app/features/errors/ServerError';
import { useStore } from '../app/stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../app/common/modals/modalContainer';

function App() {
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Navbar />
      <Container style={{marginTop:'7em'}}>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/categories' Component={CategoryDashboard} />
          <Route path='/login' Component={LoginForm} />
          <Route path='/errors' Component={TestErrors} />
          <Route path='/server-error' Component={ServerError} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);