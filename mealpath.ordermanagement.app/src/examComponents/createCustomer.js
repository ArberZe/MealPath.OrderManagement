import React, { useState } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateCustomer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false)

    const postData = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(isActive);
        var name = firstName + " " + lastName
        axios.post(`https://localhost:7155/api/customer`, {
            name,
            isActive
        }).then((response) => {
            setAlertMessage(true)
        })
    }
    return (
        <div>
            {alertMessage && 
                <Message
                    success
                    header='Your user registration was successful'
                />
            }
              
            <Form className="create-form">
                <Form.Field>
                    <label>Emri</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Mbiemri</label>
                    <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Aktiv' onChange={(e) => setIsActive(!isActive)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}