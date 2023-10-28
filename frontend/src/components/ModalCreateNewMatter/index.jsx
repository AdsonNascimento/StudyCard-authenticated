import React, { useState, useContext } from 'react'
import { createMatter } from '../../services/api.js'
import { Container } from '../ContainerDashboard/'
import { AuthContext } from '../../contexts/contexts.jsx'
import './style.scss'

function ModalCreateNew({ isOpen, setModalOpen }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const emailUser = JSON.parse(localStorage.getItem('authenticated')).email

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createMatter(emailUser, name, description, difficulty)
    } catch (error) {
    }

  }

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

              <fieldset>
                <legend>Selecione a dificuldade:</legend>
                <label htmlFor="very-easy">
                  Muito fácil
                  <input
                    id="very-easy"
                    type="radio"
                    value='1'
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
                    value='2'
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
                    value='3'
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
                    value='4'
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
                    value='5'
                    onChange={(e) => setDifficulty(e.target.value)}
                    name="difficulty"
                    required
                  />
                </label>
              </fieldset>



              <button type='submit'>
                cadastrar
              </button>

            </form>
          </Container.Root>
        </div>
      </section>
    )
  }

  return null
}

export default ModalCreateNew