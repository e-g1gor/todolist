package egor.todolist.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

import egor.todolist.model.CardList;

@Repository
public interface ListRepository extends JpaRepository<CardList, Long> {

  Optional<CardList> findById(Long id);

  Optional<CardList> findByName(String name);
}