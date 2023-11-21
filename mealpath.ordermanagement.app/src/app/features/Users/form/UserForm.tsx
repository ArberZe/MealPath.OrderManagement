import React, { useState } from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Formik, Form,  } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../common/form/MyTextInput";
import { UserRole } from "../../../models/UserRole";
import MySelectInput from "../../../common/form/MySelectInput";
import { RoleOptions } from "../../../common/options/roleOptions";

export default observer(function CategoryForm(){
    const {userStore} = useStore();
    const {selectedUser, closeForm, updateUser, loading} = userStore;
    
    const initialState = {
        userId: selectedUser.userId,
        email: selectedUser.email,
        roleName: ''
    }

    const validationSchema = Yup.object({
    })

    const [user, setUser] = useState(initialState);

    function handleFormSubmit(user: UserRole){
        //user.userId ? updateUser(user) : createUser(user);
        updateUser(user)
    }

    return (
        <Segment clearing>
        <Header content='User details' sub color='teal' />
        <Formik 
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={values => handleFormSubmit(values)} initialValues={user}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name='userId' placeholder={user.userId} disabled={true} />
                <MyTextInput name='email' placeholder={user.email} disabled={true} />
                <MySelectInput name="roleName" options={RoleOptions}  placeholder="role name" />
                <Button 
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={loading} 
                    positive 
                    floated='right' 
                    type="submit" 
                    content='Submit' />
                <Button onClick={closeForm} floated='right' type="button" content='Cancel' />
            </Form>
            )}
        </Formik>

        </Segment>
    )
})