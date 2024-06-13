import; React, {; useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logo} 
      />
      <Text h3 style={styles.title}>Welcome Back</Text>
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
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.signup}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  forgotPassword: {
    textAlign: 'center',
    marginTop: 15,
    color: '#3498db',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#3498db',
    marginLeft: 5,
  },
});

export default LoginScreen;
