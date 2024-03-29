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
import { Icon } from '../../components/Icons'
import EditCard from '../../components/CardEdit'

function Matter() {
  const { id } = useParams()
  const email = JSON.parse(localStorage.getItem('authenticated')).email;
  const [loading, setLoading] = useState(true);
  const [dataMatter, setDataMatter] = useState([]);
  const [dataCards, setDataCards] = useState([]);
  const [cardData, setCardData] = useState([])
  const [openEditMatter, setOpenEditMatter] = useState(false)
  const [newCard, setNewCard] = useState(false)
  const [editCard, setEditCard] = useState(false)
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
                {dataCards.map(cardItem => (
                  <Container.Card key={cardItem.id} onClick={() => setResponseCard(true)}>
                    <Container.Text>
                      {limiterCaracteres(cardItem.question, 55)}
                    </Container.Text>
                    <div className='nav-card'>
                      <Container.Tags>
                        <Container.Tag>
                          {checkDifficulty(cardItem.initial_difficulty)}
                        </Container.Tag>
                      </Container.Tags>
                      <Icon.Edit onClick={() => {
                        setEditCard(true);
                        setCardData(cardItem);
                      }} />
                    </div>
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
          setOpenEditMatter={() => setOpenEditMatter(!openEditMatter)}
          dataMatter={dataMatter}
          sendDataToParent={receiveDataFromMatter}
        />
        <NewCard
          isOpen={newCard}
          setNewCard={() => setNewCard(!newCard)}
          userData={dataMatter}
          sendDataToParent={receiveDataFromCards}
        />
        <EditCard
          isOpen={editCard}
          setEditCard={() => setEditCard(!editCard)}
          matterData={dataMatter}
          cardData={cardData}
          sendDataToParent={receiveDataFromCards}
        />
        <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
      </main>
    </>
  )
}

export default Matter