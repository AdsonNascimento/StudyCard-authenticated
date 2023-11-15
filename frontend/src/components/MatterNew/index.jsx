import React, { useState } from 'react';
import { createMatter } from '../../services/api.js';
import { Container } from '../ContainerDashboard/index.jsx';
import ButtonLoader from '../ButtonLoader/index.jsx';
import PopupWrapper from '../PopupWrapper/index.jsx';
import './style.scss';
import DifficultyInput from '../DifficultyInput/index.jsx';

function MatterNew({ isOpen, setModalOpen, sendDataToParent }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [radioChecked, setRadioChecked] = useState(false); // novo estado para controlar os botões de rádio
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email;

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(difficulty)
      await createMatter(emailUser, name, description, difficulty);

      // Limpar parâmetros
      setName('');
      setDescription('');
      setDifficulty('');
      setRadioChecked(false); // atualizar o estado dos botões de rádio

      sendDataToParent();

      setPopupData({ type: 'success', text: 'Cadastro realizado com sucesso!' });
    } catch (error) {
      console.error(error.message);
      setPopupData({ type: 'error', text: 'Não foi possível realizar o cadastro da matéria. Tente novamente mais tarde!' });
    }
    setIsLoading(false);
  };

  if (isOpen) {
    return (
      <section className="cover" onClick={setModalOpen} >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Container.Root>
            <Container.Header>
              <Container.Title>Matters</Container.Title>
              <Container.IconClose onClick={setModalOpen} />
            </Container.Header>
            <Container.Divisor />
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nome da matéria'
                  autoComplete='off'
                  required
                />
              </label>

              <label htmlFor="desciption">
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Descrição opcional...'
                />
              </label>

              <DifficultyInput setDifficulty={handleChangeDifficulty} />

              <ButtonLoader type='submit' className={`btn ${isLoading ? 'loading' : ''}`}>
                Cadastrar
              </ButtonLoader>
            </form>
          </Container.Root>
        </div>
        <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
      </section>
    );
  }

  return null;
}

export default MatterNew;
