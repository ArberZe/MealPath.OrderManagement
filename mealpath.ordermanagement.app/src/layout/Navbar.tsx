import React from "react";
import { Menu, Container, Button } from 'semantic-ui-react'; 
import { useStore } from "../app/stores/store";

export default function Navbar(){
    const {categoryStore} = useStore();

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    MealPath
                </Menu.Item>
                <Menu.Item name="Categories" />
                <Menu.Item>
                    <Button onClick={() => categoryStore.openForm()} positive content="Create Category" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}