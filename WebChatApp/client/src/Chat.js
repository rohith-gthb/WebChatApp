import React, { useEffect, useState } from "react";


function Chat({socket, username, roomID}){
    const [currMessege, setCurrMessege] = useState("")
    const [messege_List, setMessegeList] = useState([])
    
    const sendMessege = async() => {
        if(currMessege!=="") {
            const messegeData = {
                username: username,
                roomID: roomID,
                messege: currMessege,
                time: new Date(Date.now()).getHours()+":"+
                new Date(Date.now()).getMinutes()
            };
            
            await socket.emit('send_messege', messegeData);
            setMessegeList((list) => [...list, messegeData])
            // setCurrMessege("");
        }
    }; 

    useEffect(()=>{
        socket.on('receive_messege',(data)=>{
            setMessegeList((list)=>[...list, data]);
        });
    },[socket]);

    return (
    <div className="chat-window">
        <div className="chat-header"> 
            <p>Live chat</p>
        </div>
        <div className="chat-body">
            {messege_List.map((messageContent) => {
                return (
                <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                >
                    <div>
                    <div className="message-content">
                        <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
        <div className="chat-footer">
            <input type="text" 
            placeholder="type here..." 
            onChange={(event)=>{
                setCurrMessege(event.target.value);
            }}/>
            <button onClick={sendMessege}>&#9658;</button>
        </div>
    </div>
    )
}

export default Chat