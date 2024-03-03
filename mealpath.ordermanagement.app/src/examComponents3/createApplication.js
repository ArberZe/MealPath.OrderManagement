import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Message, Dropdown } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateApplications() {
    const [date, setDate] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [applicantId, setApplicantId] = useState();
    const [alertMessage, setAlertMessage] = useState(false);
    const [applicants, setApplicants] = useState([]);

    const postData = () => {
        axios.post(`https://localhost:7155/api/applications`, {
            date,
            isActive,
            applicantId
        }).then((response) => {
            setAlertMessage(true)
        })
    }

    useEffect(() => {
        axios.get(`https://localhost:7155/api/applicants/all`)
            .then((response) => {
                setApplicants(response.data.map(item => ({text: item.fullname, value: item.id})))
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
                    <label>Data</label>
                    <input placeholder='Data' onChange={(e) => setDate(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder="Choose applicant"
                    fluid
                    selection
                    value={applicantId}
                    options={applicants}
                    onChange={(e, data) => setApplicantId(data.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Aktiv' onChange={(e) => setIsActive(!isActive)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}