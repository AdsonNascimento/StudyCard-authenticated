import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../components/ContainerDashboard'
import { showMatter } from '../../services/api'
import { Link } from 'react-router-dom'

import CatError from '../../assets/cat.webp'
import Loading from '../../components/Loading'
import HeaderLogin from '../../components/HeaderLogin'
import MatterEdit from '../../components/MatterEdit'
import './style.scss'

function Matter() {
  const { id } = useParams()
  const email = JSON.parse(localStorage.getItem('authenticated')).email;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setModalOpen] = useState(false)

  const fetchMatter = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await showMatter(email, id);

      if (response.data) {
        setData(response.data[0]);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao buscar os dados da matéria:', error);
    }

    setLoading(false);
  }


  useEffect(() => {
    fetchMatter()
  }, [])

  return (
    <>
      <HeaderLogin />
      <main id='matter'>
        <section className="questions">


          <Container.Root>
            <Container.Header>
              <Link to="/dashboard">
                <Container.IconBack />
              </Link>

              <div className='matter-title'>
                <Container.Title>{data.discipline}</Container.Title>
                {!!data.description ? <p className='description'>{data.description}</p> : null}
              </div>


              <div className='matter-nav'>
                <Container.IconEdit onClick={() => setModalOpen(true)} />
                <Container.IconPlus />
              </div>

            </Container.Header>
            <Container.Divisor />

            {loading ? (

              <div className="container-loading">
                <Loading />
              </div>

            ) : error ? (

              <div className='is-matter'>
                <h1>Cadê seus cards?</h1>
                <img src={CatError} alt="cadastre agora" />
              </div>

            ) : (

              <Container.Cards>
                {/* {data.map(item => (
                  <Container.Card key={item.id}>
                    <Container.Title>{item.discipline}</Container.Title>
                  </Container.Card>
                ))} */}
              </Container.Cards>

            )}
          </Container.Root>
        </section>
        <section className="dois"></section>
        <MatterEdit 
          isOpen={openModal} 
          setModalOpen={() => setModalOpen(!openModal)} 
          dataMatter={data}
        />
      </main>
    </>
  )
}

export default Matter