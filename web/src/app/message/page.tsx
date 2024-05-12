"use client";

import { useEffect, useState } from "react";
import Alert from "../components/pages/message/alert";
import Button from "../components/pages/message/button";
import Dropdown from "../components/pages/message/dropdown";
import Input from "../components/pages/message/input";
import TextArea from "../components/pages/message/textarea";
import Radio from "../components/pages/message/radio";
import Review from "../components/pages/message/review";
import Cookies from 'universal-cookie';
import Spinner from "../components/pages/message/spinner";

export default function Messages() {
    const cookies = new Cookies()
    
    const MAX_EMAIL = 3
    const SERVER_URL = "http://localhost:4000" // "https://server.kubecapsule.com"

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [secondaryEmail, setSecondaryEmail] = useState("")
    const [duration, setDuration] = useState("1 Year")
    const [message, setMessage] = useState("")
    const [privacy, setPrivacy] = useState("No")
    const [loading, setLoading] = useState(false)

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    const [steps, setStep] = useState({
        stepsItems: ["Email", "Secondary Email", "Capsule", "Review"],
        currentStep: 1
    })

    async function getUserData() {
      // Fetch user data from server
      await fetch(`${SERVER_URL}/getUserData`, {
        method: "GET",
        headers: {
          "Authorization" : "Bearer " + cookies.get("accessToken")
        }
      }).then((response) => {
        return response.json()
      }).then((data: any) => {
        // Get the name and email from GitHub profile
        setName(data.name)
        setEmail(data.email)
      })
    }

    async function sendMessageToDB(message: any) { // email, duration, message, share_public
      try {
        // Send the request to the server along with capsule
        await fetch(`${SERVER_URL}/addmessage?email=${message.email}&secondary_email=${message.secondaryEmail}&duration=${message.duration}&message=${message.message}&share_public=${message.share_public}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // After that, send the user to home page.
        window.location.href = '/'
      } catch (error) {
          console.error('Error sending message:', error);
      }
    }

    const fetchEmailCount = async (email: string) => {
      // Initialize count
      let count = 0;

      // Fetch count from server, set to -1 if error fetching
      await fetch(`${SERVER_URL}/emailcount/${email}`)
          .then(response => response.json())
          .then(data => count = data.count)
          .catch(error => {
            console.error('Error fetching email count:', error);
            count = -1;
          });

      return count
    }  

    useEffect(() => {
        // Get the code returned from GitHub OAuth
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        const codeParam = urlParams.get("code");
    
        // If codeParam -> we authorized from github
        // If accessToken exists -> we're logged in already.
        // Either case, stay logged in and get user data.
        if (codeParam || cookies.get("accessToken") !== undefined) {
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
            getUserData()
          });
        }
      }, [])

    return (
        <>
        <Alert />
        <div className="mt-6 max-w-screen-xl mx-auto">
            <div className={`h-2 border-t-4 border-kubernetes`} style={{ width: `${steps.currentStep * 25}%` }}></div>
            {/* PAGINATION WITH LABELS */}
            <div className="w-full">
                <ul className="flex w-full text-center">
                    {steps.stepsItems.map((item, idx) => {
                        return (
                            <li className="relative" style={{ left: `${steps.stepsItems.indexOf(item) * 25}%` }}>
                                <p className={`${steps.stepsItems.indexOf(item) === steps.currentStep - 1 ? "text-kubernetes font-bold" : "text-slate-600"}`}>{item}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {/* EMAIL */}
            {steps.currentStep === 1 && <Input title="Email" placeholder="hello@kubezy.com" value={email} disabled={loading} onChange={(newEmail) => setEmail(newEmail)}/>}
            {/* SECONDARY EMAIL */}
            {steps.currentStep === 2 && <Input title="Secondary Email (Optional)" placeholder="hello@kubezy.com" value={secondaryEmail} disabled={loading} onChange={(secondaryEmail) => setSecondaryEmail(secondaryEmail)}/>}
            {/* CAPSULE */}
            {steps.currentStep === 3 && (
                <>
                <Input title="Full Name" placeholder="John Doe" value={name} disabled={loading} onChange={(newName) => setName(newName)}/>
                <Dropdown title="Duration" options={["1 Year", "5 Years", "10 Years"]} onChange={(newDuration) => setDuration(newDuration)}/>
                <TextArea title="Message" placeholder="Hello world!" onChange={(newMessage) => setMessage(newMessage)}/>
                <Radio radios={["No", "Yes"]} onChange={(newPrivacy) => setPrivacy(newPrivacy)} />
                </>
            )}
            {/* REVIEW */}
            {steps.currentStep === 4 && (
                <>
                <Review title="Email" value={email} />
                {secondaryEmail !== "" && <Review title="Secondary Email" value={secondaryEmail} />}
                <Review title="Name" value={name} />
                <Review title="Duration" value={duration} />
                <Review title="Message" value={message} />
                <Review title="Public" value={privacy} />
                </>
            )}
            {/* If loading, show spinner */}
            {loading && (
              <Spinner />
            )}
            <div className="flex flex-row">
            {/* If not on step 1, show back button */}
            {steps.currentStep !== 1 && (
              <Button title="Back" disabled={loading} onClick={() => setStep({stepsItems: steps.stepsItems, currentStep: steps.currentStep - 1})}/>
            )}
            <Button title={`${steps.currentStep === 4 ? "Submit" : "Next"}`} disabled={loading} onClick={async () => {
                if (steps.currentStep === 1) { // email
                  // Set the loading to true. This disables the components in the form automatically.
                  setLoading(true);
                  // Get the corresponding count of the given email
                  const emailCount = await fetchEmailCount(email)
                  // Set loading to false, enables the components
                  setLoading(false)

                  // -1 if error fetching data
                  if (emailCount === -1) {
                    alert("Can't reach the server. Check your connection.")
                  }
                  // Check if user reached max messages
                  else if (emailCount > MAX_EMAIL) {
                    alert("The email you entered has already sent maximum amount of messages.")
                  }

                  // Check if invalid email
                  if (emailRegex.test(email)) {
                    setStep({stepsItems: steps.stepsItems, currentStep: 2})
                  }
                  else alert("Please enter a valid email address.")
                }
                else if (steps.currentStep === 2) { // secondary email
                  // If empty, go to next page since its optional
                  if (secondaryEmail.trim() === "") {
                    setStep({stepsItems: steps.stepsItems, currentStep: 3})
                  }
                  // Else check if valid email
                  else if (emailRegex.test(secondaryEmail)) {
                    setStep({stepsItems: steps.stepsItems, currentStep: 3})
                  }
                  else alert("Please enter a valid email address.")
                }
                else if (steps.currentStep === 3) { // capsule
                  // Check if message is empty
                  if (message.trim() === "") {
                    alert("Message can't be empty.")
                  }
                  // Check if name is empty
                  else if (name.trim() === "") {
                    alert("Name can't be empty.")
                  }
                  // Else go to next page
                  else setStep({stepsItems: steps.stepsItems, currentStep: 4})
                }
                else { // review
                  // Send the capsule to server
                  const _d = Number(duration.substring(0, 2).trim())
                  sendMessageToDB({email: email, secondary_email: secondaryEmail, duration: _d, message: message, share_public: privacy})
                }
            }}/>
            </div>
        </div>
        </>
    )
}