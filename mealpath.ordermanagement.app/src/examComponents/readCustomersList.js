import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios';

export default function ReadCustomersList() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7155/api/customer/all`)
        .then((response) => {
                console.log(response.data)
                setCustomers(response.data)
        })
    }, [])

    const handleClickDelete = async (id) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this record?"
          );

          if (userConfirmed) {
                axios.delete(`https://localhost:7155/api/customer/${id}`)
            }else{
                console.log('canceled')
            }
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Emri</Table.HeaderCell>
                        <Table.HeaderCell>Aktiv</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {customers.map((data) => {
                    return (
                    <Table.Row>
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.isActive ? 'Aktiv' : 'Jo aktiv'}</Table.Cell>
                        <Table.Cell><Button color='red' onClick={() => handleClickDelete(data.customerId)}>Delete</Button></Table.Cell>
                        </Table.Row>
                )})}
                </Table.Body>
            </Table>
        </div>
    )
}