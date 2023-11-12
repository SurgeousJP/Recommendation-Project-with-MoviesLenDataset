// SideBar.tsx
import React from 'react';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-[77px] right-[-18.75rem] w-[18.75rem] bg-background p-5 z-20 transition ease-in-out duration-300 h-[calc(100%-77px)] ${
        isOpen ? 'right-0' : ''
      }`}
    >
      {/* Add your sidebar content here */}
    </div>
  );
};

export default SideBar;
