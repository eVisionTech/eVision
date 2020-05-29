// Call the dataTables jQuery plugin
$(document).ready(function () {
    window.queryParams = function (params) {
        if (params.sort && params.order == 'desc')
            params.sort = '-' + params.sort;

        if (params.offset !== undefined)
            params.skip = params.offset;

        if (params.search !== "") 
            params.query = JSON.stringify({
                'name': {
                    '$regex' : '(' + params.search + ')', '$options' : 'i'
                }
            })

        delete params.offset;
        delete params.search;
        delete params.order;

        return params;
    }

    window.responseHandler = function (data, res) {
        console.log(res)
        let total = res.getResponseHeader('X-Total-Count');
        if (total === null) return data;
        else {        
            data = { total: total, rows: data }
            return data;
        }
    }

    window.dateFormat = function (value, row) {
        if (!value) return '';
        return timeConvert(value, true)
    }

    window.roleFormat = function (value, row) {
        let result = value;
        (window.roles || []).forEach((item) => { if (item.role == value) result = item.name })
        return result
    }

    window.timeConvert = function timeConvert(timestamp, ms, gmt) {
        try {
            var date = new Date(Number(timestamp));
            var offset = gmt ? 0 : (date.getTimezoneOffset() / 60);
            date.setHours(date.getHours() - offset);
            return (date).toISOString().replace(/[TZ]/g, ' ').trim().substring(0, ms ? 23 : 19)
        } catch (e) { return timestamp }
    }

    window.userActions = function (value, row, index) {
        if (window.role != 'user')
            return '<button class="btn btn-sm btn-info editRecUser" data-i18n="[data-original-title]db.edit" title="" data-original-title="'
            + i18next.t('db.edit')
            + '" data-id="' + row.id + '"> <i class="glyphicon glyphicon-pencil"></i></button> <button class="btn btn-sm btn-danger removeRecUser" data-i18n="[data-original-title]db.removeUser" title="" data-original-title="'
            + i18next.t('db.removeUser')
            + '" data-id="' + row.id + '"><i class="glyphicon glyphicon-trash"></i></button>'
        else return '';
    };

    $('#usersTbl')
        .bootstrapTable({ 
            exportDataType: 'all',
            height: ($(window).height() - 207).toString(),
            responseHandler: function (res, x) {
                let total = x.getResponseHeader('X-Total-Count');
                if (total === null) return res;
                else {        
                    data = { total: total, rows: res }
                    return data;
                }
            },
            undefinedText: ''
        }
    );

    var counterGetLogsUser = 0;
    var timerGetLogsUser;

    function requestLogsUser() {
        $('#usersTbl').bootstrapTable('refresh', {
            url: '/api/v1/User'
        });
    }

    $('#usersTbl').on('load-error.bs.table', function (e, data) {
        counterGetLogsUser++;
        clearTimeout(timerGetLogsUser);

        if (counterGetLogsUser > 15) {
            counterGetLogsUser = 0;
            $("#loadingModal").modal('hide');
            $("#infoModal").find('.modal-body').html(i18next.t('modal.info.getData'));
            $("#infoModal").modal('show');
        } else {
            timerGetLogsUser = setTimeout(function() {
                requestLogsUser();
            }, counterGetLogsUser * 1500);
        }
    });

    $('#usersTbl').on('load-success.bs.table', function (data) {
        clearTimeout(timerGetLogsUser);
        $("#loadingModal").modal('hide');
    });
    
    $('#usersTbl').on('post-body.bs.table', function (e, data) {
        setTimeout(function () {

            $('.editRecUser').click(function (e) {

                var id = $(this).attr('data-id');
                console.log('edit user id', id);
                var rec;

                $('#usersTbl')
                    .bootstrapTable('getData', false)
                    .forEach(function (item) {
                        if (item.id == id) {
                            if (!rec)
                                rec = item;
                        };
                    });

                if (!rec) return;

                $("#editRecordUserForm").trigger("reset");

                $('[name="id"]', " #editRecordUserForm").val(rec.id);
                $('[name="username"]', " #editRecordUserForm").val(rec.name);
                $('[name="password"]', " #editRecordUserForm").val('');
                $('[name="role"]', " #editRecordUserForm").val(rec.role);

                setTimeout(function () { $('.selectpicker', " #editRecordUserForm").selectpicker('refresh') }, 0);

                $("#editRecordUserModalLabel").text(i18next.t('modal.addUser.titleEdit'))
                $("#editRecordUserModal").modal('show');
                e.preventDefault();
                e.stopPropagation();
            });

            $('.removeRecUser').click(function (e) {
                var id = $(this).attr('data-id');
                console.log('remove user id', id);

                $("#removeModalUser")
                    .attr('data-id', id)
                    .modal('show');

                e.preventDefault();
                e.stopPropagation();
            });

            $('[title]').tooltip({ trigger: 'hover' })
        }, 0)
    });

    $(this).on('shown.bs.tab', function (e) {
        window.activeTab = $(e.target).attr('aria-controls');

        $('#video1').get(0).pause();

        $('.tab-content>.tab-pane.active .table-striped').bootstrapTable('resetView')

        $('#appTab>.nav-item>.nav-link').removeClass('active');
        $(e.target).addClass('active');

        switch (window.activeTab) {
            case 'usersTable':
                $("#loadingModal").modal('show');
                requestLogsUser();
                break;
            case 'videoArchive':
                $('#videoSourceSelector').selectpicker('val', window.curNodeId);
                break;
        }
    });

    $('.addRecUser').click(function (e) {
        console.log('add user');

        $("#editRecordUserForm").trigger("reset");
        $('[name="id"]', "#editRecordUserForm").val('');
        $('[name="username"]', "#editRecordUserForm").val('');
        $('[name="password"]', "#editRecordUserForm").val('');
        $('[name="role"]', "#editRecordUserForm").val('');

        setTimeout(function () { $('.selectpicker', "#editRecordUserForm").selectpicker('refresh') }, 0);

        $("#editRecordUserModalLabel").text(i18next.t('modal.addUser.title'));
        $("#editRecordUserModal").modal('show');
    })
});
