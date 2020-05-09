package egor.todolist.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import egor.todolist.dao.CardService;
import egor.todolist.model.Card;
import lombok.extern.java.Log;

@RestController
@Log
public class CardController {

  @Autowired
  CardService cardService;

  @GetMapping({ "/cards" })
  public Iterable<Card> getAll( Model model, @RequestParam(value = "list", required = false)  Long list) {
    if(list!=null)
      return cardService.findByList(list);
    return cardService.findAll();
  }

  @GetMapping({ "/card" })
  public Card getCard( Model model, @RequestParam(value = "id", required = false)  Long id,
      @RequestParam(value = "name", required = false)  String name) {

    if (id != null) {
       Optional<Card> card = cardService.findByID(id);
      if (!card.isPresent())
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card[" + id + "] not found.");
      return card.get();
    }

    if (name != null) {
       Optional<Card> card = cardService.findByName(name);
      if (!card.isPresent())
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card[" + name + "] not found.");
      return card.get();
    }
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You just asked for nothing.");
  }
  
  // await fetch('/cards', {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({name: 'Textual content'})})    
  @PatchMapping("/cards")
  public ResponseEntity newCard(@RequestBody Card patchCard) {
    cardService.updateCard(patchCard);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity addCard(@RequestBody Card newCard) {
    // cardService.addCard(newCard);
    return ResponseEntity.ok(HttpStatus.OK);
  }
  
}