import React from 'react';
import {TouchableOpacity} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

interface ISizeViewProps {
  size: string;
  isSelected: boolean;
  onSelect: () => void;
}

const SizeView: React.FC<ISizeViewProps> = ({size, isSelected, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`px-4 py-2 rounded border ${
        isSelected ? 'border-matule-blue bg-matule-blue' : 'border-gray-500'
      } mx-1`}>
      <RalewayText
        weight={600}
        className={`text-base ${isSelected ? 'text-white' : 'text-black'}`}>
        {size}
      </RalewayText>
    </TouchableOpacity>
  );
};

export default SizeView;
