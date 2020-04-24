package egor.todolist;

// import java.util.List;

import org.apache.commons.collections4.IterableUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import egor.todolist.dao.BookService;
import egor.todolist.model.Book;

@SpringBootApplication
public class App implements CommandLineRunner {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	BookService bookService;
	

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
		Iterable<Book> books = bookService.list();
		
		logger.info("length" + IterableUtils.size(books));
	}

}
