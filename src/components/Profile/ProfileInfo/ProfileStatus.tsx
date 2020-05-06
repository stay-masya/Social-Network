import React, {useState, useEffect, ChangeEvent} from 'react';

const ProfileInfo = (props:any) => {

    let [aditMode,setMode ]=useState<boolean>(false)
    let [status,setStatus ]=useState<string>(props.status)

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
    const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
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
