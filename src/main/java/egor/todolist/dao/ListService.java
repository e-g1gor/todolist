package egor.todolist.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.ListCards;

@Service
public class ListService {

    @Autowired
    private ListRepository listRepository;

    public Iterable<ListCards> findAll() {
        return listRepository.findAll();
    }

    public Optional<ListCards> findByID(Long id) {
        Optional<ListCards> list = listRepository.findById(id);
        // if(list.isPresent())
        //     list.get().cards = cardRepository.findByListOrderByOrderAsc(id);
        return list;
    }

    public Iterable<ListCards> findByName(String name) {
        Iterable<ListCards> list = listRepository.findByName(name);
        return list;
    }
}