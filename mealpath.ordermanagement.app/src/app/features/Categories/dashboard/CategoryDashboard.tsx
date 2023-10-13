import React from "react";
import { Category } from "../../../models/category";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";

interface Props{
    categories: Category[];
}

export default function CategoryDashboard({categories}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <CategoryList categories={categories} />
            </Grid.Column>
            <Grid.Column width='6'>
                <CategoryForm />
            </Grid.Column>
        </Grid>
    )
}