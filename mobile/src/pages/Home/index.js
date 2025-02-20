import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';

import Header from '../../components/Header';
import {Area, Background, List, ListBalance, Title} from './styles';

import {format} from 'date-fns';
import api from '../../services/api';

import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import HistoricoList from '../../components/HistoricoList';

import Icon from 'react-native-vector-icons/Feather';
import CalendarModal from '../../components/CalendarModal';

export default function Home() {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [dateMovements, setDateMovements] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let date = new Date(dateMovements);
      let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 100;
      let dateFormated = format(onlyDate, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated,
        },
      });

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setMovements(receives.data);
        setListBalance(balance.data);
      }
    }

    getMovements();

    return () => (isActive = false);
  }, [isFocused, dateMovements]);

  async function handleDelete(id) {
    try {
      await api.delete('/receives/delete', {
        params: {
          item_id: id,
        },
      });

      setDateMovements(new Date());
    } catch (error) {
      console.log(error);
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

  return (
    <Background>
      <Header title="Minhas movimentações" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({item}) => <BalanceItem data={item} />}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="calendar" color="#121212" size={50} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>

      <List
        data={movements}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </Background>
  );
}
