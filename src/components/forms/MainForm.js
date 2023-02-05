import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function MainForm({ data, close, updateData }) {
  const [formData, setFormData] = useState({
    id: data.id,
    nome: data.nome,
    email: data.email,
    curso: data.curso,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/alunos/${data.id}`, formData)
      .then((response) => {
        updateData((prevData) =>
          prevData.map((data) => (data.id === formData.id ? formData : data))
        );
        close();
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Curso</Form.Label>
        <Form.Control
          type="text"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );


}

export default MainForm;
