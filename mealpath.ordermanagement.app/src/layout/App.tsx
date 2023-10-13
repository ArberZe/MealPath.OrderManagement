import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Container } from 'semantic-ui-react';
import { Category } from '../app/models/category';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editMode, setEditMode] = useState(false);

  function handleFormOpen(id?: string){

  }
  
  useEffect(() => {
    axios.get<Category[]>('https://localhost:7155/api/category/all').then(response => {
      console.log(response.data);  
      setCategories(response.data);
    })
  }, [])


  return (
    <div>
      <Navbar />
      <Container style={{marginTop:'7em'}}>
        <CategoryDashboard categories={categories} />
      </Container>
                
    </div>
  );
}

export default App;
