package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egor.todolist.dao.ListService;
import egor.todolist.model.ListCards;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListController {

  @Autowired
  ListService listService;

  @GetMapping({ "/list" })
  public String getByID(Model model, @RequestParam(value = "id", required = false) Long id,
      @RequestParam(value = "name", required = false) String name) {

    log.info("list requested");

    if (id != null) {
      log.info("requested ID = " + id);
      ListCards list = listService.findByID(id).get();
      return "list[" + id + "].name = " + list.getName();
    }

    if (name != null) {
      log.info("requested name = " + name);
      return "list[" + id + "] = " + listService.findByName(name);
    }

    return "lists " + listService.findAll();

  }
}
