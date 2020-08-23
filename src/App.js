import React from "react";
import api from './services/api'

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

  function didMount() {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }
  useEffect(() => {
    didMount();
  }, [])
  
  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      url: 'https://github.com/rocketseat-education/gostack-template-conceitos-reactjs',
      title: `${Date.now()} Template para iniciar o desafio de ReactJS do nível de "Conceitos importantes".`,
      techs: ['Javascript', 'Typescript', 'HTML', 'CSS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {    
    api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id} >
            <a href={repository.url}>{repository.title}</a>
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
