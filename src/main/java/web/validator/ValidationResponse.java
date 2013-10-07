package web.validator;

import java.util.List;

public class ValidationResponse {
    private String status;
    private List<ErrorMessage> errorMessageList;
    private String login;
    private String firstName;
    private String lastName;
    private String email;
    private String birthDate;

    private String role;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ErrorMessage> getErrorMessageList() {
        return this.errorMessageList;
    }

    public void setErrorMessageList(List<ErrorMessage> errorMessageList) {
        this.errorMessageList = errorMessageList;
    }

    public void setUser(UserForm userForm){
        this.login = userForm.getLogin();
        this.firstName = userForm.getFirstName();
        this.lastName = userForm.getLastName();
        this.email = userForm.getEmail();
        this.role = userForm.getRole();
        this.birthDate = userForm.getBirthDate();
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}
