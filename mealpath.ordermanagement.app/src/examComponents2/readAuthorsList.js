import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import EditAuthor from './editAuthor';

export default function ReadAuthorsList() {
    const [authors, setAuthors] = useState([]);
    const [editMode, setEditMode] = useState();
    const [authorToEdit, setAuthorToEdit] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7155/api/authors/all')
            .then((response) => {
                setAuthors(response.data)
            })
    }, [])

    const handleUpdate = (data) => {
        setEditMode(true)
        console.log(data)
        setAuthorToEdit(data)
    }

    return (
        <div>
            {editMode ? (
                <EditAuthor author={authorToEdit} />
            ) : (
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Author Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Birth Year</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {authors.map((data) => {
                        return (
                            <Table.Row key={data.authorId}>
                                <Table.Cell>{data.authorId}</Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.birthYear}</Table.Cell>
                                <Table.Cell><Button color='info' onClick={() => handleUpdate(data)}>Edit</Button></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            )}
        </div>
    )
}