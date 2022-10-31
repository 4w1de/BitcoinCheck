import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from './Home';
import { CoinInfo } from './CoinInfo';
import { Favorites } from './Favorites';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CoinInfo"
                    component={CoinInfo}
                    options={{
                        headerStyle: {
                            backgroundColor: '#333333',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
