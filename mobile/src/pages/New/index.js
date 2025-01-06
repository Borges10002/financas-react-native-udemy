import React from 'react';

import { Background, Input, SubmitButton, SubmitText } from './styles';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from '../../components/Header'

export default function New(){
  return(
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
      <Background>
        <Header title="Registrando" />

        <SafeAreaView style={{marginTop: 14, alignItems: 'center' }}>
          <Input
            placeholder="Descrição desse registro"
          />

          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
          />

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}