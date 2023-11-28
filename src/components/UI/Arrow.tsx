import React from 'react';

interface IArrow {
  width?: number,
  height?: number,
  color?: string,
}

const Arrow: React.FC<IArrow> = ({width = 8, height = 12, color = '#3877EE'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none">
      <path stroke={color} strokeWidth="2" d="m1 1 5 5-5 5"/>
    </svg>
  );
};

export default Arrow;
