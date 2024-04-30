"use client";

import { useState } from "react";
import Button from "../components/pages/message/button";
import Dropdown from "../components/pages/message/dropdown";
import FileInput from "../components/pages/message/fileInput";
import Input from "../components/pages/message/input";
import TextArea from "../components/pages/message/textarea";
import Radio from "../components/pages/message/radio";

export default function Messages() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [duration, setDuration] = useState("1 Year")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [privacy, setPrivacy] = useState("No")

    const [steps, setStep] = useState({
        stepsItems: ["Email", "Email Confirmation", "Capsule", "Review"],
        currentStep: 1
    })

    return (
        <>
            <div className="mt-6 max-w-screen-xl mx-auto">
                <div className={`h-2 border-t-4 border-kubernetes`} style={{ width: `${steps.currentStep * 25}%` }}></div>
                <div className="w-full">
                    <ul className="flex w-full">
                        {steps.stepsItems.map((item) => {
                            return (
                                <li className="relative" style={{ left: `${steps.stepsItems.indexOf(item) * 25}%` }}>
                                    <p className={`${steps.stepsItems.indexOf(item) === steps.currentStep - 1 ? "text-kubernetes font-bold" : "text-slate-600"}`}>{item}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {steps.currentStep === 1 && <Input placeholder="Email" onChange={(newEmail) => setEmail(newEmail)}/>}
                {steps.currentStep === 2 && <Input placeholder="Code" onChange={(newEmail) => setEmail(newEmail)}/>}
                {steps.currentStep === 3 && (
                    <>
                    <Input placeholder="Full Name" onChange={(newName) => setName(newName)}/>
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