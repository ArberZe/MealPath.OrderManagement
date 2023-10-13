import React from "react";
import { Menu, Container, Button } from 'semantic-ui-react'; 
export default function Navbar(){
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    MealPath
                </Menu.Item>
                <Menu.Item name="Categories" />
                <Menu.Item>
                    <Button positive content="Create Category" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}