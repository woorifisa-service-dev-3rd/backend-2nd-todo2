package woorifias.todo.todolist.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import woorifias.todo.todolist.dto.MemberRequest;

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
