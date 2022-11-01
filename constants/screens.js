import { Home } from '../screens/Home';
import { CoinInfo } from '../screens/CoinInfo';
import { Favorites } from '../screens/Favorites';

import { BACKGROUND_COLOR, MAIN_COLOR_TEXT } from '../constants/colors';

export const HOME_SCREEN = {
    id: 0,
    name: 'Home',
    component: Home,
    options: { headerShown: false },
};
export const FAVORITES_SCREEN = {
    id: 1,
    name: 'Favorites',
    component: Favorites,
    options: { headerShown: false },
};
export const COININFO_SCREEN = {
    id: 2,
    name: 'CoinInfo',
    component: CoinInfo,
    options: {
        headerStyle: {
            backgroundColor: BACKGROUND_COLOR,
        },
        headerTintColor: MAIN_COLOR_TEXT,
    },
};

export const SCREENS_MAP = [HOME_SCREEN, FAVORITES_SCREEN, COININFO_SCREEN];
