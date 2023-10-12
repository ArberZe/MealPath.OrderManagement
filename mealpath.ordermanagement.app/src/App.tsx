import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7155/api/category/all').then(response => {
      console.log(response.data);  
      setCategories(response.data);
    })
  }, [])


  return (
  <div>
      <Header as='h2' content='MealPath' />
        <List>
          {
            categories.map((category: any) => (
              <li key={category.categoryId}>{category.name}</li>
            ))
          }
        </List>          
    </div>
  );
}

export default App;
