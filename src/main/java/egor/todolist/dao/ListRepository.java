package egor.todolist.dao;

// import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import egor.todolist.model.List;

@Repository
public interface ListRepository extends CrudRepository<List, Long> {

  Iterable<List> findByName(String name);
}