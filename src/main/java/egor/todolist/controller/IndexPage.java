package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egor.todolist.dao.CardService;
import egor.todolist.dao.ListService;
import egor.todolist.model.CardList;

@Controller
public class IndexPage {

    @Autowired
    CardService cardService;
    @Autowired
    ListService listService;

    @GetMapping({ "/"})
    public String hello(Model model, 
    @RequestParam(value="nojs", required=false) Boolean nojs,
    @RequestParam(value="edited", required=false) Boolean edited,
    @RequestParam(value="name", required=false) String name,
    @RequestParam(value="id", required=false) Long id,
    @RequestParam(value="list", required=false) Long listid,
    @RequestParam(value="order", required=false) Long order) {
        Iterable<CardList> lists = listService.findAll();
        for (CardList list : lists)
            list.setCards(cardService.findByList(list.getId()));
            model.addAttribute("lists", lists);
            model.addAttribute("nojs", nojs);
            model.addAttribute("edited", edited);
            model.addAttribute("name", name);
            model.addAttribute("id", id);
            model.addAttribute("list", listid);
            model.addAttribute("order", order);
        return "index";
    }
}
