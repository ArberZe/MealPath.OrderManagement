import React, { useState, ChangeEvent } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function CategoryForm(){
    const {categoryStore} = useStore();
    const {selectedCategory, closeForm, createCategory, updateCategory, loading} = categoryStore;
    
    const initialState = selectedCategory ?? {
        categoryId: 0,
        name: ''
    }

    const [category, setCategory] = useState(initialState);

    function handleSubmit(){
        category.categoryId ? updateCategory(category) : createCategory(category);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setCategory({...category, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='name' value={category.name} name='name' onChange={handleInputChange} />
                <Button loading={loading} positive floated='right' type="submit" content='Submit' />
                <Button onClick={closeForm} floated='right' type="button" content='Cancel' />

            </Form>
        </Segment>
    )
})