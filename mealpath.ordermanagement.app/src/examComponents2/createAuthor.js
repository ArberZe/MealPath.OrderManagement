import React, { useState } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateAuthor() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthYear, setBirthYear] = useState();
    const [alertMessage, setAlertMessage] = useState(false)

    const postData = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(birthYear);
        var name = firstName + " " + lastName
        axios.post(`https://localhost:7155/api/authors`, {
            name,
            birthYear
        }).then((response) => {
            setAlertMessage(true)
            console.log(response)
        })
    }
    return (
        <div>
            {alertMessage && 
                <Message
                    success
                    header='Your registration was successful'
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
                    <label>Birth Year</label>
                    <input placeholder='Birth Year' onChange={(e) => setBirthYear(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}