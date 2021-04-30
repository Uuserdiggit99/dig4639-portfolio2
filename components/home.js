import React, { useState, useReducer, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Modal,
  Portal,
  Button,
  Provider,
  Card,
  Divider,
  TextInput,
  Paragraph,
  ScrollView,
} from 'react-native-paper';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Interval from 'react-interval-rerender';
////////////////////////////////////

export default function Home(props) {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="LoginModal" component={LoginModal} />
        <Stack.Screen name="Count to 10" component={Counter} />
        <Stack.Screen name="Timer" component={Timer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function Menu(props) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Component Demo"
          subtitle="Select an option below to view the component"
        />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => props.navigation.navigate('LoginModal')}>
            Login Modal
          </Button>

          <Divider style={styles.hr} />

          <Button
            mode="contained"
            onPress={() => props.navigation.navigate('Count to 10')}>
            Counter
          </Button>

          <Divider style={styles.hr} />

          <Button
            mode="contained"
            onPress={() => props.navigation.navigate('Timer')}>
            Timer
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
//////////////////////////////////

function Timer(props) {
  let [sec, setSec] = useState(0);
  let [on, setOn] = useState(false);

  useEffect(() => {
    if (on == true) {
      const timer = setInterval(() => {
        setSec(sec + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      return () => clearInterval();
    }
  });

  //} //else{clearInterval()}

  return (
    <>
      <View style={styles.Container}>
        <Card>
          <Card.Title title="Timer" subtitle="A seconds only timer" />
          <Card.Content>
            <Text>{sec}s</Text>

            <Divider style={styles.hr} />

            <Card.Actions>
              {!on ? (
                <Button
                  mode="outlined"
                  style={styles.Button}
                  onPress={() => setOn(!on)}>
                  Start Timer
                </Button>
              ) : (
                <Button
                  mode="outlined"
                  style={styles.Button}
                  onPress={() => setOn(!on)}>
                  Stop Timer
                </Button>
              )}
              <Text>{'  '}</Text>
              <Button
                mode="outlined"
                style={styles.Button}
                onPress={() => setOn((on = false)) + setSec((sec = 0))}>
                Reset Timer
              </Button>
            </Card.Actions>
          </Card.Content>
          <Divider style={styles.hr0} />
          <Button
            mode="text"
            style={styles.Button}
            onPress={() => props.navigation.navigate('Menu')}>
            Return to Menu
          </Button>
        </Card>
      </View>
    </>
  );
}

////////////////////////
function Reducer(state, action) {
  switch (action.type) {
    case '-':
      return { count: state.count - 1 };

    case '+':
      return { count: state.count + 1 };

    case 'reset':
      return { count: (state.count = 0) };
  }
}
///////////////////////

//////////////////////////////////
function Counter(props) {
  const initialState = { count: 0 };

  const [state, setCount] = useReducer(Reducer, initialState);

  return (
    <>
      <Card>
        <Card.Title
          title="Counter"
          subtitle="Count to 10 by clicking the buttons below."
        />

        <Card.Content>
          <Divider style={styles.hr} />

          <Button
            style={styles.button}
            icon=""
            mode="contained"
            onPress={() => setCount({ type: '-' })}>
            <Text>-1</Text>
          </Button>

          <Divider style={styles.hr} />

          <Button
            style={styles.button}
            icon=""
            mode="contained"
            onPress={() => setCount({ type: '+' })}>
            <Text>+1</Text>
          </Button>

          <Divider style={styles.hr} />

          <Button
            style={styles.button}
            icon=""
            mode="contained"
            onPress={() => setCount({ type: 'reset' })}>
            <Text> Reset</Text>
          </Button>

          <Divider style={styles.hr} />

          <Paragraph style={styles.p}>
            {state.count == 10 ? (
              <Text>Count is 10 you win!</Text>
            ) : state.count == -10 ? (
              <Text>You're supposed to count to positive 10!</Text>
            ) : (
              <Text>Count: {state.count}</Text>
            )}
          </Paragraph>

          <Divider style={styles.hr0} />

          <Button
            mode="text"
            style={styles.Button}
            onPress={() => props.navigation.navigate('Menu')}>
            Return to Menu
          </Button>
        </Card.Content>
      </Card>
    </>
  );
}
///////////////////////////////////

///////////////////////////
function LoginModal(props) {
  const [visible, setVisible] = useState(false);
  const containerStyle = { backgroundColor: 'white', padding: 0 };

  function toggleModal() {
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <>
        <Provider>
          <Card style={styles.card}>
            <Card.Title
              title="Login Modal"
              subtitle="A login form modal with validation"
            />

            <Card.Content>
              <Card.Actions>
                <Button mode="outlined" onPress={toggleModal}>
                  Click Here to activate modal
                </Button>
              </Card.Actions>

              <Divider style={styles.hr0} />
              <Button
                mode="text"
                style={styles.Button}
                onPress={() => props.navigation.navigate('Menu')}>
                Return to Menu
              </Button>
            </Card.Content>

            <Portal>
              <Modal
                style={styles.modal}
                visible={visible}
                onDismiss={toggleModal}
                contentContainerStyle={containerStyle}>
                <LoginForm />
                <Button style={{ marginTop: 30 }} onPress={toggleModal}>
                  Close Modal Window
                </Button>
              </Modal>
            </Portal>
          </Card>
        </Provider>
      </>
    </View>
  );
}
////////////////////////////////

////////////////////////////////
function LoginForm(props) {
  const [value, setValue] = useState(0);

  let [email, setEmail] = useState('');

  let [secure, setSecure] = useState(true);

  let [checked, setChecked] = useState(false);

  let [emailInfo, setEmailInfo] = useState(email);

  let [password, setPassword] = useState('');

  function submit(props) {
    if (email && password) {
      const emailRegex = /^[a-zA-Z0-9-_]{1,100}[@]{1}(?!\.)(?!\-)(?!.\.\.)[a-zA-Z0-9-_.]{1,100}[.][a-zA-Z]{1,100}$/;
      const passwordRegex = /password/;

      if (emailRegex.test(email) && passwordRegex.test(password)) {
        alert('Valid Login');
      } else {
        alert('Invalid Login');
      }
    }
  }

  return (
    <View style={styles.Container}>
      <Card>
        <Card.Title title="Login Modal Form" />
        <TextInput
          name="email"
          style={styles.input}
          onChangeText={(value) => setEmail((email = value))}
          //https://regex101.com/r/ir82yZ/1/
          placeholder="Enter Email"
        />

        <Text>Format is : email@address.domainName</Text>
        <Text> You entered: {email}</Text>

        <TextInput
          name="password"
          style={styles.input}
          onChangeText={(value) => setPassword((email = value))}
          secureTextEntry={secure}
          placeholder="Enter Password"
        />

        <Text>Hint: Password is "password"</Text>

        <CheckBox
          title="Show Password"
          checked={checked}
          onPress={() => setChecked(!checked) + setSecure(!secure)}
        />

        <Button style={styles.button} mode="contained" onPress={() => submit()}>
          Submit
        </Button>
      </Card>
    </View>
  );
}
///////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
  nav: {},
  modal: {},
  card: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 30,
  },
  input: {
    marginTop: 20,
  },
  hr: {
    height: 20,
    backgroundColor: 'transparent',
  },
  Button: {
    textSize: 50,
  },
  hr0: {
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: '#dadada',
  },
  p: {
    fontSize: 20,
  },
});
