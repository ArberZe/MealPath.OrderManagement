import React, { useState, ChangeEvent } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Category } from "../../../models/category";

interface Props{
    category: Category | undefined;
    closeForm: () => void;
    createOrEdit: (category: Category) => void;
}

export default function CategoryForm({category: selectedCategory, closeForm, createOrEdit}: Props){
    const initialState = selectedCategory ?? {
        categoryId: 0,
        name: ''
    }

    const [category, setCategory] = useState(initialState);

    function handleSubmit(){
        createOrEdit(category);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setCategory({...category, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='name' value={category.name} name='name' onChange={handleInputChange} />
                <Button positive floated='right' type="submit" content='Submit' />
                <Button onClick={closeForm} floated='right' type="button" content='Cancel' />

            </Form>
        </Segment>
    )
}