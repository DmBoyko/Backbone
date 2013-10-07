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
                editRow(response);
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
                addRow(response);
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

function ISODateString(d){
    function pad(n){
        return n<10 ? '0'+n : n
    }
    return pad(d.getUTCDate())+'.'
        + pad(d.getUTCMonth()+1)+'.'
        + d.getUTCFullYear()
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

function deleteUser(login) {
    if (confirm("Are you sure ?")) {
        $.ajax({
            type: "post",
            url: "delete",
            cache: false,
            clearForm: true,
            data: 'login=' + login,
            success: function (resp) {
                $('#' + resp).hide(1000, function () {
                    $(this).remove();
                });
            },
            error: function () {
                alert('Error while request..');
            }
        })
    }
}

function collectFormData(fields) {
    var data = {};
    for (var i = 0; i < fields.length; i++) {
        var $item = $(fields[i]);
        data[$item.attr('name')] = $item.val();
    }
    return data;
}

function addRow(response) {
    var color;
    if (response.role === 'ROLE_ADMIN') {
        color = '#663926';
    } else {
        color = '#48663C';
    }
    var date = new Date(response.birthDate);
    var birthDate = ISODateString(date);
    $('#userstable').append(
        '<tr id="' + response.login + '" style="background: ' + color +'"'
            + '">' + '<td>' + response.login
            + '</td>' + '<td>' + response.firstName + '</td>'
            + '<td>' + response.lastName + '</td>' + '<td>'
            + response.email + '</td>' + '<td>' + response.role + '</td>'
            + '<td>' + birthDate + '</td>' + '<td>' + '<div>'
            + '<a href="#" onclick="editFormShow(\'' + response.login
            + '\')">Edit </a>'
            + '<a href="#" onclick="deleteUser(\'' + response.login
            + '\')">Delete</a>' + '</div></td></tr>');
}

function editRow(response) {
    var color;
    if (response.role === 'ROLE_ADMIN') {
        color = '#663926';
    } else {
        color = '#48663C';
    }
    var date = new Date(response.birthDate);
    var birthDate = ISODateString(date);
    $('#' + response.login).replaceWith(
        '<tr id="' + response.login + '" style="background: ' + color + '"'
            + '">' + '<td>' + response.login
            + '</td>' + '<td>' + response.firstName + '</td>'
            + '<td>' + response.lastName + '</td>' + '<td>'
            + response.email + '</td>' + '<td>' + response.role + '</td>'
            + '<td>' + birthDate + '</td>' + '<td>' + '<div>'
            + '<a href="#" onclick="editFormShow(\'' + response.login
            + '\')">Edit </a>'
            + '<a href="#" onclick="deleteUser(\'' + response.login
            + '\')">Delete</a>' + '</div></td></tr>');
}