import React, { useEffect, useState } from 'react';
import { Container } from '../../components/ContainerDashboard'
import { listMatter } from '../../services/api';
import ModalCreateNew from "../../components/ModalCreateNewMatter"
import CatError from '../../assets/cat.webp'
import './style.scss'

export default function Matters() {
  const [openModal, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const email = JSON.parse(localStorage.getItem('authenticated')).email;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await listMatter(email);

      if (response.data) {
        setData(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao buscar os dados da matéria:', error);
    } finally {
      setLoading(false);
    }
  }

  const receiveDataFromChild = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="questions">
      <Container.Root>
        <Container.Header>
          <Container.Title>Matters</Container.Title>
          <Container.IconPlus onClick={() => setModalOpen(true)} />
        </Container.Header>
        <Container.Divisor />

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='is-matter'>
            <h1>Cadê suas matérias?</h1>
            <img src={CatError} alt="cadastre agora" />
          </div>
        ) : (
          <Container.Cards>
            {data.map(item => (
              <Container.Card key={item.id}>
                <Container.Text>{item.discipline}</Container.Text>
              </Container.Card>
            ))}
          </Container.Cards>
        )}
      </Container.Root>
      <ModalCreateNew isOpen={openModal} setModalOpen={() => setModalOpen(!openModal)} sendDataToParent={receiveDataFromChild} />
    </section>
  )
}
