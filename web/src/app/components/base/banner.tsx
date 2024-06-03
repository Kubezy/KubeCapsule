"use client"

import React from 'react';
import LoginWithGitHub from './LoginWithGitHub';

export default () => {
  return (
    <div className="bg-black-capsule grid grid-cols-2">
      <div className="max-w-sm px-4 py-3 text-white md:px-8">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex-none">
            <div className="flex text-xl font-semibold pt-2 pl-2 md:text-center">
              KubeCapsule
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-xl px-4 py-3 text-white sm:text-center md:px-8 justify-self-end">
        <a href="https://github.com/kubezy/KubeCapsule" target="_blank" className="pt-1 flex pr-4">
          <img height="24" width="24" src="https://cdn.simpleicons.org/github/white" />
        </a>
        <a href="https://www.linkedin.com/company/kubecapsule/" target="_blank" className="pt-1 flex pr-4">
          <img height="24" width="24" src="https://cdn.simpleicons.org/linkedin/white" />
        </a>
        <a href="https://x.com/kubecapsule" target="_blank" className="pt-1 flex">
          <img height="24" width="24" src="https://cdn.simpleicons.org/x/white" />
        </a>
        <LoginWithGitHub />
      </div>
    </div>
  );
}
