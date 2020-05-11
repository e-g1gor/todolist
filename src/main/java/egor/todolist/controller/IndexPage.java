package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import egor.todolist.dao.CardService;
import egor.todolist.dao.ListService;
import egor.todolist.model.Card;
import egor.todolist.model.CardList;
import lombok.extern.java.Log;

@Controller
@Log
public class IndexPage {

    @Autowired
    CardService cardService;
    @Autowired
    ListService listService;

    @GetMapping({ "/" })
    public String hello(Model model) {
        Iterable<CardList> lists = listService.findAll();
        for (CardList list : lists)
            list.setCards(cardService.findByList(list.getId()));
        model.addAttribute("lists", lists);
        return "index";
    }

    @DeleteMapping(path = "/nojs/cards", consumes = "application/x-www-form-urlencoded")
    public String deleteCard(Card newCard) {
        log.info(newCard.toString());
        // cardService.deleteCard(newCard.getId());
        return "redirect:/";
    }

    @PostMapping(path = "/nojs/cards", consumes = "application/x-www-form-urlencoded")
    public String addCard(Card newCard) {
        cardService.addCard(newCard);
        log.info(newCard.toString());
        return "redirect:/";
    }

    @PatchMapping(path = "/nojs/cards", consumes = "application/x-www-form-urlencoded")
    public String udpateCard(Card newCard) {
        log.info(newCard.toString());
        cardService.updateCard(newCard);
        return "redirect:/";
    }
}
