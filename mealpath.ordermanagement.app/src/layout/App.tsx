import React, { useEffect, useState } from 'react';
import { Header, List, Container } from 'semantic-ui-react';
import { Category } from '../app/models/category';
import Navbar from './Navbar';
import CategoryDashboard from '../app/features/Categories/dashboard/CategoryDashboard';
import agent from '../app/api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Categories.list().then(response => {
      setCategories(response);
      setLoading(false);
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
    setSubmitting(true);
    if(category.categoryId){
      agent.Categories.update(category).then(() => {
        setCategories([...categories.filter(x => x.categoryId !== category.categoryId), category]);
        setSelectedCategory(category);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      agent.Categories.create(category).then(() => {
        setCategories([...categories, category]);
        setSelectedCategory(category);
        setEditMode(false);
        setSubmitting(false);
      })
    }

    // category.categoryId
    // ? setCategories([...categories.filter(x => x.categoryId !== category.categoryId), category])
    // : setCategories([...categories, category]);
    // setEditMode(false);
    // setSelectedCategory(category);
  }

  if(loading) return <LoadingComponent content='Loading App'/>

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
          submitting={submitting}
        />
      </Container>
                
    </div>
  );
}

export default App;
