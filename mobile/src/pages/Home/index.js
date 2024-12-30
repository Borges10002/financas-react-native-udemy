import React, {useEffect, useState} from 'react';

import Header from '../../components/Header';
import {Background} from './styles';

import {format} from 'date-fns';
import api from '../../services/api';

export default function Home() {
  const [listBalance, setListBalance] = useState([]);

  const [dateMovements, setDateMovements] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setListBalance(balance.data);
      }
    }

    getMovements();

    return () => (isActive = false);
  }, [dateMovements]);

  return (
    <Background>
      <Header title="Minhas movimentações" />
    </Background>
  );
}
