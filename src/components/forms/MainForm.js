import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiCRUD} from "../../services/api/ApiCrud";

function MainForm(props) {
  const [dadosForm, setDadosForm] = useState({
    id: 0,
    nome: "",
    email: "",
    curso: "",
    modalOpen: false,
    title: "",
  });



  const handleOpenModal = () => {
    setDadosForm({ ...dadosForm, modalOpen: true });
  };

  const handleClose = () => {
    setDadosForm({ ...dadosForm, modalOpen: false });
    clearForm();
  };

  const handleChange = (e) => {
    setDadosForm({ ...dadosForm, [e.target.id]: e.target.value });
  };

  const clearForm = () => {
    setDadosForm({
      nome: "",
      email: "",
      curso: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {id, nome, email, curso} = dadosForm;
    if (id) {
      await ApiCRUD.update({id, nome, email, curso});
    } else {
      await ApiCRUD.create({nome, email, curso});
    }
    clearForm();
    props.handleClose();

  };

  return (
    <>
      <Modal
        show={props.modalOpen}
        onHide={props.handleClose}
        modalOpen={handleOpenModal}
        onClose={handleClose}
        title={props.title}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {dadosForm.id ? "Editar aluno": "Adicionar aluno"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group" >
              <Form.Label className="label-style"> Nome </Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Nome do aluno"
                value={dadosForm.nome}
                onChange={handleChange}
                id="nome"
             
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group className="form-group" >
              <Form.Label className="label-style"> Email </Form.Label>
              <Form.Control
                className="form-input"
                type="email"
                placeholder="email@email.com"
                value={dadosForm.email}
                onChange={handleChange}
                id="email"
               
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group className="form-group" >
              <Form.Label className="label-style"> Curso </Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder=""
                value={dadosForm.curso}
                onChange={handleChange}
                id="curso"
               
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            {" "}
            Salvar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            {" "}
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainForm;
