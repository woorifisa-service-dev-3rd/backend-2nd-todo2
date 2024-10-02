package woorifias.todo.todolist.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woorifias.todo.todolist.core.exception.Exception404;
import woorifias.todo.todolist.domain.Category;
import woorifias.todo.todolist.domain.Member;
import woorifias.todo.todolist.domain.Todo;
import woorifias.todo.todolist.dto.TodoRequest;
import woorifias.todo.todolist.dto.TodoResponse;
import woorifias.todo.todolist.repository.MemberRepository;
import woorifias.todo.todolist.repository.TodoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoService {
    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<TodoResponse> showTodos(Long memberId, String title, Category category){
        Member member = existMember(memberId);
        List<Todo> todos = null;

        if (category.equals(Category.ALL)) todos = todoRepository.findAllByTitleContainingAndMember(title, member);
        else todos = todoRepository.findAllByTitleContainingAndCategoryAndMember(title, category, member);

        return todos.stream().map(item->TodoResponse.from(item)).collect(Collectors.toList());
    }

    public void saveTodo(Long memberId, TodoRequest todoRequest){
        Member member = existMember(memberId);
        Todo todo = Todo.of(todoRequest, member);
        todoRepository.save(todo);
    }

    public void removeTodo(Long memberId, Long todoId){
        existMember(memberId);
        todoRepository.deleteById(todoId);
    }

    public void updateTodo(Long memberId, Long todoId, TodoRequest todoRequest){
        existMember(memberId);
        Todo todo = existTodo(todoId);
        todo.updateTodo(todoRequest);
    }

    private Member existMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(()->new Exception404("멤버를 찾을 수 없습니다"));
    }

    private Todo existTodo(Long todoId) {
        return todoRepository.findById(todoId).orElseThrow(()->new Exception404("투두를 찾을 수 없습니다"));
    }

    public void run() {
        // 더미 회원 데이터 생성
        Member member1 = Member.builder()
                .username("user1")
                .email("user1@example.com")
                .password("password1")
                .build();

        Member member2 = Member.builder()
                .username("user2")
                .email("user2@example.com")
                .password("password2")
                .build();

        // 회원 저장
        memberRepository.save(member1);
        memberRepository.save(member2);

        // 더미 할 일(Todo) 데이터 생성
        Todo todo1 = Todo.builder()
                .title("할 일 1")
                .summary("첫 번째 할 일의 요약")
                .deadline(LocalDate.now().plusDays(7))
                .category(Category.PROGRESS)
                .member(member1)
                .build();

        Todo todo2 = Todo.builder()
                .title("할 일 2")
                .summary("두 번째 할 일의 요약")
                .deadline(LocalDate.now().plusDays(14))
                .category(Category.DONE)
                .member(member1)
                .build();

        Todo todo3 = Todo.builder()
                .title("할 일 3")
                .summary("세 번째 할 일의 요약")
                .deadline(LocalDate.now().plusDays(3))
                .category(Category.DONE)
                .member(member1)
                .build();

        // 할 일 저장
        todoRepository.save(todo1);
        todoRepository.save(todo2);
        todoRepository.save(todo3);
    }
}
