import { FC, ReactElement, useState } from "react";
import { IBoard } from "../models/IBoard";
import { boardApi } from "../services/BoardService";

interface INewBoard {
    name: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    board: IBoard | undefined,
    type: string
}

export default function ModalBoard(props: ModalProps): ReturnType<FC> {

    const [newBoardName, setNewBoardName] = useState('')
    const [createBoardMutation, { }] = boardApi.useCreateBoardMutation()
    const [editBoardMutation, { }] = boardApi.useEditBoardMutation()

    const handleEditBoardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBoardName(e.target.value);
    }

    const handleEditBoardSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()

        if (props.board && props.type == 'edit') {
            await editBoardMutation({ _id: props.board._id, name: newBoardName, user_id: props.board.user_id });
        } else {
            await createBoardMutation({ name: newBoardName });
        }
        close()
    }

    const inputPlaceholder = () => {
        if(props.type == 'edit'){
            return 'Введіть нову назву...'
        } else {
            return 'Введіть назву...'
        }
    }

    const close = () => {
        setNewBoardName('')
        props.onClose()
    }

    return (
        <div className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}>
            <div className="modalMain">
                <h3>{props.type=='edit' ? 'Редагувати': 'Створити'} дошку</h3>

                <div className="modalBody">
                        <input placeholder={inputPlaceholder()} type="text" onChange={handleEditBoardChange} value={newBoardName} required maxLength={200} />
                        <div className='buttons'>
                            <button className='btnSmall' onClick={close}>Відмінити</button>
                            <button className='btnSmall' onClick={handleEditBoardSubmit}>{props.type=='edit' ? 'Редагувати': 'Створити'}</button>
                        </div>

                </div>

            </div>
        </div>
    );

}