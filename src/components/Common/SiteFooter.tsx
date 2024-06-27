import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';

function SiteFooter() {
    return(
        <footer>
            <Container className='py-5 my-5'>
                <Navbar fixed="bottom">
                    <p >&copy; 2024</p>
                </Navbar>
                
            </Container>
        </footer>
    )
}

export default SiteFooter;