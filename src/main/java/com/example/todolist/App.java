package com.example.todolist;

// import com.example.todolist.Book;

import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class App {
    public static void main(String[] args) {

        Book book = new Book("code created");

        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student objects
            session.save(book);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }

        // try (Session session = HibernateUtil.getSessionFactory().openSession()) {
        //     List < Book > students = session.createQuery("from books", Book.class).list();
        //     students.forEach(s - > System.out.println(s.getFirstName()));
        // } catch (Exception e) {
        //     if (transaction != null) {
        //         transaction.rollback();
        //     }
        //     e.printStackTrace();
        // }
    }
}