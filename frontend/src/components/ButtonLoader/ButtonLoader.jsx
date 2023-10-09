import React from "react";
import Loading from "../Loading/Loading";
import "./ButtonLoader.scss";

export default function ButtonLoader({ className, children, ...restProps }) {
    // Verifica se a classe 'loading' está presente no className
    const isLoading = className && className.includes('loading');

    return (
        <button
            className={`button-loader ${className || ""}`}
            {...restProps}
        >
            {isLoading ? <Loading /> : children}
        </button>
    );
}
