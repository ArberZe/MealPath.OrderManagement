import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateBook() {
    const [title, setTitle] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [authorId, setAuthorId] = useState();
    const [alertMessage, setAlertMessage] = useState(false)
    const [authors, setAuthors] = useState([])
    const postData = () => {
        console.log(title);
        console.log(publicationYear);
        console.log(authorId);
        axios.post(`https://localhost:7155/api/books`, {
            title,
            publicationYear,
            authorId
        }).then((response) => {
            setAlertMessage(true)
            console.log(response)
        })
    }

    useEffect(() => {
        axios.get(`https://localhost:7155/api/authors/all`)
        .then((response) => {
                console.log(response.data)
                setAuthors(response.data.map(item => ({text: item.name, value: item.authorId})))
        })

    }, [])

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
                    <label>Title</label>
                    <input placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Publication Year</label>
                    <input placeholder='publication year' onChange={(e) => setPublicationYear(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                <Dropdown
                    placeholder="Choose author"
                    fluid
                    selection
                    value={authorId}
                    options={authors}
                    onChange={(e, data) => setAuthorId(data.value)}
                    />
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}