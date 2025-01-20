import { useState } from "react";

export default function Player({ initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

       //!setIsEditing(!isEditing) can cause issues if you need to rely on the current state, especially when multiple state updates happen quickly.
       //!setIsEditing(editing => !editing) is the more reliable approach because it ensures you're using the latest state value, avoiding issues like state lag or incorrect updates.
    function editName() {
        // setIsEditing(!isEditing);   //made it that way to switch the button name as it sticks to saveonce edit is click with out terenary or !
        setIsEditing(editing => !editing); //if we use this function form, the state change would be instant   ,the one inside it is currrent state to be set
    }
    
    function handleChange(event) {   //event is by default passed from onChange
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;    //defined here as to call down if isediting is false
    // let btnCaption = "Edit";
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;   // if its true we are redefining  //?its called two way binding,changing and giving it back from state
        // btnCaption = "Save";
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={editName}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}