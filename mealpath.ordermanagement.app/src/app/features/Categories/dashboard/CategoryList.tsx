import React from "react";
import { Category } from "../../../models/category";
import { Segment, List } from "semantic-ui-react";

interface Props{
    categories: Category[];
}

export default function CategoryList({categories}: Props){
    return (
        <Segment>
            <List celled>
                {categories.map(category => (
                    <List.Item key={category.categoryId}>
                        <List.Content>
                            <List.Header>{category.name}</List.Header>
                            {category.categoryId}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Segment>
    )
}