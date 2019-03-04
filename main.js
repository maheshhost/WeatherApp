const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: true,
		autoHideMenuBar: true,
		show: false,
		center: true,
		resizable: false,
		icon: './assets/images/weather.png'
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.on('close', function() {
		mainWindow = null
	});
}

app.on('ready', createWindow);

app.on('activate', function() {
	if(mainWindow === null) {
		createWindow();
	}
})