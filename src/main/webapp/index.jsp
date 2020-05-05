
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %><%@ page import="java.util.Random" %><!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="/js/bundle.js"></script>
    <title>Hello ${name}!</title>
    <link href="/css/main.css" rel="stylesheet">
  </head>
  <body>
    <div id="board">
      <% Random rnd = new Random(); %>
      <% for (int i=1; i<4; i++) { %>
      <div class="list unselect">
        <p><%= i %></p><% for (int j=1; j<rnd.nextInt(6) + 1; j++) { %>
        <div class="card"><%= j %></div><% } %>
      </div><% } %>
    </div>
  </body>
</html>