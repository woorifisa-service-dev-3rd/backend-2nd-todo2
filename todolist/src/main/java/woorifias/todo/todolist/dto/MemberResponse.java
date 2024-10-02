package woorifias.todo.todolist.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MemberResponse {
    private Long memberId;

    public static MemberResponse from(Long memberId){
        return new MemberResponse(memberId);
    }
}
