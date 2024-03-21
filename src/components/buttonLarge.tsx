import { useEffect, useState } from "react"

interface ButtonLargeProps {
    label: string,
    onClick: () => void
}

const ButtonLarge: React.FC<ButtonLargeProps> = ({ onClick, label }) => {

    return (
        <button className="btnLarge" onClick={onClick} > {label} </button>
    )
}

export default ButtonLarge;