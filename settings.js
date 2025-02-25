const fs = require('fs');
const chalk = require('chalk');
//~~~~~~~~~~~~< GLOBAL SETTINGS >~~~~~~~~~~~~\\

global.owner = ['6282268881337']
global.packname = ' '
global.author = ' '
global.botname = 'BangsulBotz'
global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆']
global.tempatDB = 'database.json'
global.pairing_code = true
global.number_bot = '6285167618167' // Kalo pake panel bisa masukin nomer di sini, jika belum ambil session. Format : '628xx'

global.fake = {
	anonim: 'https://telegra.ph/file/95670d63378f7f4210f03.png',
	thumbnailUrl: 'https://telegra.ph/file/fe4843a1261fc414542c4.jpg',
	thumbnail: fs.readFileSync('./src/media/naze.png'),
	docs: fs.readFileSync('./src/media/fake.pdf'),
	listfakedocs: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'],
}

global.my = {
	yt: 'https://github.com/BangsulBotz',
	gh: 'https://github.com/BangsulBotz',
	gc: ' ',
	ch: ' ',
    thumb: 'https://telegra.ph/file/138cbd275bd94d4fb0602.jpg',
    linkwa : 'https://wa.me/+6282268881337',
}

global.limit = {
	free: 100,
	premium: 999,
	vip: 'VIP'
}

global.uang = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}
global.blockedChats = new Set();

global.mess = {
	owner: '👑 *Hanya Yang Mulia sang Penguasa yang berhak menggunakan fitur ini!*',
	admin: '⚠️ *Fitur spesial buat Admin aja nih, gak bisa sembarangan!*',
	botAdmin: '🚫 *BangsulBotz belum jadi admin nih, angkat jadi admin dulu dong!*',
	group: '_wahai yang mulia...fitur ini hanya tersedia di dalam grup..._',
	private: '📩 *Ini fitur rahasia, cuma bisa dipake di chat pribadi yang mulia!*',
	prem: '💎 *Paduka belum tergolong sebagai Pengguna Istimewa (Premium). Silakan naikkan derajat dahulu untuk menikmati fitur ini!*',
	wait: '⏳ _Sabar yang mulia permintaan anda sedang diproses!_',
	error: '❌ *Ampun, Yang Mulia. Terjadi kesalahan dalam sistem. Hamba akan memperbaikinya secepat mungkin.*',
	done: '_ini hasil nya yang mulia..._'
}

global.APIs = {
	zaynn: 'https://api.zaynn.my.id/api',
}
global.APIKeys = {
	'https://api.zaynn.my.id/api': 'Najedev',
}

//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
