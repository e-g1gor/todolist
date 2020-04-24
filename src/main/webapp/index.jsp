<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <link type="spreadsheet" src="style.css">
  <script src="app.js"></script>
  <title>Hello ${name}!</title>
  <link href="/css/main.css" rel="stylesheet">
</head>

<body>
  <h1>Hello ${name}!</h1>
  <select id="selectlang">
    <option value="all">All books</option>
    <option value="pl">Polish</option>
    <option value="by">Беларуская</option>
    <option value="ru">Русский</option>
  </select>
  <div id="output"></div>
  <div id="dbg"></div>
</body>

</html>