
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %><%@ page import="java.util.Random" %><!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>This page is generated from JSP template!</title>
    <link href="/css/main.css" rel="stylesheet">
  </head>
  <body>
    <div id="board">
      <% Random rnd = new Random(); %>
      <% for (int listid=1; listid<4; listid++) { %>
      <div class="list unselect" data-key="&lt;%= listid %&gt;" key="&lt;%= listid %&gt;">
        <h1>Here be name of <%= listid %> list</h1><% for (int cardid=1; cardid<rnd.nextInt(6) + 1; cardid++) { %>
        <div class="card" data-key="&lt;%= cardid %&gt;" key="&lt;%= cardid %&gt;">
          <div class="card_text">Here be name of <%= cardid %> card</div>
          <div class="card_del">X</div>
        </div><% } %>
      </div><% } %>
    </div>
  </body>
</html>