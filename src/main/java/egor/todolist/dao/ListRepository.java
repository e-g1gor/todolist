package egor.todolist.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

import egor.todolist.model.ListCards;

@Repository
public interface ListRepository extends JpaRepository<ListCards, Long> {

  Optional<ListCards> findById(Long id);

  Iterable<ListCards> findByName(String name);
}