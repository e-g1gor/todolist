package egor.todolist.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import egor.todolist.model.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

  Optional<Card> findById(Long id);

  Optional<Card> findByName(String name);

  Iterable<Card> findByListOrderByOrderAsc(Long list);
}