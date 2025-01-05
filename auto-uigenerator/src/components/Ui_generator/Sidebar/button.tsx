import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    bgColor?: string;
    textColor?: string;
    className?: string;
}

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    style={},
    onClick=()=>{},
    ...props
}: ButtonProps) {
    return (
        <button type={type} style={style} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} w-full h-full relative `} onClick={onClick} >
            {!children?"button":children}
        </button>
    );
}
