package woorifias.todo.todolist.core.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import woorifias.todo.todolist.core.dto.ResponseDTO;

// 서버 에러
@Getter
public class Exception500 extends RuntimeException {

    public Exception500(String message) {
        super(message);
    }

    public ResponseDTO<?> body() {
        return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "serverError", getMessage());
    }

    public HttpStatus status() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
