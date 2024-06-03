"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const LoginWithGitHub = () => {
  const cookies = new Cookies();

  const CLIENT_ID = "Ov23lix3Vj8c4sxqCz1o";
  const SERVER_URL = "https://kubecapsule.com/api";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(Object);

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");

    if (codeParam || cookies.get("accessToken") !== undefined) {
      setIsLoggedIn(true);
      getUserData();
    }

    if (codeParam && (cookies.get("accessToken") === undefined)) {
      const getAccessToken = async () => {
        await fetch(`${SERVER_URL}/getAccessToken?code=` + codeParam, {
          method: "GET"
        }).then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              cookies.set("accessToken", data.access_token, { path: '/' });
            }
          });
      };

      getAccessToken().then(() => {
        getUserData();
      });
    }
  }, []);

  async function getUserData() {
    await fetch(`${SERVER_URL}/getUserData`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + cookies.get("accessToken")
      }
    }).then((response) => response.json())
      .then((data: any) => {
        setUser(data);
      });
  }

  return (
    <div className={`bg-main-kubezy rounded-sm flex items-center justify-center py-1 px-2 ml-4`}>
      {isLoggedIn ? (
        <>
          <a href="/message" className="flex mr-4 bg-main-capsule rounded-sm p-2">
            Add to Capsule
          </a>
          <button onClick={() => {
            cookies.remove("accessToken", { path: '/' });
            setIsLoggedIn(false);
            window.location.href = "/";
          }} className="flex bg-main-capsule rounded-sm p-2">
            Logout
          </button>
        </>
      ) : (
        <a href={`http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`} className="flex justify-center items-center bg-main-capsule rounded-sm p-2 w-full">
          <img className='mr-1' height="24" width="24" src="https://cdn.simpleicons.org/github/white" />
          Login With GitHub 
        </a>
      )}
    </div>
  );
};

export default LoginWithGitHub;
