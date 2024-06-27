import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getUrl } from 'aws-amplify/storage';

const client = generateClient<Schema>();

export default function Vistas() {

  type Nullable<T>= T | undefined | null;

  const [todos, setTodos] = useState<Schema["archivos"]["type"][]>([]);

  const fetchTodos = async () => {
    try {
      const { data: items } = await client.models.archivos.list();
      setTodos(items.slice(0, 100));  // Limita a los primeros 20 elementos
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDownload = async (id: Nullable<string>, titulo: Nullable<string>) => {
    try {
      if (!titulo) {
        console.error("Title is undefined or null");
        return;
      }
      const response = await getUrl({ path: `archivos/${id}-${titulo}` });
      window.open(response.url, "_blank");
    } catch (error) {
      console.error("Error fetching download URL:", error);
    }
  };
  

  return (
    <Container>
      <h1>Ver Archivos</h1>
      <Row>
        {todos.map(({ id, titulo, description, creator, animal, createdAt }) => (
          <Col key={id} sm={6} md={2} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><strong>Editor:</strong> {creator}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Text><strong>Animal:</strong> {animal}</Card.Text>
                <Card.Text><strong>Fecha:</strong> {formatDate(createdAt)}</Card.Text>
                <Button variant="primary" onClick={() => handleDownload(id, titulo)}>
                  Descargar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
