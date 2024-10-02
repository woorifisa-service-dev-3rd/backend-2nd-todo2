package woorifias.todo.todolist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import woorifias.todo.todolist.core.dto.ResponseDTO;
import woorifias.todo.todolist.domain.Category;
import woorifias.todo.todolist.dto.TodoRequest;
import woorifias.todo.todolist.dto.TodoResponse;
import woorifias.todo.todolist.service.TodoService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{memberId}/todos/search")
    public ResponseDTO<List<TodoResponse>> showTodoList(
            @PathVariable("memberId") Long memberId,
            @RequestParam("text") String text,
            @RequestParam(value = "filter", defaultValue = "ALL") Category category){
        return new ResponseDTO<>(todoService.showTodos(memberId, text, category));
    }

    @PostMapping("/{memberId}/todos")
    public ResponseDTO<Void> addTodo(@PathVariable("memberId") Long memberId,@RequestBody @Valid TodoRequest todoRequest){
        todoService.saveTodo(memberId, todoRequest);
        return new ResponseDTO<>();
    }

    @DeleteMapping("/{memberId}/todos/{todoId}")
    public ResponseDTO<Void> removeTodo(@PathVariable("memberId") Long memberId, @PathVariable("todoId") Long todoId){
        todoService.removeTodo(memberId, todoId);
        return new ResponseDTO<>();
    }

    @PatchMapping("/{memberId}/todos/{todoId}")
    public ResponseDTO<Void> updateTodo(
            @PathVariable("memberId") Long memberId,
            @PathVariable("todoId") Long todoId,
            @RequestBody @Valid TodoRequest todoRequest){
        todoService.updateTodo(memberId, todoId, todoRequest);
        return new ResponseDTO<>();
    }
}
