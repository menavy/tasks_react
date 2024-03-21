import { ReactElement, useEffect, useState } from "react"

interface MenuProps {
    children: ReactElement;
}

const Menu: React.FC<MenuProps> = ({  children }) => {


    return (
        <div className="menu">
            {children}
        </div>
    )
}

export default Menu;