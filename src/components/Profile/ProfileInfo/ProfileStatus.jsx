import React, {useState,useEffect} from 'react';

const ProfileInfo = (props) => {

    let [aditMode,setMode ]=useState(false)
    let [status,setStatus ]=useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const onActivateAditMode=()=>{
        setMode(true)
    }
    const onDiactivateAditMode=()=>{
        setMode(false)
        props.updateStatus(status)
    }
    const onStatusChange=(e)=>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {
              !aditMode&&
              <div>
                  <span onDoubleClick={onActivateAditMode}>{props.status || 'status is wrong'}</span>
              </div>
            }
            {
                aditMode&&
                    <div>
                        <input autoFocus onBlur={onDiactivateAditMode} type="text" onChange={onStatusChange} value={status}/>
                    </div>
            }

        </div>
    );
}
export default ProfileInfo