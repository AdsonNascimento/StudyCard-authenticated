import React from 'react'
import { Container } from '../ContainerDashboard/'
import './style.scss'

function ModalCreateNew({ isOpen, setModalOpen }) {

  if (isOpen) {
    return (
      <section className="cover">
        <div className="modal">
          <Container.Root>
            <Container.Header>
              <Container.Title>Matters</Container.Title>
              <Container.IconClose onClick={setModalOpen} />
            </Container.Header>
            <Container.Divisor />
            <form>
              <label htmlFor="name">
                <input type="text" placeholder='Nome da matéria' id='name' autoComplete='off' />
              </label>
              <label htmlFor="desciption">
                <textarea placeholder='Descrição opcional...' id='description' />
              </label>

              <fieldset>
                <label htmlFor="very-easy">Very Easy</label>
                <input type="radio" name="difficulty" id="very-easy" />

                <label htmlFor="easy">Easy</label>
                <input type="radio" name="difficulty" id="easy" />

                <label htmlFor="medium">Medium</label>
                <input type="radio" name="difficulty" id="medium" />

                <label htmlFor="hard">Hard</label>
                <input type="radio" name="difficulty" id="hard" />

                <label htmlFor="very-hard">Very Hard</label>
                <input type="radio" name="difficulty" id="very-hard" />
              </fieldset>


              <button type='submit'>
                Cadastart
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