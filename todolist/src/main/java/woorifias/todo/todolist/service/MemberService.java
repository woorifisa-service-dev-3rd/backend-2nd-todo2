package woorifias.todo.todolist.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woorifias.todo.todolist.core.exception.Exception400;
import woorifias.todo.todolist.core.exception.Exception404;
import woorifias.todo.todolist.domain.Member;
import woorifias.todo.todolist.dto.MemberRequest;
import woorifias.todo.todolist.dto.MemberResponse;
import woorifias.todo.todolist.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    public void join(MemberRequest memberRequest){
        existMember(memberRequest.getEmail());
        Member member = Member.from(memberRequest);
        memberRepository.save(member);
    }

    public MemberResponse login(MemberRequest memberRequest){
        Member member = findMember(memberRequest.getEmail());
        checkPassword(member.getPassword(), memberRequest.getPassword());
        return MemberResponse.from(member.getId());
    }


    private void checkPassword(String memberPassword, String requestPassword) {
        if(!memberPassword.equals(requestPassword)){
            throw new Exception400("로그인", "잘 못된 입력입니다");
        }
    }

    private Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() -> new Exception404("멤버를 찾을 수 없습니다"));
    }

    private void existMember(String email) {
        if(memberRepository.findByEmail(email).isPresent()) {
            throw new Exception404("이미 존재하는 멤버입니다");
        }
    }
}
