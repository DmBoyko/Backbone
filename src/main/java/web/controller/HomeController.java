package web.controller;

import db.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import service.RoleService;
import service.UserService;
import web.validator.ErrorMessage;
import web.validator.UserForm;
import web.validator.ValidationResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {
    private static final Log logger = LogFactory.getLog(HomeController.class);

    @Qualifier("userServiceImpl")
    @Autowired
    private UserService userService;
    @Qualifier("roleServiceImpl")
    @Autowired
    private RoleService roleService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String showLoginPage(Model model) {
        model.addAttribute("newUser", new UserForm());
        return "index";
    }

    @RequestMapping(value = "index")
    public String showIndexPage(Model model) {
        model.addAttribute("newUser", new UserForm());
        return "index";
    }

    @RequestMapping(value = "admin")
    public String adminPage(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin";
    }

    @RequestMapping(value = "hiUser")
    public String userPage() {
        return "HiUserPage";
    }

    @RequestMapping(value = "showEdit")
    public final
    @ResponseBody
    UserForm showEditPage(@RequestParam String login) {
        UserForm userForm = new UserForm();
        userForm.setUser(userService.findByLogin(login));
        return userForm;
    }

    @RequestMapping(value = "logout")
    public String logout(HttpSession session, Model model,
                         HttpServletRequest request) throws IOException {
        boolean error = false;
        try {
            logger.debug("getAttribute(\"invalidCaptcha\") from session ");
            error = (Boolean) session.getAttribute("invalidCaptcha");
            logger.debug("invalidate session!");
            request.getSession().invalidate();
            logger.debug("invalidCaptcha =  " + error);
            model.addAttribute("error", error);
            logger.debug("add errorMsg on model!");
            model.addAttribute("errorMsg", "Captcha invalid!");
            session.removeAttribute("invalidCaptcha");
            return "index";
        } catch (Exception e) {
            logger.error("error!!", e);
            return "index";
        }
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public
    @ResponseBody
    ValidationResponse processAddUser(@ModelAttribute("newUser") @Valid final UserForm newUser,
                                      final BindingResult bindingResult) {
        logger.debug("start processEditUser");
        ValidationResponse res = new ValidationResponse();
        logger.debug("create ValidationResponse");
        if (bindingResult.hasErrors()) {
            logger.debug("status FAIL");
            res.setStatus("FAIL");
            logger.debug("bindingResult.getFieldErrors set to allErrors");
            List<FieldError> allErrors = bindingResult.getFieldErrors();
            List<ErrorMessage> errorMesages = new ArrayList<ErrorMessage>();
            for (FieldError objectError : allErrors) {
                ErrorMessage errorMessage = new ErrorMessage(objectError.getField(),
                        objectError.getDefaultMessage());
                errorMesages.add(errorMessage);
            }
            res.setErrorMessageList(errorMesages);
        } else {
            createUser(newUser, res);
            res.setUser(newUser);
        }
        logger.debug("return ValidationResponse");
        return res;
    }

    @RequestMapping(value = "delete")
    public final
    @ResponseBody
    String deleteUser(@RequestParam String login) {
        User user = userService.findByLogin(login);
        try {
            userService.remove(user);
        } catch (DBSystemException e) {
            logger.error("Can't remove user!!", e);
        }
        return login;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public
    @ResponseBody
    ValidationResponse processEditUser(@ModelAttribute("newUser") @Valid final UserForm newUser,
                                       final BindingResult bindingResult) {
        logger.debug("start processEditUser");
        ValidationResponse res = new ValidationResponse();
        logger.debug("create ValidationResponse");
        if (bindingResult.hasErrors()) {
            logger.debug("status FAIL");
            res.setStatus("FAIL");
            logger.debug("bindingResult.getFieldErrors set to allErrors");
            List<FieldError> allErrors = bindingResult.getFieldErrors();
            List<ErrorMessage> errorMesages = new ArrayList<ErrorMessage>();
            for (FieldError objectError : allErrors) {
                ErrorMessage errorMessage = new ErrorMessage(objectError.getField(),
                        objectError.getDefaultMessage());
                errorMesages.add(errorMessage);
            }
            res.setErrorMessageList(errorMesages);
        } else {
            updateUser(newUser, res);
            res.setUser(newUser);
        }
        logger.debug("return ValidationResponse");
        return res;
    }

    @RequestMapping(value = "loginfailed")
    public String loginError(HttpSession session) {
        logger.trace("login failed!");
        session.setAttribute("error", "true");
        return "index";
    }

    @RequestMapping(value = "login")
    public String login(Model model, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        logger.trace("check  authentication!");
        String login = authentication.getName();
        User user = userService.findByLogin(login);
        logger.trace("remove Attributes!!");
        session.removeAttribute("errorMsg");
        session.setAttribute("user", user);
        model.addAttribute("newUser", new UserForm());
        if (user.getRole().getName().equals("ROLE_ADMIN")) {
            logger.trace("redirect to admin!!");
            model.addAttribute("users", userService.findAll());
            return "admin";
        }
        logger.trace("redirect to hiUser!!");
        session.removeAttribute("invalidCaptcha");
        return "HiUserPage";
    }


    private void updateUser(UserForm newUser, ValidationResponse res) {
        User user = newUser.getUser();
        user.setId(userService.findByLogin(user.getLogin()).getId());
        user.setRole(roleService.findByName(newUser.getRole()));
        try {
            userService.update(user);
            logger.debug("status SUCCESS");
            res.setStatus("SUCCESS");
        } catch (DBException e) {
            logger.error("Can't update user - system error!", e);
            setFailStatus(res, "edit", "Can't update user - not unique email!");
        } catch (Exception e) {
            logger.error("Can't update user - system error!", e);
            setFailStatus(res, "edit", "Can't update user - not unique email!");
        }
    }

    private void createUser(UserForm newUser, ValidationResponse res) {
        logger.debug("try to create user!");
        User user = newUser.getUser();
        String roleName = newUser.getRole();
        logger.debug("role name: '" + roleName + "'");
        Role role = roleService.findByName(roleName);
        logger.debug("Find role: " + role);
        user.setRole(role);
        try {
            userService.create(user);
            logger.debug("status SUCCESS");
            res.setStatus("SUCCESS");
        } catch (DBSystemException e) {
            logger.debug("Can't create user!", e);
            setFailStatus(res, "create", "Can't create user!");
        } catch (NotUniqueLoginException e) {
            logger.debug("Not unique Login", e);
            setFailStatus(res, "create", "Not unique Login");
        } catch (NotUniqueEmailException e) {
            logger.debug("Not unique Email", e);
            setFailStatus(res, "create", "Not unique Email");
        } catch (NotUniqueRoleNameException e) {
            logger.debug("Not unique Role name", e);
            setFailStatus(res, "create", "Not unique Role name");
        }
    }

    private void setFailStatus(ValidationResponse res, String fieldName, String message) {
        res.setStatus("FAIL");
        res.setErrorMessageList(Arrays.asList(new ErrorMessage(fieldName, message)));
    }
}
