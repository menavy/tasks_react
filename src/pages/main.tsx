import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useParams, useLocation } from "react-router-dom";
import ButtonLarge from "../components/buttonLarge";
import Header from "../components/header";
import Menu from "../components/menu";
import MenuItem from "../components/menuItem";
import ModalBoard from "../components/modalBoard";
import ModalTask from "../components/modalTask";
import { useAppDispatch } from "../hooks/redux";
import { IBoard } from "../models/IBoard";
import { ITask } from "../models/ITask";
import { boardApi } from "../services/BoardService";
import { fetchUser } from "../store/reducers/UserActions";
import Dash from "./dash";

export default function Main() {

    const dispatch = useAppDispatch();

    const [deleteBoard, { }] = boardApi.useDeleteBoardMutation()

    const [searchBoardId, setSearchBoardId] = useState<string>('')


    //check if user has token
    useEffect(() => {
        const token: null | string = window.localStorage.getItem('token');
        if (!token) {
            dispatch(fetchUser())
        }
    }, [])

    const { data: boards, error, isLoading, refetch } = boardApi.useGetBoardsQuery()


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBoardId(e.target.value)
    }

    const searchBoard = () => {
        const id = searchBoardId
        setSearchBoardId('')
        if(id) {
            routeNavigate(id)
        }
    }

    const {pathname} = useLocation()
    console.log(pathname)

    const handleDeleteAction = async (board: IBoard) => {
        if(board._id === pathname.slice(1)) {
            navigate(`/`)
        }
        deleteBoard(board)
    }

    //--------------for Task Modal----------------

    const [showModal, setShowModal] = useState<boolean>(false);
    const [editableTask, setEditableTask] = useState<ITask>()


    function toggleModal() {
        const board: string = pathname.slice((1))
        if (board) {
            setShowModal(!showModal);
        } else {
            alert('Створіть дошку!')
        }
    }

    //---------------------for Edit Board Modal------------------------------

    const [showEditBoardModal, setEditBoardShowModal] = useState<boolean>(false);
    const [editableBoard, setEditableBoard] = useState<IBoard>()
    const [actionType, setActionType] = useState<string>('')

    //show Edit Board Modal
    function toggleEditBoardModal() {
        setEditBoardShowModal(!showEditBoardModal);
    }

    //open Board Modal, editing board
    const editBoardName = (board: IBoard) => {
        console.log('clicked')
        setActionType('edit')
        setEditableBoard(board)
        toggleEditBoardModal()
    }
    //open Board Modal, creating board
    const addNewBoard = () => {
        setActionType('add')
        toggleEditBoardModal()
    }


    //------------open tasks by chosen board---------------

    const navigate = useNavigate()

    function routeNavigate(_id: string) {
        navigate(`/${_id}`)
    }


    return (
        <div>
            <Header>
                <div className='headerWrapper'>
                    <h1>MyTestProject</h1>
                    <input type="text" placeholder='Введіть id дошки...' value={searchBoardId} onChange={handleSearch} />
                    <ButtonLarge label="Завантажити" onClick={searchBoard} />
                    <div className='divider'></div>
                    <ButtonLarge label="Додати Таск" onClick={toggleModal} />
                </div>
            </Header>
            <Menu >
                <ul>
                    {boards && boards.map(board =>
                        <MenuItem item={board} editBoard={editBoardName} deleteBoard={handleDeleteAction} navigate={routeNavigate} />
                    )}
                    <ButtonLarge label="Додати Дошку" onClick={addNewBoard} />
                </ul>
            </Menu>

            <ModalTask id={pathname.slice(1)} type={'add'} open={showModal} onClose={toggleModal}
                task={editableTask} />


            <ModalBoard type={actionType} open={showEditBoardModal} onClose={toggleEditBoardModal}
                board={editableBoard} />

            <Routes>
                <Route path="/:id" element={<Dash />} />
            </Routes>
        </div>
    );
}


