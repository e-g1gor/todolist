package egor.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egor.todolist.dao.BookService;
import egor.todolist.model.Book;

@RestController
public class BooksController {

  @Autowired
  BookService bookService;

  @GetMapping({ "/books" })
  public String getByID(Model model, @RequestParam(value = "id", required = false) Long id,
      @RequestParam(value = "name", required = false) Integer name) {

    if (id != null) {
      Book book = bookService.getByID(id).get();
      return "book[" + id + "].name = " + book.getName();
    }
    return "Books " + bookService.list();

  }

  @GetMapping({ "/all" })
  public Iterable<Book> getAll(Model model) {
    return bookService.list();

  }
}
