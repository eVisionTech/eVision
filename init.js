try {
    const fs = require('fs-extra');
    const { fork, spawn, exec } = require('child_process');
 
    const os = require('os');
    const path = require('path');

    const AutoUpdater = require("nw-autoupdater");
    const updater = new AutoUpdater(require("../package.json"));

    var app, mongod, exitFlag;
    var lang = 'en-US';
    var theme;
    var started = false;

    const swap = updater.isSwapRequest();

    theme = localStorage.getItem('theme');
	
	if (theme == 'dark') {
		document.body.style.backgroundImage = "url('bg-dark.jpg')";
	} else if (theme == 'light') {
		document.body.style.backgroundImage = "url('bg-light.jpg')";
	}

    function startDB(cb) {
        let dbpath = path.resolve(process.env.APPDATA, 'eVision Data Lite', 'db');
        fs.ensureDir(dbpath, (err) => {
            if (err) console.error(err)
            mongod = spawn('mongod.exe', [`--dbpath=${dbpath}`], {
                cwd: ".",
                env: {
                    PATH: process.env.PATH + ';' + path.resolve(process.cwd(), 'db'),
                }
            })

            mongod.stdout.on('data', (data) => {
                if (started) return;
                if (!data.toString().includes('[initandlisten] waiting for connections')) return;
                else {
                    started = true;
                    cb();
                }
            });
        
            mongod.stderr.on('data', (data) => {
                console.error(data.toString());
            });
        });
    }

    function restart() {
        app = fork("./app/app.js", { silent: true, execPath: './app/node' }, {
            cwd: ".",
            env: {
                PATH: process.env.PATH + ';' + process.cwd(),
            }
        });

        app.stdout.on('data', (data) => {
			console.log(data.toString())
        });
		
		app.stderr.on('data', (data) => {
			console.log(data.toString())
        });

        app.stdout.on('close', () => { if (!exitFlag) restart() })

        app.on('message', (msg) => {
            if (msg.start) {
                if (document.getElementsByTagName("iframe").length) return;
                else
                    setTimeout(function () {
                        document.title = 'eVision ' + nw.App.manifest.version;
                        let ifrm = document.createElement("iframe");
                        ifrm.setAttribute("src", "http://localhost:4000");
                        document.body.appendChild(ifrm);
            
                        ifrm.addEventListener('load', () => {
                            document.getElementById("preloader").style.display = "none";
                        });
                    }, 500);
            }
            if (msg.update) checkUpdate(false);
            if (msg.lang) lang = msg.lang;
            if (msg.theme) {
				localStorage.setItem('theme', msg.theme);
                if (msg.theme == 'dark') {
                    document.body.style.backgroundImage = "url('bg-dark.jpg')";
                } else if (msg.theme == 'light') {
                    document.body.style.backgroundImage = "url('bg-light.jpg')";
                }
			}
        });
    }

    if (!swap) startDB(restart);
    checkUpdate(true);

    var gui = require('nw.gui');
    var win = gui.Window.get();

    win.on('close', function () {
        var r;
        if (lang == 'en-US') r = confirm("Are you sure you want to close the application?");
        else if (lang == 'ru-RU') r = confirm("Вы действительно хотите завершить работу приложения?");
        if (r == true)
            try {
                let _this = this;
                exitFlag = true;
                if (!swap) {
                    app.send({ action: 'STOP' });
                    app.on('exit', () => {
                        exec(`mongo.exe --eval="db.getSiblingDB('admin').shutdownServer()"`, {
                            cwd: ".",
                            env: {
                                PATH: process.env.PATH + ';' + path.resolve(process.cwd(), 'db')
                            }
                        }, (err) => {
                            console.error(err)
                        })
                    });
                    mongod.on('close', () => {
                        _this.close(true);
                    });
                } else _this.close(true);
            } catch (e) {
                alert(e)
            }
    });

    var tray;

    win.on('minimize', function () {
        this.hide();

        tray = new gui.Tray({
            title: 'eVision ' + nw.App.manifest.version,
            tooltip: 'eVision ' + nw.App.manifest.version,
            icon: './app/icon32.png'
        });

        tray.on('click', function () {
            win.show();
            this.remove();
            tray = null;
        });
    });

    async function checkUpdate(start) {
        try {            
            if (swap) {
                document.addEventListener("DOMContentLoaded", async (e) => {
                    fs.readFile(path.join(os.tmpDir(), 'tmp_ev.install.txt'), 'utf8', async (err, data) => {
                        if (err) console.error(err);
                        lang = data.split('|')[1];
                        let archive = data.split('|')[2];
                        if (lang == 'en-US') 
                            document.getElementById('infoText').innerHTML = 'Installing update - stage 2...';
                        else if (lang == 'ru-RU') 
                            document.getElementById('infoText').innerHTML = 'Установка обновления - этап 2...';
                        await updater.swap();
                        data = data.split('|')[0];
                        await fs.remove(path.resolve(data + '.bak'));
                        await fs.remove(path.resolve(os.tmpDir(), archive));
                        await fs.remove(path.resolve(os.tmpDir(), 'tmp_ev.install.txt'));
                        await updater.restart();
                        return;
                    })
                });                
            }

            if (start) return;

            const rManifest = await updater.readRemoteManifest();
            const needsUpdate = await updater.checkNewVersion(rManifest);
            if (!needsUpdate) return;

            exitFlag = true;
            app.send({ action: 'STOP' });
            app.on('exit', () => {
                exec(`mongo.exe --eval="db.getSiblingDB('admin').shutdownServer()"`, {
                    cwd: ".",
                    env: {
                        PATH: process.env.PATH + ';' + path.resolve(process.cwd(), 'db')
                    }
                }, (err) => {
                    console.error(err)
                })
            });

            let iframes = document.querySelectorAll('iframe');
            iframes.forEach(ifrm => {
                ifrm.parentNode.removeChild(ifrm);
            });
            document.getElementById("preloader").style.display = "inline";

            let archive = rManifest.packages.win64.url.split('/').pop();

            fs.writeFile(path.join(os.tmpDir(), 'tmp_ev.install.txt'), path.dirname(process.execPath) + '|' + lang + '|' + archive, 'utf8', async (err, data) => {
                if (err) console.error(err);
            })
 
            updater.on('download', (downloadSize, totalSize) => {
                if (lang == 'en-US') 
                    document.getElementById('infoText').innerHTML = 'Downloading update: ' + Math.floor(downloadSize / totalSize * 100) + '%';
                else if (lang == 'ru-RU')
                    document.getElementById('infoText').innerHTML = 'Загружаем обновление: ' + Math.floor(downloadSize / totalSize * 100) + '%';
            });

            updater.on('install', (installFiles, totalFiles) => {
                if (lang == 'en-US') 
                    document.getElementById('infoText').innerHTML = 'Installing update - stage 1: ' + Math.floor(installFiles / totalFiles * 100) + '%';
                else if (lang == 'ru-RU') 
                    document.getElementById('infoText').innerHTML = 'Установка обновления- этап 1: ' + Math.floor(installFiles / totalFiles * 100) + '%';                
            });

            const updateFile = await updater.download(rManifest);
            await updater.unpack(updateFile);
            await updater.restartToSwap();
        } catch (e) {
            alert(e);
        }
    }

} catch (err) {
    alert(err);
}