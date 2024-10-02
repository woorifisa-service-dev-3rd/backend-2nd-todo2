import TodoFilter from "./TodoFilter";
import Modal from "@/components/ui/Modal";
import TodoForm from "./TodoForm";
import { useState } from "react";
import Tooltip from "../ui/Tooltip";

const TodoHeader = ({ onAdd, category, onFilter }) => {
  const [openModal, open] = useState(false);
  const closeModal = () => open(false);

  return (
      <div className="flex items-center justify-between mb-2" id="task-control">
          <Tooltip text={'새로운 할 일을 등록하세요'}>
              <button
                  className="px-6 py-2 font-semibold text-gray-800 bg-white border-none rounded cursor-pointer"
                  data-cy="add-todo-button"
                  onClick={() => open(true)}
              >
                  할일 등록
              </button>
          </Tooltip>

          {openModal && 
              <Modal onClose={closeModal}>
                  <TodoForm
                      onAdd={onAdd}
                      onClose={closeModal}
                  >
                      등록하기
                  </TodoForm>
              </Modal>
          }
          <TodoFilter category={category} onFilter={onFilter}/>
      </div>
  );

};

export default TodoHeader;
