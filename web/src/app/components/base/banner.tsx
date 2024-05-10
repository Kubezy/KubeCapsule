"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default () => {
  const cookies = new Cookies()

  const CLIENT_ID=process.env.CLIENT_ID
  const WEB_URL=process.env.WEB_URL
  const SERVER_URL=process.env.SERVER_URL

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(Object)

  useEffect(() => {
    // Get the code returned from GitHub OAuth
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");

    // If codeParam -> we authorized from github
    // If accessToken exists -> we're logged in already.
    // Either case, stay logged in and get user data.
    if (codeParam || cookies.get("accessToken") !== undefined) {
      setIsLoggedIn(true)
      getUserData();
    }

    // If we authorized from Github OAuth, and no accessToken,
    // Get the access token from github and set userdata.
    if (codeParam && (cookies.get("accessToken") === undefined)) {
      const getAccessToken = async () => {
        await fetch(`${SERVER_URL}/getAccessToken?code=` + codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json()
        }).then((data) => {
          if (data.access_token) {
            cookies.set("accessToken", data.access_token, { path: '/' })
          }
        })
      }
      getAccessToken().then(() => {
        getUserData();
      });
    }
  }, [])

  // Get the user data from proxy server with the accessToken
  async function getUserData() {
    await fetch(`${SERVER_URL}/getUserData`, {
      method: "GET",
      headers: {
        "Authorization" : "Bearer " + cookies.get("accessToken")
      }
    }).then((response) => {
      return response.json()
    }).then((data: any) => {
      setUser(data)
    })
  }
  
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
      <div className={`bg-main-kubezy rounded-sm flex items-center justify-center py-1 px-2 ml-4`}>
        {isLoggedIn ? 
          <>
          <button onClick={() => { 
            window.location.href = `${WEB_URL}/message`;
            }} className="flex mr-4 bg-kubernetes rounded-sm p-2">
            + Message
          </button> 
          <button onClick={() => {
            cookies.remove("accessToken", { path: '/' })
            setIsLoggedIn(false); 
            window.location.href = `${WEB_URL}`;
            }} className="flex bg-kubernetes rounded-sm p-2">
            Logout
          </button> 
          </>
          :
          <a href={`http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`} className="flex bg-kubernetes rounded-sm p-2">
            <img className='mr-1' height="24" width="24" src="https://cdn.simpleicons.org/github/white" />
            Login With GitHub
          </a>
        }
      </div>
      </div>
    </div>
  )
}
