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
    ...props
}: ButtonProps) {
    return (
        <div className="bg-black w-10 h-10">

        </div>
    );
}
