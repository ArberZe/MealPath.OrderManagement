import React from "react";
import { Category } from "../../../models/category";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import CategoryDetails from "../details/CategoryDetails";

interface Props{
    categories: Category[];
    selectedCategory: Category | undefined;
    selectCategory: (id: number) => void;
    cancelSelectedCategory: () => void;
    editMode : boolean;
    openForm : (id: number) => void;
    closeForm : () => void; 
}

export default function CategoryDashboard({categories, selectedCategory, 
    selectCategory, cancelSelectedCategory, editMode, openForm, closeForm}: Props){
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
                    <CategoryForm category={selectedCategory} closeForm={closeForm}/>
                }
            </Grid.Column>
        </Grid>
    )
}