import { SafeAreaView, Text, Pressable, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";

const LoginScreen = ({navigation}) => {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    return (
      <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', height:'80%'}}></View>
        <View style={styles.cabecalho}>
            <Text>Login</Text>
        </View>
        <TextInput
            style= {styles.campos}
            onChangeText={setLoginEmail}
            value={loginEmail}
            placeholder="E-mail"
        />
        <TextInput
          style= {styles.campos}
            onChangeText={setLoginPassword}
            value={loginPassword}
            placeholder="Senha"
        />
        <View>
        <Pressable style={styles.botao} onPress={() => loginWithEmailAndPassword(auth, loginEmail, loginPassword)}> 
            <Text>Logar</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={() => navigation.navigate('Signup')}>
            <Text>Cadastrar</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  botao:{
    backgroundColor: 'pink',
    padding:'1rem',
    margin:'1rem',
    width:'65%',
    textAlign:'center',
  },
  campos:{
    margin:'1em',
    padding:'1.5em',
    width:'65%'
  },
  cabecalho:{
    padding:'2em',
    backgroundColor:'pink',
    width:'100%',
    textAlign:'center',
    marginBottom:'1em',
  }
});