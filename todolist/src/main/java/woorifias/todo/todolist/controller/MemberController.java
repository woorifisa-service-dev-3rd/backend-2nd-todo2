package woorifias.todo.todolist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import woorifias.todo.todolist.core.dto.ResponseDTO;
import woorifias.todo.todolist.dto.MemberRequest;
import woorifias.todo.todolist.dto.MemberResponse;
import woorifias.todo.todolist.service.MemberService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseDTO<Void> join(@RequestBody @Valid MemberRequest memberRequest){
        memberService.join(memberRequest);
        return new ResponseDTO<>();
    }

    @PostMapping("/login")
    public ResponseDTO<MemberResponse> login(@RequestBody @Valid MemberRequest memberRequest){
        return new ResponseDTO<>(memberService.login(memberRequest));
    }
}
