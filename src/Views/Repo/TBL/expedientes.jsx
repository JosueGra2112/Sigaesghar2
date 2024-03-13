import React, { useState, useEffect } from 'react';
import './table.css';
import './search.css';
import pdfimg from './PDF.png';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [cicloEsc, setCicloEsc] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [exp, setExp] = useState('');

  const Grado = ['1', '2', '3'];
  const Grupo = ['A', 'B', 'C','D','E','F','G','H','I','J','K'];
  const Exp = ['BOLETA', 'CERTIFICADO', 'CONSTANCIA'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar datos de búsqueda avanzada al padre
    onSubmit({ cicloEsc, grado, grupo, exp });
    // Cerrar el modal
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label>Ciclo Escolar: </label>
            <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />


            <label>Grado: </label>
            <select id="cargo" value={grado} onChange={(e) => setGrado(e.target.value)}>
              <option value="">Seleccione el Grado</option>
              {Grado.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>


            <label>Grupo: </label>
            <select id="cargo" value={grupo} onChange={(e) => setGrupo(e.target.value)}>
              <option value="">Seleccione el Grupo</option>
              {Grupo.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>


            <label>Expediente: </label>
            <select id="cargo" value={exp} onChange={(e) => setExp(e.target.value)}>
              <option value="">Seleccione el Expediente</option>
              {Exp.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
    )
  );
};

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Todos');
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
// eslint-disable-next-line
const [advancedSearchData, setAdvancedSearchData] = useState({
  cicloEsc: '',
  grado: '',
  grupo: '',
  exp: '',
});

  useEffect(() => {
    // Obtén los datos de la API
    fetch('http://localhost:3001/expedientes')
      .then(response => response.json())
      .then(data => {
        console.log('Datos de expedientes:', data);
        setExpedientes(data);
        setFilteredExpedientes(data);
      })
      .catch(error => console.error('Error al obtener los expedientes de la tabla:', error));
  }, []);

  const handleSearch = () => {
    const filtered = expedientes.filter(expediente => {
      if (searchField === 'Todos') {
        return Object.values(expediente).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return expediente[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setFilteredExpedientes(filtered);
  };

  const handleOpenAdvancedSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAdvancedSearchSubmit = ({ cicloEsc, grado, grupo, exp }) => {
    // Filtrar los expedientes según los datos de búsqueda avanzada
    const filtered = expedientes.filter(expediente => {
      // Ajusta la lógica según tus necesidades
      return (
        expediente.cicloEsc.includes(cicloEsc) &&
        expediente.Grado.includes(grado) &&
        expediente.Grupo.includes(grupo) &&
        expediente.Expediente.includes(exp)
      );
    });
  
    // Actualizar el estado con los resultados de la búsqueda avanzada
    setFilteredExpedientes(filtered);
  
    // Cerrar el modal
    handleCloseModal();
  };
  return (
    <div>
    {/* Aquí puedes colocar tu modal de búsqueda avanzada */}
    <div>
      <h4>Buscador</h4>
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      >
        <option value="Todos">Todos los datos</option>
        <option value="Alumno">Nombre del alumno</option>
        <option value="Clave">Clave</option>
        <option value="cicloEsc">Ciclo Escolar</option>
      </select>
      <input
        type="text"
        placeholder="Término de búsqueda..."
        value={searchTerm}
        onChange={(e) => { 
          setSearchTerm(e.target.value);
          handleSearch(); // Realizar búsqueda automáticamente al escribir
        }}
      />
      {/* Botón para abrir la búsqueda avanzada */}
      <br />
      <br />
      <button onClick={handleOpenAdvancedSearch}>Búsqueda Avanzada</button>
      <Modal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleAdvancedSearchSubmit} />

    </div>
    {filteredExpedientes.length === 0 && (
      <h1>No se encontraron resultados</h1>
    )}
    <table>
      <thead>
        <tr>
          <th><center>ID</center></th>
          <th><center>Clave</center></th>
          <th><center>Ciclo Escolar</center></th>
          <th><center>Alumno</center></th>
          <th><center>Grado</center></th>
          <th><center>Grupo</center></th>
          <th><center>Expediente</center></th>
          <th><center>Resguardo</center></th>
          <th><center>Caja</center></th>
          <th><center>Visualizar Expediente</center></th>
          <th><center>Acciones</center></th>
        </tr>
      </thead>
      <tbody>
        {filteredExpedientes.map(expediente => (
          <tr key={expediente.idexp}>
            <td>{expediente.idexp}</td>
            <td>{expediente.Clave}</td>
            <td>{expediente.cicloEsc}</td>
            <td>{expediente.Alumno}</td>
            <td>{expediente.Grado}</td>
            <td>{expediente.Grupo}</td>
            <td>{expediente.Expediente}</td>
            <td>{expediente.Resguardo}</td>
            <td>{expediente.Caja}</td>
            <td><center><img src={pdfimg} alt="pdfimg" style={{ alignItems: 'center', maxWidth: '10%' }} /></center></td>
            <td><p>|  Solicitar  |  Actualizar  |  Eliminar  |</p></td>
          </tr>
        ))}
      </tbody>
    </table>
    <br />
  </div>
);
};

export default Expedientes;
