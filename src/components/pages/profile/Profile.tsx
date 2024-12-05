import React, {FC} from 'react';
import Profile from '@/components/templates/profile/Profile.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';

const ProfilePage: FC = () => {
  const navigation = useTypedNavigation();
  const user = useAuthUserStore(state => state.user);
  const removeUser = useAuthUserStore(state => state.removeUser);

  return (
    <Profile navigation={navigation} user={user} removeUser={removeUser} />
  );
};

export default ProfilePage;
