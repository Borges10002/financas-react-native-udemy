import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#3b3dbf',
            boderBottomWidth: 1,
            boderBottomColor: '#00b94a',
          },
          headerTintColor: '#FFF',
          headerTitle: 'Voltar',
          headerBackTitleVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
