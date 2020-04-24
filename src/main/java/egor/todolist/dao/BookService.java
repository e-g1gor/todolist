package egor.todolist.dao;

// import java.util.List;
import java.util.Optional;

// import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egor.todolist.model.Book;
import egor.todolist.model.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Iterable<Book> list() {
        return bookRepository.findAll();
    }

    public Optional<Book> getByID(Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book;
    }
}