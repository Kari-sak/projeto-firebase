import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    
} from "react-native";
import { auth, database, storage } from "../../../firebaseConfig";
import { useConversationStore, useFrienIdStore } from '../../../reducer';
import { format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, getDownloadURL} from '@react-native-firebase/storage';

const Message = () => {
    const conversationId = useConversationStore((state) => state.conversationId);
    const friendId = useFrienIdStore((state) => state.friendId);
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [userName, setUsername] = useState("");
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };
    const handleChooseImage = () => {
        const options = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                const storageRef = ref(storage, `images/${image.fileName}`);

                storageRef.putFile(image.uri)
                    .then(async (snapshot) => {
                        const imageUrl = await getDownloadURL(storageRef);
                        const newMessageData = {
                            senderUid: uid,
                            imageUrl: imageUrl,
                            timestamp: Date.now(),
                        };
                        const newMessageRef = database
                            .ref(`conversations/${conversationId}/messages`)
                            .push();
                        newMessageRef.set(newMessageData);
                        setMessages([...messages, newMessageData]);
                    })
                    .catch((error) => {
                        console.error("Erro ao fazer upload da imagem:", error);
                    });
            }
        });
    };
    
    if (!conversationId) {
        return (
            <View>
                <Text>Erro: ID da conversa não definido.</Text>
            </View>
        );
    }
    const uid = auth.currentUser.uid;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
    const messagesRef = database.ref(
        `conversations/${conversationId}/messages`
    );
    messagesRef.on("value", (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
            const messagesArray = Object.values(messagesData);
            messagesArray.sort((a, b) => b.timestamp - a.timestamp);
            messagesArray.forEach((message) => {
                message.timestamp = format(new Date(message.timestamp), "dd/MM/yy HH:mm");
            });
            setMessages(messagesArray);
        }
    });

}, [conversationId]);
    
    useEffect(() => {
        const uid = auth.currentUser.uid;
        console.log(uid);
        if (!uid) {
            console.error("UID do usuário não encontrado.");
            return;
        }

        const userRef = database.ref(`users/${friendId}`);

        userRef.on("value", (snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.profileImage && userData.name) {
                setUserProfileImage(userData.profileImage);
                setUsername(userData.name);
            }
        });
    }, []);

    const handleSend = () => {
        const timestamp = Date.now();
        const newMessageData = {
            senderUid: uid,
            text: newMessage,
            timestamp,
        };
        const newMessageRef = database
            .ref(`conversations/${conversationId}/messages`)
            .push();
        newMessageRef.set(newMessageData);

        setNewMessage("");
    };

    const renderMessage = ({ item, index }) => {
        const isCurrentUser = item.senderUid === uid;

        return (
            <View
              style={[
                styles.campos,
                isCurrentUser ? styles.campos: styles.campos,
              ]}
              key={index}
            >
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.campos}
                />
              )}
              {item.text && (
                <Text style={styles.campos}>{item.text}</Text>
              )}
              <Text style={styles.campos}>{item.timestamp}</Text>
            </View>
          );
        };

    return (
        <View style={styles.campos}>
            <View style={styles.cabecalho}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="arrow-left-long" color={"white"} size={23} style={styles.campos} />
                </TouchableOpacity>
                <View style={styles.cabecalho}>
                    <Text style={styles.textProfileName}>{userName}</Text>
                    {userProfileImage ? (
                        <Image source={{ uri: userProfileImage }} style={styles.campos} />
                    ) : (
                        <Image source={require('../../assets/logo.png')} style={styles.campos} />
                    )}
                </View>
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMessage}
                contentContainerStyle={styles.campos}
                inverted
            />
            <View style={styles.campos}>
                <TouchableOpacity style={{marginHorizontal: 10}} onPress={handleChooseImage}>
                    <Icon name="image" size={25} color="#1B0A3E" />
                </TouchableOpacity>
            </View>
            <View style={styles.campos}>
                <TextInput
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                    placeholder="Digite sua mensagem"
                />
                <TouchableOpacity style={styles.botao} onPress={handleSend}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Message;

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