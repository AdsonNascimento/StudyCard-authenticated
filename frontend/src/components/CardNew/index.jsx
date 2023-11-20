import React, { useState, useEffect } from 'react'
import { Container } from '../ContainerDashboard/index.jsx'
import { createCard } from '../../services/api.js'
import ButtonLoader from '../ButtonLoader/index.jsx'
import PopupWrapper from '../PopupWrapper/index.jsx'
import ProgresiveInput from '../ProgresiveInput'
import DifficultyInput from '../DifficultyInput/index.jsx'
import './style.scss'

function NewCard({ isOpen, setNewCard, sendDataToParent, userData }) {
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [popupData, setPopupData] = useState(null);
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email
  const matterId = userData.id
  const [responses, setResponses] = useState([])

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty)
  }

  const handleResponses = (inputs) => {
    setResponses(inputs)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!question || !difficulty) {
      setPopupData({
        type: 'error',
        text: 'Por favor, preencha todos os campos antes de enviar.',
        seconds: 2,
      });
      setIsLoading(false);
      return;
    }

    // Verificar se todos os text são diferentes de ""
  if (responses.some((response) => response.text === "")) {
    setPopupData({
      type: 'error',
      text: 'Todos os campos de texto devem ser preenchidos.',
      seconds: 2,
    });
    setIsLoading(false);
    return;
  }

  // Verificar se há exatamente um correctResponse === true
  const correctResponsesCount = responses.filter((response) => response.correctResponse === true).length;
  if (correctResponsesCount !== 1) {
    setPopupData({
      type: 'error',
      text: 'Selecione uma resposta correta.',
      seconds: 2,
    });
    setIsLoading(false);
    return;
  }

    try {
      await createCard(matterId, question, responses, difficulty)

      setQuestion('')
      setDifficulty('')

      setTimeout(() => {
        setNewCard()
      }, 1000)
    
      // sendDataToParent()

      setPopupData({
        type: 'success',
        text: "Novo card adicionado com sucesso!",
        seconds: 1
      });

    } catch (error) {
      console.error(error.message)

      setPopupData({
        type: 'error',
        text: "Não foi possivel realizar a atualização da máteria. Tente novamente mais tarde!",
        seconds: 2
      });
    }
    setIsLoading(false)
  }

  if (isOpen) {
    return (
      <section className="cover" onClick={setNewCard} >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Container.Root>
            <Container.Header>
              <Container.Title>Novo Card</Container.Title>

              <div className='matter-nav'>
                <Container.IconClose onClick={setNewCard} />
              </div>
            </Container.Header>
            <Container.Divisor />
            <form onSubmit={handleSubmit}>
              <label htmlFor="desciption">
                <textarea
                  id='question'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder='Questão...'
                />
              </label>

              <ProgresiveInput
                matter={matterId}
                legend="Opções:"
                transmitValue={handleResponses}
              />

              <DifficultyInput setDifficulty={handleChangeDifficulty} />

              <ButtonLoader type='submit' className={`btn ${isLoading ? "loading" : ""}`}>
                Cadastrar
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

export default NewCard