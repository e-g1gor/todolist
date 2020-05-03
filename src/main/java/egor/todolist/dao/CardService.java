package egor.todolist.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.Card;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public Iterable<Card> findAll() {
        return cardRepository.findAll();
    }

    public Optional<Card> findByID(Long id) {
        Optional<Card> card = cardRepository.findById(id);
        return card;
    }

    public Iterable<Card> findByName(String name) {
        Iterable<Card> card = cardRepository.findByName(name);
        return card;
    }

    public Iterable<Card> findByList(Long list) {
        Iterable<Card> card = cardRepository.findByList(list);
        return card;
    }
}