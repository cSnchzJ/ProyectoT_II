import { Button, Container, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>({
  authMode: "apiKey",
});

export default function SubirElemento() {
  const [creator, setCreator] = useState('');
  const [animal, setAnimal] = useState('');
  const [description, setDescription] = useState('');
  const [arch, setArch] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [titulo, setTitulo] = useState('');

  const handleFileChange = (event: any) => {
    setArch(event.target.files[0]);
  };

  const handleCreatorChange = (event: any) => {
    setCreator(event.target.value);
  };

  const handleTituloChange = (event: any) => {
    setTitulo(event.target.value);
  };

  const handleAnimalChange = (event: any) => {
    setAnimal(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (!arch) {
      console.error("No file selected");
      setAlert({ type: 'error', message: "No file selected" });
      return;
    }

    try {
      // Create the API record
      const createResponse = await client.models.archivos.create({
        description,
        creator,
        animal,
        titulo,
      });

      const archivo = createResponse.data;
      if (!archivo || !archivo.id) {
        setAlert({ type: 'error', message: "Failed to create the record or get the record ID" });
        return;
      }

      // Upload the Storage file
      const result = await uploadData({
        path: `archivos/${archivo.id}-${archivo.titulo}`,
        data: arch,
      }).result;

      // Add the file association to the record
      await client.models.archivos.update({
        id: archivo.id,
        dataPath: result?.path
      });

      // Set success alert
      setAlert({ type: 'success', message: "El archivo se subió con éxito." });
    } catch (error: any) {
      setAlert({ type: 'error', message: "Error uploading file: " + error.message });
    }
  };

  return (
    <Container>
      <h1>Subir Archivos</h1>
      {alert && (
        <Alert variant={alert.type === 'success' ? 'success' : 'danger'} dismissible onClose={() => setAlert(null)}>
          <Alert.Heading>{alert.type === 'success' ? 'Archivo Subido con Éxito' : 'Error'}</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
      )}
      <Form>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Archivos</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="creatorInput">
          <Form.Label>Titulo</Form.Label>
          <Form.Control type="text" placeholder="Ej: Obervaciones de ejemplares." value={titulo} onChange={handleTituloChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="creatorInput">
          <Form.Label>Creador</Form.Label>
          <Form.Control type="text" placeholder="Ej: Christian Sanchez" value={creator} onChange={handleCreatorChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="animalInput">
          <Form.Label>Animal</Form.Label>
          <Form.Control type="text" placeholder="Ej: Venado de Cola Blanca" value={animal} onChange={handleAnimalChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descriptionTextarea">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" placeholder="Describir los procesos, tecnologías usadas y toda la información relevante." rows={7} value={description} onChange={handleDescriptionChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Subir archivo</Button>
      </Form>
    </Container>
  );
}
