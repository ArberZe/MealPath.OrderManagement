import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Category } from "../../../models/category";

interface Props{
    category: Category | undefined;
    closeForm: () => void;
}

export default function CategoryForm({category, closeForm}: Props){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='name' />
                <Button positive floated='right' type="submit" content='Submit' />
                <Button onClick={closeForm} floated='right' type="button" content='Cancel' />

            </Form>
        </Segment>
    )
}