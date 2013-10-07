<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>
<%--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>--%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="mytag" %>
<c:set var="app" value="${pageContext.request.contextPath}"/>
<c:set var="css" value="${pageContext.request.contextPath}/style.css"/>

<div id="addContainer">
    <h1 class="loginpageTitle">Add user</h1>
    <form:form modelAttribute="newUser" action="#" id="addForm">
        <table class="loginTable">
            <tr class="control-group" id="createControlGroup">
                <td colspan='2'><span class="help-inline"><form:errors
                        path="create"/></span></td>
            </tr>
            <tr class="control-group" id="loginControlGroup">
                <td class="control-label">Login:
                </td>
                <td class="controls">
                    <small>No spaces, please.</small>
                    <br/>
                    <form:input path="login"/>
                    <span class="help-inline"><form:errors path="login"/></span>
                </td>
            </tr>
            <tr class="control-group" id="firstNameControlGroup">
                <td class="control-label">First Name:
                </td>
                <td class="controls">
                    <small>No spaces, please.</small>
                    <br/>
                    <form:input path="firstName"/>
                    <span class="help-inline"><form:errors
                            path="firstName"/></span>
                </td>
            </tr>
            <tr class="control-group" id="lastNameControlGroup">
                <td class="control-label">Last Name:
                </td>
                <td class="controls">
                    <small>No spaces, please.</small>
                    <br/>
                    <form:input path="lastName"/>
                    <span class="help-inline"><form:errors
                            path="firstName"/></span>
                </td>
            </tr>
            <tr class="control-group" id="passwordControlGroup">
                <td class="control-label">Password:
                </td>
                <td class="controls">
                    <small>6 characters or more(be tricky!)</small>
                    <br/>
                    <form:password path="password" showPassword="true"/>
                    <span class="help-inline"><form:errors
                            path="password"/></span>
                </td>
            </tr>
            <tr class="control-group" id="confirmPasswordControlGroup">
                <td class="control-label">Confirm Password:
                </td>
                <td class="controls">
                    <small>6 characters or more(be tricky!)</small>
                    <br/>
                    <form:password path="confirmPassword" showPassword="true"/>
                    <span class="help-inline"><form:errors
                            path="confirmPassword"/></span>
                </td>
            </tr>
            <tr class="control-group" id="emailControlGroup">
                <td class="control-label">Email address:
                </td>
                <td class="controls">
                    <form:input path="email"/>
                    <span class="help-inline"><form:errors path="email"/></span>
                </td>
            </tr>
            <tr class="control-group" id="birthDateControlGroup">
                <td class="control-label">BirthDate :
                </td>
                <td class="controls">
                    <small>Format - dd-MM-yyyy</small>
                    <br/>
                    <form:input path="birthDate"/>
                    <span class="help-inline"><form:errors
                            path="birthDate"/></span>
                </td>
            </tr>
            <tr class="control-group" id="roleControlGroup">
                <td class="control-label">Role :
                </td>
                <td class="controls">
                    <small>Choose user role</small>
                    <br/>
                    <form:select path="role">
                        <form:option value="ROLE_USER" label="user"/>
                        <form:option value="ROLE_ADMIN" label="admin"/>
                    </form:select>
                </td>
            </tr>
            <tr class="form-actions">
                <td colspan='2'>
                    <button type="submit" class="btn btn-primary">Ok</button>
                    <button type="button" class="btn" onclick="adminFormShow()">
                        Cancel
                    </button>
                </td>
            </tr>
        </table>
    </form:form>
</div>