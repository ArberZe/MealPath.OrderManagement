import React from "react";
import { Menu, Container, Button } from 'semantic-ui-react'; 
import { useStore } from "../app/stores/store";
import { NavLink } from "react-router-dom";

export default function Navbar(){

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    MealPath
                </Menu.Item>
                <Menu.Item as={NavLink} to='/categories' name="Categories" />
            </Container>
        </Menu>
    )
}