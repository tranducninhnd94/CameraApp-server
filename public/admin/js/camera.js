$(function () {
    var table = $('#example1').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "http://localhost:8080/admin/camera/find/all/forDataTable"
            // headers: getAuthHeader(),
        },
        "columns": [
            { "data": "id" },
            {
                "data": "name",
                "defaultContent": "",
                "orderable": true
            },
            {
                "data": "namespace",
                "defaultContent": "",
                "orderable": true
            },
            {
                "data": "uri",
                "defaultContent": "",
                "orderable": false
            },
            {
                "data": "location",
                "defaultContent": "",
                "orderable": false
            },
            {
                "data": "created_at",
                "defaultContent": "",
                "orderable": true,
            },
            {
                "data": null,
                "defaultContent": '' +
                    '<button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-pencil"></span></button>&nbsp' +
                    '<button class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button>',
                "orderable": false,
            }

        ],
    });

    $('#example1 tbody').on('click', 'button', function (event) {
        //         console.log('event: ', event.currentTarget.getAttribute('data-title'));
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var type = event.currentTarget.getAttribute('data-title');

        if (type == 'Edit') {
            $("#idCameraId").val(data.id);
            $("#idCameraName").val(data.name);
            $("#idCameraDescription").val(data.description);
            $("#idCameraLocation").val(data.location);
            $("#idCameraUrl").val(data.uri);
        }

        if (type == 'Delete') {
            bootbox.confirm({
                size: "small",
                message: "Are you sure you want to DELETE?",
                callback: function (result) {
                    if (result == true) {
                        $.ajax({
                            type: 'DELETE',
                            // headers: getAuthHeader(),
                            url: '/admin/camera/delete/' + data.id + '/',
                            success: function () {
                                makeSuccessfulToast("Delete success");
                                row.remove().draw(false);
                            },
                            error: function (jqXHR, status, err) {
                                makeErrorToast("Delete fail");
                            },
                            contentType: "application/json",
                        });
                    } else {
                        console.log("No");
                    }
                }
            });
        }
    });


    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal 
        var modal = $(this);
        var title = button.data('title');
        modal.find('.modal-title').text(title);
        if (title == 'Create') {
            $("#idCameraName").val("");
            $("#idCameraDescription").val("");
            $("#idCameraLocation").val("");
            $("#idCameraUrl").val("");
            $('#idSubmit').on('click', function (e) {
                var dataCreate = {};
                dataCreate.name = $("#idCameraName").val();
                dataCreate.description = $("#idCameraDescription").val();
                dataCreate.location = $("#idCameraLocation").val();
                dataCreate.uri = $("#idCameraUrl").val();
                $.ajax({
                    type: "POST",
                    url: "/admin/camera/create",
                    data: JSON.stringify(dataCreate),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function (response) {
                        alert("Success");
                        $('#myModal').modal('hide');
                        table.ajax.reload(null, false); // user paging is not reset on reload
                    },
                    error: function () {
                        alert('Error');
                    }
                });
                return false;
            });
        } else if (title == 'Edit') {
            $('#idSubmit').on('click', function (e) {
                var dataCreate = {};
                dataCreate.id = $("#idCameraId").val();
                dataCreate.name = $("#idCameraName").val();
                dataCreate.description = $("#idCameraDescription").val();
                dataCreate.location = $("#idCameraLocation").val();
                dataCreate.uri = $("#idCameraUrl").val();
                $.ajax({
                    type: "PUT",
                    url: "/admin/camera/update",
                    data: JSON.stringify(dataCreate),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function (response) {
                        alert("Success");
                        $('#myModal').modal('hide');
                        table.ajax.reload(null, false); // user paging is not reset on reload
                    },
                    error: function () {
                        alert('Error');
                    }
                });
                return false;
            });
        }
    });
})