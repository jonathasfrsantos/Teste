import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./styles.css";
import { ApiCRUD } from "../../services/api/ApiCrud";
import MainForm from "../forms/MainForm";

function MainTable(props) {

  const [dadosForm, setDadosForm] = useState({
    id: 0,
    nome: "",
    email: "",
    curso: ""
 })

  const [alunos, setAlunos] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");

  const handleShow = (title) => {
    setShowForm(true);
    setTitle(title);
  };


  const handleClose = () => {
    setShowForm(false);
  };

  



  const handleAtualizar = async(id) => {
    const dadosForm = await ApiCRUD.getByDisplayValue(id);
    setDadosForm(dadosForm);
    setShowForm(true);
    console.log(dadosForm);
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
        })
        .catch(() => {
          setAlunos([]);
        })
  }, [])

  return (
    <>
     {alunos.length === 0 ? (<div> Não foi possível conectar ao banco de dados </div>) : (
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
        <MainForm showForm={showForm}  customprops={dadosForm} handleClose={handleClose} title={title} />

        </tbody>
      </Table>
     )}

    </>

  )};
     

export default MainTable;