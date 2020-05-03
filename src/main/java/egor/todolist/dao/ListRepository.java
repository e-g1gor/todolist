package egor.todolist.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

import egor.todolist.model.List;

@Repository
public interface ListRepository extends JpaRepository<List, Long> {

  Optional<List> findById(Long id);

  Iterable<List> findByName(String name);
}