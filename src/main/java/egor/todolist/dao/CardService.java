package egor.todolist.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.Card;
import lombok.extern.java.Log;

@Service
@Log
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

    public Optional<Card> findByName(String name) {
        Optional<Card> card = cardRepository.findByName(name);
        return card;
    }

    public Iterable<Card> findByList(Long list) {
        Iterable<Card> card = cardRepository.findByListOrderByOrderAsc(list);
        return card;
    }

    public void updateCard(Card card) {
        log.info("id = " + card.getId() + "; name = " + card.getName());
        Card newCard = cardRepository.findById(card.getId()).get();
        newCard.setName(card.getName());
        cardRepository.save(newCard);
    }

    public void addCard(Card newCard) {
        log.info("id = " + newCard.getId() + "; name = " + newCard.getName());
        cardRepository.save(newCard);
    }

    public void deleteCard(Long id) {
        // TODO: find all cards in list, detect all
        Card target = cardRepository.findById(id).get();
        Long list = target.getList();
        Long order = target.getOrder();
        Iterable<Card> cards = cardRepository.findByListOrderByOrderAsc(list);
        cardRepository.deleteById(id);
        for (Card card : cards)
            if (order < card.getOrder()) {
                card.setOrder(card.getOrder() - 1);
                cardRepository.save(card);
            }
    }
}