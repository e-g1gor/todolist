package egor.todolist.dao;

import java.util.List;
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

    public List<Card> findAll() {
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

    public List<Card> findByList(Long list) {
        List<Card> card = cardRepository.findByListOrderByOrderAsc(list);
        return card;
    }

    public void updateCard(Card card) {
        log.info(card.toString());
        Card newCard = cardRepository.findById(card.getId()).get();
        newCard.setName(card.getName());
        cardRepository.save(newCard);
    }

    public void addCard(Card newCard) {
        log.info(newCard.toString());
        cardRepository.save(newCard);
    }

    public void deleteCard(Long id) {
        Card target = cardRepository.findById(id).get();
        Long list = target.getList();
        Long order = target.getOrder();
        List<Card> cards = cardRepository.findByListOrderByOrderAsc(list);
        cardRepository.deleteById(id);
        for (Card card : cards)
            if (order < card.getOrder()) {
                card.setOrder(card.getOrder() - 1);
                cardRepository.save(card);
            }
    }
}