import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { SCREENS_MAP } from '../constants/screens';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {SCREENS_MAP.map((screen) => (
                    <Stack.Screen
                        key={screen.id}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
