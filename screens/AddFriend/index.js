import { SafeAreaView, Text, Pressable, View, StyleSheet } from "react-native";

const AddFriendScreen = () => {
    if (newFriendEmail) {
      if (!contacts.some((contact) => contact.email === newFriendEmail)) {
        const currentUser = auth.currentUser;
        const currentUid = currentUser.uid;
        database.ref('users')
          .orderByChild('email')
          .equalTo(newFriendEmail)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const friendUid = Object.keys(userData)[0];
              const userRef = database.ref(`users/${currentUid}`);
              const newFriendRef = userRef.child('friends').push();
              newFriendRef.set({ email: newFriendEmail, uid: friendUid });
              const friendRef = database.ref(`users/${friendUid}`);
              const newFriendForFriendRef = friendRef.child('friends').push();
              newFriendForFriendRef.set({ email: currentUser.email, uid: currentUid });
              setFilteredContacts((prevFilteredContacts) => [
                ...prevFilteredContacts,
                { email: newFriendEmail, uid: friendUid },
              ]);
            } else {
              console.log('E-mail inválido!');
              Alert.alert('E-mail inválido!');
            }
          })
          .catch((error) => {
            console.error('Erro!', error);
          });
      } else {
        console.log('Este amigo já foi adicionado!');
        Alert.alert('Este amigo já foi adicionado!');
      }
    };

    return (
        <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', height:'80%'}}></View>
            <View style={styles.cabecalho}>
                <Text>Adicionar Amigo</Text>
            </View>
            <Pressable style={styles.botao} onPress={() => AddFriendScreen(currentUser, currentUid)}> 
                <Text>Adicionar</Text>
            </Pressable>
    </SafeAreaView>
  )
};

export default AddFriendScreen;

const styles = StyleSheet.create({
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
