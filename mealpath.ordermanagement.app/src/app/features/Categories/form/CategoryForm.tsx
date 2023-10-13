import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";

export default function CategoryForm(){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='name' />
                <Button positive floated='right' type="submit" content='Submit' />
                <Button floated='right' type="button" content='Cancel' />

            </Form>
        </Segment>
    )
}