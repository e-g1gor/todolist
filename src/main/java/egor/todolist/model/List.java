package egor.todolist.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "lists")
public class List {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idlist")
  private Long id;

  @Column(name = "name")
  private String name;

  public List() {

  }

  public List(String name) {
        this.name = name;
    }
}