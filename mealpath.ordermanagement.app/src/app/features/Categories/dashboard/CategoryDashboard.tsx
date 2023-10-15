import React from "react";
import { Category } from "../../../models/category";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import CategoryDetails from "../details/CategoryDetails";
import { create } from "domain";

interface Props{
    categories: Category[];
    selectedCategory: Category | undefined;
    selectCategory: (id: number) => void;
    cancelSelectedCategory: () => void;
    editMode : boolean;
    openForm : (id: number) => void;
    closeForm : () => void; 
    createOrEdit: (category: Category) => void;
    submitting: boolean;
}

export default function CategoryDashboard({categories, selectedCategory, 
    selectCategory, cancelSelectedCategory, editMode, openForm, closeForm, createOrEdit, submitting}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <CategoryList categories={categories} selectCategory={selectCategory} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCategory && !editMode &&
                <CategoryDetails
                    category={selectedCategory} 
                    cancelSelectedCategory={cancelSelectedCategory}
                    openForm={openForm}
                 />}
                {editMode && 
                    <CategoryForm 
                    category={selectedCategory} 
                    closeForm={closeForm} 
                    createOrEdit={createOrEdit} 
                    submitting={submitting} />
                }
            </Grid.Column>
        </Grid>
    )
}