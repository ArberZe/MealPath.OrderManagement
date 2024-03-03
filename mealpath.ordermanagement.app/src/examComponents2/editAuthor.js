import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

export default function EditAuthor(props) {
    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState();
    const [alertMessage, setAlertMessage] = useState(false)

    useEffect(()  => {
        setName(props.author.name);
        setBirthYear(props.author.birthYear);
    }, []);

    const postData = () => {
        console.log(name);
        console.log(birthYear);
        console.log(props.author)
        axios.put(`https://localhost:7155/api/authors/${props.author.authorId}`, {
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
                    header='Your update was successful'
                />
            }
              
            <Form className="create-form">
                <Form.Field>
                    <label>Emri</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Birth Year</label>
                    <input placeholder='Birth Year' value={birthYear} onChange={(e) => setBirthYear(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}