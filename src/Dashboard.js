import { useState, useEffect } from 'react';
import { AddNoteToDB, LogOutUser, fetchData, GetUserDataFromDB, UpdateNote, DeleteNote, checkUserStatus } from './firebaseComponents';

import Logo from './img/Logo.svg'
import ProfileIcon from './img/ProfileIcon.svg'
import ExitBtn from './img/ExitBtn.svg'
import SignOutIcon from './img/SignOutIcon.svg'
import DeleteBtn from './img/DeleteBtn.svg'

import useScreenSize from './useScreenSize';

import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [showDashboard, setShowDashboard] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        checkUserStatus().then((isUserSignedIn) => {
            if (isUserSignedIn) {
                setShowDashboard(true)
            } else {
                navigate('/signup')
            }
        })   
    }, [navigate])

    if (showDashboard) {
        return (
            <DashboardDisplay/>
        )
    }
}

function DashboardDisplay() {
    const [UserData, setUserData] = useState(null)
    const [ShowUserData, setShowUserData] = useState(false)
    const [TextareaOnFocus, setTextareaOnFocus] = useState(false)
    const [Note, setNote] = useState({title: '', description: ''})
    const [FetchData, setFetchData] = useState(null)
    const [UpdateState, setUpdateState] = useState(false)
    const [UpdateValues, setUpdateValues] = useState('')

    const screenSize = useScreenSize()
    const navigate = useNavigate()

    useEffect(() => {
        GetUserDataFromDB()
        .then(function(result) {
            if (result !== null) {
                setUserData(result)
            } 
        })
        .catch(function(error) {
            console.log(error)
        })

        fetchData(setFetchData)
    }, [])

    function DisplayFetchedData() {
        let columnNum

        let MasonryLayout
        let colorClassNameArr

        if (screenSize.width > 1000) {
            MasonryLayout = Array.from(Array(4), () => []);
            colorClassNameArr = Array.from(Array(4), () => []);
            columnNum = 3
        } else if (1000 > screenSize.width && screenSize.width > 800) {
            MasonryLayout = Array.from(Array(3), () => []);
            colorClassNameArr = Array.from(Array(3), () => []);
            columnNum = 2
        } else {
            MasonryLayout = Array.from(Array(2), () => []);
            colorClassNameArr = Array.from(Array(2), () => []);
            columnNum = 1
        }

        let colorArray = ['yellow', 'red', 'blue', 'green', 'pink', 'orange']

        let k = 0
        let j = 0

        if (FetchData !== null) {
            for (let i = 0; i < FetchData.length; i++, j++, k++) {
                if (j > 5) j = 0   
                if (k > columnNum) k = 0   

                MasonryLayout[k].push(FetchData[i])
                colorClassNameArr[k].unshift(colorArray[j])
            }
        }

        if (FetchData !== null) {
            return (
                <div className={`FetchedDataContainer NumOfColsIs${columnNum+1}`}>
                    {MasonryLayout.map((columnArr, j) => (
                        <div className='FetchedDataContainerColumn' key={j}>
                            {columnArr.map((obj, i) => (
                                <div className={`FetchedDataNoteContainer ${colorClassNameArr[j][i]}`} key={i} >   
                                    <div onClick={(e) => {
                                        setUpdateState(true)
                                        setUpdateValues(obj)
                                    }}>
                                        <div className='FetchedDataNote Title'>{obj.Title}</div>
                                        <div className='FetchedDataNote Description'>{obj.Description}</div>
                                    </div>
                                    <div className='FetchedDataNoteBtnContainer'>
                                        <button onClick={(e) => {
                                            DeleteNote(obj)
                                            fetchData(setFetchData)
                                        }}><img alt='Delete' src={DeleteBtn}/></button>
                                    </div>
                                </div>                                    
                            ))}
                        </div>
                    ))}
                </div>
            )
        }
    }

    function logOutBtnHandler() {
        LogOutUser().then((bool) => {
            if (bool) {
                navigate('/signup')
            }
        })
    }

    function DisplayUserData() {
        if (ShowUserData) {
            return (
                <div className='UserDataContainer'>
                    <button>
                        <img alt='Profile' src={ProfileIcon} onClick={() => {setShowUserData(true)}}/>
                    </button>

                    <div className='UserData'>
                        <div className='ExitUserData'>
                            <button onClick={() => {setShowUserData(false)}}>
                                <img alt='Exit' src={ExitBtn}/>
                            </button>
                        </div>
                        <div className='UserDataSubContainer'>
                            <div className='UserDataEmail'>
                                {UserData.email}
                            </div>
                            <img alt='Profile' src={ProfileIcon}/>
                            <div className='UserDataUsername'>
                                Hi {UserData.displayName}!
                            </div>
                            <button className='UserDataLogOutBtn' onClick={logOutBtnHandler}>
                                Log Out <img alt='Log Out' src={SignOutIcon}/>
                            </button>
                        </div>
                    </div>
        
                    <div className='UserDataContainerBg' onClick={() => {setShowUserData(false)}}/>
                </div>
            )
        } else {
            return (
                <div className='UserDataContainer'>
                    <button>
                        <img alt='Profile' src={ProfileIcon} onClick={() => {setShowUserData(true)}}/>
                    </button>
                </div>
            )
        }
    }

    return (
        <div className="DashboardContainer">
            <div className="DashboardHeader">
                <div>
                    <img alt='Logo' src={Logo}/>   
                    NoteVault
                </div>
                <DisplayUserData/>
            </div>

            <div className='NoteContainer'> 
                <div className='AddNoteContainer'>
                    <div className={`AddNoteComponent ${TextareaOnFocus ? 'Visible' : 'NotVisible'}`}>
                        <textarea 
                            placeholder='Title' 
                            value={Note.title}
                            onChange={(e) => setNote({...Note, title: e.target.value})}       
                            rows={1}  
                            />
                    </div>

                    <div className={`AddNoteComponent Description ${TextareaOnFocus ? 'Visible' : 'NotVisible'}`}>
                        <textarea 
                            placeholder='Type here to take note...' 
                            value={Note.description}
                            onClick={() => {setTextareaOnFocus(true)}}
                            onChange={(e) => setNote({...Note, description: e.target.value})}
                            rows={TextareaOnFocus ? 12 : 1}            
                            />
                    </div>

                    <div className={`AddNoteComponent ${TextareaOnFocus ? 'Visible' : 'NotVisible'}`}>
                        <button onClick={() => {setTextareaOnFocus(false)}}>
                            Cancel
                        </button>
                        <button onClick={(e) => {
                            AddNoteToDB(Note)
                            setNote({ title: '', description: '' })
                            setTextareaOnFocus(false)
                            fetchData(setFetchData)
                        }}>
                            Add
                        </button>
                    </div>
                </div>
                <div className={`AddNoteContainerBg ${TextareaOnFocus ? 'Visible' : 'NotVisible'}`}
                    onClick={(e) => {
                        setTextareaOnFocus(false)
                        if (Note.title !== '' || Note.description !== '') {
                            AddNoteToDB(Note)
                            setNote({ title: '', description: '' })
                            fetchData(setFetchData)
                        }
                    }}
                />
                <DisplayFetchedData/>
                <div className={`UpdateNoteContainer ${UpdateState ? 'Visible' : 'NotVisible'}`}>
                    <div className={`UpdateNoteBg ${UpdateState ? 'Visible' : 'NotVisible'}`} onClick={(e) => {setUpdateState(false)}}/>
                    <div className='UpdateNoteSubContainer'>
                        <textarea className='Title'
                            value={UpdateValues.Title}
                            onChange={(e) => {setUpdateValues({...UpdateValues, Title: e.target.value})}}
                            rows={1}
                        />
                        <textarea
                            value={UpdateValues.Description}
                            onChange={(e) => {setUpdateValues({...UpdateValues, Description: e.target.value})}}
                            rows={12}
                        />
                        <div className='UpdateNoteButtonContainer'>
                            <button onClick={(e) => {
                                setUpdateState(false)
                            }}>Cancel</button>
                            <button onClick={(e) => {
                                UpdateNote(UpdateValues)
                                fetchData(setFetchData)
                                setUpdateState(false)
                            }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard