import React, { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {categoryStore} = useStore();

  useEffect(() => {
    categoryStore.loadCategories();
  }, [categoryStore])

  if(categoryStore.loadingInitial) return <LoadingComponent content='Loading App'/>

  return (
    <>
      <Navbar />
      <Container style={{marginTop:'7em'}}>
        <CategoryDashboard 
          categories={categoryStore.categories} 
        />
      </Container>
                
    </>
  );
}

export default observer(App);
