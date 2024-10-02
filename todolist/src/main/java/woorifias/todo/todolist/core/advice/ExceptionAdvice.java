package woorifias.todo.todolist.core.advice;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import woorifias.todo.todolist.core.annotation.ErrorLog;
import woorifias.todo.todolist.core.dto.ResponseDTO;
import woorifias.todo.todolist.core.exception.*;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ErrorLog
    @ExceptionHandler(Exception400.class)
    public ResponseEntity<?> badRequest(Exception400 e) {
        return new ResponseEntity<>(e.body(), e.status());
    }

    @ErrorLog
    @ExceptionHandler(Exception401.class)
    public ResponseEntity<?> unAuthorized(Exception401 e) {
        return new ResponseEntity<>(e.body(), e.status());
    }

    @ErrorLog
    @ExceptionHandler(Exception403.class)
    public ResponseEntity<?> forbidden(Exception403 e) {
        return new ResponseEntity<>(e.body(), e.status());
    }

    @ErrorLog
    @ExceptionHandler(Exception404.class)
    public ResponseEntity<?> notFound(Exception404 e) {
        return new ResponseEntity<>(e.body(), e.status());
    }

    // 원인을 알고 있는 서버 에러 발생시 사용
    @ErrorLog
    @ExceptionHandler(Exception500.class)
    public ResponseEntity<?> serverError(Exception500 e) {
        return new ResponseEntity<>(e.body(), e.status());
    }

    @ErrorLog
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationError(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(new ResponseDTO<>(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    // 원인을 모르는 서버 에러 발생시 사용
    @ErrorLog
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> unknownServerError(Exception e) {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "unknownServerError", e.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
