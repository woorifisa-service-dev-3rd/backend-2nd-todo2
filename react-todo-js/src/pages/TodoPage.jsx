import { useState, useEffect } from 'react';
import TodoBody from '../components/todos/TodoBody';
import TodoHeader from '../components/todos/TodoHeader';
import DefaultLayout from '../layouts/DefaultLayout';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [memberId, setMemberId] = useState(null); // memberId 상태 추가

    // 컴포넌트가 마운트될 때 memberId 가져오기
    useEffect(() => {
      const todoMemberId = localStorage.getItem('memberId');
      if (todoMemberId) {
        setMemberId(todoMemberId);
      }
    }, []);

  // API 요청으로 todos 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      if (!memberId) return; // memberId가 없으면 API 요청하지 않음
      try {
        const response = await fetch(`http://localhost:8080/api/v1/members/${memberId}/todos/search?text=`);
        const result = await response.json();

        if (result.status === 200) {
          setTodos(result.data);
        } else {
          console.error('Error fetching todos:', result.msg);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTodos();
  }, [memberId]); // memberId가 변경될 때마다 todos를 가져옴


  // Todo 등록 기능
  const addTodoHandler = async ({ title, summary, category, deadline }) => {
    const newTodo = {
      title,
      summary,
      category,
      deadline
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/members/${memberId}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const result = await response.json();

      if (result.status === 200) {
        setTodos([...todos, { ...newTodo, id: self.crypto.randomUUID() }]);
        new Notification(`${title}이 할 일 목록에 추가되었습니다.`);
      } else {
        console.error('Error adding todo:', result.msg);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Todo 수정 기능
  const updateTodoHandler = async (updateTodo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/members/${memberId}/todos/${updateTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodo),
      });

      const result = await response.json();

      if (result.status === 200) {
        const updatedTodos = todos.map(todo => 
          todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo
        );
        setTodos(updatedTodos);
        new Notification(`${updateTodo.title}이 업데이트되었습니다.`);
      } else {
        console.error('Error updating todo:', result.msg);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  // Todo 삭제 기능
  const deleteTodoHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/members/${memberId}/todos/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.status === 200) {
        setTodos(todos.filter(todo => todo.id !== id));
        new Notification('Todo가 삭제되었습니다.');a
      } else {
        console.error('Error deleting todo:', result.msg);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Todo 필터링 기능
  const filterTodos = () => 
    selectedCategory === 'ALL' ? todos : todos.filter(todo => todo.category === selectedCategory);

  const filteredTodos = filterTodos();
  const searchTodos = filteredTodos.filter((todo) => 
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <DefaultLayout>
        <header>
          <h1 className='pt-8 mx-auto text-red-200 max-w-max text-7xl'>
            <img className='ml-4' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png" alt="Thought Balloon" width="75" height="75" />
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seal.png" alt="Seal" width="75" height="75" />
          </h1>
        </header>
        <section className="max-w-xl m-4 mx-auto">
          <TodoHeader onAdd={addTodoHandler} category={selectedCategory} onFilter={setFilter} />
          <input value={search} onChange={(e) => { setSearch(e.target.value) }} />
          <TodoBody todos={searchTodos} onUpdate={updateTodoHandler} onDelete={deleteTodoHandler} />
        </section>
      </DefaultLayout>
    </>
  );
}

export default TodoPage;
