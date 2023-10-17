import React from "react";
import { Category } from "../../../models/category";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import CategoryDetails from "../details/CategoryDetails";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

interface Props{
    categories: Category[];
}

export default observer(function CategoryDashboard({categories}: Props){
    const {categoryStore} = useStore();
    const {selectedCategory, editMode } = categoryStore;
    return(
        <Grid>
            <Grid.Column width='10'>
                <CategoryList categories={categories} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCategory && !editMode &&
                <CategoryDetails />}
                {editMode && 
                    <CategoryForm />
                }
            </Grid.Column>
        </Grid>
    )
})