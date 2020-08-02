function initLocal(lang) {
	i18next.init({
		lng: lang.substring(0, 2),
		resources: {
			ru: {
				translation: {
					locale: "ru-RU",
					lcl: "ru",
					auth: {
						title: "eVision Авторизация",
						auth: "Авторизация",
						enterUsername: "Введите имя пользователя",
						enterPassword: "Введите пароль",
						loginFailed: "Введённая пара имя пользователя / пароль неверна.",
						loginFailedNoTries: "Вы истратили все попытки для входа!",
						loginTriesLeft: "Осталось попыток: {{ tries }}",
						loginNextTry: "Следующая попытка будет доступна: {{ timeout }}"
					},
					header: {
						left: {							
							scan: "Сканер устройств",
							reboot: "Перезагрузить устройство",
							rebootD: "Перезагрузить устройство {{device}}",
							add: "Добавить устройство",
							remove: "Удалить устройство",
							removeD: "Удалить устройство {{device}}"
						},
						middle: {
							device: "Устройство"
						},
						right: {
							themeSwitch: "Переключить тему",
							language: "Язык",
							viewCameras: "Просмотр камер",
							settings: "Настройки",
							logOut: "Выйти"
						}
					},
					navbar: {
						camera: "Камера",
						users: "Пользователи",
						settings: "Настройки",
						archive: "Видеоархив",
						restart: "Перезагрузка"
					},
					devices: {
						bewardSeries: "Beward (B серия, DS серия)",
						sigur: "SIGUR (Ростов-Дон IP)",
						webcam: "Веб-камера"
					},
					settings: {
						camera: {
							title: "Камера",
							connection: {
								title: "Подключение",
								activation: "Активация",
								name: {
									l: "Название",
									i: "Введите название камеры"
								},
								url: {
									l: "Сетевой адрес",
									i: "Введите сетевой адрес"
								},
							},
							appearance: {
								title: "Отображение",
								resize: "Разрешение",
								crop: {
									l: "Приближение",
									i: "Введите приближение"
								},
								rate: "Частота кадров"
							},
							ftp: {
								title: "Получение снимков по FTP",
								enable: "Включить",
								port: {
									l: "FTP порт",
									i: "Введите порт FTP"
								}
							},
							motion: {
								title: "Детекция движения",
								enable: "Включить",
								sensitivity: "Чувствительность",
								sValues: {
									max: "Максимальная (по умолчанию)",
									high: "Высокая",
									average: "Средняя",
									low: "Низкая",
									min: "Минимальная",
								}
							}
						},
						archive: {
							title: "Видеоархив",
							recording: {
								title: "Параметры записи",
								enable: "Включить запись видео",
								url: {
									l: "Сетевой адрес",
									i: "Введите сетевой адрес"
								}
							},
						},
						events: {
							title: "События",
							control: {
								title: "Управление событиями",
								timeout: "Интервал событий (сек)",
							},
							lock: {
								title: "Управление замком",
								deviceType: "Тип устройства",
								url: {
									l: "Сетевой адрес",
									i: "Введите сетевой адрес"
								},
								port: {
									l: "Порт",
									i: "Введите порт"
								},
								login: {
									l: "Логин",
									i: "Введите логин"
								},
								password: {
									l: "Пароль",
									i: "Введите пароль"
								},
								id: {
									l: "ID устройства",
									i: "Введите ID"
								},
								channel: "Канал",
								direction: "Направление",
								token: {
									l: "Токен",
									i: "Введите токен"
								},								
								time: "Время открытия замка (сек)"
							},
							schedule: {
								title: "График работы управления доступом",
								hours: "Рабочее время",
								weekends: "Отключать на выходные"
							},
						},
						voice: {
							title: "Голосовой сервис",
							notifications: {
								title: "Голосовые оповещения",
								enable: "Включить",
								motion: {
									title: "Детектор движения",
									enable: "Включить"
								},
								notificationMode: {
									t: "Режим оповещений",
									p: "Фраза",
									f: "Файл"
								},
								file: {
									i: "Аудио файл",
									l: "Выберите файл"
								}
							}
						},
						cloud: {
							title: "Облачный сервис",
							connection: {
								title: "Подключение",
								id: "ID устройства",
								register: {
									l: "Регистрация",
									i: "Зарегистрировать устройство"
								},
								activation: "Активировать"
							}
						},
						save: "Сохранить",
						search: "Поиск..."
					},
					tabs: {
						camera: {
							crop: "Приближение",
							warning: "Данное устройство отключено!",
							lockOpen: "Открыть замок",
							lockIsOpen: "Замок открыт",
							deviceD: "Устройство {{device}}",
							dis: "Просмотр с данного устройства выключен!",
							disBut: "Просмотр с данного устройства выключен, но видеозапись продолжается!",
							delete: "Выберите 'Удалить', если вы готовы удалить устройство"
						},
						settings: {
							header: "Настройки"
						},
						users: {
							header: "Пользователи",
							addNew: "Добавить нового пользователя",
							th: {
								date: "Дата",
								username: "Имя пользователя",
								role: "Роль"
							}
						},
						archive: {
							header: "Видеоархив",
							selectSource: "-- Выберите источник --"
						}
					},
					buttons: {
						login: "Войти",
						close: "Закрыть",
						exit: "Выход",
						cancel: "Отмена",
						apply: "Применить",
						continue: "Продолжить",
						trial: "Попробовать",
						buy: "Купить",
						scan: "Сканировать",
						save: "Сохранить",
						regDevice: "Зарегистрировать устройство",
						add: "Добавить",
						remove: "Удалить",
						reset: "Сбросить",
						ok: "OK",
						addPhoto: "Добавить фотографию"
					},
					db: {
						accessGranted: "Доступ разрешен",
						accessDenied: "Доступ запрещен",
						edit: "Редактировать",
						removeUser: "Удалить пользователя",
						name: "Имя и фамилия",
						imgOpen: "Открыть в новом окне",
					},
					modal: {
						info: {
							title: "Информация",
							singleWebcam: "Невозможно добавить более одной веб-камеры!",
							addDevice: "Невозможно добавить новое устройство!",
							drive: "Пожалуйста, освободите не менее 10 GB на жестком диске для корректной работы приложения.",
							RAM: "Доступно {{RAM}} ГБ оперативной памяти.",
							CPU: "Загрузка процессора составляет {{CPU}}%.",
							closeApps: "Пожалуйста, закройте неиспользуемые в данный момент программы и приложения.",
							getData: "Не удалось получить данные!",
							addDeviceName: "Необходимо ввести имя устройства!",
							wrongIP: "Введен некорректный IP-адрес устройства!",
							wrongParams: "Один или несколько параметров введены не верно!",
							vidStorMax: "Максимальное время хранения видео 30 суток!",
							vidStorMin: "Минимальное время хранения видео 1 сутки!",
							wrongExtPort: "Диапазон допустимых портов от 1024 до 65535!",
							wrongRepPass: "Новый пароль и его подтвержение не совпадают!",
							noUPnPName: "Необходимо дать устройству имя!",
							notSelectedIface: "У вас подключен более чем один сетевой интерфейс! Необходимо выбрать один из них!",
							alrCrop: "В данный момент вы уже используете функцию Crop!",
							expUsersSuccess: "Экспорт базы данных пользователей успешен!",
							expSettingsSuccess: "Экспорт настроек успешен!",
							expDevicesSuccess: "Экспорт устройств успешен!",
							impUsersSuccess: "Импорт базы данных пользователей успешен! ",
							impSettingsSuccess: "Импорт настроек успешен! ",
							impDevicesSuccess: "Импорт устройств успешен! ",
							impFailed: "Импортирование не удалось! Некорректный формат импортируемых данных!",
							impFailedArch: "Импортирование не удалось! Неподдерживаемый формат архива!",
							chooseFile: "Необходимо выбрать файл!",
							error: "Произошла ошибка!",
							unsupported: "Неподдерживаемая платформа!",
							lastAdminDelete: "Невозможно удалить учетную запись последнего администратора!",
							lastAdminPatch: "Невозможно редактировать роль учетной записи последнего администратора!",
							chooseRole: "Необходимо выбрать роль!",
							noUsername: "Необходимо ввести имя пользователя!",
							userAlreadyExists: "Пользователь {{login}} уже существует!",
							notAudio: "Одно из полей 'Выберите файл' содержит не аудио-файл!",
							notImage: "Одно из полей 'Выберите файл' содержит не изображение!",
							logoSize: "Размеры логотипа не должны превышать 200х50!",
							audioSize: "Продолжительность аудио не должна превышать 5 секунд!"
						},
						systemRes: {
							drive: "Использование дискового пространства составляет {{drive}}%.",
							CPU: "Загрузка процессора составляет {{CPU}}%.",
							RAM: "Использование оперативной памяти составляет {{RAM}}%.",
							danger: "Из-за нехватки системных ресурсов могут быть перебои в работе программы.",
							closeApps: "Пожалуйста, закройте неиспользуемые в данный момент программы и приложения."
						},
						logout: {
							title: "Вы уверены?",
							body: "Выберите \"Выход\", если вы готовы завершить текущий сеанс"
						},
						removeCam: {
							title: "Удалить устройство?",
							body: "Выберите \"Удалить\", если вы готовы удалить устройство"
						},
						rebootCam: {
							title: "Перезагрузить устройство?",
							body: "Выберите \"ОК\", если вы готовы перезагрузить устройство",
						},
						saveSettings: {
							title: "Сохранить настройки?",
							body: "Выберите \"ОК\", чтобы сохранить настройки и перезагрузить устройство"							
						},
						restart: {
							title: "Перезагрузка. Вы уверены?",
							body: "Выберите \"ОК\", если вы готовы перезагрузить систему",
							gSettings: "Настройки успешно сохранены!",
							mustRestart: "Для применения изменений необходимо перезагрузить систему."
						},
						removeRecord: {
							user: {
								t: "Удалить пользователя?",
								b: "Выберите \"Удалить\", если вы готовы удалить пользователя"
							}
						},
						addUser: {
							title: "Добавить нового пользователя",
							titleEdit: "Редактировать пользователя",
							role: {
								l: "Роль",
								i: "Выберите роль"
							},
							username: {
								l: "Имя пользователя",
								i: "Введите имя пользователя"
							},
							pass: {
								l: "Новый пароль",
								i: "Введите новый пароль"
							}
						},
						scanDevices: {
							title: "Сканер устройств",
							scanReady: "Чтобы начать сканирование, нажмите \"Сканировать\"!",
							scanDone: "Сканирование завершено! Найдено устройств: {{count}}",
							labelModel: "Модель",
							labelDevice: "Устройство",
							selectDevice: "-- Выберите устройство --",
							selectModel: "-- Выберите модель --",
							name: {
								l: "Имя устройства",
								i: "Введите имя устройства"
							},
							IP: {
								l: "IP-адрес устройства",
								i: "IP-адрес устройства"
							},
							login: {
								l: "Логин доступа",
								i: "Введите логин"
							},
							password: {
								l: "Пароль доступа",
								i: "Введите пароль"
							}
						},
						addCam: {
							title: "Добавить устройство",
							labelDevice: "Устройство",
							selectDevice: "-- Выберите устройство --",
							name: {
								l: "Имя устройства",
								i: "Введите имя устройства"
							},
							IP: {
								l: "IP-адрес устройства",
								i: "Введите IP-адрес устройства"
							},
							ID: {
								l: "ID устройства",
								i: "Введите ID устройства"
							},
							login: {
								l: "Логин доступа",
								i: "Введите логин"
							},
							password: {
								l: "Пароль доступа",
								i: "Введите пароль"
							},
							trassir_public: {
								l: "Ссылка на публичный просмотр устройства",
								i: "Введите ссылку на публичный просмотр устройства"
							}
						},
						gSettings: {
							title: "Изменение настроек",
							auth: "Настройки авторизации",
							time: "Настройки времени хранения",
							video: {
								l: "Время хранения видео (сут.)",
								i: "Время хранения видео"
							},
							NATHeader: "Переадресация портов",
							enableNAT: "Включить переадресацию портов",
							externalIP: "Внешний IP",
							еxternalPort: "Внешний порт",
							enableUPnP: "Включить UPnP",
							deviceName: "Имя устройства",
							interface: "Интерфейс",
							selectInterface: "-- Выберите интерфейс --",
							expimp: "Экспорт/Импорт",
							export: "Экспорт",
							import: "Импорт",
							settings: "Настройки",
							devices: "Устройства",
							users: "База данных пользователей"
						},
						confirm: {
							title: "Подтверждение изменений. Вы уверены?",
							impSettings: "Импортирование настроек полностью заменит текущие настройки. Продолжить?",
							impDevices: "Импортирование устройств полностью заменит текущие устройства. Продолжить?",
							impUsers: "Импортирование базы данных пользователей полностью заменит текущую базу данных. Продолжить?"
						},
						wait: {
							title: "Пожалуйста, подождите..."
						} 
					},
					sp: {
						noneSelectedText: "Ничего не выбрано",
						noneResultsText: "Совпадений не найдено {0}",
						countSelectedText: "Выбрано {0} из {1}",
						maxOptionsText: [
							"Достигнут предел ({n} {var} максимум)", 
							"Достигнут предел в группе ({n} {var} максимум)", 
							[
								"шт.", 
								"шт."
							]
						],
						doneButtonText: "Закрыть",
						selectAllText: "Выбрать все",
						deselectAllText: "Отменить все",
						multipleSeparator: ", "
					},
					drp: {
						dayformat: "DD/MM/YY",
						format: "HH:mm DD/MM/YY",
						separator: " - ",
						applyLabel: "Применить",
						cancelLabel: "Отмена",
						fromLabel: "От",
						toLabel: "До",
						customRangeLabel: "Свой",
						daysOfWeek: [
							"Вс",
							"Пн",
							"Вт",
							"Ср",
							"Чт",
							"Пт",
							"Сб"
						],
						monthNames: [
							"Январь",
							"Февраль",
							"Март",
							"Апрель",
							"Май",
							"Июнь",
							"Июль",
							"Август",
							"Сентябрь",
							"Октябрь",
							"Ноябрь",
							"Декабрь"
						],
						firstDay: 1
					},
					roles: {
						admin: "Администратор",
						user: "Пользователь"
					}
				}
			},
			en: {
				translation: {
					locale: "en-US",
					lcl: "en",
					auth: {
						title: "eVision Authorization",
						auth: "Authorization",
						enterUsername: "Enter username",
						enterPassword: "Enter password",
						loginFailed: "The entered username / password pair is incorrect.",
						loginFailedNoTries: "You have spent all attempts to enter!",
						loginTriesLeft: "Attempts left: {{ tries }}",
						loginNextTry: "The next attempt will be available: {{ timeout }}"
					},
					header: {
						left: {
							scan: "Device scan",
							reboot: "Reboot device",
							rebootD: "Reboot device {{device}}",
							add: "Add device",
							remove: "Remove device",
							removeD: "Remove device {{device}}"
						},
						middle: {
							device: "Device"
						},
						right: {
							themeSwitch: "Switch theme",
							language: "Language",
							viewCameras: "View cameras",
							settings: "Settings",
							logOut: "Log out"
						}
					},
					navbar: {
						camera: "Camera",
						users: "Users",
						settings: "Settings",
						archive: "Video archive",
						restart: "Restart"
					},
					devices: {
						bewardSeries: "Beward (B series, DS series)",
						sigur: "SIGUR (Rostov-Don IP)",
						webcam: "Webcam"
					},
					settings: {
						camera: {
							title: "Camera",
							connection: {
								title: "Connection",
								activation: "Activation",
								name: {
									l: "Name",
									i: "Enter camera name"
								},
								url: {
									l: "Network address",
									i: "Enter network address"
								},
							},
							appearance: {
								title: "Appearance",
								resize: "Resize",
								crop: {
									l: "Crop",
									i: "Enter crop"
								},
								rate: "Framerate"
							},
							ftp: {
								title: "Receiving images via FTP",
								enable: "Enable",
								port: {
									l: "FTP port",
									i: "Enter FTP port"
								}
							},
							motion: {
								title: "Motion detection",
								enable: "Enable",
								sensitivity: "Sensitivity",
								sValues: {
									max: "Maximum (default)",
									high: "High",
									average: "Average",
									low: "Low",
									min: "Minimum",
								}
							}
						},
						archive: {
							title: "Video archive",
							recording: {
								title: "Recording",
								enable: "Enable video recording",
								url: {
									l: "Network address",
									i: "Enter network address"
								}
							},
						},
						events: {
							title: "Events",
							control: {
								title: "Event control",
								timeout: "Event timeout (sec)",
							},
							lock: {
								title: "Lock control",
								deviceType: "Device type",
								url: {
									l: "Network address",
									i: "Enter network address"
								},
								port: {
									l: "Port",
									i: "Enter port"
								},
								login: {
									l: "Login",
									i: "Enter login"
								},
								password: {
									l: "Password",
									i: "Enter password"
								},
								id: {
									l: "Device ID",
									i: "Enter ID"
								},
								channel: "Channel",
								direction: "Direction",
								token: {
									l: "Token",
									i: "Enter token"
								},								
								time: "Unlock time (sec)"
							},
							schedule: {
								title: "Access control schedule",
								hours: "Working hours",
								weekends: "Disable on weekends"
							},
						},
						voice: {
							title: "Voice service",
							notifications: {
								title: "Voice notifications",
								enable: "Enable",
								motion: {
									title: "Motion detector",
									enable: "Enable"
								},
								notificationMode: {
									t: "Notification mode",
									p: "Phrase",
									f: "File"
								},
								file: {
									i: "Audio file",
									l: "Select file"
								}
							}
						},
						cloud: {
							title: "Cloud service",
							connection: {
								title: "Connection",
								id: "Device ID",
								register: {
									l: "Registration",
									i: "Register device"
								},
								activation: "Activation"
							}
						},
						save: "Save settings",
						search: "Search..."
					},
					tabs: {
						camera: {
							crop: "Crop",
							warning: "This device is disabled!",
							lockOpen: "Open lock",
							lockIsOpen: "Lock is open",
							deviceD: "Device {{device}}",
							dis: "Viewing disabled!",
							disBut: "Viewing disabled, but recording continues!",
							delete: "Select \"Remove\" when you are ready to remove the device",
						},
						settings: {
							header: "Setting"
						},
						users: {
							header: "Users",
							addNew: "Add new user",
							th: {
								date: "Date",
								username: "Username",
								role: "Role"
							}
						},
						archive: {
							header: "Video archive",
							selectSource: "-- Select source --"
						}
					},
					buttons: {
						login: "Login",
						close: "Close",
						exit: "Logout",
						cancel: "Cancel",
						apply: "Apply",
						continue: "Continue",
						trial: "Trial",
						buy: "Buy",
						scan: "Scan",
						save: "Save",
						regDevice: "Register device",
						add: "Add",
						remove: "Remove",
						reset: "Reset",
						ok: "OK",
						addPhoto: "Add photo"
					},
					db: {
						accessGranted: "Access granted",
						accessDenied: "Access denied",
						edit: "Edit",
						removeUser: "Remove user",
						name: "Name",
						imgOpen: "Open in a new window",
					},
					modal: {
						info: {
							title: "Information",
							singleWebcam: "Unable to add more than one webcam!",
							addDevice: "Unable to add new device!",
							drive: "Please free at least 10 GB of hard disk space for the application to work correctly.",
							RAM: "{{RAM}} GB RAM available.",
							CPU: "CPU usage is {{CPU}}%.",
							closeApps: "Please close currently unused programs and applications.",
							getData: "Failed to get data!",
							addDeviceName: "Device name is required!",
							wrongIP: "Incorrect device IP entered!",
							wrongParams: "One or more parameters entered incorrectly!",
							alrCrop: "You are already using the Crop function!",
							expUsersSuccess: "Users database exported successfully!",
							expSettingsSuccess: "Settings exported successfully!",
							expDevicesSuccess: "Devices exported successfully!",
							impUsersSuccess: "Users database imported successfully! ",
							impSettingsSuccess: "Settings imported successfully! ",
							impDevicesSuccess: "Devices imported successfully! ",
							impFailed: "Import failed! Incorrect format of imported data!",
							impFailedArch: "Import failed! Unsupported format of archive!",
							chooseFile: "You must select a file!",
							error: "An error occured!",
							unsupported: "Unsupported platform!",
							lastAdminDelete: "Unable to delete last administrator account!",
							lastAdminPatch: "Unable to edit role of last administrator account!",
							chooseRole: "You must select a role!",
							noUsername: "You must enter a username!",
							userAlreadyExists: "User {{login}} already exists!",
							notAudio: "One of the 'Select File' fields does not contain an audio file!",
							notImage: "One of the 'Select File' fields does not contain an image file!",
							logoSize: "The size of the logo must not exceed 200x50!",
							audioSize: "The duration of the audio must not exceed 5 seconds!"
						},
						systemRes: {
							drive: "Disk space usage is {{drive}}%.",
							CPU: "CPU usage is {{CPU}}%.",
							RAM: "Memory usage is {{RAM}}%.",
							danger: "Due to the lack of system resources, program malfunctions are possible.",
							closeApps: "Please close currently unused programs and applications."
						},
						logout: {
							title: "Are you sure?",
							body: "Select \"Logout\" when you are ready to end the current session"
						},
						removeCam: {
							title: "Remove device?",
							body: "Select \"Remove\" when you are ready to remove the device"
						},
						rebootCam: {
							title: "Reboot device?",
							body: "Select \"ОК\" when you are ready to reboot the device"
						},
						saveSettings: {
							title: "Save settings?",
							body: "Select \"ОК\" to save settings and reboot the device"
						},
						restart: {
							title: "Restarting. Are you sure?",
							body: "Select \"ОК\" when you are ready to restart the application",
							gSettings: "Settings saved successfully!",
							mustRestart: "You must restart the system to apply the changes."
						},
						removeRecord: {
							user: {
								t: "Remove user?",
								b: "Select \"Remove\" when you are ready to remove the user"
							}
						},
						addUser: {
							title: "Add new user",
							titleEdit: "Edit user",
							role: {
								l: "Role",
								i: "Choose role"
							},
							username: {
								l: "Username",
								i: "Enter username"
							},
							pass: {
								l: "Password",
								i: "Enter password"
							}
						},
						scanDevices: {
							title: "Device scanner",
							scanReady: "To start scanning, click \"Scan\"!",
							scanDone: "Scan completed! Devices found: {{count}}",
							labelModel: "Model",
							labelDevice: "Device",
							selectDevice: "-- Select device --",
							selectModel: "-- Select model --",
							name: {
								l: "Device name",
								i: "Enter device name"
							},
							IP: {
								l: "Device IP",
								i: "Enter device IP"
							},
							login: {
								l: "Login",
								i: "Enter login"
							},
							password: {
								l: "Password",
								i: "Enter password"
							}
						},
						addCam: {
							title: "Add device",
							labelDevice: "Device",
							selectDevice: "-- Select device --",
							name: {
								l: "Device name",
								i: "Enter device name"
							},
							IP: {
								l: "Device IP",
								i: "Enter device IP"
							},
							ID: {
								l: "Device ID",
								i: "Enter device ID"
							},
							login: {
								l: "Login",
								i: "Enter login"
							},
							password: {
								l: "Password",
								i: "Enter password"
							},
							trassir_public: {
								l: "Link to public viewing of device",
								i: "Enter link to public viewing of device"
							}
						},
						gSettings: {
							title: "Change settings",
							auth: "Authorization settings",
							time: "Storage time settings",
							video: {
								l: "Video storage time (days)",
								i: "Video storage time"
							},
							NATHeader: "Port forwarding",
							enableNAT: "Enable port forwarding",
							externalIP: "External IP",
							еxternalPort: "External Port",
							enableUPnP: "Enable UPnP",
							deviceName: "Device name",
							interface: "Interface",
							selectInterface: "-- Select interface --",
							expimp: "Export/Import",
							export: "Export",
							import: "Import",
							settings: "Settings",
							devices: "Devices",
							users: "Users database"
						},
						confirm: {
							title: "Confirm changes. Are you sure?",
							impSettings: "Importing settings will completely replace the current settings. Continue?",
							impDevices: "Importing devices will completely replace the current devices. Continue?",
							impUsers: "Importing a users database will completely replace the current database. Continue?"
						},
						wait: {
							title: "Please wait..."
						} 
					},
					sp: {
						noneSelectedText: "Nothing selected",
						noneResultsText: "No results match {0}",
						countSelectedText: "Selected {0} from {1}",
						maxOptionsText: [
							"Limit reached ({n} {var} max)", 
							"Group limit reached ({n} {var} max)", 
							[
								"items", 
								"items"
							]
						],
						doneButtonText: "Close",
						selectAllText: "Select All",
						deselectAllText: "Deselect All",
						multipleSeparator: ", "
					},
					drp: {
						dayformat: "MM/DD/YY",
						format: "HH:mm MM/DD/YY",
						separator: " - ",
						applyLabel: "Apply",
						cancelLabel: "Cancel",
						fromLabel: "From",
						toLabel: "To",
						customRangeLabel: "Custom",
						daysOfWeek: [
							"Su",
							"Mo",
							"Tu",
							"We",
							"Th",
							"Fr",
							"Sa"
						],
						monthNames: [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December"
						],
						firstDay: 0
					},
					roles: {
						admin: "Administrator",
						user: "User"
					}
				}
			}
		}
	}, function (err, t) {
		jqueryI18next.init(i18next, $, {
			optionsAttr: 'i18n-options',
			useOptionsAttr: true
		});
	});
}
