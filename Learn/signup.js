import; React, { useState; } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logo} 
      />
      <Text h3 style={styles.title}>Create an Account</Text>
      <Input
        placeholder="Name"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        value={name}
        onChangeText={setName}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        rightIcon={
          <Icon
            name={secureText ? 'eye-slash' : 'eye'}
            type='font-awesome'
            onPress={() => setSecureText(!secureText)}
          />
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Confirm Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        rightIcon={
          <Icon
            name={secureConfirmText ? 'eye-slash' : 'eye'}
            type='font-awesome'
            onPress={() => setSecureConfirmText(!secureConfirmText)}
          />
        }
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureConfirmText}
        containerStyle={styles.input}
      />
      <Button
        title="Sign Up"
        onPress={handleSignup}
        buttonStyle={styles.button}
      />
      <View style={styles.login}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}> Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#3498db',
    marginLeft: 5,
  },
});

export default SignupScreen;
