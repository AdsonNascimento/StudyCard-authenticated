import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../components/ContainerDashboard'
import { showMatter, showCards } from '../../services/api'
import { Link } from 'react-router-dom'

import CatError from '../../assets/cat.webp'
import Loading from '../../components/Loading'
import HeaderLogin from '../../components/HeaderLogin'
import MatterEdit from '../../components/MatterEdit'
import NewCard from '../../components/CardNew'
import PopupWrapper from '../../components/PopupWrapper'
import limiterCaracteres from '../../tools/limiterCaracteres'
import checkDifficulty from '../../tools/checkDifficulty'
import './style.scss'

function Matter() {
  const { id } = useParams()
  const email = JSON.parse(localStorage.getItem('authenticated')).email;
  const [loading, setLoading] = useState(true);
  const [dataMatter, setDataMatter] = useState([]);
  const [dataCards, setDataCards] = useState([]);
  const [openEditMatter, setOpenEditMatter] = useState(false)
  const [newCard, setNewCard] = useState(false)
  const [popupData, setPopupData] = useState(null);

  const fetchMatter = async () => {
    setLoading(true);

    try {
      const response = await showMatter(email, id);
      setDataMatter(response.data[0]);
    } catch (error) {
      console.error('Erro ao buscar os dados da matéria:', error);
      setPopupData({ type: 'error', text: error.message });
    }

    setLoading(false);
  }

  const fetchCards = async () => {
    setLoading(true);

    try {
      const response = await showCards(email, id);
      setDataCards(response.data);

    } catch (error) {
      console.error('Erro ao buscar os dados da cads:', error);
      setPopupData({ type: 'error', text: error.message });
    }

    setLoading(false);
  }

  const receiveDataFromMatter = () => {
    fetchMatter();
  }

  const receiveDataFromCards = () => {
    fetchCards();
  }

  useEffect(() => {
    fetchMatter()
    fetchCards()
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
                <Container.Title>{dataMatter.discipline}</Container.Title>
                {!!dataMatter.description ? <p className='description'>{dataMatter.description}</p> : null}
              </div>


              <div className='matter-nav'>
                <Container.IconEdit onClick={() => setOpenEditMatter(true)} />
                <Container.IconPlus onClick={() => setNewCard(true)} />
              </div>

            </Container.Header>
            <Container.Divisor />

            {loading ? (

              <div className="container-loading">
                <Loading />
              </div>

            ) : dataCards.length !== 0 ? (
              <Container.Cards>
                {dataCards.map(item => (
                  <Container.Card key={item.id}>
                    <Container.Text>
                      { limiterCaracteres(item.question, 100) }
                    </Container.Text>
                    <Container.Tags>
                      <Container.Tag>
                        { checkDifficulty(item.initial_difficulty) }
                      </Container.Tag>
                    </Container.Tags>
                  </Container.Card>
                ))}
              </Container.Cards>

            ) : (

              <div className='is-matter'>
                <h1>Cadê seus cards?</h1>
                <img src={CatError} alt="cadastre agora" />
              </div>

            )}
          </Container.Root>
        </section>
        <section className="dois"></section>
        <MatterEdit
          isOpen={openEditMatter}
          setOpenEditModal={() => setOpenEditModal(!openEditMatter)}
          dataMatter={dataMatter}
          sendDataToParent={receiveDataFromMatter}
        />
        <NewCard
          isOpen={newCard}
          setNewCard={() => setNewCard(!newCard)}
          userData={dataMatter}
          sendDataToParent={receiveDataFromCards}
        />

        <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
      </main>
    </>
  )
}

export default Matter