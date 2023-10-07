import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from 'react';
import AddFriendScreen from "./screens/AddFriend";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import MessageScreen from "./screens/Message";
import MessagesSummaryScreen from "./screens/MessagesSummary";
import SignupScreen from "./screens/Signup";

const MainNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (isLoading) setIsLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const Stack = createNativeStackNavigator();

    return (
    <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name={"AddFriend"} component={AddFriendScreen}/>
        <Stack.Screen name={"Home"} component={HomeScreen}/>
        <Stack.Screen name={"Login"} component={LoginScreen}/>
        <Stack.Screen name={"Message"} component={MessageScreen}/>
        <Stack.Screen name={"MessagesSummary"} component={MessagesSummaryScreen} />
        <Stack.Screen name={"Signup"} component={SignupScreen}/>
     </Stack.Navigator>
    )
}

export default MainNavigator;