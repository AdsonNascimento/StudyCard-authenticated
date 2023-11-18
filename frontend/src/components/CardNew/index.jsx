import React, { useState, useEffect } from 'react'
import { Container } from '../ContainerDashboard/index.jsx'
import { updateMatter, deleteMatter } from '../../services/api.js'
import { useNavigate } from 'react-router-dom'
import ButtonLoader from '../ButtonLoader/index.jsx'
import PopupWrapper from '../PopupWrapper/index.jsx'
import ProgresiveInput from '../ProgresiveInput'
import './style.scss'
import DifficultyInput from '../DifficultyInput/index.jsx'

function NewCard({ isOpen, setNewCard, sendDataToParent, userData }) {
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [popupData, setPopupData] = useState(null);
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email
  const matterId = userData.id
  const navigate = useNavigate();

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // await updateMatter(
      //   emailUser, userData.id, name, description, difficulty
      // )

      sendDataToParent()

      setPopupData({
        type: 'success',
        text: "Atualização realizada com sucesso!",
        seconds: 2
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
              />

             <DifficultyInput setDifficulty={handleChangeDifficulty}/>

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

export default NewCard