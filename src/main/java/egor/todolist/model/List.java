package egor.todolist.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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


  // @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // private Set<Card> list;

  public List() {

  }

  public List(String name) {
        this.name = name;
    }
}