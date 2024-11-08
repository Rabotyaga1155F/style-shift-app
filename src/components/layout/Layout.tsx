import React, {FC} from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import clsx from 'clsx';
import {View} from 'react-native';

export interface ILayoutProps extends SafeAreaViewProps {}

const Layout: FC<ILayoutProps> = ({children, className, ...rest}) => {
  return (
    <SafeAreaView {...rest} className={clsx(`flex-1 bg-white`, className)}>
      <View className={`px-4 flex-1`}>{children}</View>
    </SafeAreaView>
  );
};

export default Layout;
