package woorifias.todo.todolist.core.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import woorifias.todo.todolist.core.dto.ResponseDTO;


// 인증 안됨
@Getter
public class Exception401 extends RuntimeException {

    public Exception401(String message) {
        super(message);
    }

    public ResponseDTO<?> body() {
        return new ResponseDTO<>(HttpStatus.UNAUTHORIZED, "unAuthorized", getMessage());
    }

    public HttpStatus status() {
        return HttpStatus.UNAUTHORIZED;
    }
}