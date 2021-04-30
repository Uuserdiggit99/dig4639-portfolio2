import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, Provider, Card, Divider, TextInput, Paragraph, ScrollView} from 'react-native-paper';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements';
//DIG4639, Portfolio 2

//Option 2. 

//This react native app is a Components Demo. It is meant as a way to show my proficiency in react as a collection of useful components. A couple components share similar concepts to previous assignments but I coded the components for this assignment from scratch to improve how they worked and to ensure maximum compatibility with Android and IOS.

//I plan on adding more components before using this project in my actual portfolio.

//Major Components: Login Screen with validation, Login Modal Window, Timer, Counter, Menu. 

//There should be 6 screens including the login window modal. The "login window modal" is not the same compenent as the first login screen.

//The password is “password”. Lower case, do not include the quotes.



import Home from './components/home.js';

export default function App() {
  let [loggedIn, setLoggedIn] = useState(false);

  function LoginForm() {
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
          setLoggedIn((loggedIn = true));
        } else {
          alert('Invalid Login');
        }
      }
    }
    //Return for Login
    return (
      <>
   
          <TextInput
            name="email"
            style={styles.input}
            onChangeText={(value) => setEmail((email = value))}
            //https://regex101.com/r/ir82yZ/1/
            placeholder="Enter Email"
          />

          <Text>Format is : email@address.domainName</Text>
          <Text> You entered: {email}{"\n"}</Text>
          <Divider style={styles.hr}/>
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

          <Text>{"\n"}</Text>

          <Button
            style={styles.button}
            mode="contained"
            onPress={() => submit()}>
            Submit
          </Button>
      

      </>
    );
  }

  //return for App
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <><Home /></>
      ) : (
        <>
        
          <Card>
          <Card.Title title="Log in to Continue" subtitle="Enter any valid email address, see hint for password" />
              <LoginForm />
          </Card>
          
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },hr:{
    backgroundColor:"white",
    height:10,
  },
});
