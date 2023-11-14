import React from "react";
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react'; 
import { useStore } from "../app/stores/store";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function Navbar(){
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    MealPath
                </Menu.Item>
                <Menu.Item as={NavLink} to='/categories' name="Categories" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item position="right">
                    <Image src={user?.img || '../assets/user.png'} />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})