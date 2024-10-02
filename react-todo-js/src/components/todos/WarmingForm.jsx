import React from 'react'

const WarmingForm = ({onDelete, onClose}) => {

  return (
    
    <>
         <h3 className="text-3xl text-red-200">정말 삭제할까요??</h3>
        <div className='flex justify-end gap-4'>
            <button className='px-6 py-3 text-xl text-red-200' type='button' onClick={onDelete} data-cy='process-add-or-update'>
                삭제
            </button>                
            <button className='text-xl text-white' type='button' onClick={onClose}>취소</button>
        </div>
    </>
  )
}

export default WarmingForm