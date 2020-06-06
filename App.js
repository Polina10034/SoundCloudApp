import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/rootReducer';
import ConnectedSoundCloudApp from './src/soundCloudApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QueriesScreen from './src/components/Queries/QueriesScreen';

const middlewares = applyMiddleware(thunk);
const store = createStore(rootReducer, compose(middlewares));
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sound Cloud Player" component={ConnectedSoundCloudApp} />
          <Stack.Screen
            name="QueriesScreen"
            component={QueriesScreen}
            options={{ title: 'Recent Queries' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
