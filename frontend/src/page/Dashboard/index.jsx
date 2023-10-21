import React from 'react';
import HeaderLogin from "../../components/HeaderLogin";
import { Container } from '../../components/ContainerDashboard'
import './style.scss'

export default function Dashboard() {

  return (
    <>
      <HeaderLogin />
      <main id='dashboard'>
        <section className="questions">
          <Container.Root>
            <Container.Title>Olá, meu chapa</Container.Title>
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

{/* 
<div className='container-dashboard'>
  <h2>Today's questions</h2>
  <hr></hr>
  <div className='container-cards'>
    <div className="item">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
      </p>
      <div className='tags'>
        <span>história</span>
        <span>história</span>
      </div>
    </div>
  </div>
</div> 
*/}