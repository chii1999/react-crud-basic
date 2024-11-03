import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import { Container } from "react-bootstrap"

export default function TemplateLayout({ children }) {
    return (
        <React.Fragment>
            <NavbarComponent />
            <Container>
                {children}
            </Container>
        </React.Fragment>
    )
}
