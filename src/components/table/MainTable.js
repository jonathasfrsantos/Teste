import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./styles.css";
import { ApiCRUD } from "../../services/api/ApiCrud";
import MainForm from "../forms/MainForm";


function MainTable(props) {
  const [dadosTabela, setDadosTabela] = useState({
    id: 0,
    nome: "",
    email: "",
    curso: "",
    modalOpen: false,
    title: "",
    dadosForm: ""
  });

  const [alunos, setAlunos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
        setModalOpen(false);
  }

  



  const handleAtualizar = async(id) => {
    const dadosTabela = await ApiCRUD.getByDisplayValue(id);
    setDadosTabela(dadosTabela);
    setModalOpen(true);
    console.log(dadosTabela);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esse aluno?")){
        ApiCRUD.delete(id)
            .then(() => {
                setAlunos(
                    alunos.filter((aluno) => aluno.id !== id)
                );
            });
    }
  };

  useEffect(() => {
    ApiCRUD.getAll()
        .then((response) => {
            setAlunos(response);
        });
  })

  return (
    <>
      <Table className="MainTable" hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Curso</th>
            <th>Ações</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((iteravel, index) => (
            <tr key={iteravel.id}>
              <td>{index + 1}</td>
              <td>{iteravel.nome}</td>
              <td>{iteravel.email}</td>
              <td>{iteravel.curso}</td>
              <td>
                <button onClick={() => handleAtualizar(iteravel.id)}>
                  <i className="fas fa-edit"></i>
                </button>{" "}
              </td>
              <td>
                <button onClick={() => handleExcluir(iteravel.id)}>
                  <i className="fas fa-trash"></i>
                </button>{" "}
              </td>
            </tr>
          ))}
        <MainForm modalOpen={modalOpen} dadosForm={dadosTabela} handleClose={handleClose} />

        </tbody>
      </Table>
    </>
  );
}

export default MainTable;
