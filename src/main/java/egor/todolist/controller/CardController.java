package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.view.RedirectView;

import egor.todolist.dao.CardService;
import egor.todolist.dao.ListService;
import egor.todolist.model.Card;
import lombok.extern.java.Log;

@Controller
@Log
public class CardController {

  @Autowired
  CardService cardService;
  @Autowired
  ListService listService;

  @PostMapping(path = "/nojs/cards/delete", consumes = "application/x-www-form-urlencoded")
  public RedirectView deleteCard(Card newCard) {
      log.info(newCard.toString());
      cardService.deleteCard(newCard.getId());
      return new RedirectView("/?nojs=1");
  }

  @PostMapping(path = "/nojs/cards/add", consumes = "application/x-www-form-urlencoded")
  public RedirectView addCard(Card newCard) {
      log.info(newCard.toString());
      cardService.addCard(newCard);   
      return new RedirectView("/?nojs=1");
  }

  @PostMapping(path = "/nojs/cards/update", consumes = "application/x-www-form-urlencoded")
  public RedirectView udpateCard(Card newCard) {
      log.info(newCard.toString());
      cardService.updateCard(newCard);
      return new RedirectView("/?nojs=1");
  }
}