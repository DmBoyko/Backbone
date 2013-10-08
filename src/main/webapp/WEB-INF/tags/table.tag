<%@ tag pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="security"
           uri="http://www.springframework.org/security/tags" %>
<security:authentication property="principal.username" var="login"/>
<div id="userapp">
    <div class="content">
        <table id="userstable" class="myTable">
            <thead>
            <tr>
                <th>Login</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Birthday</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody id="user-list"></tbody>
        </table>
    </div>

</div>
<!-- Templates -->

<script type="text/template" id="item-template">
    <td class="userLogin"/>
    <td class="userFirstName"/>
    <td class="userLastName"/>
    <td class="userEmail"/>
    <td class="userRole"/>
    <td class="userBirthDate"/>
    <td>
        <%--<a class="editUser" href="#" onclick="#">Edit</a>--%>
        <button class="edit">edit</button>
        <button class="destroy">delete</button>
    </td>
</script>
