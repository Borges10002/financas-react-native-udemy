import React, {useContext, useState} from 'react';
import {Platform, ActivityIndicator} from 'react-native';

import {AuthContext} from '../../contexts/auth';
import {
  AreaInput,
  Background,
  Container,
  Input,
  SubmitButton,
  SubmitText,
} from '../SignIn/styles';

export default function SignUp() {
  const {signUp, loadingAuth} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    if (email === '' || password === '' || nome === '') {
      return;
    }

    signUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <AreaInput>
          <Input
            placeholder="Nome"
            value={nome}
            onChange={text => setNome(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Seu email"
            value={email}
            onChange={text => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sua senha"
            value={password}
            onChange={text => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
