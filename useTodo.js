import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}


export const useTodo = (initialState = []) => {

    
   
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        
        localStorage.setItem('todos',JSON.stringify(todos));
    }, [todos])
    

    const onDeleteTodo = (id) => {
        const action = {
            type: '[todo]TodoDelete',
            payload: id
        }
        dispatch(action)
    }
    const onCompletedTodo = (id) => {
        const action = {
            type: '[todo]TodoCompleted',
            payload: id
        }
        dispatch(action)

    }

    const onNewTodo = (todo) =>{

        const action = {
            type:'[todo]TodoAdd',
            payload:todo

        }
        console.log(todo);
        dispatch(action)

        
    }
    const todoTotal = () =>{
       return todos.length
    }

    const todoPending = () =>{
      const pending = todos.filter( todo => todo.done !== true);

      return pending.length
        
    }

    return {
        onDeleteTodo,
        onCompletedTodo,
        onNewTodo,
        todos,
        todoTotal,
        todoPending
    }
} 