"use client";

import { useEffect, useState } from "react";
import Alert from "../components/pages/message/alert";
import Button from "../components/pages/message/button";
import Dropdown from "../components/pages/message/dropdown";
import FileInput from "../components/pages/message/fileInput";
import Input from "../components/pages/message/input";
import TextArea from "../components/pages/message/textarea";
import Radio from "../components/pages/message/radio";
import { setRequestMeta } from "next/dist/server/request-meta";

export default function Messages() {
    const [user, setUser] = useState(Object)
    const [render, setRender] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [secondaryEmail, setSecondaryEmail] = useState("")
    const [duration, setDuration] = useState("1 Year")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [privacy, setPrivacy] = useState("No")

    const [steps, setStep] = useState({
        stepsItems: ["Email", "Secondary Email", "Capsule", "Review"],
        currentStep: 1
    })

    async function getUserData() {
        await fetch("http://localhost:4000/getUserData", {
          method: "GET",
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("accessToken")
          }
        }).then((response) => {
          return response.json()
        }).then((data: any) => {
          setUser(data)
          setName(data.name)
          setEmail(data.email)
          console.log("data: ", data)
        })
    }

    useEffect(() => {
        // Get the code returned from GitHub OAuth
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        const codeParam = urlParams.get("code");
    
        // If codeParam -> we authorized from github
        // If accessToken exists -> we're logged in already.
        // Either case, stay logged in and get user data.
        if (codeParam || localStorage.getItem("accessToken") !== null) {
            setRender(true);
            getUserData();
        }
    
        // If we authorized from Github OAuth, and no accessToken,
        // Get the access token from github and set userdata.
        if (codeParam && (localStorage.getItem("accessToken") === null)) {
          const getAccessToken = async () => {
            await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
              method: "GET"
            }).then((response) => {
              return response.json()
            }).then((data) => {
              if (data.access_token) {
                localStorage.setItem("accessToken", data.access_token)
              }
            })
          }
          getAccessToken().then(() => {
            getUserData()
            setRender(true);
          });
        }
      }, [])

    if (!render) {
        window.location.href = "http://localhost:3000"
    }

    return (
        <>
        <Alert/>
            <div className="mt-6 max-w-screen-xl mx-auto">
                <div className={`h-2 border-t-4 border-kubernetes`} style={{ width: `${steps.currentStep * 25}%` }}></div>
                <div className="w-full">
                    <ul className="flex w-full text-center">
                        {steps.stepsItems.map((item) => {
                            return (
                                <li className="relative" style={{ left: `${steps.stepsItems.indexOf(item) * 25}%` }}>
                                    <p className={`${steps.stepsItems.indexOf(item) === steps.currentStep - 1 ? "text-kubernetes font-bold" : "text-slate-600"}`}>{item}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {steps.currentStep === 1 && <Input placeholder="Email" value={email} onChange={(newEmail) => setEmail(newEmail)}/>}
                {steps.currentStep === 2 && <Input placeholder="Secondary Email" value={secondaryEmail} onChange={(secondaryEmail) => setSecondaryEmail(secondaryEmail)}/>}
                {steps.currentStep === 3 && (
                    <>
                    <Input placeholder="Full Name" value={name} onChange={(newName) => setName(newName)}/>
                    <Dropdown title="Duration" options={["1 Year", "10 Years", "100 Years"]} onChange={(newDuration) => setDuration(newDuration)}/>
                    <TextArea placeholder="Message" onChange={(newMessage) => setMessage(newMessage)}/>
                    <FileInput placeholder="Message" onChange={(newImage) => setImage(newImage)}/>
                    <Radio radios={["No", "Yes"]} onChange={(newPrivacy) => setPrivacy(newPrivacy)} />
                    </>
                )}
                <Button title={`${steps.currentStep === 4 ? "Submit" : "Next"}`} onClick={() => {
                    if (steps.currentStep !== 4) setStep({stepsItems: steps.stepsItems, currentStep: steps.currentStep + 1})
                }}/>
            </div>
        </>
    )
}