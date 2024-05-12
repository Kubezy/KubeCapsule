"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default () => {
  const cookies = new Cookies()

  const CLIENT_ID = "Ov23ct6JRI0gTZqedVvK"
  const SERVER_URL = "http://localhost:4000" // "https://server.kubecapsule.com" 

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(Object)

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");

    if (codeParam || cookies.get("accessToken") !== undefined) {
      setIsLoggedIn(true)
      getUserData();
    }

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

  async function getUserData() {
    await fetch(`${SERVER_URL}/getUserData`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + cookies.get("accessToken")
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
        <div className={`bg-main-kubezy rounded-sm flex items-center justify-center py-1 px-2 ml-4`}>
          {isLoggedIn ?
            <>
              <a href="/message" className="flex mr-4 bg-main-capsule rounded-sm p-2">
                Add to Capsule
              </a>
              <button onClick={() => {
                cookies.remove("accessToken", { path: '/' })
                setIsLoggedIn(false);
                window.location.href = "/";
              }} className="flex bg-main-capsule rounded-sm p-2">
                Logout
              </button>
            </>
            :
            <a href={`http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`} className="flex bg-main-capsule rounded-sm p-2">
              <img className='mr-1' height="24" width="24" src="https://cdn.simpleicons.org/github/white" />
              Login With GitHub
            </a>
          }
        </div>
      </div>
    </div>
  )
}
