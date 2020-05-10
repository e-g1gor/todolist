
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="egor.todolist.model.Card" %>
<%@ page import="java.util.List" %>
<% List<Card> cards = (List)request.getAttribute("cards");%>
<p>Cards! "<%= cards %>"</p><% for (Card card : cards) { %>
<div class="card" data-key="<%= card.getId() %>" key="<%= card.getId() %>">
  <div class="card_text"><%= card.getName() %></div>
  <div class="card_del">X</div>
</div><% } %>