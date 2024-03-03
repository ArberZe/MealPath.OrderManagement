import React, { useState } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateApplicant() {
    const [fullname, setFullName] = useState('');
    const [alertMessage, setAlertMessage] = useState(false)

    const postData = () => {
        console.log(fullname);
        axios.post(`https://localhost:7155/api/applicants`, {
            fullname
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
                    <input placeholder='Emri' onChange={(e) => setFullName(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}