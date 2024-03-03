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
import UserDashboard from "./app/features/Users/Dashboard/UserDashboard";
import { observer } from "mobx-react-lite";
import {FoodContainer1} from "./components";
import  Success  from "./components/Success";
import  Cancelled  from "./components/Cancelled";
import RequireAuth from "./components/RequireAuth";
import UnauthorizedComponent from "./components/notAuthorized";
import CreateCustomer from "./examComponents/createCustomer";
import ReadCustomersList from "./examComponents/readCustomersList";
import CreateLoan from "./examComponents/createLoan";
import ReadLoansList from "./examComponents/readLoansList";
import CreateAuthor from "./examComponents2/createAuthor";
import CreateBook from "./examComponents2/createBook";
import ReadBooksList from "./examComponents2/readBooksList";
import ReadAuthorsList from "./examComponents2/readAuthorsList";
import CreateApplicant from "./examComponents3/createApplicant";
import ReadApplicantsList from "./examComponents3/readApplicantsList";
import CreateApplications from "./examComponents3/createApplication";
import ReadApplicationsList from "./examComponents3/readApplicationsList";

const App = () => {
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
        <AnimatePresence /*exitBeforeEnter*/ >
        <ToastContainer position='bottom-right' hideProgressBar />
        <ModalContainer />
            <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />
                <Container style={{marginTop:'7em'}}>
                    <main className="mt-14 md:mt-20 px-4 md:px-16 py-4  w-full">
                        <Routes>



                            {/**Routes accessible Anonymous users */}
                            <Route path="/*" element={<MainContainer />} />
                            <Route path="/menu" element={<MenuContainer />} />
                            <Route path='/foodContainer' element={<FoodContainer1/>} />
                            <Route path='/login' Component={LoginForm} />
                            <Route path='/success' element={<Success/>} />
                            <Route path='/cancelled' element={<Cancelled/>} />
                            <Route path='/unauthorized' element={<UnauthorizedComponent />} />

                            <Route path='/createCustomer' Component={CreateCustomer} />
                            <Route path='/customers' Component={ReadCustomersList} />
                            <Route path='/createLoan' Component={CreateLoan} />
                            <Route path='/loans' Component={ReadLoansList} />

                            <Route path='/server-error' Component={ServerError} />
                            <Route path='/errors' Component={TestErrors} />

                            <Route path='/createAuthor' Component={CreateAuthor} />
                            <Route path='/createBook' Component={CreateBook} />
                            <Route path='/books' Component={ReadBooksList} />
                            <Route path='/authors' Component={ReadAuthorsList} />

                            <Route path='/createApplicant' Component={CreateApplicant} />
                            <Route path='/applicants' Component={ReadApplicantsList} />

                            <Route path='/createApplications' Component={CreateApplications} />
                            <Route path='/applications' Component={ReadApplicationsList} />

                            {/**Routes accessible authenticated users */}

                            {/**Routes accessible only to SuperAdmin and Admin Role */}
                            <Route element={<RequireAuth allowedRoles={['Admin', 'SuperAdmin']}/>}>
                                <Route path='/categories' Component={CategoryDashboard} />
                                <Route path="/productList" element={<Products />} />
                                <Route path="/createItem" element={<CreateContainer />} />
                            </Route>

                            {/**Routes accessible only to only SuperAdmin Role */}
                            <Route element={<RequireAuth allowedRoles={['SuperAdmin']}/>}>
                                <Route path="/allUsers" Component={UserDashboard} />
                            </Route>
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </main>
                </Container>
            </div>
        </AnimatePresence>
        </>
    );
};


export default observer(App);
