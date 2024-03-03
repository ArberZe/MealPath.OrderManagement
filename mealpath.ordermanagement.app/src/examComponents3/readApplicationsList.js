import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function ReadApplicationsList() {
    const [applications, setApplications] = useState([]);
    const [date, setDate] = useState('');
    const [authorId, setAuthorId] = useState();

    useEffect(() => {
        axios.get('https://localhost:7155/api/applications/all')
            .then((response) => {
                setApplications(response.data)
            })
    }, [])

    const getApplicationsByAuthor = () => {
        axios.get(`https://localhost:7155/api/applications/applicant/${authorId}`)
            .then((response) => {
                setApplications(response.data)
            })
    }

    const getApplicationsByDate = () => {
        console.log(date)
        axios.get(`https://localhost:7155/api/applications/date`, { params : { date: date } })
            .then((response) => {
                setApplications(response.data)
            })
    }

    return (
        <div>
            <Form className='create-form'>
                <Form.Field>
                    <input placeholder='Search by date' onChange={(e) => setDate(e.target.value)} />
                </Form.Field>
                <Button onClick={getApplicationsByDate} type='submit'>Submit</Button>
            </Form>
            <Form className='create-form'>
                <Form.Field>
                    <input placeholder='Search by applicant' onChange={(e) => setAuthorId(e.target.value)} />
                </Form.Field>
                <Button onClick={getApplicationsByAuthor} type='submit'>Submit</Button>
            </Form>
            {(
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Application Id</Table.HeaderCell>
                        <Table.HeaderCell>Is active</Table.HeaderCell>
                        <Table.HeaderCell>Customer id</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {applications.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.isActive ? "true" : "false"}</Table.Cell>
                                <Table.Cell>{data.applicantId}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            )}
        </div>
    )
}