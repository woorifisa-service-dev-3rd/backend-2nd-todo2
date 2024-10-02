package woorifias.todo.todolist.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import woorifias.todo.todolist.domain.Category;

import java.time.LocalDate;

import lombok.Setter;

@Getter
@Setter
public class TodoRequest {

    @NotBlank(message = "제목은 필수 입력입니다.")
    private String title;

    @Size(max = 500, message = "요약은 최대 500자까지 입력할 수 있습니다.")
    private String summary;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    private Category category;
}
