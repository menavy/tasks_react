import { ChangeEventHandler, FC, ReactElement, useEffect, useState } from "react";
import { ITask } from "../models/ITask";
import { INewTask } from "../models/INewTask";
import { useParams } from "react-router-dom";
import { taskApi } from "../services/TaskService";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    task: ITask | undefined,
    type: string,
    id: string
}


export default function ModalTask(props: ModalProps): ReturnType<FC> {

    const { id } = useParams<{ id: any }>()
    const [boardId, setBoardId] = useState<string>(id)
    const [createTaskMutation, { }] = taskApi.useCreateTaskMutation()
    const [editTaskMutation, { }] = taskApi.useEditTaskMutation()

    const [formData, setFormData] = useState<INewTask>({
        name: '',
        task: '',
        board_id: '',
    })

    useEffect(() => {
        if (props.task) {
            setFormData({ name: props.task.name, task: props.task.task, board_id: props.id })
        }
    }, [props.task])


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        setBoardId(id)
        if (props.task) {
            await editTaskMutation({ _id: props.task._id, name: formData.name, task: formData.task, board_id: props.task.board_id, status: props.task.status, order: props.task.order });
        } else {
            await createTaskMutation({ name: formData.name, task: formData.task, board_id: props.id });
        }
        close()
    }


    const close = () => {
        setFormData({
            name: '',
            task: '',
            board_id: '',
        })
        props.onClose()
    }

    function inputPlaceholder() {
        if (props.type == 'edit') {
            return 'Введіть нову назву...'
        } else {
            return 'Введіть назву...'
        }
    }


    return (
        <div className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}>
            <div className="modalMain">
                <h3>{props.type == 'edit' ? 'Редагувати' : 'Створити'} задачу</h3>

                <div className="modalBody">
                    <input placeholder={inputPlaceholder()} type="text" name="name" id="name" onChange={handleChangeInput} value={formData.name} required maxLength={200} />
                    <textarea rows={5} name="task" id="task" value={formData.task} onChange={handleChangeTextarea} placeholder='Ваша задача...' ></textarea>
                    <div className='buttons'>
                        <button className='btnSmall' onClick={close}>Відмінити</button>
                        <button className='btnSmall' onClick={handleSubmit}>Зберегти</button>
                    </div>

                </div>

            </div>
        </div>
    );

}
