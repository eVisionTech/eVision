(function ($) {
    let theme = window.theme || 'dark'
    let lang = window.lang || 'en-US'

    setTheme();
    initLocal(lang);
    initLocale(lang);

    function setTheme() {
        if (theme == "dark") {
            $('.navbar').addClass('navbar-dark');
            $('.navbar').removeClass('navbar-light');
            $('body').addClass('bg-dark');
            $('body').removeClass('bg-light');
        }
        else if (theme == "light") {
            $('.navbar').removeClass('navbar-dark');
            $('.navbar').addClass('navbar-light');
            $('body').removeClass('bg-dark');
            $('body').addClass('bg-light');
        }
    }

    function initLocale(locale) {
        $("html").attr("lang", locale.substring(0, 2)); 
        $('#locale > [value='+locale+']').attr('selected', true)

        i18next.changeLanguage(locale.substring(0, 2));
		$('body').localize();
    }

    $(document).keypress((e) => {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#loginButton').click()   
        }
    });

    $('#loginButton').on('click', () => {  
        let data = {
            username: $('[name="username"]', '#login-form').val(),
            password: ''
        }
    
        if ($('[name="password"]', '#login-form').val().trim().length > 0) {
            data.password = $('[name="password"]', '#login-form').val()
        }
        
        $.ajax({
            url: '/api/v1/Login',
            method: 'GET',
            data: data,
            success: function (json) {
                if (json.success)
                    window.location.href = '/';
                else if (!json.success && json.message == 'login_fail') {
                    let msg = i18next.t('auth.loginFailed') + '<br>' + i18next.t('auth.loginTriesLeft', {
                        tries: json.tries
                    })
                    $('#error').html(msg);
                    $('#error').show();
                } else if (!json.success && json.message == 'no_tries') {
                    let msg = i18next.t('auth.loginFailedNoTries') + '<br>' + i18next.t('auth.loginNextTry', {
                        timeout: new Date(
                                    json.timeout.toLocaleString(lang, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                                    })
                                ).toLocaleString()
                    });
                    $('#error').html(msg);
                    $('#error').show();
                }
            }
        });  
        return false;
    });
})(jQuery);
