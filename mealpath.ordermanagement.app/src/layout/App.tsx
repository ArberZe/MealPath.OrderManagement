import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Container } from 'semantic-ui-react';
import { Category } from '../app/models/category';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Category[]>('https://localhost:7155/api/category/all').then(response => {
      console.log(response.data);  
      setCategories(response.data);
    })
  }, [])

  function handleSelectCategory(id: number){
    setSelectedCategory(categories.find(x => x.categoryId === id));
  }

  function handleCancelSelectedCategory(){
    setSelectedCategory(undefined);
  }

  function handleFormOpen(id?: number){
    id? handleSelectCategory(id) : handleCancelSelectedCategory();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditCategory(category: Category){
    category.categoryId
    ? setCategories([...categories.filter(x => x.categoryId !== category.categoryId), category])
    : setCategories([...categories, category]);
    setEditMode(false);
    setSelectedCategory(category);
  }

  return (
    <div>
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop:'7em'}}>
        <CategoryDashboard 
          categories={categories} 
          selectedCategory = {selectedCategory}
          selectCategory={handleSelectCategory}
          cancelSelectedCategory= {handleCancelSelectedCategory}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditCategory}
        />
      </Container>
                
    </div>
  );
}

export default App;
