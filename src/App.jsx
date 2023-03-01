import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  const [isAddReady, setIsAddReady] = useState(false)
  const [addButtonColor, setAddButtonColor] = useState('bg-gray-300')
  const [todoText, setTodoText] = useState('')

  const [todos, setTodos] = useState([]);


  const addItem = (name, isDone) => {
    setTodos([...todos, {text: name, isDone: isDone}])
    setTodoText('')
    setIsAddReady(false)
    setAddButtonColor('bg-gray-300')
  }

  return (
    <div className="App pb-12">

      <h2 className='text-black text-4xl mt-6 text-center'>TODO List</h2>

      <div className='flex flex-col items-center justify-center mt-12'>
        <div className='border-2 flex flex-col w-96 max-w-lg'>
          <input value={todoText} onKeyDown={(e)=>{
            if(e.key==='Enter'){
              if(isAddReady){
                addItem(todoText, true)
              }
            }
          }} onChange={(e)=>{
            setTodoText(e.target.value)
            if(e.target.value.length>=1){
              setIsAddReady(true)
              setAddButtonColor('bg-green-300')
            }else{
              setIsAddReady(false)
              setAddButtonColor('bg-gray-300')
            }
          }} className='border-2' type='text' placeholder='text' />
          <button onClick={(e)=>{
            if(isAddReady){
              addItem(todoText, false)
            }
          }} className={addButtonColor}>Add</button>
        </div>


          <TodoList todos={todos} setTodos={setTodos}></TodoList>
        
      </div>

    </div>
  )
}


function TodoList({todos, setTodos}){
  return(
    <div>
      {todos.map((todo, index)=>todoItem({text: todo.text, isDone: todo.isDone, index: index,
      onDelete: ()=>{
        let newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
      },
      onChangeText: (text)=>{
        let newTodos = [...todos]
        newTodos[index].text = text
        setTodos(newTodos)
      },
      onChangeCheck: (check)=>{
        let newTodos = [...todos]
        newTodos[index].isDone = check
        setTodos(newTodos)
      }}))}
    </div>
  )
}

function todoItem({text,isDone, index, onChangeCheck, onChangeText, onDelete}) {
  return(
    <div key={index} className='border-2 mt-6 flex flex-row items-center justify-between'>
  
     <input type="checkbox" onChange={(e)=>{
      onChangeCheck(e.target.checked)
     }} checked={isDone} className="w-4 outline-none h-4 mr-6 ml-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
     
     
      <input onChange={(e)=>{
        onChangeText(e.target.value)
      }} type='text' value={text} className='p-2 outline-none'/>
      <div className='flex flex-row mr-2'>
        <button onClick={()=>{
          onDelete()
        }} className='bg-red-300 px-6 rounded-md'>Delete</button>
      </div>
    </div>
  )
}




export default App
