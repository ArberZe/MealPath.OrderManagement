import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import { set } from 'mobx';

export default function CreateLoan() {
    const [amount, setAmount] = useState();
    const [customerId, setCustomerId] = useState();
    const [status, setStatus] = useState();
    const [customers, setCustomers] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [alertMessage, setAlertMessage] = useState(false)
    const postData = () => {
        axios.post(`https://localhost:7155/api/loans`, {
            amount,
            status,
            customerId
        }).then((response)=>{
            setAlertMessage(true)
        })
    }
    useEffect(() => {
        axios.get(`https://localhost:7155/api/customer/all`)
        .then((response) => {
                console.log(response.data)
                setCustomers(response.data.map(item => ({text: item.name, value: item.customerId})))
        })

        setStatusList([{text: 'Accepted', value: 0}, {text: 'Cancelled', value: 1}, {text: 'Pending', value: 2}])
    }, [])
    return (
        <div>
            {
                alertMessage && (
                    <Message
                        success
                        header='Your user registration was successful'
                    />
                )
            }
              
            <Form className="create-form">
                <Form.Field>
                    <label>Shuma</label>
                    <input placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder="Zgjedh customer"
                    fluid
                    selection
                    value={customerId}
                    options={customers}
                    onChange={(e, data) => setCustomerId(data.value)}
                    />
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder="Zgjedh statusin"
                    fluid
                    selection
                    value={status}
                    options={statusList}
                    onChange={(e, data) => setStatus(data.value)}
                    />
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}