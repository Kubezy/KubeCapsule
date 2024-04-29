import React from 'react';

export default () => {
  return (
    <div className="bg-black-capsule grid grid-cols-2">
      <div className="max-w-sm px-4 py-3 text-white md:px-8">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex-none">
          <a href='/' >
            <img src="/logo/logo-02.png" width={120} />
          </a>  
          </div>
          <div className="flex font-semibold pt-2 pl-2 md:text-center" style={{ marginLeft: "-2.5rem" }}>
            KubeCapsule
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-xl px-4 py-3 text-white sm:text-center md:px-8 justify-self-end">
      <a href="https://github.com/kubezy/KubeCapsule" className="flex font-semibold pt-2 pr-4 hover:text-main-capsule">
            Docs
      </a>
      <a href="https://github.com/kubecapsule/KubeCapsule" className="pt-1 flex pr-4">
      <img height="24" width="24" src="https://cdn.simpleicons.org/github/white" />
      </a>
      <a href="#" className="pt-1 flex pr-4">
      <img height="24" width="24" src="https://cdn.simpleicons.org/linkedin/white" />
      </a>
      <a href="#" className="pt-1 flex">
      <img height="24" width="24" src="https://cdn.simpleicons.org/x/white" />
      </a>
      </div>
    </div>
  )
}
