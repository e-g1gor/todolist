package egor.todolist.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "cards")
public class Card {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idcard")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "order")
  private Long order;


  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "list", referencedColumnName = "idlist")
  private ListCards list;

  public Card() {

  }

  public Card(String name, String description, Long order) {
    this.name = name;
    this.description = description;
    this.order = order;
  }
}