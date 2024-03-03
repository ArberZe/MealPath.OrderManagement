import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function ReadApplicantsList() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7155/api/applicants/all')
            .then((response) => {
                setApplicants(response.data)
            })
    }, [])

    return (
        <div>
            {(
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Applicants Id</Table.HeaderCell>
                        <Table.HeaderCell>Fullname</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {applicants.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.fullname}</Table.Cell>
                                <Table.Cell><Button color='info'>Edit</Button></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            )}
        </div>
    )
}