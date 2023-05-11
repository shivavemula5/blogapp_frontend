import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';

function Footer() {
  

  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            2023
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default Footer