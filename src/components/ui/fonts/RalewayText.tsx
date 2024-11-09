import {PropsWithChildren} from 'react';
import {Text, TextProps} from 'react-native';

type TypeTextWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type TypeTextRaleway =
  | 'Raleway-Thin'
  | 'Raleway-ExtraLight'
  | 'Raleway-Light'
  | 'Raleway-Regular'
  | 'Raleway-Medium'
  | 'Raleway-SemiBold'
  | 'Raleway-Bold'
  | 'Raleway-ExtraBold'
  | 'Raleway-Black';
export interface IRalewayText extends TextProps {
  weight?: TypeTextWeight;
}

export default function RalewayText({
  children,
  style,
  weight = 400,
  className,
  ...rest
}: PropsWithChildren<IRalewayText>) {
  const font: Record<TypeTextWeight, TypeTextRaleway> = {
    '100': 'Raleway-Thin',
    '200': 'Raleway-ExtraLight',
    '300': 'Raleway-Light',
    '400': 'Raleway-Regular',
    '500': 'Raleway-Medium',
    '600': 'Raleway-SemiBold',
    '700': 'Raleway-Bold',
    '800': 'Raleway-ExtraBold',
    '900': 'Raleway-Bold',
  };

  return (
    <Text
      {...rest}
      style={[{fontFamily: font[weight], color: '#000000'}, style]}>
      {children}
    </Text>
  );
}
