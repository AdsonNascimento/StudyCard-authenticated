import React, { useState, useEffect } from 'react'
import { createMatter } from '../../services/api.js'
import { Container } from '../ContainerDashboard/index.jsx'
import ButtonLoader from '../ButtonLoader/index.jsx'
import PopupWrapper from '../PopupWrapper/index.jsx'
import './style.scss'

function MatterEdit({ isOpen, setModalOpen, sendDataToParent, dataMatter }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [popupData, setPopupData] = useState(null);
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email

  useEffect(() => {
    if (dataMatter) {
      setName(dataMatter.discipline);
      setDescription(dataMatter.description);
      setDifficulty(`${dataMatter.difficulty}`);
    }
  }, [dataMatter]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createMatter(emailUser, name, description, difficulty)

      sendDataToParent()

      setPopupData({ type: 'success', text: "Cadastro realizado com sucesso!" });

    } catch (error) {
      console.error(error.message)
      setPopupData({ type: 'error', text: "Não foi possivel realizar o cadastro da máteria. Tente novamente mais tarde!" });
    }
    setIsLoading(false)
  }

  if (isOpen) {
    return (
      <section className="cover" onClick={setModalOpen} >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Container.Root>
            <Container.Header>
              <Container.Title>Editar matéria</Container.Title>
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

              <fieldset>
                <legend>Selecione a dificuldade:</legend>
                <label htmlFor="very-easy">
                  Muito fácil
                  <input
                    id="very-easy"
                    type="radio"
                    value="1"
                    checked={difficulty === "1"}
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>

                <label htmlFor="easy">
                  Fácil
                  <input
                    id="easy"
                    type="radio"
                    value="2"
                    checked={difficulty === "2"}
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>

                <label htmlFor="medium">
                  Médio
                  <input
                    id="medium"
                    type="radio"
                    value="3"
                    checked={difficulty === "3"}
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>

                <label htmlFor="hard">
                  Difícil
                  <input
                    id="hard"
                    type="radio"
                    value="4"
                    checked={difficulty === "4"}
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>

                <label htmlFor="very-hard">
                  Muito difícil
                  <input
                    id="very-hard"
                    type="radio"
                    value="5"
                    checked={difficulty === "5"}
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>
              </fieldset>


              <ButtonLoader type='submit' className={`btn ${isLoading ? "loading" : ""}`}>
                atualizar
              </ButtonLoader>
            </form>
          </Container.Root>
        </div>
        <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
      </section>
    )
  }

  return null
}

export default MatterEdit