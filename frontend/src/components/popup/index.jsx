import React from "react";
import "./style.scss";

export default function Popup(props) {
    const { TypeColor, Seconds } = props;

    const filterSeconds = Seconds || 4

    const style = {
        "--type-color": TypeColor,
        "--animation-seconds": `${filterSeconds}s`,
    };

    return (
        <div className="popup-queue">
            <div className="popup" style={style}>
                {props.children}
            </div>
        </div>
    );
}
