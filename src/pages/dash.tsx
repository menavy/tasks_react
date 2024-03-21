import React, { useEffect, DragEvent, useState } from 'react';
import '../App.css';
import { ITask } from '../models/ITask';
import Task from '../components/task';
import { useParams } from 'react-router-dom';
import { taskApi } from '../services/TaskService';
import ModalTask from '../components/modalTask';
import { INewTask } from '../models/INewTask';


export default function Dash() {

    const { id } = useParams<{ id: any }>()


    const { data: tasks, isLoading, error } = taskApi.useGetTasksQuery(id)

    const [tasksAr, setTasksArr] = useState<ITask[]>()

    useEffect(() => {
        if(tasks) {
            setTasksArr([...tasks].sort((a, b) => a.status.localeCompare(b.status) || a.order - b.order))
        }
    }, [tasks])

    const [currBoard, setCurrBoard] = useState('0');
    const [dragOver, setDragOver] = useState('');

    const [deleteTask, { }] = taskApi.useDeleteTaskMutation()
    const [editTask, {}] = taskApi.useEditTaskMutation()


    const handleDeleteAction = async (task: ITask) => {
        deleteTask(task)
    }


    //---------for Task Modal------------

    const [showModal, setShowModal] = useState<boolean>(false);
    const [editableTask, setEditableTask] = useState<ITask>()

    function toggleModal() {
        setShowModal(!showModal);
    }

    //open Edit Task Modal
    const editTaskModalOpen = (task: ITask) => {
        setEditableTask(task)
        toggleModal()
    }

    const editTaskReq = async (task: INewTask) => {
        toggleModal()
    }

    //--------------------Drag and Drop Code Section-----------------------

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>,): void {
        e.preventDefault();
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
        setDragOver('');
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, status: string, item: any): void {
        setCurrBoard(status);
        e.dataTransfer.setData('currTask', JSON.stringify(item));
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    }

    async function dropHandler(e: React.DragEvent<HTMLDivElement>, status: string, item: any) {
        const currTask = JSON.parse(e.dataTransfer.getData('currTask'));

        console.log(item)

        console.log(tasksAr)
        if (tasksAr) {

            const prev_order = currTask.order;

            currTask.status = status;
            currTask.order = item.order;
            console.log(currTask)

            if (prev_order < item.order) {
                for (let task of tasksAr) {
                    if (task.status === item.status && task.order <= item.order && task._id != currTask._id) {

                        let taskEdit = {...task}
                        taskEdit.order = task.order - 1;
                        
                        await editTask(taskEdit)
                    }
                }
            } else {
                for (let task of tasksAr) {
                    if (task.status === item.status && task.order >= item.order && task._id != currTask._id) {
                        //task.order = task.order + 1;
                        let taskEdit = {...task}
                        taskEdit.order = task.order + 1;
                        //onsole.log(taskEdit)
                        await editTask(taskEdit)
                    }
                }
            }
            await editTask(currTask)

            setDragOver('');
        }
    }

    const handleDragOverStart = (id: string) => setDragOver(id);


    function dropCardHandler(e: DragEvent, status: string) {
        if (tasks) {
            let currTask = JSON.parse(e.dataTransfer.getData('currTask'));
            currTask.status = status;
            let newTasks = [...tasks];
            let maxOrder: number = Math.max(...newTasks.map(o => o.order));
            console.log(maxOrder)
            currTask.order =  maxOrder+1;
            console.log(currTask.order)
            editTask(currTask)
            setDragOver('');
        }

    }
    //------------------end of Drag and Drop Section-------------------------

    if (error) {
        return (
            <div className="table">
                <div>Немає такої дошки</div>
            </div>
        )
    }

    return (
        <div className="table">

            <ModalTask id={id} type={'edit'} open={showModal} onClose={toggleModal}
                task={editableTask} />


            <div className="board violet"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, '0')}
            >
                <h2 className='boardName'>Планую <span>✍</span></h2>
                {tasksAr && tasksAr.map(item => item.status === '0' ?
                    <Task
                    card={item}
                        status={'0'}
                        dragOver={dragOver}
                        dragOverHandler={dragOverHandler}
                        handleDragOverStart={handleDragOverStart}
                        dragLeaveHandler={dragLeaveHandler}
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dropHandler={dropHandler}
                        editHandler={editTaskModalOpen}
                        deleteHandler={handleDeleteAction}
                    />
                    : null)}
            </div>

            <div className="board blue"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, '1')}
            >
                <h2 className='boardName'>В процесі <span>👀</span></h2>
                {tasksAr && tasksAr.map(item => item.status === '1' ?
                    <Task
                    card={item}
                        status={'1'}
                        dragOver={dragOver}
                        dragOverHandler={dragOverHandler}
                        handleDragOverStart={handleDragOverStart}
                        dragLeaveHandler={dragLeaveHandler}
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dropHandler={dropHandler}
                        editHandler={editTaskModalOpen}
                        deleteHandler={handleDeleteAction}
                    />
                    : null)}
            </div>


            <div className="board green"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, '2')}
            >
                <h2 className='boardName'>Зроблено <span>😃</span></h2>
                {tasksAr && tasksAr.map(item => item.status === '2' ?
                    <Task
                    card={item}
                        status={'2'}
                        dragOver={dragOver}
                        dragOverHandler={dragOverHandler}
                        handleDragOverStart={handleDragOverStart}
                        dragLeaveHandler={dragLeaveHandler}
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dropHandler={dropHandler}
                        editHandler={editTaskModalOpen}
                        deleteHandler={handleDeleteAction}
                    />
                    : null)}
            </div>


        </div >
    );
}