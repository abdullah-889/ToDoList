import  React, {useState}  from 'react';
import { taskSlice,Task } from '../Redux/TasksStore';
import { useDispatch} from 'react-redux';


export const Item = (props:Task)=>
    {
        const dispatch= useDispatch();
        const [displayValue,setDisplayValue] = useState<string>(props.task);
        const [isDisabled,setDisable]= useState<boolean> (true);
        const [isTaskCompleted , setIsTaskCompleted] = useState<boolean> (props.isCompleted);

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
                    dispatch(taskSlice.actions.EditTask({id:props.id,task:displayValue,isCompleted:isTaskCompleted}))
                }

            }} style={{ margin: '5px'}}>{isDisabled?"Edit":"Save"}</button>
       </td>

       <td>
       <button onClick={()=>
            {
                dispatch(taskSlice.actions.RemoveTask(props.id))
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