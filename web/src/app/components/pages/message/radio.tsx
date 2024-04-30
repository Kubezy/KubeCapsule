import { ChangeEvent, useState } from "react"

interface RadioProps {
    radios: string[];
    onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ radios, onChange }) => {
    const [option, setOption] = useState(radios[0])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <h2 className="text-gray-800 font-medium">Would you like to make your message public?</h2>
            <ul className="mt-3 space-y-3">
                {
                    radios.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-x-2.5">
                            <input type="radio" value={item} checked={option === item} className="border-gray-400 text-kubernetes focus:ring-kubernetes duration-150"
                            onChange={(e) => {
                                setOption(e.target.value);
                                handleChange(e);
                            }} />
                            <label className="text-sm text-gray-700 font-medium">
                                {item}
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Radio;