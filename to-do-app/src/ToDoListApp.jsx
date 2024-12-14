import React, {useState} from 'react';
import trashIcon from './assets/trash.png'
function ToDoList(){
    const [tasks, setTasks] = useState(["10 Apples", "120 USD payment"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        
        if(newTask.trim() !== ""){
            setTasks([...tasks, newTask]);
            setNewTask("");   
        }
    }

    function deleteTask(index){
        setTasks(tasks.filter((_, i)=> i !== index));
    }
    function moveTaskUp(index){
        const updatedTasks = [...tasks];
        if(index > 0){
            [updatedTasks[index], updatedTasks[index-1]] 
                = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks) ;      
        }
    }
    function moveTaskDown(index){
        const updatedTasks =[...tasks];
        if(index < tasks.length-1){
            [updatedTasks[index], updatedTasks[index+1]] 
                = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function inputKeyDown(event){
        if(event.key === 'Enter'){
            addTask();
        }
    }
    return(
        <div className='external-to-do-container'>
            <div className='to-do-container'>
                <h1>To-Do App</h1>
                <input className='to-do-input' 
                    type="text" value={newTask} 
                    placeholder='Enter new task...' 
                    onChange={handleInputChange} 
                    onKeyDown={inputKeyDown} 
                    maxLength={25}
                />

                <button className='add-task' onClick={addTask}>+</button>
                <hr />
                <div className='to-do-task-container'>
                    {tasks.map((task, index)=>
                        <li className='to-do-task-list' key={index}>
                            <span className='to-do-task-list-text'>{task}</span>
                            {index === 0 ? (
                                <>
                                    <button className='to-do-del-btn' onClick={()=> deleteTask(index)}><img src={trashIcon}/></button>
                                    <button className='to-do-down-btn' onClick={()=> moveTaskDown(index)}>↓</button> 
                                    
                                </>
                                ) : index === tasks.length-1 ?( 
                                <>
                                    <button className='to-do-del-btn' onClick={()=> deleteTask(index)}><img src={trashIcon}/></button>
                                    <button className='to-do-up-btn' onClick={()=> moveTaskUp(index)}>↑</button>
                                </>
                                ) : (
                                <>
                                    <button className='to-do-del-btn' onClick={()=> deleteTask(index)}><img src={trashIcon}/></button>
                                    <button className='to-do-up-btn' onClick={()=> moveTaskUp(index)}>↑</button>
                                    <button className='to-do-down-btn' onClick={()=> moveTaskDown(index)}>↓</button> 
                                </>)
                            } 
                        </li>
                    )}
                </div>
            </div>

        </div>
        
        
    );
}

export default ToDoList;