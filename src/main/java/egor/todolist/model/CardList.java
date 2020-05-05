package egor.todolist.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "lists")
@Data
public class CardList {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idlist")
  private Long id;
  private String name;

}