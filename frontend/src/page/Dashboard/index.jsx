import React, { useState } from 'react';
import HeaderLogin from "../../components/HeaderLogin"
import { Container } from '../../components/ContainerDashboard'
import ModalCreateNew from "../../components/ModalCreateNewMatter"
import './style.scss'

export default function Dashboard() {
  const [openModal, setModalOpen] = useState(false)

  return (
    <>
      <HeaderLogin />
      <ModalCreateNew isOpen={openModal} setModalOpen={() => setModalOpen(!openModal)} />
      <main id='dashboard'>
        <section className="questions">
          
          
          <Container.Root>
            <Container.Title>Today's questions</Container.Title>
            <Container.Divisor />
            <Container.Cards>
              <Container.Card>
                <Container.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eius deserunt quia voluptas dolorem, provident ratione perspiciatis, consectetur numquam commodi delectus sit suscipit ullam a eum voluptates vero aut facilis.
                </Container.Text>
                <Container.Tags>
                  <Container.Tag>JavaScript</Container.Tag>
                </Container.Tags>
              </Container.Card>
            </Container.Cards>
          </Container.Root>

          <Container.Root>
            <Container.Header>
              <Container.Title>Matters</Container.Title>
              <Container.IconPlus onClick={() => setModalOpen(true)} />
            </Container.Header>
            <Container.Divisor />
            <Container.Cards>
              <Container.Card>
                <Container.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eius deserunt quia voluptas dolorem, provident ratione perspiciatis, consectetur numquam commodi delectus sit suscipit ullam a eum voluptates vero aut facilis.
                </Container.Text>
                <Container.Tags>
                  <Container.Tag>JavaScript</Container.Tag>
                </Container.Tags>
              </Container.Card>
            </Container.Cards>
          </Container.Root>
        </section>
        <section className="dois"></section>
      </main>
    </>
  )
}