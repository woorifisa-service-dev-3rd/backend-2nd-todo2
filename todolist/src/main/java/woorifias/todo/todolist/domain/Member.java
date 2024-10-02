package woorifias.todo.todolist.domain;

import lombok.*;
import woorifias.todo.todolist.dto.MemberRequest;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
public class Member extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;

    public static Member from(MemberRequest memberRequest){
        return Member.builder()
                .username(memberRequest.getName())
                .email(memberRequest.getEmail())
                .password(memberRequest.getPassword())
                .build();
    }
}
