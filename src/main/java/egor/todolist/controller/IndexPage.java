package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import egor.todolist.dao.CardService;
import egor.todolist.dao.ListService;
import egor.todolist.model.Card;
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
        for(CardList list : lists)
            list.setCards(cardService.findByList(list.getId()));
        model.addAttribute("lists", lists);
        return "index";
    }

    @DeleteMapping({ "/card/delete" })
    public String cards(Model model,
            @RequestParam(value = "id", required = true) Long id) {
        cardService.deleteCard(id);
        return "index";
    }

    @PostMapping({ "/card/post" })
    public String addCard(@RequestBody Card newCard) {
        cardService.addCard(newCard);
        return "index";
      }
}
