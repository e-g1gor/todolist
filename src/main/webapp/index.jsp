<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="egor.todolist.model.Card" %>
<%@ page import="egor.todolist.model.CardList" %>
<% Iterable<CardList> lists = (Iterable<CardList>)request.getAttribute("lists");%><!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="${nojs ? '' : '/js/bundle.js' }"></script>
    <title>This page is generated from JSP template!</title>
    <link href="/css/main.css" rel="stylesheet">
  </head>
  <body>
    <div class="card_editor ${edited ? '' : 'card_editor-hidden' }">
      <form method="POST" action="/nojs/cards/update">
        <input name="name" value="${name}" type="text" placeholder="enter card name" autocomplete="off" onSubmit="undefined">
        <input name="list" value="${list}" type="hidden">
        <input name="id" value="${id}" type="hidden">
        <input type="submit" value="SAVE CARD">
      </form><a class="card_closeEditor" href="/?nojs=1"></a>
    </div>
    <div id="board"><% for (CardList list : lists) { %>
      <div class="list unselect" data-key="<%= list.getId() %>" key="<%= list.getId() %>">
        <h1><%= list.getName() %></h1><% for (Card card : list.getCards()) { %><a class="card" href="?nojs=1&edited=1&id=<%= card.getId() %>&name=<%= card.getName() %>&list=<%= card.getList() %>&order=<%= card.getOrder() %>" data-key="<%= card.getId() %>" data-name="<%= card.getName() %>" data-list="<%= card.getList() %>" data-order="<%= card.getOrder() %>">
          <div class="card_text"><%= card.getName() %></div>
          <form class="card_del" method="POST" action="/">
            <input name="id" value="<%= card.getId() %>" type="hidden">
            <button type="submit" formaction="/nojs/cards/delete" value="X">X</button>
          </form></a><% } %>
        <form class="list_addcard" method="POST" action="/nojs/cards/add">
          <input name="name" type="text" placeholder="enter new card name" autocomplete="off" onSubmit="undefined">
          <input name="list" value="<%= list.getId() %>" type="hidden">
          <input name="order" value="<%= list.getCards().size() %>" type="hidden">
          <input type="submit" value="ADD CARD">
        </form>
      </div><% } %>
    </div>
  </body>
</html>