import React from 'react';

const TodoConfirm = ({ text, onDelete, onClose }) => {
    return (
        <div className='p-8 bg-white'>
            <h3 className="text-3xl text-black">{text}</h3>
            <div className='flex justify-end gap-4'>
                <button className='text-xl text-black' type='button' data-cy='process-remove' onClick={onDelete}>삭제</button>
                <button className='px-6 py-3 text-xl text-black' type='button' data-cy='process-cancel' onClick={onClose}>취소</button>
            </div>
        </div>
    );
}

export default TodoConfirm;
