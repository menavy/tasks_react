import { ReactElement, useEffect, useState } from "react"
import { IBoard } from "../models/IBoard"
import edit from "../assets/icons/edit2.svg"
import trash from "../assets/icons/trash.svg"

interface MenuProps {
    item: IBoard,
    editBoard: (board: IBoard) => void,
    deleteBoard: (board: IBoard) => void,
    navigate: (_id: string) => void,
}

const MenuItem: React.FC<MenuProps> = ({ item, editBoard, deleteBoard, navigate }) => {

    const [menuItemState, setMenuItem] = useState<IBoard>()

    useEffect(() => {
        setMenuItem(item)
    }, [item])
    
    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault()
        deleteBoard(item)
    }

    const handleUpdate = (e: React.MouseEvent) => {
        e.preventDefault()
        editBoard(item)
    }

    const navigateTo = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate(item._id)
    }

    return (
        <li>
            <a onClick={navigateTo}>{item.name}</a>
            <div className="buttons">
                <button className='btnIcon' onClick={handleUpdate}>
                    <img src={edit}></img>
                </button>
                <button className='btnIcon' onClick={handleRemove}>
                    <img src={trash}></img>
                </button>
            </div>
        </li>
    )
}

export default MenuItem;