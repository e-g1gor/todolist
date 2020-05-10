<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="egor.todolist.model.Card" %>
<%@ page import="egor.todolist.model.CardList" %>
<% Iterable<CardList> lists = (Iterable<CardList>)request.getAttribute("lists");%><!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="/js/bundle.js"></script>
    <title>This page is generated from JSP template!</title>
    <link href="/css/main.css" rel="stylesheet">
  </head>
  <body>
    <div id="board"><% for (CardList list : lists) { %>
      <div class="list unselect" data-key="<%= list.getId() %>" key="<%= list.getId() %>">
        <h1><%= list.getName() %></h1><% for (Card card : list.getCards()) { %>
        <div class="card" data-key="<%= card.getId() %>" key="<%= card.getId() %>">
          <div class="card_text"><%= card.getName() %></div>
          <div class="card_del" onClick="undefined">X X</div>
        </div><% } %>
        <form class="list_addcard" method="POST" action="/cards" onSubmit="undefined">
          <input name="name" type="text" placeholder="new card" autocomplete="off" onSubmit="undefined">
          <input name="list" value="<%= list.getId() %>" type="hidden">
          <input name="order" value="<%= list.getCards().size() %>" type="hidden">
          <input type="submit" value="ADD CARD">
        </form>
      </div><% } %>
    </div>
  </body>
</html>