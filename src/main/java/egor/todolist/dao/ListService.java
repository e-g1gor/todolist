package egor.todolist.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.Card;
import egor.todolist.model.CardList;

@Service

public class ListService {

    @Autowired
    private ListRepository listRepository;
    @Autowired
    private CardRepository cardRepository;

    public Iterable<CardList> findAll() {
        return listRepository.findAll();
    }

    public Optional<CardList> findByID(Long id) {
        return listRepository.findById(id);
    }

    public Iterable<Card> getListCards(Long id) {
        return cardRepository.findByListOrderByOrderAsc(id);
    }

    public Optional<CardList> findByName(String name) {
        return listRepository.findByName(name);
    }
}