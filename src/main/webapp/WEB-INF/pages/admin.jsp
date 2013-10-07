<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="mytag" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="app" value="${pageContext.request.contextPath}"/>
<c:set var="css" value="${pageContext.request.contextPath}/style.css"/>

<html>
<head>
    <title>Admin homepage</title>
    <link rel="stylesheet" type="text/css" href="${css}" media="all"/>
    <script type="text/javascript" src="lib/jquery-2.0.3.js"></script>
    <script type="text/javascript" src="js/admin.js"></script>
    <script type="text/javascript" src="lib/jquery.form.js"></script>
    <script type="text/javascript" src="lib/underscore.js"></script>
    <script type="text/javascript" src="lib/backbone.js"></script>
    <script type="text/javascript" src="lib/json2.js"></script>
    <script type="text/javascript" src="js/users.js"></script>
</head>
<body>

<div align="right">
    <c:out value="${sessionScope.user.firstName} ${sessionScope.user.lastName} ("/>
    <a href="${app}/j_spring_security_logout">Logout</a>
    <c:out value=")"/>
</div>

<div id="adminForm" class="adminContainer">
    <a href="#" onclick="addFormShow()">Add new user</a>
    <mytag:table/>
</div>

<%@include file="addPage.jsp" %>
<%@include file="editPage.jsp" %>

</body>
</html>