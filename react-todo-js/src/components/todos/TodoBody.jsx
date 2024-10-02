import React, { useState } from 'react'
import TodoItem from './TodoItem'

const TodoBody = ({ todos, onUpdate, onDelete }) => {
  return (
    <ul className='px-0 my-8'>
    {todos.map(todo => <TodoItem todo={todo} key={todo.id} onUpdate={onUpdate} onDelete={onDelete}/>)}
</ul>

  )
}

export default TodoBody