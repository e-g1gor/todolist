package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egor.todolist.dao.CardService;
import egor.todolist.model.Card;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class CardController {

  @Autowired
  CardService cardService;

  @GetMapping({ "/card" })
  public String getByID(Model model, @RequestParam(value = "id", required = false) Long id,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "list", required = false) Long list) {
        
    log.info("card requested");

    if (id != null) {
      log.info("requested ID = " + id);
      Card cards = cardService.findByID(id).get();
      return "card[" + id + "].name = " + cards.getName();
    }

    if (name != null) {
      log.info("requested name = " + name);
      return "card[" + name + "] = " + cardService.findByName(name);
    }

    if (list != null) {
      log.info("requested list = " + list);
      return "card[" + list + "] = " + cardService.findByList(list);
    }


    return "cards " + cardService.findAll();

  }
}
