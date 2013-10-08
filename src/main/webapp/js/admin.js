$(document).ready(function () {
    $('#addContainer').hide();
    $("#editContainer").hide();
    var $form = $('#addForm');
    $form.bind('submit', addUser);
    var $editForm = $('#editForm');
    $editForm.bind('submit', editUser);
});

function editUser(e) {
    var $editForm = $('#editForm');
    // Ajax validation
    var $inputs = $editForm.find('input');
    var $selects = $editForm.find('select');
    $inputs.push($selects[0]);
    var data = collectFormData($inputs);

    $.ajax({
        type: "post",
        url: "edit",
        cache: false,
        data: data,
        dataType: "json",
        success: function (response) {
            $editForm.find('.control-group').removeClass('error');
            $editForm.find('.help-inline').empty();
            $editForm.find('.alert').remove();

            if (response.status == 'FAIL') {
                for (var i = 0; i < response.errorMessageList.length; i++) {
                    var item = response.errorMessageList[i];
                    var $controlGroup = $('#' + item.fieldName + 'ControlGroupEdit');
                    $controlGroup.addClass('error');
                    $controlGroup.find('.help-inline').html(item.message);
                }
            } else {
                Users.fetch();
                adminFormShow();
            }
        },
        error: function () {
            alert('Error while request..');
        }
    });
    e.preventDefault();
    return false;
}

function addUser(e) {
    var $form = $('#addForm');
    // Ajax validation
    var $inputs = $form.find('input');
    var $selects = $form.find('select');
    $inputs.push($selects[0]);
    var data = collectFormData($inputs);

    $.ajax({
        type: "post",
        url: "add",
        cache: false,
        data: data,
        dataType: "json",
        success: function (response) {
            $form.find('.control-group').removeClass('error');
            $form.find('.help-inline').empty();
            $form.find('.alert').remove();

            if (response.status == 'FAIL') {
                for (var i = 0; i < response.errorMessageList.length; i++) {
                    var item = response.errorMessageList[i];
                    var $controlGroup = $('#' + item.fieldName + 'ControlGroup');
                    $controlGroup.addClass('error');
                    $controlGroup.find('.help-inline').html(item.message);
                }
            } else {
                Users.fetch();
                adminFormShow();
            }
        },
        error: function () {
            alert('Error while request..');
        }
    });
    e.preventDefault();
    return false;
}

function addFormShow() {
    $('#adminForm').hide(1500);
    $('#addContainer').show(1500);
}

function editFormShow(login) {
    $('#adminForm').hide(1500);
    $.ajax({
        type: "post",
        url: "showEdit",
        cache: false,
        clearForm: true,
        data: 'login=' + login,
        success: function (resp) {
            $('#editForm input[name*=login]').val(resp.login);
            $('#editForm input[name*=password]').val(resp.password);
            $('#editForm input[name=email]').val(resp.email);
            $('#editForm input[name=firstName]').val(resp.firstName);
            $('#editForm input[name=lastName]').val(resp.lastName);
            $('#editForm input[name=birthDate]').val(resp.birthDate);
            $('#editform option[value=' + resp.role + ']').attr('selected',
                'selected');
            $('#editContainer').show(1500);
        },
        error: function () {
            alert('Error while request..');
        }
    })
}

function adminFormShow() {
    $('#addContainer').hide(1500);
    $('#editContainer').hide(1500);
    $('#adminForm').show(1500);
}


function collectFormData(fields) {
    var data = {};
    for (var i = 0; i < fields.length; i++) {
        var $item = $(fields[i]);
        data[$item.attr('name')] = $item.val();
    }
    return data;
}