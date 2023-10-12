import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.cabecalho}>
                <Text> Projeto Firebase</Text>
            </View>
            <View style={{justifyContent:'space-around', alignItems:'center'}}>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('Signup')}>
                    <Text>Cadastrar-se</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('Login')}>
                    <Text>Logar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
botao:{
    backgroundColor: 'pink',
    padding:'1rem',
    margin:'1rem',
    width:'65%',
    textAlign:'center',
    },
cabecalho:{
    padding:'2em',
    backgroundColor:'pink',
    width:'100%',
    textAlign:'center',
    marginBottom:'1em',
    }
});