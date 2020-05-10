package egor.todolist.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import egor.todolist.dao.ListService;
import egor.todolist.model.CardList;

@RestController
public class ListController {

  @Autowired
  ListService listService;

  @GetMapping({ "/lists" })
  public Iterable<CardList> getAll() {
    return listService.findAll();
  }

  @GetMapping({ "/list" })
  public Optional<CardList> getList(Model model, @RequestParam(value = "id", required = false) Long id,
      @RequestParam(value = "name", required = false) String name) {

        if (id != null) {
          Optional<CardList> list = listService.findByID(id);
          if (!list.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "List[" + id + "] not found.");
            return listService.findByID(id);
        }
    
    if (name != null) {
      Optional<CardList> list = listService.findByName(name);
      if (!list.isPresent())
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "List[" + name + "] not found.");
        return listService.findByName(name);
    }
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You just asked for nothing.");
  }
}
