package egor.todolist.dao;

// import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import egor.todolist.model.Card;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {

  Iterable<Card> findByName(String name);

  Iterable<Card> findByList(Long list);
}