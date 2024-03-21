import { useEffect, useState } from "react"
import { ITask } from "../models/ITask"
import React from "react"
import edit from "../assets/icons/edit2.svg"
import trash from "../assets/icons/trash.svg"

interface IsecondChildProps {
    card: any;
    status: string;
    dragOver: string;
    editHandler: (task: ITask) => void;
    deleteHandler: (task: ITask) => void;
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOverStart: (e: string) => void;
    dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    dragStartHandler: (e: React.DragEvent<HTMLDivElement>, status: string, item: any) => void;
    dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    dropHandler: (e: React.DragEvent<HTMLDivElement>, status: string, item: any) => void;

}

const Task: React.FC<IsecondChildProps> = ({
    card,
    status,
    dragOver,
    editHandler,
    deleteHandler,
    dragOverHandler,
    handleDragOverStart,
    dragLeaveHandler,
    dragStartHandler,
    dragEndHandler,
    dropHandler }) => {

    const [itemState, setItemState] = useState({ id: '', task: '', status: '0', order: 0, board_id: '' })

    useEffect(() => {

        setItemState(card)

    }, [card])

    const editTask = (e: React.MouseEvent) => {
        e.preventDefault()
        editHandler(card)
    }

    const deleteTask = (e: React.MouseEvent) => {
        e.preventDefault()
        deleteHandler(card)
    }

    return (
        <div
            key={card.id}
            draggable={true}
            onDragOver={(e) => dragOverHandler(e)}
            onDragEnter={(e) => handleDragOverStart(card._id)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, status, card)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, status, card)}
            className="task"
            style={{ background: dragOver == card._id ? 'grey' : 'white' }}
        >
            <h4>{card.name}</h4>
            <p>{card.task}</p>
            <div className="buttons">
                <button className='btnIcon' onClick={editTask}>
                    <img src={edit}></img>
                </button>
                <button className='btnIcon' onClick={deleteTask}>
                    <img src={trash}></img>
                </button>
            </div>

        </div>


    )
}

export default Task;