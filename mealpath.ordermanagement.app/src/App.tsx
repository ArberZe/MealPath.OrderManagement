import React, { useEffect } from "react";
import { Header, CreateContainer, MainContainer, Login, Signup, MenuContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Products from './components/Admin/ProductList';
import LoginForm from './app/features/Users/LoginForm';
import CategoryDashboard from './app/features/Categories/dashboard/CategoryDashboard';
import TestErrors from './app/features/errors/TestError';
import ServerError from './app/features/errors/ServerError';
import LoadingComponent from './app/layout/LoadingComponent';
import { useStore } from './app/stores/store';
import ModalContainer from './app/common/modals/modalContainer'
import { ToastContainer } from 'react-toastify';
import { Container } from "semantic-ui-react";
import NotFound from "./app/features/errors/NotFound";


const App = () => {
    const {commonStore, userStore} = useStore();

    useEffect(() => {
      if(commonStore.token){
        userStore.getUser().finally(() => commonStore.setAppLoaded());
      }else{
        commonStore.setAppLoaded();
      }
    }, [commonStore, userStore]);

    //if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
        
    return (
        <>
        <AnimatePresence /*exitBeforeEnter*/ >
        <ToastContainer position='bottom-right' hideProgressBar />
        <ModalContainer />
            <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />
                <Container style={{marginTop:'7em'}}>
                    <main className="mt-14 md:mt-20 px-4 md:px-16 py-4  w-full">
                        <Routes>
                            <Route path="/*" element={<MainContainer />} />
                            <Route path="/createItem" element={<CreateContainer />} />
                            <Route path="/productList" element={<Products />} />
                            <Route path="/menu" element={<MenuContainer />} />
                            <Route path='/categories' Component={CategoryDashboard} />
                            <Route path='/login' Component={LoginForm} />
                            <Route path='/errors' Component={TestErrors} />
                            <Route path='/server-error' Component={ServerError} />
                            <Route path='*' Component={NotFound} />
                        </Routes>
                    </main>
                </Container>
            </div>
        </AnimatePresence>
        </>
    );
};


export default App;
