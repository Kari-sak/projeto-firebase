import { SafeAreaView, Text, Pressable, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";

const SignupScreen = () => {
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    
    return (
      <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', height:'80%'}}></View>
        <View style={styles.cabecalho}>
          <Text>Cadastro</Text>
        </View>
        <TextInput
            style= {styles.campos}
            onChangeText={setSignInEmail}
            value={signInEmail}
            placeholder="E-mail"
        />
        <TextInput
          onChangeText={setSignInPassword}
          value={signInPassword}
          placeholder="Senha"
        />
        <View>
        <Pressable style={styles.botao} onPress={() => signInWithEmailAndPassword(auth, signInEmail, signInPassword)}> 
          <Text>Cadastrar</Text>
        </Pressable>
        </View>
      </SafeAreaView>
    )
};

export default SignupScreen;

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