package egor.todolist.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

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

  @Transient
  private List<Card> cards;
}