import {IRoute} from './navigation.types.ts';
import HomePage from '@/components/pages/home/Home.tsx';
import FavoritePage from '@/components/pages/favorite/Favorite.tsx';
import ChatPage from '@/components/pages/chat/Chat.tsx';
import ProfilePage from '@/components/pages/profile/Profile.tsx';

export const routes: IRoute[] = [
  {
    name: 'HomePage',
    component: HomePage,
  },
  {
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    name: 'FavoritePage',
    component: FavoritePage,
  },
  {
    name: 'ChatPage',
    component: ChatPage,
  },
];
