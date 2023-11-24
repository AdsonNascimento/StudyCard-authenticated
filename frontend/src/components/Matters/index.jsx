import React, { useEffect, useState } from 'react';
import { Container } from '../../components/ContainerDashboard';
import { Icon } from '../Icons/';
import { listMatters } from '../../services/api';
import { Link } from 'react-router-dom';

import ModalCreateNew from "../MatterNew"
import CatError from '../../assets/cat.webp'
import Loading from '../Loading';

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
      const response = await listMatters(email);

      if (response.data) {
        setData(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao buscar os dados da matéria:', error);
    }

    setLoading(false);
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
          <Icon.Plus onClick={() => setModalOpen(true)} />
        </Container.Header>
        <Container.Divisor />

        {loading ? (

          <div className="container-loading">
            <Loading />
          </div>

        ) : error ? (

          <div className='is-matter'>
            <h1>Cadê suas matérias?</h1>
            <img src={CatError} alt="cadastre agora" />
          </div>

        ) : (

          <Container.Cards>
            {data.map(item => (
              <Link className='matter-link' to={`/matter/${item.id}`} key={item.id}>
                <Container.Card>
                  <Container.Title>{item.discipline}</Container.Title>
                </Container.Card>
              </Link>
            ))}
          </Container.Cards>

        )}

      </Container.Root>
      <ModalCreateNew isOpen={openModal} setModalOpen={() => setModalOpen(!openModal)} sendDataToParent={receiveDataFromChild} />
    </section>
  )
}