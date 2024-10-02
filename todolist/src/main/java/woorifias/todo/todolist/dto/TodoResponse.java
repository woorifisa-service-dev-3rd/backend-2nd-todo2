package woorifias.todo.todolist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import woorifias.todo.todolist.domain.Category;
import woorifias.todo.todolist.domain.Todo;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TodoResponse {
    private Long id;
    private String title;
    private String summary;
    private LocalDate deadline;
    private Category category;

    public static TodoResponse from(Todo todo){
        return new TodoResponse(todo.getId(), todo.getTitle(), todo.getSummary(), todo.getDeadline(), todo.getCategory());
    }
}
