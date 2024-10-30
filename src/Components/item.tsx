import  React, {useState}  from 'react';
import { taskSlice,Task  } from '../Redux/TasksStore';
import { useDispatch} from 'react-redux';
import { deleteDoc,doc, updateDoc} from 'firebase/firestore';
import { db } from '../config/firebase-config';
export const Item = (props:Task)=>
    {
        const dispatch= useDispatch();
        const [displayValue,setDisplayValue] = useState<string>(props.model.Task);
        const [isDisabled,setDisable]= useState<boolean> (true);
        const [isTaskCompleted , setIsTaskCompleted] = useState<boolean> (props.model.isCompleted);
        return (
        <tr className='list-item'>

        <td>  
            <input className="list-input" disabled = {isDisabled} value={displayValue} onChange={(e : React.ChangeEvent<HTMLInputElement>)=>
            {
                setDisplayValue(e.target.value);
            }}/>
        </td>
       
       <td>
       <button onClick={()=>
            {
                setDisable(!isDisabled)
                if(isDisabled===false)
                {
                    setIsTaskCompleted(false);

                    const taskDocRef = doc(db,"Tasks",props.fbId);
                 
                    updateDoc(taskDocRef,{id:props.model.id,Task:displayValue,isCompleted:isTaskCompleted}).then(()=>
                        {
                            dispatch(taskSlice.actions.EditTask({fbId:props.fbId,model:{id:props.model.id,Task:displayValue,isCompleted:isTaskCompleted,email:props.model.email}}))
                        })

                    
                }
            }} style={{ margin: '5px'}}>{isDisabled?"Edit":"Save"}</button>
       </td>

       <td>
       <button onClick={()=>
            {
                const taskDocRef = doc(db, "Tasks" ,props.fbId);
                deleteDoc(taskDocRef).then(()=>
                    {
                        dispatch(taskSlice.actions.RemoveTask(props.model.id))
                    })
            }} style={{ margin: '5px'}}>X</button>
        </td>
      
        <td>
        <input className='list-checkbox' disabled={isTaskCompleted} checked={isTaskCompleted} onChange={()=>
            {
                setIsTaskCompleted(true);
            }} type="checkbox"/>
        </td>
    
        </tr>)
    }