package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egor.todolist.dao.CardService;
import egor.todolist.model.Card;

@Controller
public class IndexPage {

    
  @Autowired
  CardService cardService;

    @GetMapping({ "/" })
    public String hello(Model model,
            @RequestParam(value = "name", required = false, defaultValue = "World (default)") String name) {
        model.addAttribute("name", name);
        return "index";
    }

    @GetMapping({ "/cards.html" })
    public String cards(Model model,
            @RequestParam(value = "list", required = false, defaultValue = "World (default)") Long list) {
        Iterable<Card> cards = cardService.findByList(list);
        model.addAttribute("cards", cards);
        return "cards";
    }
}
