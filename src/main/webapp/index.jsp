
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" %><!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <link type="spreadsheet" src="style.css">
  <script src="app.js"></script>
  <title>Hello ${name}!</title>
  <link href="/css/main.css" rel="stylesheet">
</head>
<h1>Hello ${name}!</h1>
<p>Test JSP loop:</p><% for (int i=1; i<4; i++) { %>
<p>This number is <%= i %>.</p></p><% } %>
<select id="selectlang">
  <option value="all">All books</option>
  <option value="pl">Polish</option>
  <option value="by">&Bcy;&iecy;&lcy;&acy;&rcy;&ucy;&scy;&kcy;&acy;&yacy;</option>
  <option value="ru">&Rcy;&ucy;&scy;&scy;&kcy;&icy;&jcy;</option>
</select>
<div id="output"></div>
<div id="dbg"></div>