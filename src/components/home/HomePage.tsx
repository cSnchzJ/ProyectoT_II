import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';



export default function HomePage() {
  return (
    
        <Container>
          <Row className='px-4 my-5'>
            <Col xs={4} sm={6}>
              <Image src="/img_IPN_INECOL.jpg" fluid />
              <p> Colaboración UPIITA-IPN con INECOL.</p>
            </Col>
            <Col sm={6}>
              <h1 className='font-weight-light'>Sobre nuestro Proyecto</h1>
              <p className='mt-4'>

                Bienvenidos al Proyecto de Conservación de Especies<br /><br />
                En colaboración con la INECOL y la UPIITA-IPN, presentamos un proyecto innovador dedicado a la protección y preservación de especies animales en peligro de extinción. Esta colaboración única combina el profundo conocimiento biológico y la experiencia en conservación del INECOL con las soluciones tecnológicas de la UPIITA-IPN, creando un enfoque integral y efectivo para enfrentar los desafíos actuales de la biodiversidad.
                <br /><br />
                Nuestro objetivo es implementar estrategias basadas en datos y desarrollo de tecnología para monitorear, estudiar y proteger diversas especies, asegurando su supervivencia para las generaciones futuras. A través de esta colaboración, esperamos no solo salvaguardar la vida silvestre, sino también inspirar a comunidades y organizaciones globales a unirse en la lucha por un planeta más sostenible y equilibrado.
                <br /><br />
                <br /><br />
                ¡Únete a nosotros en este viaje para hacer una diferencia real en el mundo natural!</p>
              <Button variant="outline-primary">Empezar &gt;</Button>

            </Col>
          </Row>
        </Container>
  );
}