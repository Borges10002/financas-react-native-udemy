import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Title, ButtonMenu} from './styles';

export default function Header({title}) {
  return (
    <Container>
      <ButtonMenu>
        <Icon name="menu" size={35} color="#121212" />
      </ButtonMenu>
      {title && <Title>{title}</Title>}
    </Container>
  );
}
