package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import egor.todolist.dao.CardService;
import egor.todolist.dao.ListService;
import egor.todolist.model.CardList;

@Controller
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
}
