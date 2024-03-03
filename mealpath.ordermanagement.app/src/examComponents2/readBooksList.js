import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function ReadBooksList() {
    const [authorName, setAuthorName] = useState('');
    const [publicationYear, setPublicationYear] = useState();
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);

    const getBooksByAuthorName = () => {
        axios.get('https://localhost:7155/api/books/author', { params: { name: authorName } })
            .then((response) => {
                setBooks(response.data)
            })
    }

    const getBooksByPublicationYear = () => {
        axios.get(`https://localhost:7155/api/books/year`, { params: { year: publicationYear }})
            .then((response) => {
                setBooks(response.data)
            })
    }

    useEffect(() => {
        axios.get('https://localhost:7155/api/authors/all')
            .then((response) => {
                setAuthors(response.data)
            })
    }, [])

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <input placeholder='Search by author' onChange={(e) => setAuthorName(e.target.value)} />
                </Form.Field>
                <Button onClick={getBooksByAuthorName} type='submit'>Submit</Button>
            </Form>
            <Form>
            <Form.Field>
                    <input placeholder='Search by publication year' onChange={(e) => setPublicationYear(e.target.value)} />
                </Form.Field>
                <Button onClick={getBooksByPublicationYear} type='submit'>Submit</Button>
            </Form>

            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book Id</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Publication Year</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {books.map((data) => {
                        return (
                            <Table.Row key={data.bookId}>
                                <Table.Cell>{data.bookId}</Table.Cell>
                                <Table.Cell>{data.title}</Table.Cell>
                                <Table.Cell>{data.publicationYear}</Table.Cell>
                                <Table.Cell>{authors.find(obj => obj.authorId == data.authorId).name}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}