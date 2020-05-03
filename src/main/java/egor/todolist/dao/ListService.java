package egor.todolist.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.List;

@Service
public class ListService {

    @Autowired
    private ListRepository listRepository;

    public Iterable<List> findAll() {
        return listRepository.findAll();
    }

    public Optional<List> findByID(Long id) {
        Optional<List> list = listRepository.findById(id);
        return list;
    }

    public Iterable<List> findByName(String name) {
        Iterable<List> list = listRepository.findByName(name);
        return list;
    }
}