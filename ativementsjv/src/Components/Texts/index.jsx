import React from "react";

export const Title = (props) => {
    return <h1 className={`text-2xl font-semibold ${props.styles}`}>{props.children}</h1>
};

export const Paragraph = (props) => {
    return <p className={`text-xl text-center w-[60%] ${props.styles}`}>{props.children}</p>
}

export const TextError = (props) => {
    return <p className="text-lg text-primary-red">{props.children}</p>
}