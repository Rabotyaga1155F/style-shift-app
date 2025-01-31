import React, {FC} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import clsx from 'clsx';

interface ISearchProps extends TextInputProps {}

const Search: FC<ISearchProps> = ({className, ...rest}) => {
  return (
    <TextInput
      {...rest}
      className={clsx('bg-white rounded px-4', className)}
      numberOfLines={1}
      placeholder={'Поиск...'}
    />
  );
};

export default Search;
