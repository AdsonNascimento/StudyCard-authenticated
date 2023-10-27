import React from 'react'
import { Container } from '../ContainerDashboard/'
import './style.scss'

function ModalCreateNew({ isOpen, setModalOpen }) {

  const handleSubmit = (e) => {
    e.preventDefault()
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
                  type="text"
                  placeholder='Nome da matéria'
                  id='name'
                  autoComplete='off'
                  required
                />
              </label>

              <label htmlFor="desciption">
                <textarea placeholder='Descrição opcional...' id='description' />
              </label>

              <fieldset>
                <legend>Selecione a dificuldade:</legend>
                <label htmlFor="very-easy">
                  Muito fácil
                  <input type="radio" name="difficulty" id="very-easy" />
                </label>

                <label htmlFor="easy">
                  Fácil
                  <input
                    type="radio"
                    name="difficulty"
                    id="easy"
                    required
                  />
                </label>

                <label htmlFor="medium">
                  Médio
                  <input
                    type="radio"
                    name="difficulty"
                    id="medium"
                    required
                  />
                </label>

                <label htmlFor="hard">
                  Difícil
                  <input
                    type="radio"
                    name="difficulty"
                    id="hard"
                    required
                  />
                </label>

                <label htmlFor="very-hard">
                  Muito difícil
                  <input
                    type="radio"
                    name="difficulty"
                    id="very-hard"
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