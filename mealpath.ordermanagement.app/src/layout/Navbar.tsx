import React from "react";
import { Menu, Container, Button } from 'semantic-ui-react'; 
interface Props{
    openForm: () => void;
}

export default function Navbar({openForm}: Props){
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    MealPath
                </Menu.Item>
                <Menu.Item name="Categories" />
                <Menu.Item>
                    <Button onClick={openForm} positive content="Create Category" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}