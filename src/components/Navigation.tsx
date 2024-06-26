import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }: NavigationProps){

    const [backgroundTheme, setBackgroundTheme] = useState('dark');
    
    return (
        <Navbar expand='lg' data-bs-theme={backgroundTheme} bg={backgroundTheme}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>To-Do List</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link href='/'>Create Task</Nav.Link>
                                <Nav.Link href='/'>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link href='/'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        <Button onClick={() => setBackgroundTheme(backgroundTheme === 'dark' ? 'light' : 'dark')}><FontAwesomeIcon icon={'dark' ? faSun : faMoon} /></Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
