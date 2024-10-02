package woorifias.todo.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woorifias.todo.todolist.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Optional<Member> findByEmail(String email);
}
