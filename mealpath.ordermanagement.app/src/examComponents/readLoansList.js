import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function ReadLoansList() {
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [statusList, setStatusList] = useState([{ id: 0, statusName: 'Accepted' }, { id: 1, statusName: 'Cancelled' }, { id: 2, statusName: 'Pending' }]);
    const [statusOptionsList, setStatusOptionsList] = useState([]);
    const [customerId, setCustomerId] = useState();

    useEffect(() => {
        axios.get(`https://localhost:7155/api/loans/all`)
            .then((response) => {
                setLoans(response.data)
            })

        axios.get(`https://localhost:7155/api/customer/all`)
            .then((response) => {
                setCustomers(response.data)
            })

        setStatusOptionsList([{ text: 'Accepted', value: 0 }, { text: 'Cancelled', value: 1 }, { text: 'Pending', value: 2 }])

    }, [])

    const getLoansByStatus = (status) => {
        axios.get('https://localhost:7155/api/loans/status', { params: { status } })
            .then((response) => {
                setLoans(response.data)
            })
    }

    const getLoansByCustomer = () => {
        axios.get(`https://localhost:7155/api/loans/customer/${customerId}`)
            .then((response) => {
                setLoans(response.data)
            })
    }

    return (
        <div>
            <Dropdown
                placeholder="Zgjedh statusin"
                fluid
                selection
                options={statusOptionsList}
                onChange={(e, data) => getLoansByStatus(data.value)}
            />

            <Form className="create-form">
                <Form.Field>
                    <input placeholder='Search' onChange={(e) => setCustomerId(e.target.value)} />
                </Form.Field>
                <Button onClick={getLoansByCustomer} type='submit'>Submit</Button>
            </Form>

            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Loan Id</Table.HeaderCell>
                        <Table.HeaderCell>Shuma</Table.HeaderCell>
                        <Table.HeaderCell>Statusi</Table.HeaderCell>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {loans.map((data) => {
                        return (
                            <Table.Row key={data.loanId}>
                                <Table.Cell>{data.loanId}</Table.Cell>
                                <Table.Cell>{data.amount}</Table.Cell>
                                <Table.Cell>{statusList.find(obj => obj.id == data.status).statusName}</Table.Cell>
                                <Table.Cell>{customers.find(obj => obj.customerId == data.customerId).name}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}