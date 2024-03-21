import { ReactElement, useEffect, useState } from "react"


interface HeaderProps {
    children: ReactElement;
}

const Header: React.FC<HeaderProps> = ({ children }) => {

    return (
        <div className="header">
            {children}
        </div>
    )
}

export default Header;