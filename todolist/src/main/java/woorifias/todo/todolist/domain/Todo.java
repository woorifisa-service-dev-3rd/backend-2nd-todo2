package woorifias.todo.todolist.domain;

import lombok.*;
import woorifias.todo.todolist.dto.TodoRequest;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "todos")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseTime{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String summary;
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public void updateTodo(TodoRequest todoRequest){
        this.title = todoRequest.getTitle();
        this.summary = todoRequest.getSummary();
        this.deadline = todoRequest.getDeadline();
        this.category = todoRequest.getCategory();
    }

    public static Todo of(TodoRequest todoRequest, Member member){
        return Todo.builder()
                .title(todoRequest.getTitle())
                .summary(todoRequest.getSummary())
                .deadline(todoRequest.getDeadline())
                .category(todoRequest.getCategory())
                .member(member)
                .build();
    }
}
