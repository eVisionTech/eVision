(function ($) {

    window.trustAccuracy = 0.5

    'use strict'; // Start of use strict

    // Configure tooltips for collapsed side navigation
    $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover'
    })

    // Navigation popover
    $('[data-toggle="popover"]').popover({ html : true });

    // Add arguments to the whitelist
    $.fn.tooltip.Constructor.Default.whiteList['button']=['data-i18n', 'title'];
    $.fn.tooltip.Constructor.Default.whiteList['a'].push('data-toggle', 'role', 'aria-control', 'data-i18n');

    // Keep dropdown open
    $('.nav-dropdown, .camPreview>.dropdown').on({
        'shown.bs.dropdown': function () { $(this).attr('closable', false); },
        'click':             function () { },
        'hide.bs.dropdown':  function () { return $(this).attr('closable') == 'true'; }
    });    
    $('.nav-dropdown>.dropdown-toggle, .camPreview>.dropdown>.dropdown-toggle').on({
        'click': function() {
            $(this).parent().attr('closable', true);
        }
    })
    
    function toggleSideNav() {
        $('body').toggleClass('sidenav-toggled');
        $('.tab-content>.tab-pane.active .table-striped').bootstrapTable('resetView');
    }

    $('#sidenavToggler').click((e) => {
        e.preventDefault();
        toggleSideNav();        
    });
    
    $('body').on('click', function (e) {
        if (!$(e.target).closest($('#navbarResponsive')).length)
            if (window.matchMedia('(max-width: 991px)').matches) 
                $('#navbarResponsive').collapse('hide');
            if (!$(e.target).closest($('#userDropdownMenu')).length)
                $('.camPreview>.dropdown.show>#userDropdown').click();
        else return;
    })
    $('#navbarResponsive').on('show.bs.collapse', function () {
        if ($('body').hasClass('sidenav-toggled')) {
            toggleSideNav();
        }
    })

    $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
        let e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });

    $(document).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' })

    $(document).on('click', 'a.scroll-to-top', function (e) {
        $('html, body').stop().animate({
            scrollTop: ($($(this).attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

    initCommonSettings(() => {
        setTheme();
        initLocal(window.lang);
        initLocale(window.lang);               
    });
    
    setTimeout(function () {
        getStatus(initSettings);        
    }, 0);

    $('.preview').click((e) => {
        e.preventDefault();
        $('#cameraLink').tab('show');
        $('#openBtn').hide();
        $('#videoCam').attr('src', '/api/v1/Stream/Preview');
        $('#videoCam').css('outline', 'none');
        currentnodeId = 'preview'
        $(".camBtn").removeAttr('active');
        $('.camBtn').removeClass('btn-primary').addClass('btn-outline-primary');
        $('.preview').removeClass('btn-outline-primary').addClass('btn-primary');
        $('#removeCam').prop('disabled', true)
        $('#restartCam').prop('disabled', true)
        $('#settingsLink').addClass('disabled');
        $('#videoCamError').hide();
    });

    $(".toggle-password").click(function(){
        $(this).toggleClass("fa-eye fa-eye-slash");
        let $input = $($(this).attr("toggle"));
        $input.attr('type', $input.attr("type") === 'text'?'password':'text');
    });

    $('#infoModal').on('hidden.bs.modal', () => {
        $('#infoModal').find('.modal-header').html('<h5 class="modal-title" data-i18n="modal.info.title">'
            + i18next.t('modal.info.title')
            + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="infoModalCross"><span aria-hidden="true">&times;</span></button>');
        $('#infoModal').find('.modal-body').html('<p>Modal body text goes here.</p>');
        $('#infoModal').find('.modal-footer').html('<button id="infoModalClose" type="button" class="btn btn-secondary" data-dismiss="modal" data-i18n="buttons.close">'
            + i18next.t('buttons.close')
            + '</button>');
        $('#infoModalClose').click(() => {
            $('#infoModal').hide();
        });
	    $('#infoModalCross').click(() => {
            $('#infoModal').hide();
        });
    });

    $('#infoModalClose').click(() => {
        $('#infoModal').hide();
    });

    $('#infoModalCross').click(() => {
        $('#infoModal').hide();
    });

    $('#restartCamModal').on('hidden.bs.modal', () => {
        $('#restartCamModal').find('.modal-body').text(i18next.t('modal.rebootCam.body'));
    });

    $('#restartModal').on('hidden.bs.modal', () => {
        $("#restartModal").find('.modal-body').text(i18next.t('modal.restart.body'));
    });

    $('#loadingModal').on('hidden.bs.modal', () => {
        $('#loadingModalText').text('');
    });

    $('[title]').tooltip({ trigger: 'hover' });

    function resAvailable() {
        let r = 1,
            message = [];	    
        if (systemInfo.driveFree < 10) {
            message.push(i18next.t('modal.info.drive'));
        }
        if (systemInfo.averCpu >= 85) {
            message.push(i18next.t('modal.info.CPU', {CPU: systemInfo.averCpu.toFixed(2)}));
            r = 0;
        }	
        if (systemInfo.memFree < 1) {
            message.push(i18next.t('modal.info.RAM', {RAM: systemInfo.memFree.toFixed(2)}));
            r = 0;
        }
        if (message.length) {
            $('#infoModal').find('.modal-body').html(
                (r ? '' : (i18next.t('modal.info.addDevice') + '<br>')) 
                + message.join('<br>') 
                + (r ? '' : ('<br>' + i18next.t('modal.info.closeApps')))
            );
            $('#infoModal').modal('show');
        }
        return {status: r, length: message.length};
    }
    $('#scanCam').click(() => {
        let res = resAvailable();
        if (res.status) {
            if (res.length) {
                $('#infoModal').on('hidden.bs.modal', () => {
                    $('#scanCamModal').modal('show');
                    $('#infoModal').off('hidden.bs.modal');
                });
            }
            else $('#scanCamModal').modal('show');
        }
        else return;
    });

    $('#addCam').click(() => {
        let res = resAvailable();
        if (res.status) {
            if (res.length) {
                $('#infoModal').on('hidden.bs.modal', () => {
                    $('#addCamModal').modal('show');
                    $('#infoModal').off('hidden.bs.modal');
                });
            }
            else $('#addCamModal').modal('show');
        }
        else return;
    });

    $('#addCamModal').on('hidden.bs.modal', function () {
        $('#inputDeviceNameDiv').hide();
        $('#inputIPAdressDeviceDiv').hide();
        $('#inputIDDeviceDiv').hide();
        $('#inputLoginDeviceDiv').hide();
        $('#inputPasswordDeviceDiv').hide();
        $('#inputTrassirPublicDiv').hide();
        $('#inputTokenDeviceDiv').hide();
        $(this).find('form')[0].reset();
    });

    $('#scanCamModal').on('hidden.bs.modal', function () {
        $('#scanInputDeviceDiv').hide();
        $('#scanInputDeviceNameDiv').hide();
        $('#scanInputIPAdressDeviceDiv').hide();
        $('#scanInputLoginDeviceDiv').hide();
        $('#scanInputPasswordDeviceDiv').hide();
        $('#scanInputTokenDeviceDiv').hide();
        $('#scanInputDeviceTypeDiv').hide();
        $('#loaderGif').hide();
        $('#addScanCamM').hide();
        $('#scanReady').show();
        $('#scanReady')
            .text(i18next.t('modal.scanDevices.scanReady'))
            .attr('data-i18n','modal.scanDevices.scanReady');   
        $('#scanDevice').find('option').not(':first').remove();
        $(this).find('form')[0].reset();
    });

    $('#inputDeviceNameDiv').hide();
    $('#inputIPAdressDeviceDiv').hide();
    $('#inputIDDeviceDiv').hide();
    $('#inputLoginDeviceDiv').hide();
    $('#inputPasswordDeviceDiv').hide();
    $('#inputTrassirPublicDiv').hide();
    $('#inputTokenDeviceDiv').hide();

    $('#scanInputDeviceDiv').hide();
    $('#scanInputDeviceNameDiv').hide();
    $('#scanInputIPAdressDeviceDiv').hide();
    $('#scanInputLoginDeviceDiv').hide();
    $('#scanInputPasswordDeviceDiv').hide();
    $('#scanInputTokenDeviceDiv').hide();
    $('#scanInputDeviceTypeDiv').hide();
    $('#loaderGif').hide();
    $('#addScanCamM').hide();

    $('#scanDevice').change(() => {
        let devAddr = $('#scanDevice').val();
        let dev = devicesScan.filter(device => { return (device.address == devAddr) })[0];
        $('#scanInputIPAdressDevice').val(decodeURI(devAddr));
        $('#scanInputDeviceName').val(decodeURI(dev.name));
        $('#scanInputDeviceNameDiv').show();
        $('#scanInputIPAdressDeviceDiv').show();
        $('#scanInputLoginDeviceDiv').show();
        $('#scanInputPasswordDeviceDiv').show();
        $('#scanInputDeviceTypeDiv').show();
        $('#scanInputTokenDeviceDiv').hide();
        $('#scanReady').hide();
        validInfo.ip = true;
    })

    $('#inputDevice').change(function () {
        switch ($(this).val()) {
            case i18next.t('modal.addCam.selectDevice'): break;
            case 'TRASSIR Cloud':
                $('#inputDeviceNameDiv').show();
                $('#inputTrassirPublicDiv').show();
                $('#inputIPAdressDeviceDiv').hide();
                $('#inputIDDeviceDiv').hide();
                $('#inputLoginDeviceDiv').hide();
                $('#inputPasswordDeviceDiv').hide();
                $('#inputTokenDeviceDiv').hide();
                break;
            case i18next.t('devices.webcam'):
                $('#inputDeviceNameDiv').show();
                $('#inputIDDeviceDiv').hide();
                $('#inputIPAdressDeviceDiv').hide();
                $('#inputLoginDeviceDiv').hide();
                $('#inputPasswordDeviceDiv').hide();
                $('#inputTokenDeviceDiv').hide();
                $('#inputTrassirPublicDiv').hide();
                break;
            default:
                $('#inputDeviceNameDiv').show();
                $('#inputIPAdressDeviceDiv').show();
                $('#inputLoginDeviceDiv').show();
                $('#inputPasswordDeviceDiv').show();
                $('#inputIDDeviceDiv').hide();
                $('#inputTokenDeviceDiv').hide();
                $('#inputTrassirPublicDiv').hide();
                break;
        }
    });

    function startNode(params) {
        $.ajax({
            type: 'POST',
            url: '/api/v1/Node/Start',
            data: JSON.stringify(params),
            contentType: 'application/json',
            success: function () {
                window.curNodeId = params.id;
                initSettings();
            }
        })
    }

    var devicesScan;

    function fillDevices(devices) {
        let $select = $('#scanDevice');
        $('#scanDevice').find('option').not(':first').remove();
        devices.forEach(device => {
            let option = {};
            option.text = decodeURI(device.name) + ' : ' + device.address;
            option.value = device.address;
            $select.append($("<option />").val(option.value).text(option.text));
        })
    }

    $('#scanCamM').click(() => {
        $.ajax({
            type: 'GET',
            url: '/api/v1/DeviceScanner',
            dataType: 'json',
            beforeSend: function () {
                $('#scanDevice').find('option').not(':first').remove();
                $('#loaderGif').show();
            },
            success: function (json) {
                let devCount;
                if (!json.success) {
                    devCount = 0;
                } else devCount = json.devices.length;
                $('#scanReady')
                    .text(i18next.t('modal.scanDevices.scanDone', {
                        count: devCount
                    }))
                    .attr('data-i18n', 'modal.scanDevices.scanDone')
                    .attr('data-i18n-options', '{count: ' + devCount + '}')
                $('#loaderGif').hide();
                $('#scanReady').show();
                if (devCount > 0) {
                    $('#addScanCamM').show();
                    $('#scanInputDeviceDiv').show();
                    devicesScan = json.devices;
                    fillDevices(json.devices);
                }
            },
        });
    });

    function stopNode(params) {
        $.ajax({
            type: 'POST',
            url: '/api/v1/Node/Stop',
            data: JSON.stringify(params),
            contentType: 'application/json',
            success: function () {
                $('#cam_' + params.id).remove();
                $('#removeCamModal').modal('hide');
                if ($('.camNav .camBtn').length > 0) {
                    $('.camNav .camBtn').first().click();
                }                    
                else {
                    $('#settingsNav').hide();
                }
                initSettings();
            }
        })
    }

    function restartNode(params) {
        $.ajax({
            type: 'POST',
            url: '/api/v1/Node/Restart',
            data: JSON.stringify(params),
            contentType: 'application/json',
            success: function () {
                $('#restartCamModal').modal('hide');
                setTimeout(initSettings, 500);
            }
        })
    }

    $('#addScanCamM').click(() => {
        if (validInfo.ip) {
            $('#scanCamModal').modal('hide');
            let _device = 'None';
            switch ($('#scanInputDevice').val()) {
                case i18next.t('modal.addCam.selectDevice'): break;
                case i18next.t('devices.bewardSeries'): _device = 'Beward'; break;
                case 'Beward (DKS15120)': _device = 'Beward_DKS15120'; break;
                case 'Beward (DKS15122)': _device = 'Beward_DKS15122'; break;
                case 'Beward (DS06M)': _device = 'Beward_DS06M'; break;
                case 'Dahua (VTO2101E-P)': _device = 'Dahua'; break;
                case 'Nateks (FG-ACE-VC-2HD)': _device = 'Nateks'; break;
                case 'TETA (Z3X-2IR-PL)': _device = 'TETA'; break;
                case 'True IP (TI-3611CRW)': _device = 'TrueIP'; break;
            }

            let device = {
                name: $('#scanInputDeviceName').val(),
                url: $('#scanDevice').val(),
                login: $('#scanInputLoginDevice').val(),
                password: $('#scanInputPasswordDevice').val(),
                token: $('#scanInputTokenDevice').val(),
                device: _device
            }

            $.ajax({
                type: 'POST',
                url: '/api/v1/Device/',
                data: JSON.stringify(device),
                contentType: 'application/json',
                success: function (json) {
                    startNode(json);
                    validInfo.ip = false;
                    $('#scanInputIPAdressDevice').removeAttr('style');
                }
            });
        } else {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.wrongIP'));
            $('#infoModal').modal('show');
        }
    });

    var validInfo = {
        ip: false
    }

    $('#addCamM').click(() => {
        if (validInfo.ip ||         
        $('#inputDevice').val() == i18next.t('devices.webcam') ||
        $('#inputDevice').val() == 'TRASSIR Cloud') {
            $("#addCamModal").modal('hide');
            let _device = 'None';
            switch ($('#inputDevice').val()) {
                case i18next.t('modal.addCam.selectDevice'): break;
                case i18next.t('devices.bewardSeries'): _device = 'Beward'; break;
                case 'Beward (DKS15120)': _device = 'Beward_DKS15120'; break;
                case 'Beward (DKS15122)': _device = 'Beward_DKS15122'; break;
                case 'Beward (DS06M)': _device = 'Beward_DS06M'; break;
                case 'Dahua (VTO2101E-P)': _device = 'Dahua'; break;
                case 'Nateks (FG-ACE-VC-2HD)': _device = 'Nateks'; break;
                case 'TETA (Z3X-2IR-PL)': _device = 'TETA'; break;
                case 'TRASSIR Cloud': _device = 'TRASSIR_Cloud'; break;
                case 'True IP (TI-3611CRW)': _device = 'TrueIP'; break;
                case i18next.t('devices.webcam'): _device = 'Webcam'; break;
            }
            let device = {
                name: $('#inputDeviceName').val(),
                url: $('#inputIPAdressDevice').val(),
                deviceID: $('#inputIDDevice').val(),
                login: $('#inputLoginDevice').val(),
                password: $('#inputPasswordDevice').val(),
                token: $('#inputTokenDevice').val(),
                device: _device
            }

            if (_device == 'TRASSIR_Cloud') device.url = $('#inputTrassirPublic').val();

            $.ajax({
                type: 'POST',
                url: '/api/v1/Device/',
                data: JSON.stringify(device),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (json) {
                    startNode(json);
                    validInfo.ip = false;
                    $('#scanInputIPAdressDevice').removeAttr('style');
                }
            });
        }
        else {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.wrongIP'));
            $('#infoModal').modal('show');
        }
    });

    var _x = 46;

    $('#inputIPAdressDevice').keypress((e) => {
        if (e.which != 8 && e.which != 0 && e.which != _x && (e.which < 48 || e.which > 57)) {
            return false;
        }
    }).keyup(() => {
        let pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        if (!pattern.test($('#inputIPAdressDevice').val())) {
            $('#inputIPAdressDevice').css('box-shadow', '0 0 0 0.2rem rgba(255,0,0,.5)');
            while ($('#inputIPAdressDevice').val().indexOf("..") !== -1) {
                $('#inputIPAdressDevice').val($('#inputIPAdressDevice').val().replace('..', '.'));
            }
            validInfo.ip = false;
            _x = 46;
        } else {
            _x = 0;
            if ($('#inputIPAdressDevice').val().substr($('#inputIPAdressDevice').val().length - 1) == '.') {
                $('#inputIPAdressDevice').val($('#inputIPAdressDevice').val().slice(0, -1));
            }
            if ($('#inputIPAdressDevice').val().split('.').length == 4) {
                validInfo.ip = true;
                $('#inputIPAdressDevice').removeAttr('style');
            }
        }
    });


    $('#scanInputIPAdressDevice').keypress((e) => {
        if (e.which != 8 && e.which != 0 && e.which != _x && (e.which < 48 || e.which > 57)) {
            return false;
        }
    }).keyup(() => {
        let pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        if (!pattern.test($('#scanInputIPAdressDevice').val())) {
            $('#scanInputIPAdressDevice').css('box-shadow', '0 0 0 0.2rem rgba(255,0,0,.5)');
            while ($('#scanInputIPAdressDevice').val().indexOf("..") !== -1) {
                $('#scanInputIPAdressDevice').val($('#scanInputIPAdressDevice').val().replace('..', '.'));
            }
            validInfo.ip = false;
            _x = 46;
        } else {
            _x = 0;
            if ($('#scanInputIPAdressDevice').val().substr($('#scanInputIPAdressDevice').val().length - 1) == '.') {
                $('#scanInputIPAdressDevice').val($('#scanInputIPAdressDevice').val().slice(0, -1));
            }
            if ($('#scanInputIPAdressDevice').val().split('.').length == 4) {
                validInfo.ip = true;
                $('#scanInputIPAdressDevice').removeAttr('style');
            }
        }
    });

    $('.removeCamBtn').click(() => {        
        let id = $('.camBtn[active]').parent().attr('id').replace('cam_', '');
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/Device/' + id,
            success: function () {
                stopNode({ id: id })
            }
        });        
    });

    $('.restartCamBtn').click(() => {
        restartNode(params)
    });

    var currentnodeId;

    function updateCamBtn(btn) {
        btn.click(function () {
            $('#cameraLink').tab('show');

            $(".camBtn").removeAttr('active');
            $(this).attr('active', '');
            $('.camBtn[active]').removeClass('btn-outline-primary').addClass('btn-primary');
            $('.camBtn:not([active])').removeClass('btn-primary').addClass('btn-outline-primary');
            $('.preview').removeClass('btn-primary').addClass('btn-outline-primary');
            let nodeId = currentnodeId = $(this).parent().attr('id').split('_')[1];
            try {
                socket.send(JSON.stringify({ action: 'changeCam', data: nodeId }));
            } catch (e) {
                console.error(e)
            };

            $('#removeCam').prop('disabled', false)
            $('#restartCam').prop('disabled', false)
            $('#settingsLink').removeClass('disabled');

            $('#removeCam')
                .attr('data-original-title',  i18next.t('header.left.removeD', {
                    device: $(this).text()
                }))
                .attr('data-i18n-options', '{"device":"' + $(this).text() + '"}')
                .attr('data-i18n', '[data-original-title]header.left.removeD')
                .data({ 'i18n-options': {
                    device: $(this).text()
                }});

            $('#restartCam')
                .attr('data-original-title', i18next.t('header.left.rebootD', {
                    device: $(this).text()
                }))
                .attr('data-i18n-options', '{"device":"' + $(this).text() + '"}')
                .attr('data-i18n', '[data-original-title]header.left.rebootD')
                .data({ 'i18n-options': {
                    device: $(this).text()
                }});

            let data_url = $(this).parent().attr('data-url');

            $('#videoCam').attr('src', "");
            setTimeout(function () {
                $('#videoCam').attr('src', data_url);
            }, 0);
            params = {}
            reloadSettings(nodeId)
        })
    };

    $('#inputStorageVideo').keypress((e) => {
        if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
            e.preventDefault();
        }
    });

    $('#commonSettings').click(() => {
        initCommonSettings();
        $('#commonSettingsModal').modal('show');
     });

    $('#changeSettings').click(() => {
        if (!$('#inputStorageVideo').val()) {
            $('#infoModal').find('.modal-body').html(
                i18next.t('modal.info.wrongParams')
            );
            $('#infoModal').modal('show');
            $('#inputStorageVideo').val('30');
        }
        else if ($('#inputStorageVideo').val() > 30) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.vidStorMax'));
            $('#infoModal').modal('show');
            $('#inputStorageVideo').val('30');
        }
        else if ($('#inputStorageVideo').val() <= 0) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.vidStorMin'));
            $('#infoModal').modal('show');
            $('#inputStorageVideo').val('30');
        }
        else if ($('#enableNAT').prop('checked') && ($('#inputNATExternalPort').val() <= 1024 || $('#inputNATExternalPort').val() > 65535) || isNaN($('#inputNATExternalPort').val())) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.wrongExtPort')); 
            $('#infoModal').modal('show');
            $('#inputNATExternalPort').val('');
        }
        else if ($('#inputUPnPDeviceName').val().length == 0) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.noUPnPName'));
            $('#infoModal').modal('show');
            $('#inputUPnPDeviceName').val('eVision');
        }
        else if ($('#enableUPnP').prop('checked') && !window.iface) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.notSelectedIface'));
            $('#infoModal').modal('show');
        }
        else {            
            let settings = {
                storage: {
                    video: $('#inputStorageVideo').val()
                },
                nat: {
                    enable: $('#enableNAT').prop('checked'),
                    externalPort: $('#inputNATExternalPort').val()
                },
                upnp: {
                    enable: $('#enableUPnP').prop('checked'),
                    deviceName: $('#inputUPnPDeviceName').val(),
                    iface: window.iface
                }                
            }
            saveParams(settings, true);
        }
    });

    $('#changeSettings').on('hidden.bs.modal', function () {
        $(this).find('form')[0].reset();
    });

    $('#datepicker-archive').on('apply.daterangepicker', function (e, picker) {
        let startDate = picker.startDate._d.getTime();
        let endDate = picker.endDate._d.getTime();
        let sourceId = $('#videoSourceSelector').selectpicker('val');
        createTimeline(sourceId, window.lang, startDate, endDate);
    });

    $('#videoSourceSelector').on('changed.bs.select', (e) => {
        let startDate = $('#datepicker-archive').data('daterangepicker').startDate._d.getTime();
        let endDate = $('#datepicker-archive').data('daterangepicker').endDate._d.getTime();
        let sourceId = e.target.value;
        createTimeline(sourceId, window.lang, startDate, endDate);
    });

    $('#networkUPnPSelector').on('changed.bs.select', (e) => {
        window.iface = e.target.value;
    });

    $('#cameraLink').click(() => {
        $('#videoCam').attr('src', $('#videoCam').attr('src'));
    });

    $('#settings-MN').on('changed.bs.select', (e) => {
        let selected = e.target.value;
        $('.MN-custom').hide().find('input, select').prop('disabled', true);
        function sEnable(el) {
            el.show().find('input, select').prop('disabled', false);
        }
        switch (selected) {
            case 'phrase':
                sEnable($('#settings-MNPhrase'));
                break;
            case 'file':
            default:
                sEnable($('#settings-MNAudio'));
                break;
        }
    });

    $('#settings-device').on('changed.bs.select', (e) => {
        let selected = e.target.value;
        let el = $('.device-custom')
        el.hide();
        el.find('input').prop('disabled', true)
        el.find('select').addClass('disabled').prop('disabled', true).selectpicker('refresh');
        function sEnable(el) {
            el.find('input').prop('disabled', false);
            el.find('.bootstrap-select').removeClass('disabled');
            el.find('select').removeClass('disabled').prop('disabled', false).selectpicker('refresh');
            el.show();
        }
        switch (selected) {
            case 'Beward':
            case 'TETA':
                sEnable($('#settings-url'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                sEnable($('#settings-token'));
                break;
            case 'Beward_DKS15120':
                sEnable($('#settings-url'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                sEnable($('#settings-time'));
                break;
            case 'Beward_DKS15122':
            case 'Dahua':
            case 'TrueIP':
            case 'Nateks':
                sEnable($('#settings-url'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                break;
            case 'Rodos':
                sEnable($('#settings-url'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                sEnable($('#settings-channel'));
                sEnable($('#settings-time'));
                break;
            case 'SIGUR':
                sEnable($('#settings-url'));
                sEnable($('#settings-port'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                sEnable($('#settings-id'));
                sEnable($('#settings-direction'));
                break; 
            default:
                sEnable($('#settings-url'));
                sEnable($('#settings-login'));
                sEnable($('#settings-password'));
                break;
        }
    });

    $('#regDevice').click((e) => {
        e.preventDefault();
        window.open('http://cloud.evision.tech?key=' + params.id + '&address=' + params.device.name, '_blank');
    });

    $('#settings-form').submit(function(e) {
        e.preventDefault();
        saveSettings($('#settings-form'), curNodeId);
    });

    $(".custom-file-input").on('change', function() {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
    });

    
    //Audio notification duration
    $('#inputMotionAudioNotification').on('input', e => {
        let input = e.currentTarget;
        let file = input.files[0];
        if (file.type.match('audio.*')) {
            let audioElement = document.createElement('audio');
            audioElement.src = URL.createObjectURL(file);
            audioElement.oncanplaythrough = e => {
                let time = audioElement.duration;
                if (time > 5) {
                    input.value = '';
                    let $label = $('label[for="'+ input.id +'"]');
                    $label
                        .text(i18next.t($label.attr('data-i18n')))
                        .removeClass('selected');
                    $('#infoModal').find('.modal-body').html(i18next.t('modal.info.audioSize'));
                    $('#infoModal').modal('show');
                }
            }
        }
    });

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var socket;
    
    function tts(text, speaker, cb) {
        var audioFileUrl = 'https://tts.voicetech.yandex.net/tts?speaker=' + (speaker || 'omazh') + '&format=mp3&lang=ru_RU&text=' + text;
        try {
            var reReadItem = JSON.parse(localStorage.getItem('cache_' + audioFileUrl));
            if (cb) cb(reReadItem.src)
            return;
        } catch (e) { };

        fetch(audioFileUrl)
            .then(function (res) {
                res.blob().then(function (blob) {
                    var size = blob.size;
                    var type = blob.type;
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function () {
                        var base64FileData = reader.result.toString();
                        var mediaFile = {
                            fileUrl: audioFileUrl,
                            size: blob.size,
                            type: blob.type,
                            src: base64FileData
                        };
                        // save the file info to localStorage
                        localStorage.setItem('cache_' + audioFileUrl, JSON.stringify(mediaFile));
                        if (cb) cb(mediaFile.src)
                    });
                    reader.readAsDataURL(blob);
                });
            });
    }

    const audioControl = document.getElementById('audio');
    window.audioBusy = false;

    audioControl.onended = function() {
        window.audioBusy = false;
        //console.log("The audio has ended");
    };

    function actionNotif(phrase) {
        if (window.audioBusy) return;
        window.audioBusy = true;
        if (/mp3$/.test(phrase)) 
            audioControl.src = '/media/'+ phrase + '?t=' + new Date().getTime();
        else     
            tts(phrase, 'omazh', function (src) { audioControl.src = src })
    }
    
	const socketOpenListener = (e) => {
        console.log('Connected');

        if (window.restartOnConnect) 
			setTimeout(function() { location.reload(true); }, 100);
		else 
			setTimeout(function() { $('#videoCam').attr('src', $('#videoCam').attr('src')); }, 2000);
	};

	const socketCloseListener = (e) => {
		if (socket) {
			console.error('Disconnected.');
        }

        let host = window.document.location.host.replace(/:.*/, '');
        let port = window.document.location.port;
        let protocol = 'ws' + (window.document.location.protocol == 'https:' ? 's' : '');
        
    	socket = new WebSocket(protocol + '://' + host + (port ? ':' + port : '') + window.document.location.pathname);
		socket.addEventListener('open', socketOpenListener);
		socket.addEventListener('message', socketMessageListener);
		socket.addEventListener('close', function(){ setTimeout(socketCloseListener.bind(this), 500) });
	};

	socketCloseListener();
    	
    $('#restartModal a').on('click', (e) => {
        window.restartOnConnect = true;
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/v1/Restart',
            dataType: 'json',
            success: function () {
                $('#restartModal').modal('hide');
                $('#loadingModal').modal('show');
            }
        })
    })

    var detectionTimeout;

    var systemInfo = {};
    var timeoutWarning, timeoutDanger;

    function socketMessageListener(message) {
        if (typeof message.data == 'string') {
            var data = message.data.split('|');
            var text = data[0];

            if (text == 'movement') {
                clearTimeout(detectionTimeout);
                if (params.motionDetection && params.motionDetection.enable && params.id == data[1])
                    $('#videoCam').css('outline', '3px solid red');
                else
                    $('#videoCam').css('outline', 'none');
                detectionTimeout = setTimeout(function () {
                    $('#videoCam').css('outline', 'none');
                }, 5000);
                return;
            }
            if (text == 'actionOpen') return actionOpen(data[1]);
            if (text == 'actionShow') return actionShow(data[1]);
            if (text == 'actionNotif') return actionNotif(data[1]);            
            if (text == 'closeWaitModal') return $('#loadingModal').modal('hide');
            if (text == 'sysInfo') {
                function toggle($el, value) {
                    if (value > 75 && value < 90) {
                        $el.removeClass('text-success');
                        $el.removeClass('text-danger');
                        $el.addClass('text-warning');
                    } else if (value >= 90) {
                        $el.removeClass('text-success');
                        $el.removeClass('text-warning');
                        $el.addClass('text-danger');
                    } else {
                        $el.removeClass('text-warning');
                        $el.removeClass('text-danger');
                        $el.addClass('text-success');
                    }
                }

                function bytesToSize(a, b) { if (0 == a) return "0 Bytes"; let c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] }

                function pad(n) {
                    return ('0' + n).slice(-2);
                }

                let sysInfo = JSON.parse(data[1]);

                let cpu = sysInfo.currentLoad;

                let averCpu = Math.round(cpu.currentload);
                $('#cpuUsage').html('<b>CPU:</b> ' + averCpu + '%');
                systemInfo.averCpu = averCpu;

                let title = '';
                for (let i = 0; i < cpu.cpus.length; i++) {
                    let aver = Math.round(cpu.cpus[i].load);
                    title += 'CPU' + pad(i) + ': ' + aver + '%\n';
                }
                $('#cpuUsage').attr('title', title);

                toggle($('#cpuUsage'), averCpu);

                let mem = sysInfo.mem;
                systemInfo.memFree = (mem.total - (mem.used - mem.buffcache)) / (1024 * 1024 * 1024);

                let memUsed = Math.round(((mem.used - mem.buffcache) / mem.total * 100));
                $('#memUsage').html('<b>MEM:</b> ' + memUsed + '%');

                title = bytesToSize(mem.used - mem.buffcache) + ' / ' + bytesToSize(mem.total);
                $('#memUsage').attr('title', title);

                toggle($('#memUsage'), memUsed);

                let fs = sysInfo.fsSize;
                systemInfo.driveFree = (fs[0].size - fs[0].used) / (1024 * 1024 * 1024);

                let driveUsed = Math.round(fs[0].use);
                $('#driveUsage').html('<b>HDD:</b> ' + driveUsed + '%');

                title = bytesToSize(fs[0].used) + ' / ' + bytesToSize(fs[0].size);
                $('#driveUsage').attr('title', title);

                toggle($('#driveUsage'), driveUsed);
                if (!timeoutWarning || !timeoutDanger) {
                    let level = (curLvl, value) => value > 70 ? value >= 90 ? 1 : curLvl < 0 ? 0 : curLvl : curLvl,
                        msg = [],
                        lvl = -1;
                    if (driveUsed > 70) {
                        lvl = level(lvl, driveUsed);
                        msg.push(i18next.t('modal.systemRes.drive', {drive: driveUsed}));
                    }
                    if (averCpu > 70) {
                        lvl = level(lvl, averCpu);
                        msg.push(i18next.t('modal.systemRes.CPU', {CPU: averCpu}));
                    }
                    if (memUsed > 70) {
                        lvl = level(lvl, memUsed);
                        msg.push(i18next.t('modal.systemRes.RAM', {RAM: memUsed}));
                    }
                    if (msg.length && (lvl == 0 && !timeoutWarning || lvl == 1 && !timeoutDanger)) {
                        $('#systemResModal').find('.modal-body').html(
                            (lvl ? i18next.t('modal.systemRes.danger') + '<br>' : '')
                            + msg.join('<br>')
                            + '<br>' + i18next.t('modal.systemRes.closeApps')
                        );
                        if (lvl == 0)
                            timeoutWarning = setTimeout(() => timeoutWarning = 0, 14400000);
                        else if (lvl == 1)
                            timeoutDanger = setTimeout(() => timeoutDanger = 0, 14400000);
                        $('#systemResModal').modal('show');
                    }
                }

                $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
                return
            }
                
            $('#infoModal').find('.modal-body').html(text);
            $('#infoModal').modal('show');

            return;
        }
        try {
            let data = JSON.parse(message.data);
            console.log(data);
        } catch (e) { }
    }
    
    var detectionTimeout;

    var params = {};

    window.save = function () {
        $('#infoModal').modal('hide');
        saveParams(params, true);
    };

    function setSize() {
        let height = window.innerHeight;
        
        let w = window.matchMedia('(max-width: 767px)').matches
        $('#videoContainer').height(height - (w ? 87 : 159));
        $('.bd-settings').height(height - (w ? 137 : 207));
        $('#usersTbl').bootstrapTable('resetView', { height: height - (w ? 137 : 207) });
        $('#videoPlayer1').height(height - (w ? 378 : 371));
    }

    $(window).on('resize touchmove', setSize)
    setSize();

    function setValue(object, path, value) {
        path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, '');
        let keys = path.split('.'),
            last = keys.pop();
    
        keys.reduce((o, k) => { return o[k] = o[k] || {}; }, object)[last] = value;
    }

    function serializeForm(form) {
        let obj = {};
        form.find('[name]:not(:disabled)')
            .each(function(_, el) {
                obj[el.name] = el.type == 'checkbox'
                    ? el.checked
                    : el.value;
            });
        let new_obj = {};
        for (let k in obj) {
            setValue(new_obj, k, obj[k])
        }
        return new_obj;
    }

    function saveSettings(form, nodeId) {
        let newParams = serializeForm(form);
        if (!newParams.device.type) newParams.device.type = params.device.type || 'None'
        params = Object.assign({}, params, newParams, { id: nodeId });
	    let err = false;
        $('#infoModal').find('.modal-body').text('')
        if ($('#inputMotionAudioNotification')[0].files[0]) {
            if ($('#inputMotionAudioNotification')[0].files[0].type.includes('audio')) {
                uploadAudio($('#inputMotionAudioNotification')[0], { filename: 'motion' })
            } else {
                $('#infoModal').find('.modal-body').append(i18next.t('modal.info.notAudio'));
                err = true;
            }
        }
        if (err) {
            $('#infoModal').modal('show');
            return;
        }
        saveParams(params, true);
    }

    function saveParams(_params, reload) {
        let url = '';
        if (_params.id)
            url = '/api/v1/Device/' + _params.id;
        else
            url = '/api/v1/Settings'

        if (reload)
            $('#loadingModal').modal('show');

        $.ajax({
            type: 'PATCH',
            url: url,
            data: JSON.stringify(_params),
            contentType: 'application/json',
            dataType: 'json',
            success: function (json) {
                $('#loadingModal').modal('hide');
                if (json.success == false) {
                    console.log(json)
                } else if (_params.id) {
                    params = json;
                    if (reload) {
                        $('#restartCamModal').find('.modal-body').html(
                            i18next.t('modal.rebootCam.settings')
                            + '<br>'
                            + i18next.t('modal.rebootCam.body')
                        );
                        $('#restartCamModal').modal('show');
                        let ias = $('img#videoCam').imgAreaSelect({ instance: true });
                            ias.setOptions({ hide: true });
                            ias.update();                        
                    }
                } else {
                    $("#commonSettingsModal").modal('hide');
                    if (reload) {
                        $("#restartModal").find('.modal-body').html(
                            i18next.t('modal.restart.gSettings')
                            + '<br>'
                            + i18next.t('modal.restart.body')
                        );
                        $('#restartModal').modal('show');
                    }
                }
            },
            error: function (e) {
                $('#loadingModal').modal('hide');
                $('#infoModal').find('.modal-body').html(i18next.t('modal.info.error'));
                $('#infoModal').modal('show');
                console.log(e);
            }
        })
    }

    function actionOpen(_id) {
        if (params.id == _id) {
            $('#openBtn').addClass('disabled', true);
            $('#openBtn').toggleClass('btn-success').toggleClass(' btn-danger');
    
            var idInputChanged = "#" + $('#openItem').attr('aria-describedby');
            $(idInputChanged + ' div.tooltip-inner').html(i18next.t('tabs.camera.lockIsOpen'));
            $('#openBtn i').toggleClass('fa-lock').toggleClass(' fa-unlock');
    
            setTimeout(function () {
                $('#openBtn').removeClass('disabled');
                $('#openBtn').toggleClass('btn-success').toggleClass(' btn-danger');
                $(idInputChanged + ' div.tooltip-inner').html(i18next.t('tabs.camera.lockOpen'));
                $('#openBtn i').toggleClass('fa-unlock').toggleClass(' fa-lock');
            }, 2000);
        }
    }

    function actionShow(_id){
		if (!$('body').hasClass("sidenav-toggled")) $('#sidenavToggler').trigger("click");
		$('#cam_' +  _id + ' button').trigger("click");
    }

    function initSettings() {
        $.ajax({
            type: 'GET',
            url: '/api/v1/Device',
            dataType: 'json',
            success: function (json) {
                $('.selectpicker.selectAccess').empty();
                $('.selectpicker.selectGroup').empty();

                $('#navbarResponsive ul.camNav .camBtn').tooltip('dispose');

                $('#navbarResponsive ul.camNav').empty();
                $('#videoSourceSelector').empty();
                if (!json || !json.length) {
                    $('#cameraLink').click();
                    $('#openBtn').hide();
                    $('#removeCam').prop('disabled', true)
                    $('#restartCam').prop('disabled', true)
                    $('.preview').prop('disabled', true)
                    $('#videoCam').attr('src', "//:0");
                    $('#settingsNav').hide();
                    return;
                } else if (json && json.length == 1)  {
                    $('.preview').prop('disabled', true)
                    if (window.role != 'user')
                        $('#settingsNav').show();
                } else {
                    $('.preview').prop('disabled', false)
                    if (window.role != 'user')
                        $('#settingsNav').show();
                }
                json.forEach((item, id) => {
                    let nodeIndx = Number(id) + 1;
                    $('.selectpicker.selectAccess').append('<option value="' + item.id + '">' + (item.device.name || item.id) + '</option>');
                    $('#videoSourceSelector').append('<option value="' + item.id + '">' + (item.device.name || item.id) + '</option>');
                    $('#videoSourceSelector').selectpicker('refresh')
                    $('#navbarResponsive ul.camNav').append(
                        '<li class="nav-item" id="cam_' + item.id + '" data-url="/api/v1/Stream/' + item.id + '">' +
                        '<button class="camBtn new mr-lg-2 btn btn-outline-primary" data-i18n="[data-original-title]tabs.camera.deviceD" title="" data-i18n-options="{device:' + nodeIndx + '}" data-original-title="'
                        + i18next.t('tabs.camera.deviceD', {
                            device: nodeIndx
                        })
                        + '"><i class="fa fa-video-camera"></i><span class="camInfo">'
                        + nodeIndx + '</span></button>' + '</li>');
                    $('.camBtn.new').data({ 'i18n-options': { device: nodeIndx } }).tooltip({ trigger: 'hover' });
                    updateCamBtn($('.camBtn.new'));
                    $('.camBtn.new').removeClass('new');
                })

                setTimeout(function () { 
                    $('.selectpicker.selectAccess').selectpicker('refresh');
                }, 0);

                if (window.curNodeId)
                    $('.camNav').find('#cam_' + window.curNodeId + '>.camBtn').click();
                else 
                    $('.camNav .camBtn').first().click();
            }
        })
    }

    window.onReloadSettings = [];
    function reloadSettings(nodeId) {
        $.ajax({
            type: 'GET',
            url: '/api/v1/Device/' + nodeId,
            dataType: 'json',
            success: function (json) {
                params = {}
                for (let key in json) params[key] = json[key];
                window.curNodeId = params.id;
                if (window.onReloadSettings)
                    window.onReloadSettings.forEach((item) => { if (typeof item === 'function') item(params) });

                if (!params.active && currentnodeId == window.curNodeId) {
                    if (params.videoRecording.enable)
                        $('#videoCamError').html(i18next.t('tabs.camera.disBut'))
                    else
                        $('#videoCamError').html(i18next.t('tabs.camera.dis'))
                    $('#videoCamError').show();
                    $('#videoCam').css('outline', 'none');
                } else {
                    $('#videoCamError').hide();
                    $('#videoCam').css('outline', 'none');
                }

                try {
                    $('#openItem').remove();
                    $('#openBtn').unbind('click');
                    if (params.relay.uri && currentnodeId != 'preview' && params.active) {
                        $('#openBtn').show();
                        $('#videoContainer').append('<div id="openItem" class="text-center" data-placement="bottom"><a class="btn btn-lg btn-success" id="openBtn" data-toggle="tooltip" href="#Open" data-i18n="[data-original-title]tabs.camera.lockOpen" data-original-title="'
                        + i18next.t('tabs.camera.lockOpen') + '" title=""><i class="fa fa-lock"></i></a></div>');
                        $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
                        $('#openBtn').click(() => {
                            actionOpen(params.id);
                            $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
                            $.ajax({
                                url: '/api/v1/Open/' + params.id,
                                success: function (text) {
                                    console.log(text)
                                }
                            });
                        });
                    } else $('#openBtn').hide()

                    setTimeout(() => {
                        let body = i18next.t('tabs.camera.delete');
                        $('#removeCamModal').find('.modal-body').html(body);
                    }, 300);
                    

                    $('#settings-form').trigger('reset');

                    function populator(json, nodes) {
                        $.each(json, (key, value) => {
                            newNodes = nodes ? nodes.slice() : [];
                            newNodes.push(key);
                        
                            if (typeof(value) == 'object') {
                                populator(value, newNodes);
                            } else {
                                let $el = $('#settings-form [name="' + newNodes.join('.') + '"]'),
                                    type = $el.attr('type');
                                switch (type) {
                                    case 'checkbox':
                                        if (value) $el.prop('checked', true);
                                        else $el.prop('checked', false);
                                        break;
                                    case 'radio':
                                        $el.filter('[value="' + value + '"]').attr('checked', 'checked');
                                        break;
                                    default:
                                        $el.val(value);
                                }
                                if ($el.hasClass('selectpicker'))
                                    $el.selectpicker('val', value);
                            }
                        });
                    }

                    if (params.device.type == 'TRASSIR_Cloud')
                        $('#framerateSelector').prop('disabled', true);
                    else
                        $('#framerateSelector').prop('disabled', false);

                    populator(params);

                    $('#settings-form .selectpicker').selectpicker('refresh');
                    $('.settings-range').each(function() {
                        $(this).find('output').val($(this).find('input').val());
                    })

                    if (params.cloud.enable)
                        $('#settings-reg, #settings-camId').show();
                    else 
                        $('#settings-reg, #settings-camId').hide();
                } catch (e) {
                    console.error(e)
                }
            },
            error: function (e) {
                console.error(e);
            }
        });
    }

    function initCommonSettings(cb) {        
        $.ajax({
            type: 'GET',
            url: '/api/v1/Settings',
            dataType: 'json',
            success: function (json) {                
                $('#inputStorageVideo').val(json.storage.video);

                $('#enableNAT').prop('checked', !!json.nat.enable);
                if (!!json.nat.enable) $('#inputNATExternalPort').prop('disabled', true);
                $('#inputNATExternalPort').val(json.nat.externalPort || '');
                $('#inputNATExternalIP').val(json.nat.externalIP || '');

                $('#enableUPnP').prop('checked', !!json.upnp.enable);
                $('#inputUPnPDeviceName').val(json.upnp.deviceName || 'eVision');

                window.lang = json.lang;
                window.theme = json.theme;
                window.version = json.version;
                document.title = 'eVision ' + window.version;                
                $('#curVersion').text(window.version);
                window.platform = json.platform;
                if (json.ifaces.length > 1) {
                    $('#networkUPnPSelectorDiv').show();
                    $("#networkUPnPSelector").empty();
                    json.ifaces.forEach((iface) => {
                        $("#networkUPnPSelector").append('<option value="' + iface.address + '">' + (iface.name || iface.address) + '</option>');
                        $("#networkUPnPSelector").selectpicker('refresh');
                    });
                    if (json.upnp.iface)
                        $('#networkUPnPSelector').selectpicker('val', json.upnp.iface);
                    window.iface = json.upnp.iface || json.ifaces[0].address || false;
                }
                else {
                    window.iface = json.ifaces[0].address;
                    $('#networkUPnPSelectorDiv').hide();
                }
                if (cb) cb();
            }
        })
    }

    $('#editRecordUserForm').on('submit', (e) => {
        e.preventDefault();

        if (!$('.selectRole').selectpicker('val')) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.chooseRole'));
            $('#infoModal').modal('show');
            return;
        }

        if ($('[name="username"]', '#editRecordUserForm').val().trim().length == 0) {
            $('#infoModal').find('.modal-body').html(i18next.t('modal.info.noUsername'));
            $('#infoModal').modal('show');
            return;
        }

        let id = $('[name="id"]', '#editRecordUserForm').val();
        let data = {
            name: $('[name="username"]', '#editRecordUserForm').val(),
            role: $('select', '#editRecordUserForm').val(),
        }

        if ($('[name="password"]', '#editRecordUserForm').val().trim().length > 0) {
            data.password = $('[name="password"]', '#editRecordUserForm').val()
        } else if (!id) data.password = '';

        $.ajax({
            type: !id ? 'POST' : 'PATCH',
            url: '/api/v1/User/' + (!id ? '' : id),
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (json) {
                if (json.error) {
                    if (json.error == 'user_already_exists') {
                        $('#infoModal').find('.modal-body').html(i18next.t('modal.info.userAlreadyExists', {
                            login: data.name
                        }));
                        $('#infoModal').modal('show');
                        return;
                    } else if (json.error == 'edit_last_admin') {
                        $('#infoModal').find('.modal-body').html(i18next.t('modal.info.lastAdminPatch'));                    
                        $('#infoModal').modal('show');
                        return;
                    }
                } else {
                    $("#editRecordUserModal").modal('hide');
                    $("#editRecordUserModalLabel").text(i18next.t('modal.addUser.title'));
                    $('#usersTbl').bootstrapTable('refresh');
                }
            }
        });
    })

    $(document).on('click', '.userForm-submit', (e) => {
        $('#editRecordUserForm').submit();
    });

    $(document).on('click', '.removeSubmitUserBtn', (e) => {
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/User/' + $('#removeModalUser').attr('data-id'),
            success: function (json) {
                $('#removeModalUser').modal('hide');
                $('#usersTbl').bootstrapTable('refresh');
                if (json && json.error) {
                    if (json.error == 'logout') {
                        getStatus();
                    } else if (json.error == 'delete_last_admin') {
                        $('#infoModal').find('.modal-body').html(i18next.t('modal.info.lastAdminDelete'));                    
                        $('#infoModal').modal('show');
                        return;
                    }
                }
            }
        });
    });

    function getStatus(cb) {
        $.ajax({
            url: '/api/v1/Status',
            method: 'GET',
            success: function(json) {
                if (!json.success) {
                    setTimeout(function() { location.reload(true); }, 100);
                    return;
                } else $("#username").text(json.name);

                window.role = json.role;
                if (window.role != 'user') {
                    $('.admin-only').show();

                    $('img#videoCam').imgAreaSelect({
                        handles: true,
                        parent: ('#videoContainer'),
                        onSelectEnd: onSelectEnd,
                        onSelectStart: onSelectStart,
                        onSelectChange: onSelectChange
                    });
                } else {
                    $('.admin-only').remove();
                }

                if (cb) cb()
            }
        });
    }

    function uploadAudio(inputFile, params, cb) {
        let formData = new FormData();
        formData.append("fileData", inputFile.files[0]);
        $.ajax({
            url: '/api/v1/Upload/Audio?' + $.param(params),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        }).done(function (text) {
            $('label.custom-file-label[for=' + inputFile.id + ']').text(i18next.t('settings.voice.notifications.file.i'));
            $(inputFile).val('');
            if (cb) cb(text);
        }).fail(function (text) {
            $('label.custom-file-label[for=' + inputFile.id + ']').text(i18next.t('settings.voice.notifications.file.i'));
            $(inputFile).val('');
            if (cb) cb(text);
        });
    }


    function onSelectStart() {
        $(document).off("mousedown");
        $(".imgareaselect-selection").popover('dispose');
        if (currentnodeId == 'preview') {
            let ias = $('img#videoCam').imgAreaSelect({ instance: true });
                ias.setOptions({ hide: true });
                ias.update();
        }
    }

    function onSelectChange() {
        if ($(".imgareaselect-selection").data("bs.popover"))
        {
            $(".imgareaselect-selection").popover('dispose');
        }
    }

    function onSelectEnd(image, selection) {
        $(document).off("mousedown");
        if (currentnodeId != 'preview')  {
            let cropTooSmall = false;
            function clickHandler(e) {
                let $target = $(e.target);
                let crop = e.data[0];
                if ($(".popover").is(":visible")) {
                    if (
                        $target.closest(".cropApply").length &&
                        !$(".cropApply").is(":disabled")
                    ) {
                        $(".imgareaselect-selection").popover('dispose');
                        $(document).off("mousedown", clickHandler);
                        $('#crop').val(crop);
                        saveSettings($('#settings-form'), curNodeId);
                    } else if (
                        $target.closest(".cropReset").length &&
                        !$(".cropReset").is(":disabled")
                    ) {
                        params.video.crop = "";
                        $(".imgareaselect-selection").popover('dispose');
                        $(document).off("mousedown", clickHandler);
                        $('#crop').val("");
                        saveSettings($('#settings-form'), curNodeId);
                    } else if (
                        !$target.closest(".popover").length ||
                        $target.closest(".close-popover").length
                    ) {
                        $(".imgareaselect-selection").popover('dispose');
                        $(document).off("mousedown", clickHandler);
                        let ias = $('img#videoCam').imgAreaSelect({ instance: true });
                            ias.setOptions({ hide: true });
                            ias.update();
                        return;
                    }
                }
            }
            if (!selection.width || !selection.height) {
                $(".imgareaselect-selection").popover('dispose');
                $(document).off("mousedown");
                let ias = $('img#videoCam').imgAreaSelect({ instance: true });
                    ias.setOptions({ hide: true });
                    ias.update();
                return;
            }
            else {
                let crop = "";
                if (!params.video.crop) {
                    let width = selection.width + '/' + image.width,
                        height = selection.height + '/' + image.height,
                        x1 = selection.x1 + '/' + image.width,
                        y1 = selection.y1 + '/' + image.height;
                    if (selection.width > 1 && selection.height > 1) {
                        crop = width + ':' + height + ':' + x1 + ':' + y1;
                    }
                    else cropTooSmall = true;
                }
                else {
                    let split = params.video.crop.split(/\s*[:\/]\s*/).map(Number),
                        osw = split[0],//old selection.width
                        oiw = split[1],//old image.width
                        osh = split[2],//old selection.height
                        oih = split[3],//old image.height
                        osx = split[4],//old selection.x1
                        osy = split[6],//old selection.y1
                        width = Math.round(selection.width*osw/oiw) + '/' + image.width,
                        height = Math.round(selection.height*osh/oih) + '/' + image.height,
                        x1 = Math.round(selection.x1*osw/oiw+osx) + '/' + image.width,
                        y1 = Math.round(selection.y1*osh/oih+osy) + '/' + image.height;
                    if ( Math.round(selection.width*osw/oiw) > 1 && Math.round(selection.height*osh/oih) > 1) {
                        crop = width + ':' + height + ':' + x1 + ':' + y1;
                    }
                    else cropTooSmall = true;
                }
                $(document).on("mousedown", [crop], clickHandler);
            }
            $(".imgareaselect-selection")
                .popover({
                    html: true,
                    title: i18next.t('tabs.camera.crop') +
                        '<span class="close-popover float-right"><i class="fa fa-times"></i></span>',
                    content: '<div class="text-center"><button class="btn btn-primary cropApply' +
                        (cropTooSmall? " disabled" : "") +
                        '"><i class="fa fa-save"></i> ' + 
                        i18next.t('buttons.apply') + 
                        '</button> <button class="btn btn-danger cropReset' + 
                        (params.video.crop? "" : " disabled") + 
                        '"><i class="fa fa-undo"></i> ' + 
                        i18next.t('buttons.reset') + 
                        '</button></div>'
                });
            $(".imgareaselect-selection").popover("show");
            if (cropTooSmall) $(".cropApply").prop('disabled', true);
            if (!params.video.crop) $(".cropReset").prop('disabled', true);
        }
    }

    $("#rebootLink").on('click', function (e) {
        e.preventDefault();
        $('#restartModal').modal('show');
    })

    $('.ui-widget-overlay').off('click');

    $('.selectpicker').on('rendered.bs.select', function () {
        $('.bootstrap-select')
            .find("[data-original-title]")
            .removeAttr('data-original-title')

        $('.bootstrap-select')
            .find('[title]')
            .removeAttr('title');
    })

    $('.selectpicker').on('changed.bs.select', function () {
        $('.bootstrap-select')
            .find("[data-original-title]")
            .removeAttr('data-original-title')

        $('.bootstrap-select')
            .find('[title]')
            .removeAttr('title');
    })

    function exportData(exportType) {
        $.ajax({
            type: 'POST',
            url: `/api/v1/Export/${exportType}/`,
            xhrFields: {
              responseType: 'blob'
            },
            beforeSend: function() {
              $('#loadingModal').modal('show');
            },
            success: function (data) {
              $('#loadingModal').modal('hide');
              $('#commonSettingsModal').modal('hide');
              let _t = {};
              switch (exportType) {
                case 'Settings':
                    _t.message = i18next.t('modal.info.expSettingsSuccess');
                    _t.file_name = 'evision_settings_export.zip';
                    break;
                case 'Device':
                    _t.message = i18next.t('modal.info.expDevicesSuccess');
                    _t.file_name = 'evision_devices_export.zip';
                    break;
                case 'User':
                    _t.message = i18next.t('modal.info.expUsersSuccess');
                    _t.file_name = 'evision_users_export.zip';
                    break;
              }
              $('#infoModal').find('.modal-body').html(_t.message);
              $('#infoModal').modal('show');
              let a = document.createElement('a');
              let url = window.URL || window.webkitURL;
              let blob = new Blob([data]) || new window.Blob([data]);
              a.href = url.createObjectURL(blob, {type: 'application/zip'});
              a.download = _t.file_name;
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              setTimeout(function() {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);  
              }, 1000);
            }
        });
    }    

    $('#exportSettings').on('click', (e) => {
        exportData('Settings');
    });

    $('#exportDevices').on('click', (e) => {
        exportData('Device');
    });

    $('#exportUsers').on('click', (e) => {
        exportData('User');
    });

    var importType;

    $('#importUpload').on('change', function (e, path) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.files || !this.files[0]) {
          $('#infoModal').find('.modal-body').html(i18next.t('modal.info.chooseFile'));
          $('#infoModal').modal('show');
          return;
        };

        var formData = new FormData();
        formData.append('Import', this.files[0]);
        $.ajax({
            url: `/api/v1/Import/${importType}/`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('#commonSettingsModal').modal('hide');
                $('#loadingModal').modal('show');
            },
            success: function (data) {
                let msg ;
                switch (importType) {
                    case 'Settings':
                        msg = i18next.t('modal.info.impSettingsSuccess');
                        break;
                    case 'Device':
                        msg = i18next.t('modal.info.impDevicesSuccess');
                        break;
                    case 'User':
                        msg = i18next.t('modal.info.impUsersSuccess');
                        break;
                }
                msg = '<p>' + msg + i18next.t('modal.restart.mustRestart') + '</p>' 
                + '<p>' + i18next.t('modal.restart.body') + '</p>';
                $('#loadingModal').modal('hide');
                $("#restartModal").find('.modal-body').html(msg);
                $(this).val('');
                $('#rebootLink').trigger('click');
            },
            error: function (data) {
                let err_msg = '';
                if (JSON.parse(data.responseText).msg = 'bad_arch') err_msg = i18next.t('modal.info.impFailedArch');
                else err_msg = i18next.t('modal.info.impFailed');
                $('#loadingModal').modal('hide');
                $('#infoModal').find('.modal-body').html(err_msg);
                $('#infoModal').modal('show');
                $(this).val('');
            }
        });
    });

    $('#importSettings').on('click', (e) => {
        $("#confirmationModal").find('.modal-body').html(i18next.t('modal.confirm.impSettings'));
        $('#confirmationModal').modal('show');
        importType = 'Settings';
    });

    $('#importDevices').on('click', (e) => {
        $("#confirmationModal").find('.modal-body').html(i18next.t('modal.confirm.impDevices'));
        $('#confirmationModal').modal('show');
        importType = 'Device';
    });

    $('#importUsers').on('click', (e) => {
        $("#confirmationModal").find('.modal-body').html(i18next.t('modal.confirm.impUsers'));
        $('#confirmationModal').modal('show');
        importType = 'User';
    });   

    $('#confirmationModal').on('submit', (e) => {
        $('#confirmationModal').modal('hide');
        $('#importUpload').trigger('click');
    });

    $(document).on('click', '.cform-submit', (e) => {
        $("#confirmationModal").submit();
    });

    $('#toggle-theme').on('click', (e) => {
		$(".bg-dark, .bg-light").toggleClass("bg-dark bg-light");
        $(".navbar-dark, .navbar-light").toggleClass("navbar-dark navbar-light");

        if ($('.navbar').hasClass('navbar-dark'))
            window.theme = "dark"
        else window.theme = "light"
        saveParams({ theme: window.theme })
    });

    function setTheme() {
        if (window.theme == "dark") {
            $('.navbar').addClass('navbar-dark');
            $('.navbar').removeClass('navbar-light');
            $('body').addClass('bg-dark');
            $('body').removeClass('bg-light');
        }
        else if (window.theme == "light") {
            $('.navbar').removeClass('navbar-dark');
            $('.navbar').addClass('navbar-light');
            $('body').removeClass('bg-dark');
            $('body').addClass('bg-light');
        }
    }

    function initLocale(locale) {
        $("html").attr("lang", locale.substring(0, 2));
        $('#locale-menu > .dropdown-item').removeClass('selected');
        $('#locale-menu > .dropdown-item[data-value='+locale+']').addClass('selected');

        i18next.changeLanguage(locale.substring(0, 2));
		$('.navbar').localize();
		$('.content-wrapper').localize();
        $('.modal').localize();

        $('#datepicker-archive').daterangepicker({
			timePicker: true,
			timePicker24Hour: true,
			startDate: moment().startOf('day'),
			endDate: moment().startOf('day').add(24, 'hour'),
			locale: {
				"format": i18next.t('drp.format'),
				"separator": i18next.t('drp.separator'),
				"applyLabel": i18next.t('drp.applyLabel'),
				"cancelLabel": i18next.t('drp.cancelLabel'),
				"fromLabel": i18next.t('drp.fromLabel'),
				"toLabel": i18next.t('drp.toLabel'),
				"customRangeLabel": i18next.t('drp.customRangeLabel'),
				"daysOfWeek": i18next.t('drp.daysOfWeek', { returnObjects: true }),
				"monthNames": i18next.t('drp.monthNames', { returnObjects: true }),
				"firstDay": i18next.t('drp.firstDay')
            }
        });

        $(".selectpicker").selectpicker({
            noneSelectedText: i18next.t('sp.noneSelectedText'),
            noneResultsText: i18next.t('sp.noneResultsText'),
            countSelectedText: i18next.t('sp.countSelectedText'),
            maxOptionsText: i18next.t('sp.maxOptionsText', { returnObjects: true }),
            doneButtonText: i18next.t('sp.doneButtonText'),
            selectAllText: i18next.t('sp.selectAllText'),
            deselectAllText: i18next.t('sp.deselectAllText'),
            multipleSeparator: i18next.t('sp.multipleSeparator')
        }).selectpicker('render').selectpicker('refresh');

        let users = {
            date: 'date',
            name: 'username',
            role: 'role'
        },
        $users = $('#usersTbl');

        for (let key in users) {
            $users.bootstrapTable('updateColumnTitle', {
                field: key,
                title: i18next.t('tabs.users.th.' + users[key]),
            });
        }

        setTimeout(function () {
            $('#usersTbl')
                .bootstrapTable('refreshOptions', { locale: locale })
        }, 0);

        if (window.activeTab == 'videoArchive') {
            $('#videoSourceSelector').selectpicker('val', window.curNodeId);
        }

        window.roles = [
            { role: 'admin', name: i18next.t('roles.admin') },
            { role: 'user', name: i18next.t('roles.user') }
        ]

        $(".selectpicker.selectRole").empty();

        window.roles.forEach((item, id) => {
            $(".selectpicker.selectRole").append('<option value="' + item.role + '">' + (item.name || item.role) + '</option>');
        })

        if (currentnodeId)
            reloadSettings(currentnodeId)
    }
    
    $("#locale-menu > a").click(function() {
        window.lang = $(this).attr('data-value')
        initLocale(window.lang);
        saveParams({ lang: window.lang })
    });
})(jQuery); // End of use strict
