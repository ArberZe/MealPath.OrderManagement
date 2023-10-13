import React from "react";
import { Category } from "../../../models/category";
import { Segment, List, Button } from "semantic-ui-react";

interface Props{
    categories: Category[];
    selectCategory: (id: number) => void;
}

export default function CategoryList({categories, selectCategory}: Props){
    return (
        <Segment>
            <List celled>
                {categories.map(category => (
                    <List.Item key={category.categoryId}>
                        <List.Content>
                            <List.Header>{category.name}</List.Header>
                            {category.categoryId}
                            <Button onClick={() => selectCategory(category.categoryId)} floated="right" content="View" color="blue" />
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Segment>
    )
}