package web.validator;

/**
 * Created with IntelliJ IDEA.
 * User: dboyko
 * Date: 8/20/13
 */
public class ErrorMessage {
    private String fieldName;
    private String message;

    public ErrorMessage(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getMessage() {
        return message;
    }

}
