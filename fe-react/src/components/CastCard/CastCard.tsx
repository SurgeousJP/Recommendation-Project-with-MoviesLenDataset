import React from 'react';

interface CastCardProps {
  imageUrl: string;
  name: string;
  character: string;
}

const CastCard: React.FC<CastCardProps> = ({ imageUrl, name, character }) => {
  return (
    <div className='hover:shadow-gray-800/70 hover:shadow-lg shadow-none transition border-border rounded-lg border-1 h-64 w-[8.6rem] bg-textbox overflow-clip'>
      <img className='w-[8.6rem] h-[10.9rem]' src={imageUrl} alt={`${name} as ${character}`} />
      <p className='font-bold mx-2 mt-1'>{name}</p>
      <p className='text-sm mx-2'>{character}</p>
    </div>
  );
};

export default CastCard;
