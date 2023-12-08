import React from 'react';
import SidebarDiscussion from 'src/components/SidebarDiscussion/SidebarDiscussion';

interface DiscussionLayoutProps {
  children: React.ReactNode;
}

function DiscussionLayout({ children }: DiscussionLayoutProps) {
  return (
    <div className='w-screen min-h-screen flex bg-background relative'>
      <SidebarDiscussion />
      {children}
    </div>
  );
}

export default DiscussionLayout;
