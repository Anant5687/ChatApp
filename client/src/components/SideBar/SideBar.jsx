import React, { useState, useEffect, useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { AppContext } from '../../context/appContext'
import { user } from '../../pages/Login/Login'


const SideBar = () => {
    const Puser = user
    const { socket, members, setMembers, currentRoom, setCurrentRoom, rooms, setRooms, memberPrivateMsg, setMemberPrivateMsg } = useContext(AppContext)
    socket.off('new-user').on('new-user', payload => {
        setMembers(payload)
    })

    useEffect(() => {
        if (Puser) {
            setCurrentRoom('General')
        }
        axios.get('http://localhost:4000/rooms').then((res) => {
            setRooms(res.data)
        }).catch((err) => {
            console.log(err)
        })
socket.emit('join-rrom', "General")
socket.emit('new-user')
    }, [])

    return (
        <>
            <h2>Rooms</h2>
            <ListGroup>
                {rooms.map((ele, i) => {
                    return <ListGroup.Item key={i}>{ele}</ListGroup.Item>
                })}
            </ListGroup>
            <h2>Members</h2>
            <ListGroup>
                {members.map((ele) => {
                    return <ListGroup.Item key={ele._id}>
                        <img src={ele.file} alt="img" style={{ height: 30, width: 30, borderRadius: 20 }} /> {ele.name}
                    </ListGroup.Item>
                })}
            </ListGroup>
        </>
    )
}

export default SideBar
