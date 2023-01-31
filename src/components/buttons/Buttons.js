import React, { useState } from "react";
import { Button } from "react-bootstrap";
import MainForm from "../forms/MainForm";
import "./styles.css";

function Buttons() {

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const handleShow = (title) => {
    setShowForm(true);
    setTitle(title);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="buttons-container">
      <Button
        variant="secondary"
        className="buttons-button-main"
        onClick={() => handleShow("Adicionar")}>Adicionar
     </Button>
      <Button variant="primary" className="buttons-button">
        Default
      </Button>
      <Button variant="primary" className="buttons-button">
        Exportar
      </Button>
      <Button variant="primary" className="buttons-button">
        Imprimir
      </Button>
      <MainForm showForm={showForm} handleClose={handleClose} title="Lixo puro" />
    </div>
  );
}

export default Buttons;
