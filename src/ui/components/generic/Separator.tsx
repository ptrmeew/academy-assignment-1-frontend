import React from 'react';

const Separator: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex justify-center items-center mb-4">
    <div className="w-full h-[1px] bg-gray-500"></div>
    {text && <div className="mx-3 text-sm font-semibold text-gray-500">{text}</div>}
    <div className="w-full h-[1px] bg-gray-500"></div>
  </div>
);
export default Separator;
