import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import LoginForm from '../Users/LoginForm';
import RegisterForm from '../Users/RegisterForm';

export default function Homepage(){
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container style={{marginTop: '7em'}}>
                <Header as='h1' inverted>
                    MealPath
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to MealPath' />
                    <Button as={Link} to='/products' size='huge' inverted>
                        Go to products!
                    </Button>
                    </>

                ) : (
                <>
                <Button onClick={() => modalStore.openModal(<LoginForm />)} to='/login' size='huge' inverted>
                    Login to Mealpath!
                </Button>
                <Button onClick={() => modalStore.openModal(<RegisterForm />)} to='/login' size='huge' inverted>
                    Register to Mealpath!
                </Button>
                </>
            )}
            </Container>
        </Segment>
    )
}