import React, { useState, useEffect } from 'react'
import { Container } from '../ContainerDashboard/index.jsx'
import { Icon } from '../Icons/'
import { updateMatter, deleteMatter } from '../../services/api.js'
import { useNavigate } from 'react-router-dom'
import ButtonLoader from '../ButtonLoader/index.jsx'
import PopupWrapper from '../PopupWrapper/index.jsx'
import './style.scss'
import DifficultyInput from '../DifficultyInput/index.jsx'

function MatterEdit({ isOpen, setOpenEditModal, sendDataToParent, dataMatter }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [popupData, setPopupData] = useState(null)
  
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email
  const matterId = dataMatter.id
  const navigate = useNavigate()

  useEffect(() => {
    if (dataMatter) {
      setName(dataMatter.discipline);
      setDescription(dataMatter.description);
      setDifficulty(`${dataMatter.difficulty}`);
    }
  }, [dataMatter]);

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log(
        emailUser, matterId, name, description, difficulty
      )
      await updateMatter(
        emailUser, matterId, name, description, difficulty
      )

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

  const deleteThisMatter = async () => {
    try {
      await deleteMatter(emailUser, matterId)

      sendDataToParent()

      setPopupData({
        type: 'success',
        text: "Exclusão realizada com sucesso! Você será redirecionado.",
        seconds: 2
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (error) {
      console.error(error.message)

      setPopupData({
        type: 'error',
        text: "Não foi possivel realizar a exclusão da matéria. Tente novamente mais tarde!"
      });

    }
  }

  if (isOpen) {
    return (
      <section className="cover" onClick={setOpenEditModal} >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Container.Root>
            <Container.Header>
              <Container.Title>Editar matéria</Container.Title>

              <div className='matter-nav'>
                <Icon.Trash onClick={deleteThisMatter} />
                <Icon.Close onClick={setOpenEditModal} />
              </div>
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

              <DifficultyInput
                difficulty={difficulty}
                setDifficulty={handleChangeDifficulty}
              />

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