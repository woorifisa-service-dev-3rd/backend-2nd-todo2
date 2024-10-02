import React, { useState } from 'react'
import { TODO_CATEGORY_ICON } from '@/constants/icon'

const TodoForm = ({ onAdd, onUpdate, onClose, children, todo }) => {
    const isNewTodoForm = (children) => children.startsWith('등록');

    const [title, setTitle] = useState(isNewTodoForm(children) ? '' : todo.title);
    const [summary, setSummary] = useState(isNewTodoForm(children) ? '' : todo.summary);
    const [category, setCategory] = useState(isNewTodoForm(children) ? 'TODO' : todo.category);
    const [deadline, setDeadline] = useState(isNewTodoForm(children) ? '' : todo.deadline);

    const minDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let day = date.getDate();
        day = (day < 10) ? `0${day}` : day;
        let month = date.getMonth() + 1;
        month = (month < 10) ? `0${month}` : month;

        return `${year}-${month}-${day}`;
    }

    const addOrUpdateTodoHandler = () => {
        if (isNewTodoForm(children)) {
            const newTodo = { title, summary, category, deadline };
            onAdd(newTodo);
        } else {
            const updateTodo = { id: todo.id, title, summary, category, deadline };
            onUpdate(updateTodo);
        }
        onClose();
    }

    return (
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-6 rounded-lg">
            <h3 className="text-3xl text-white">{children}</h3>
            <form className='my-2'>
                <div>
                    <label className='block my-2 text-xl text-white' htmlFor='title'>제목(Title)</label>
                    <input className='w-full p-2 border-[1px] border-gray-300 bg-white text-gray-900 rounded' 
                           type='text' id='title' value={title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div>
                    <label className='block my-2 text-xl text-white' htmlFor='summary'>내용(Summary)</label>
                    <textarea className='w-full p-2 border-[1px] border-gray-300 bg-white text-gray-900 rounded' 
                              id='summary' rows='5' value={summary} onChange={event => setSummary(event.target.value)} />
                </div>
                <div>
                    <label className='block my-2 text-xl text-white' htmlFor='category'>카테고리(Category)</label>
                    <select className='w-full p-2 border-[1px] border-gray-300 bg-white text-gray-900 rounded' 
                            id='category' value={category} onChange={event => setCategory(event.target.value)}>
                        <option value='TODO'>{TODO_CATEGORY_ICON.TODO} To do</option>
                        <option value='PROGRESS'>{TODO_CATEGORY_ICON.PROGRESS} On progress</option>
                        <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Done</option>
                    </select>
                </div>
                <div>
                    <label className='block my-2 text-xl text-white' htmlFor='deadline'>마감기한(Deadline)</label>
                    <input className='w-full p-2 border-[1px] border-gray-300 bg-white text-gray-900 rounded'
                           data-cy='deadline-input'
                           type="date"
                           min={minDate()}
                           value={deadline}
                           onChange={(e) => { setDeadline(e.target.value) }}
                           id="deadline" />
                </div>

                <div className='flex justify-end gap-4'>
                    <button className='px-6 py-3 text-xl text-white bg-red-600 rounded' type='button' onClick={addOrUpdateTodoHandler} data-cy='process-add-or-update'>
                        {isNewTodoForm(children) ? '등록' : '수정'}
                    </button>
                    <button className='text-xl text-white' type='button' onClick={onClose}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm
