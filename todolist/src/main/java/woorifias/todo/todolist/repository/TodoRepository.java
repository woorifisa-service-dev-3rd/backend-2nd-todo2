package woorifias.todo.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woorifias.todo.todolist.domain.Category;
import woorifias.todo.todolist.domain.Member;
import woorifias.todo.todolist.domain.Todo;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByTitleContainingAndCategoryAndMember(String title, Category category, Member member);
    List<Todo> findAllByTitleContainingAndMember(String title, Member member);
}
