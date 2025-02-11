process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

require('./settings');
const fs = require('fs');
const path = require('path');
const util = require('util');
const gis = require('g-i-s');
const axios = require('axios');
const chalk = require('chalk');
const sharp = require('sharp');
const fse = require('fs-extra');
const yts = require('yt-search');
const pdf = require('pdf-parse');
const archiver = require('archiver');
const prem = require('./src/premium');
const EventEmitter = require("events");
const ffmpeg = require('fluent-ffmpeg');
const similarity = require('similarity');
const speed = require('performance-now');
const Tesseract = require('tesseract.js');
const moment = require('moment-timezone');
const { UguuSe } = require('./lib/uploader');
const { performance } = require('perf_hooks');
const { exec,execSync} = require('child_process');
const translate = require('translate-google-api');
const { LoadDataBase } = require('./src/message');
const { toAudio, toPTT } = require('./lib/converter');
const { rdGame, iGame, setLimit } = require('./lib/game');
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const VideoNano = JSON.parse(fs.readFileSync('./data/NanoMedia/database/xeonvideo.json'));
const ImageNano = JSON.parse(fs.readFileSync('./data/NanoMedia/database/xeonimage.json'));
const NanoVoiceNote = JSON.parse(fs.readFileSync('./data/NanoMedia/database/xeonvn.json'));
const NanoSticker = JSON.parse(fs.readFileSync('./data/NanoMedia/database/xeonsticker.json'));
const { tiktokDl, quotedLyo, simi, mediafireDl, wallpaper, ringtone, styletext, } = require('./lib/screaper');
const {generateWAMessageFromContent, proto, generateWAMessageContent, getContentType} = require('@whiskeysockets/baileys');
const {getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, formatDate,  generateProfilePicture,  pickRandom } = require('./lib/function');
//const folderPath = './nazedev';
//const mainSessionFile = 'creds.json';
const autoAIPath = './database/autoai.json';
const blockUserPath = './database/block_user.json';
const countryCodes = require('./database/countryCodes');
//const ffmpegPath = require('ffmpeg-static');  ini buat idx dev

// Database Game
let menfes = db.game.menfes = []
let tekateki = db.game.tekateki = []
let tebaklirik = db.game.tebaklirik = []
let kuismath = db.game.kuismath = []
let tebaklagu = db.game.tebaklagu = []
let tebakkata = db.game.tebakkata = []
let family100 = db.game.family100 = []
let susunkata = db.game.susunkata = []
let tebakkimia = db.game.tebakkimia = []
let caklontong = db.game.caklontong = []
let tebaknegara = db.game.tebaknegara = []
let tebakgambar = db.game.tebakgambar = []
let tebakbendera = db.game.tebakbendera = []



module.exports = naze = async (naze, m, chatUpdate, store) => {
try {
	
	await LoadDataBase(naze, m);
	
	const botNumber = await naze.decodeJid(naze.user.id)
	const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : (m.type === 'editedMessage') ? (m.message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage ? m.message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text : m.message.editedMessage.message.protocolMessage.editedMessage.conversation) : ''
	const budy = (typeof m.text == 'string' ? m.text : '')
	const prefix = db.set[botNumber].multiprefix ? '' : /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : '';
    const isCmd = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : body.trim().split(/ +/).shift().toLowerCase();
	const args = body.trim().split(/ +/).slice(1)
	const isCreator = isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
	const quoted = m.quoted ? m.quoted : m
	const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
	const text = q = args.join(' ')
	const mime = (quoted.msg || quoted).mimetype || ''
	const qmsg = (quoted.msg || quoted)
	const hari = moment.tz('Asia/Jakarta').locale('id').format('dddd');
	const tanggal = moment.tz('Asia/Jakarta').locale('id').format('DD/MM/YYYY');
	const jam = moment().tz('Asia/Jakarta').locale('id').format('HH:mm:ss');
	const ucapanWaktu = jam < '05:00:00' ? 'Selamat Pagi 🌉' : jam < '11:00:00' ? 'Selamat Pagi 🌄' : jam < '15:00:00' ? 'Selamat Siang 🏙' : jam < '18:00:00' ? 'Selamat Sore 🌅' : jam < '19:00:00' ? 'Selamat Sore 🌃' : jam < '23:59:00' ? 'Selamat Malam 🌌' : 'Selamat Malam 🌌';
	const almost = 0.72
	const time = Date.now()
	const setv = pickRandom(listv)
	const more = String.fromCharCode(8206)
	const readmore = more.repeat(999)
	//ffmpeg.setFfmpegPath(ffmpegPath);  ini buat idx dev
	//1
	const isVip = db.users[m.sender] ? db.users[m.sender].vip : false
	const isPremium = isCreator || prem.checkPremiumUser(m.sender, premium) || false
	
	EventEmitter.defaultMaxListeners = 20;
	// Fake
	const fkontak = {
		key: {
			remoteJid: '0@s.whatsapp.net',
			participant: '0@s.whatsapp.net',
			fromMe: false,
			id: 'Naze'
		},
		message: {
			contactMessage: {
				displayName: (m.pushName || author),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || author},;;;\nFN:${m.pushName || author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
				sendEphemeral: true
			}
		}
	}
	// Auto Set Bio
	if (db.set[botNumber].autobio) {
		let setbio = db.set[botNumber]
		if (new Date() * 1 - setbio.status > 60000) {
			await naze.updateProfileStatus(`${naze.user.name} | 🎯 Runtime : ${runtime(process.uptime())}`)
			setbio.status = new Date() * 1
		}
	}
	if (!naze.public) {
		if (!m.key.fromMe) return
	}
	// Auto Read
	if (m.message && m.key.remoteJid !== 'status@broadcast') {
		console.log( `----------------------------------------------------`,
		`\n⏳ ${chalk.whiteBright(`[ TIME ] :`)} ${chalk.cyanBright(new Date().toLocaleString())}`, 
		`\n👤 ${chalk.yellowBright('[ DARI ] :')} ${chalk.magenta(m.pushName || (isCreator ? 'Bot' : 'Anonim'))} (${chalk.blueBright(m.sender)})`,
		`\n💬 ${chalk.redBright('[ CHAT ] :')} ${chalk.cyan(m.isGroup ? m.metadata.subject : 'Private Chat')}`,
		`\n📩 ${chalk.whiteBright(`[ PESAN ]:`)}\n${chalk.greenBright(budy || m.type)}`);
		if (db.set[botNumber].autoread && naze.public) naze.readMessages([m.key]);
	}
	
	// Group Settings
	if (m.isGroup) {
		// Cek jika bot adalah admin grup
	
		if (db.groups[m.chat].mute && !isCreator) {
			return;
		}
		
		// Anti Delete
		if (m.type == 'protocolMessage' && db.groups[m.chat].antidelete && !isCreator && m.isBotAdmin && !m.isAdmin) {
			const mess = chatUpdate.messages[0].message.protocolMessage;
			if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {
				const chats = store.messages[m.chat].array.find(a => a.id === mess.key.id);
				chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key };
				const pesan = chats.type === 'conversation' ? { extendedTextMessage: { text: chats.msg, contextInfo: { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }}} : { [chats.type]: chats.msg };
				await naze.relayMessage(m.chat, pesan, {});
			}
		}
	
		// Anti Link Group (Link undangan WhatsApp)
		if (db.groups[m.chat].antilink && !isCreator) {
			// Cek apakah ada link grup WhatsApp dalam pesan
			if (budy.match('chat.whatsapp.com/')) {
				// Cek apakah link tersebut adalah link grup WhatsApp ini
				const isGcLink = new RegExp(`https://chat.whatsapp.com/${await naze.groupInviteCode(m.chat)}`, 'i').test(m.text);
				if (isGcLink) {
					// Jika link adalah link grup sendiri, kirim notifikasi
					await naze.sendMessage(m.chat, {
						text: `@${m.sender.split('@')[0]} mengirim link grup ini. Link tidak dihapus 😎`,
						contextInfo: { mentionedJid: [m.sender] },
						quoted: m // Mereply pesan yang berisi link grup sendiri
					});
					return;
				}
	
				if (m.isAdmin) {
					// Jika pengirim adalah admin, kirim notifikasi bahwa link tidak dihapus
					await naze.sendMessage(m.chat, {
						text: `Link grup yang dikirim oleh @${m.sender.split('@')[0]} tidak dihapus, Admin bebas mengirim link 😎`,
						contextInfo: { mentionedJid: [m.sender] },
						quoted: m // Mereply pesan admin yang mengirim link grup
					});
				} else {
					// Jika bukan admin, hapus pesan dan keluarkan pengirim
					await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }});
					await naze.relayMessage(m.chat, {
						extendedTextMessage: {
							text: `🚫 *Anti-Link Detected!* @${m.sender.split('@')[0]} mengirimkan link grup! Pesan telah dihapus.`,
							contextInfo: { mentionedJid: [m.sender] }
						}
					}, { quoted: m }); // Mereply pesan yang berisi link grup
					await naze.groupParticipantsUpdate(m.chat, [m.sender], 'remove'); // Kick pengguna
				}
			}
		}
	
		// Anti Link All (Untuk semua jenis link, selain grup)
		if (db.groups[m.chat].antilinkall && !isCreator) {
			// Cek apakah ada link di dalam pesan
			if (budy.match(/(https?:\/\/[^\s]+)/gi)) {
				// Cek apakah link tersebut adalah link grup WhatsApp
				const isGcLink = new RegExp(`https://chat.whatsapp.com/${await naze.groupInviteCode(m.chat)}`, 'i').test(m.text);
				if (isGcLink) {
					// Jika link adalah link grup sendiri, kirim notifikasi
					await naze.sendMessage(m.chat, {
						text: `@${m.sender.split('@')[0]} mengirim link grup ini. Link tidak dihapus 😎`,
						contextInfo: { mentionedJid: [m.sender] },
						quoted: m // Mereply pesan yang berisi link grup sendiri
					});
					return;
				}
	
				if (m.isAdmin) {
					// Jika pengirim adalah admin, kirim notifikasi bahwa link tidak dihapus
					await naze.sendMessage(m.chat, {
						text: `Link yang dikirim oleh @${m.sender.split('@')[0]} tidak dihapus, Admin bebas mengirim link 😎`,
						contextInfo: { mentionedJid: [m.sender] },
						quoted: m // Mereply pesan admin yang mengirim link
					});
				} else {
					// Jika bukan admin, hapus pesan dan keluarkan pengirim
					await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }});
					await naze.relayMessage(m.chat, {
						extendedTextMessage: {
							text: `🚫 *Anti-Link Detected!* @${m.sender.split('@')[0]} mengirimkan link! Pesan telah dihapus.`,
							contextInfo: { mentionedJid: [m.sender] }
						}
					}, { quoted: m }); // Mereply pesan yang berisi link
					await naze.groupParticipantsUpdate(m.chat, [m.sender], 'remove'); // Kick pengguna
				}
			}
		}
	
		// Anti Virtex Group
		if (db.groups[m.chat].antivirtex && !isCreator && m.isBotAdmin && !m.isAdmin) {
			if (budy.length > 6000) {
				await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }});
				await naze.relayMessage(m.chat, { extendedTextMessage: { text: `Terdeteksi @${m.sender.split('@')[0]} Mengirim Virtex..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Virtex❗*'}, ...m.key }}}, {});
				await naze.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
			}
			if (m.msg.nativeFlowMessage && m.msg.nativeFlowMessage.messageParamsJson && m.msg.nativeFlowMessage.messageParamsJson.length > 3500) {
				await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }});
				await naze.relayMessage(m.chat, { extendedTextMessage: { text: `Terdeteksi @${m.sender.split('@')[0]} Mengirim Bug..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Bug❗*'}, ...m.key }}}, {});
				await naze.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
			}
		}
	}
	// Filter Bot
	if (m.isBot) return
	
	// Mengetik
	if (db.set[botNumber].autotyping && isCmd) {
		await naze.sendPresenceUpdate('composing', m.chat)
	}
	
	// Salam
	if (/^a(s|ss)alamu('|)alaikum(| )(wr|)( |)(wb|)$/.test(budy?.toLowerCase())) {
		const jwb_salam = ['Wa\'alaikumusalam','Wa\'alaikumusalam wr wb','Wa\'alaikumusalam Warohmatulahi Wabarokatuh']
		m.reply(pickRandom(jwb_salam))
	}
	
	// Cek Expired
	prem.expiredCheck(naze, premium);
	
	// Game

	const games = { tebaklirik, tekateki, tebaklagu, tebakkata, kuismath, susunkata, tebakkimia, caklontong, tebaknegara, tebakgambar, tebakbendera };
for (let gameName in games) {
    let game = games[gameName];
    let id = iGame(game, m.chat);

    if (m.quoted && id == m.quoted.id) {
        let messageKey;
        if (gameName == 'kuismath') {
            jawaban = game[m.chat + id].jawaban;

            if (!isNaN(budy)) {
                // Cek apakah jawaban benar atau salah dengan tampilan yang menarik
                if (budy.toLowerCase() == jawaban) {
                    await m.reply(`*✅ Jawaban Anda Benar 🎉*\n\n*Selamat! Anda berhasil menjawab pertanyaan dengan benar!*`);
                    delete kuismath[m.chat + id];
                } else {
                    await m.reply(`*❌ Jawaban Anda Salah 😔*\n\n*Silakan coba lagi, tetap semangat!*`);
                }
            }
        } else {
            jawaban = game[m.chat + id].jawaban;
            let jawabBenar = /tekateki|tebaklirik|tebaklagu|tebakkata|tebaknegara|tebakbendera/.test(gameName) ? (similarity(budy.toLowerCase(), jawaban) >= almost) : (budy.toLowerCase() == jawaban);

            // Cek apakah jawaban benar atau salah dengan tampilan visual
            if (jawabBenar) {
                await m.reply(`*✅ Jawaban Anda Benar 🎉*\n\n*Selamat! Anda berhasil menjawab pertanyaan dengan benar!*`);
                delete game[m.chat + id];
            } else {
                await m.reply(`*❌ Jawaban Anda Salah 😔*\n\n*Silakan coba lagi, tetap semangat!*`);
            }
        }
    }
}

if (m.chat in family100) {
    let similarity = require('similarity');
    let threshold = 0.72; // semakin tinggi nilai, semakin mirip
    let id = m.chat;
    let users = global.db.users[m.sender];
    let room = family100[id];
    let text = budy.toLowerCase().replace(/[^\w\s\-]+/, '');
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy);

    if (!isSurrender) {
        let index = room.jawaban.indexOf(text);
        if (index < 0) {
            let similarityScores = room.jawaban
                .filter((_, index) => !room.terjawab[index])
                .map(jawaban => similarity(jawaban, text));
            if (Math.max(...similarityScores) >= threshold) {
                return m.reply('Dikit lagi!');
            } else {
                // Mengirim pesan bahwa jawaban salah dengan emoji silang merah
                await m.reply('❌ Jawaban Anda Salah! Silakan coba lagi.');
                
                // Mengirim ulang soal
                let soal = `*🎮 GAME FAMILY 100 🎮*\n\n*Soal:*\n ${room.soal}\n\n*keterangan!!!*\nTerdapat *${room.jawaban.length}* jawaban\n ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa jawaban terdapat spasi)\n`:'',`\njika anda ingin menyerah, ketik:\n*nyerah*\n`}`;
                await naze.sendMessage(m.chat, { text: soal, mentions: room.terjawab.filter(Boolean).map(u => u + '@s.whatsapp.net') }, { quoted: m });

                return; // Keluar setelah mengirim pesan dan soal
            }
        }
        if (!isCmd && room.terjawab[index]) {
            return; // Keluar jika jawaban sudah terjawab
        }
        users.money += room.winScore;
        room.terjawab[index] = m.sender;
    }

    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length;
    let caption =  `*🎮 GAME FAMILY 100 🎮*\n\n*Soal:*\n ${room.soal}\n\n*keterangan!!!*\nTerdapat *${room.jawaban.length}* jawaban\n ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa jawaban terdapat spasi)\n`:''}
    ${isWin ?`*SEMUA JAWABAN TERJAWAB ✅*\n` : isSurrender ? '*MENYERAH ❌*\njawaban nya:\n' : ``}
    ${Array.from(room.jawaban, (jawaban, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '✓ ' + room.terjawab[index].split('@')[0] : ''}` : false;
    }).filter(v => v).join('\n')}
    ${isSurrender ? '': ``}
    `;

    naze.sendMessage(m.chat, { text: caption, mentions: room.terjawab.filter(Boolean).map(u => u + '@s.whatsapp.net') }, { quoted: m })
        .then(msg => {
            family100[id].msg = msg; // Update pesan jika diperlukan
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });

    if (isWin || isSurrender) {
        delete family100[id];
    }
}

	// Menfes
	if (!m.isGroup) {
		if (menfes[m.sender] && m.key.remoteJid !== 'status@broadcast') {
			if (!/^del(menfe(s|ss)|confe(s|ss))$/i.test(command)) {
				m.msg.contextInfo = { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Pesan Dari ${menfes[m.sender].nama ? menfes[m.sender].nama : 'Seseorang'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}
				const pesan = m.type === 'conversation' ? { extendedTextMessage: { text: m.msg, contextInfo: { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Pesan Dari ${menfes[m.sender].nama ? menfes[m.sender].nama : 'Seseorang'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}}} : { [m.type]: m.msg }
				await naze.relayMessage(menfes[m.sender].tujuan, pesan, {});
			}
		}
	}
	
	// Afk
	let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	for (let jid of mentionUser) {
		let user = db.users[jid]
		if (!user) continue
		let afkTime = user.afkTime
		if (!afkTime || afkTime < 0) continue
		let reason = user.afkReason || ''
		m.reply(`🚫 *Jangan tag dia!*\n💬 *Dia sedang AFK:* ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}\n⏳ *Selama:* ${clockString(new Date - afkTime)}`.trim())
	}
	if (db.users[m.sender].afkTime > -1) {
		let user = db.users[m.sender]
		m.reply(`🎉 @${m.sender.split('@')[0]} telah berhenti AFK\n\n ${user.afkReason ? 'alasan sebelum nya karena: \n' + user.afkReason : ''}\n⏳ *telah AFK Selama:* ${clockString(new Date - user.afkTime)}`)
		user.afkTime = -1
		user.afkReason = ''
	}
	
	function createInteractiveMessage(nano_sad) {
		return {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({
							text: nano_sad
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: botname
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: [
								{
									name: "single_select",
									buttonParamsJson: `{
										"title": "📜 LIST MENU BOT 📜",
										"sections": [{
											"title": "✨ ${botname} Features ✨",
											"rows": [
															{ header: "🔍 AI MENU", title: "🔍 Alat Pencarian", description: "Cari berbagai informasi", id: ".aimenu" },
															{ header: "📚 ALL MENU", title: "🗂️ Semua Fitur", description: "Jelajahi semua fungsi bot", id: ".allmenu" },
															{ header: "🤖 BOT MENU", title: "🤖 Fitur Bot", description: "Jelajahi alat dan fitur bot", id: ".botmenu" },
															{ header: "⬇️ DOWNLOAD MENU", title: "⬇️ Alat Unduhan", description: "Unduh media dengan mudah", id: ".downloadmenu" },
															{ header: "🎉 FUN MENU", title: "🎉 Fitur Hiburan", description: "Nikmati aktivitas yang menyenangkan", id: ".funmenu" },
															{ header: "🎮 GAME MENU", title: "🎮 Fitur Game", description: "Mainkan game yang seru", id: ".gamemenu" },
															{ header: "👥 GRUP MENU", title: "👥 Alat Grup", description: "Kelola dan nikmati fitur grup", id: ".groupmenu" },
															{ header: "👑 OWNER MENU", title: "👑 Alat Pemilik", description: "Fitur eksklusif untuk pemilik", id: ".ownermenu" },
															{ header: "💬 QUOTES MENU", title: "💬 Kutipan", description: "Dapatkan inspirasi dari kutipan", id: ".quotes" },
															{ header: "🔍 SEARCH MENU", title: "🔍 Alat Pencarian", description: "Cari berbagai informasi", id: ".searchmenu" },
															{ header: "🔧 TOOLS MENU", title: "🔧 Alat Lainnya", description: "Utilitas dan alat tambahan", id: ".toolsmenu" }
													]

										}]
									}`
								},
								{
									name: "quick_reply",
									buttonParamsJson: `{"display_text":"Owner 👤","id":".owner"}`
								}
							]
						})
					})
				}
			}
		};
	}
	
	// Fungsi untuk mengirim pesan interaktif
	async function sendInteractiveMessage(from, nano_sad) {
		let msg = generateWAMessageFromContent(from, createInteractiveMessage(nano_sad), {});
		await naze.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
	}
// Tambahkan bagian ini di tempat di mana bot memproses setiap pesan yang masuk
let incomingMessage = (m.text || '').toLowerCase(); // jika m.text undefined, gunakan string kosong

if (incomingMessage in db.database) {
    let response = db.database[incomingMessage];
    await naze.relayMessage(m.chat, response, {});
}
//autoreply
for (let BhosdikaXeon of NanoVoiceNote) {
if (budy === BhosdikaXeon) {
let audiobuffy = fs.readFileSync(`./data/assets/audio/${BhosdikaXeon}.mp3`)
naze.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
}
}
for (let BhosdikaXeon of NanoSticker){
if (budy === BhosdikaXeon){
let stickerbuffy = fs.readFileSync(`./data/NanoMedia/sticker/${BhosdikaXeon}.webp`)
naze.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}
for (let BhosdikaXeon of ImageNano){
if (budy === BhosdikaXeon){
let imagebuffy = fs.readFileSync(`./data/NanoMedia/image/${BhosdikaXeon}.jpg`)
naze.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}
for (let BhosdikaXeon of VideoNano){
if (budy === BhosdikaXeon){
let videobuffy = fs.readFileSync(`./data/NanoMedia/video/${BhosdikaXeon}.mp4`)
naze.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}

// Inisialisasi daftar kata kotor
global.kataKotor = ['anjing', 'babi', 'kontol', 'pepek', 'memek', 'asw','asu', 'asuu', 'kntl', 'anjink', 'ajg', 'anj','kuntul','mwmwk','anjg','kntol','kontl','bgst','bangsat','bangst','bngst','jembwt','jembut','jmbt','kimak','djancok','jancok','itil','pantat','ngentod','ngentot','sange','sagne','ancok'];

// Fungsi untuk mendeteksi kata kotor dan mengembalikan kata yang terdeteksi
function deteksiKataKotor(body) {
    const detectedWord = global.kataKotor.find(kata => new RegExp(`\\b${kata}\\b`, 'i').test(body));
    return detectedWord ? detectedWord : null;
}

// Pengecekan dalam handler pesan
let detectedWord = deteksiKataKotor(body);

// Hanya deteksi jika antitoxic diaktifkan
if (db.set[botNumber].antitoxic && detectedWord) {
    const warningMessage = `
*🚫 ANTI TOXIC ALERT! 🚫*
Terjadi pelanggaran etika dalam percakapan.

*⛔ Kata yang terdeteksi:* "${detectedWord}"

Kami menghargai komunikasi yang positif. Mohon untuk tidak menggunakan kata-kata kasar. 🙏
    
_Mari kita jaga suasana yang baik dan bersahabat._ ✨`;
    m.reply(warningMessage);
}

global.kataeror = ['eror', 'error','erorr','errorr','Eror', 'Error','Erorr','Errorr','TypeError'];

// Fungsi untuk mendeteksi kata kotor
function deteksiKataeror(body) {
	return global.kataeror.some(kata => new RegExp(`\\b${kata}\\b`, 'i').test(body));
}
if (deteksiKataeror(body)) {
	m.reply("*AWOKAWOK EROR, KASIHAN LUU*");
}

// Menangani respon tombol untuk lagu galau
if (m.message && m.message.buttonsResponseMessage && m.message.buttonsResponseMessage.selectedButtonId.startsWith('getgalau_')) {
    const fileName = m.message.buttonsResponseMessage.selectedButtonId.replace('getgalau_', '').trim();
    const dirPath = './data/assets/galau/';
    const filePath = `${dirPath}${fileName}`;

    if (fs.existsSync(filePath)) {
        // Mengirimkan file sebagai pesan suara (VN)
        try {
            await naze.sendMessage(m.chat, { audio: fs.readFileSync(filePath), mimetype: 'audio/mp4', ptt: true }, { quoted: m });
        } catch (err) {
            m.reply(`Terjadi kesalahan saat mengirim file: ${err.message}`);
        }
    } else {
        m.reply(`File dengan nama *${fileName}* tidak ditemukan.`);
    }
}
async function getTelegramStickers(link) {
    let response = await fetch(`https://api.telegram.org/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/getStickerSet?name=${link.split('addstickers/')[1]}`);
    let data = await response.json();
    if (data.ok) {
        return data.result.stickers.map(sticker => ({
            file_id: sticker.file_id,
            //is_video: sticker.is_video || false // Tambahkan deteksi untuk stiker video
        }));
    } else {
        throw new Error('Gagal mengambil data stiker');
    }
}

async function downloadSticker(file_id) {
    // Mendapatkan file dari Telegram menggunakan file_id
    let response = await fetch(`https://api.telegram.org/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/getFile?file_id=${file_id}`);
    let data = await response.json();

    if (!data.ok) throw new Error('Gagal mendapatkan file dari Telegram');

    // URL untuk mendownload file
    let fileUrl = `https://api.telegram.org/file/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/${data.result.file_path}`;
    let fileResponse = await fetch(fileUrl);
    
    // Menggunakan arrayBuffer() untuk mendapatkan data biner
    let buffer = await fileResponse.arrayBuffer();

    // Mengonversi arrayBuffer menjadi Buffer yang dapat digunakan di Node.js
    return Buffer.from(buffer);
}



//total fitur
//const caseadd = 3;
//const listrespon = 9;
//const listsewa = 1;
const aimenu = 9;
const botmenu = 27;
const downloadmenu = 7;
const funmenu = 25;
const gamemenu = 11;
const grupmenu = 23;
const ownermenu = 46;
const quotesmenu = 9;
const searchmenu = 10;
const toolsmenu = 50;

// Total fitur otomatis
const totalfitur = ownermenu  + grupmenu + botmenu + toolsmenu + aimenu + searchmenu + downloadmenu + quotesmenu + funmenu + gamemenu ;

//fungsi auto ai
if (!fs.existsSync(autoAIPath)) fs.writeFileSync(autoAIPath, JSON.stringify({}));
const autoAIData = JSON.parse(fs.readFileSync(autoAIPath));

// Cek apakah autoai aktif
if (autoAIData && autoAIData[m.sender]) {
	if (
		m.text.startsWith(".") ||
		m.text.startsWith("#") ||
		m.text.startsWith("!") ||
		m.text.startsWith("/") ||
		m.text.startsWith("\\/")
	) return; // Abaikan jika pesan adalah perintah

	try {
		const fetch = require('node-fetch');
		const userMessage = m.text.trim(); // Pesan dari user

		// Ambil kode CAI secara dinamis dari autoAIData
		const caiCode = autoAIData.caiCode || "quBEQCFuehP07HTlkaMc7GYRdUd2VZgvTMsBVZO3VjM"; // Gunakan default jika kode belum disetel
		const response = await fetch(`https://cai.neekoi.me/cai?char=${caiCode}&message=${encodeURIComponent(userMessage)}`);
		const aiResponse = await response.json();

		// Kirim balasan dari AI
		const botReply = aiResponse.reply || "Maaf, aku nggak ngerti maksudmu 🥺";
		await naze.sendMessage(m.chat, { text: botReply }, { quoted: m });

		// Simpan log percakapan ke data
		if (!autoAIData[m.sender].messages) autoAIData[m.sender].messages = [];
		autoAIData[m.sender].messages.push({ user: userMessage, bot: botReply });
		fs.writeFileSync(autoAIPath, JSON.stringify(autoAIData, null, 2));
	} catch (error) {
		console.error("Error fetching AI response:", error);
		m.reply("Maaf, ada masalah dengan AI-nya. Coba lagi nanti ya!");
	}

}
const { downloadContentFromMessage } = require('@whiskeysockets/baileys'); // Pastikan ini di bagian atas kode

global.blockedChats = new Set(loadBlockedUsers());

function loadBlockedUsers() {
    if (!fs.existsSync(blockUserPath)) {
        fs.writeFileSync(blockUserPath, JSON.stringify([])); // Buat file jika belum ada
        return [];
    }
    return JSON.parse(fs.readFileSync(blockUserPath, 'utf8'));
}

function saveBlockedUsers() {
    fs.writeFileSync(blockUserPath, JSON.stringify([...global.blockedChats], null, 2));
}

switch(command) {
	//==================================================================
	//caseadd = 3
	case 'matkul': {
		if (!isCreator) return m.reply(mess.owner);
		
		let day = m.text.trim().split(' ')[1]?.toLowerCase(); // Ambil nama hari
		if (!day) return naze.sendMessage(m.chat, { text: 'Harap masukkan nama hari! Contoh: matkulnya senin' }, { quoted: m });
		
		let schedule = '';
		
		switch (day) {
			case 'senin':
				schedule = `*Jadwal Kuliah Hari Senin:*\n
	1. Persamaan Diferensial
	   - Jam        : 09:30-12:20
	   - Ruangan: 3D-3A.35
	   - Dosen     : Agus Dahlia
	   
	2. Termodinamika
	   - Jam        : 13:00-15:30
	   - Ruangan: 3D-3A.35
	   - Dosen     : Mursyidah`;
				break;
			case 'selasa':
				schedule = `*Jadwal Kuliah Hari Selasa:*\n
	1. Fluida Reservoir
	   - Jam        : 10:20-12:00
	   - Ruangan: 3F-3A36
	   - Dosen     : Muslim`;
				break;
			case 'rabu':
				schedule = `*Jadwal Kuliah Hari Rabu:*\n
	1. Statistik dan Probabilistik
	   - Jam        : 07:00-08:40
	   - Ruangan: 3F-3A37
	   - Dosen     : Dedek Andrian

	2. Praktikum Statistik Probabilistik
	- Jam        : 08:40-10:20
	- Ruangan: 3F-3A36
	- Dosen     : Dedek Andrian

	3. Pendidikan Pancasila
	   - Jam        : 12:00-12:40
	   - Ruangan: 3D-3A.31
	   - Dosen     : Monika Melina

	4. Mekanika Kekuatan Material
	   - Jam        : 13:00-15:30
	   - Ruangan: 3D-1A11
	   - Dosen     : Dedikarni`;
				break;
			case 'kamis':
				schedule = `*Jadwal Kuliah Hari Kamis:*\n
	1. Praktikum Fluida Reservoir
	   - Jam        : 13:00-14:40
	   - Ruangan: 3E-3A30
	   - Dosen     : Muslim`;
				break;
			case 'jumat':
				schedule = `*Jadwal Kuliah Hari Jum'at:*\n
	1. Algoritma dan Struktur
	   - Jam        : 07:00-08:40
	   - Ruangan: 1A-1A11
	   - Dosen     : Fajril Ambia

	2. Praktikum Algoritma dan Struktur
	   - Jam        : 14:40-16:20
	   - Ruangan: 1A-3A11
	   - Dosen     : Fajril Ambia`;
				break;
			default:
				schedule = 'Nama hari tidak valid. Silakan masukkan hari yang benar (senin, selasa, rabu, kamis, jumat).';
				break;
		}
	
		naze.sendMessage(m.chat, { text: schedule }, { quoted: m });
	}
	break;
	case '19rujxl1e': {

		console.log('.')

	}
	break
	//==================================================================
	//listrespon = 9
	case 'oi':{
		m.reply("paan bro 🗿☕") 
		}
	break	
	case 'ngakak':{
		m.reply("gitu doang udah ngakak\njadi manusia kok selera humornya rendah🗿☕") 
		}
	break
	case '😭':case '😭😭':{
		m.reply("ututuu agi cediih ><") 
		}
	break
	case 'hi':{
		m.reply("ha hi ha hi, gigi lu kuning jirr") 
		}
	break
	case 'goblok':{
		m.reply("yang goblok mah elu, gua kagak 🥱") 
		}
	break
	case 'diih':case 'dih': case 'dihh':{
		m.reply("dih diih, biar apa lu begitu???") 
		}
	break
	case 'diam':{
		m.reply("iya iya aku diam...😌🙏🥺") 
		}
	break
	case 'hai':{
	m.reply("hai juga🙌🏻") 
	}
	break
	case 'p':{
		m.reply("*maaf yang mulia, sebelum memberi pesan, alangkah baik nya mengucapkan SALAM terlebih dahulu*") 
		}
		break
	case 'sedih': case 'galau': case '🥺🥺': case '🥺': {
		let from = m.chat || m.sender;
	
		// Mendapatkan semua file sound yang ada di direktori './data/assets/galau'
		const soundFiles = fs.readdirSync('./data/assets/galau');
	
		// Memilih file sound secara acak
		const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
	
		// Periksa apakah file audio ada
		if (!fs.existsSync(`./data/assets/galau/${randomSound}`)) {
			console.error(`File tidak ditemukan: ./data/assets/galau/${randomSound}`);
			return;
		}
	
		// Mengirim voice note (VN) secara acak dari folder './data/assets/galau'
		naze.sendMessage(from, { 
			audio: { url: `./data/assets/galau/${randomSound}` }, 
			mimetype: 'audio/mp4',
			ptt: true // Menandakan bahwa ini adalah voice note
		}, { quoted: m });
	}
	break;   
	//==================================================================
	// aimenu = 9
	case 'autoai': {
		const fs = require('fs');
		const autoAIPath = './database/autoai.json';
		if (!fs.existsSync(autoAIPath)) fs.writeFileSync(autoAIPath, JSON.stringify({}));

		const autoAIData = JSON.parse(fs.readFileSync(autoAIPath));

		// Validasi input
		if (!text) return m.reply(`*Contoh:* .autoai *[on/off]*`);

		if (text === "on") {
			autoAIData[m.sender] = { messages: [] }; // Aktifkan autoai untuk pengirim
			fs.writeFileSync(autoAIPath, JSON.stringify(autoAIData, null, 2));
			m.reply(`[ ✓ ] ᴀᴜᴛᴏ ᴀɪ ʙᴏᴛ : ᴀᴋᴛɪғ [ √ ]`);
		} else if (text === "off") {
			delete autoAIData[m.sender]; // Hapus status aktif dan riwayat percakapan
			fs.writeFileSync(autoAIPath, JSON.stringify(autoAIData, null, 2));
			m.reply(`[ ✓ ] ᴀᴜᴛᴏ ᴀɪ : ᴅɪʀᴇsᴇᴛ ᴅᴀɴ ᴅɪɴᴏɴᴀᴋᴛɪғᴋᴀɴ [ √ ]`);
		} else {
			m.reply("Gunakan perintah *on* atau *off*!");
		}
	};
	break;	
	case 'ai':case 'gpt':case 'openai':case 'gpt4': {
		if (!text && !m.hasMedia) return m.reply('Hai, apa yang ingin saya bantu? Kirimkan teks atau media untuk diproses.');

		// Menambahkan pesan "waiting" sebelum memproses permintaan
		m.reply(mess.wait);

		async function processMediaMessage() {
			try {
				console.log('Mendeteksi media...');
				const mediaBuffer = await m.downloadMediaMessage();
				console.log('Ukuran media yang diunduh:', mediaBuffer.length);

				if (!mediaBuffer) {
					console.log('Gagal mengunduh media.');
					return 'Maaf, terjadi kesalahan saat mengunduh media.';
				}

				// Memproses gambar
				if (m.mimetype.startsWith('image/')) {
					console.log('Media adalah gambar, memulai proses OCR...');
					const result = await Tesseract.recognize(mediaBuffer, 'eng');
					const extractedText = result.data.text.trim();
					console.log('Teks yang diekstrak:', extractedText);

					return extractedText || 'Maaf, saya tidak dapat mengekstrak teks dari gambar tersebut.';
				}

				// Memproses PDF
				if (m.mimetype === 'application/pdf') {
					console.log('Media adalah PDF, memulai proses parsing...');
					const data = await pdf(mediaBuffer);
					const extractedText = data.text.trim();
					console.log('Teks yang diekstrak dari PDF:', extractedText);

					return extractedText || 'Maaf, saya tidak dapat mengekstrak teks dari dokumen PDF ini.';
				}

				return 'Maaf, format media tidak didukung untuk pemrosesan teks.';
			} catch (err) {
				console.error('Kesalahan saat memproses media:', err);
				return 'Maaf, terjadi kesalahan saat memproses media.';
			}
		}

		async function askOpenAI(inputText) {
			try {
				console.log('Mengirimkan permintaan ke OpenAI...');
				const response = await axios.post("https://chateverywhere.app/api/chat/", {
					model: {
						id: "gpt-4",
						name: "GPT-4",
						maxLength: 32000,
						tokenLimit: 8000,
						completionTokenLimit: 5000,
						deploymentName: "gpt-4"
					},
					messages: [
						{ pluginId: null, content: inputText, role: "user" }
					],
					prompt: "",
					temperature: 0.5
				}, {
					headers: {
						"Accept": "/*/",
						"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
					}
				});

				let result = response.data;
				console.log('Respons dari OpenAI:', result);
				return result.replace(/\*\*(.*?)\*\*/g, '*$1*'); // Memperbaiki format Markdown
			} catch (err) {
				console.error('Kesalahan saat menghubungi OpenAI:', err);
				return 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';
			}
		}

		// Proses media yang dikirim oleh pengguna
		if (m.hasMedia) {
			const extractedText = await processMediaMessage();
			const finalResponse = await askOpenAI(extractedText);
			m.reply(finalResponse);
		} else if (text) {
			const finalResponse = await askOpenAI(text);
			m.reply(finalResponse);
		}
	}
		break;
	case 'deepseek': {
		m.reply(mess.wait); // Mengirimkan pesan menunggu
	
		const fetch = require('node-fetch'); // Pastikan kamu sudah install node-fetch
	
		let content = args.join(' '); // Mengambil input dari user
	
		// Mengirim permintaan ke API deepseek
		let response = await fetch(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(content)}`);
		let data = await response.json(); // Mengambil data dalam format JSON
	
		if (data.status) {
			// Jika statusnya true, kirimkan data balasan
			m.reply(data.data);
		} else {
			// Jika status false, kirimkan pesan error
			m.reply('Terjadi kesalahan. Coba lagi nanti.');
		}
	}
		break;
	case 'jokosijawa': case 'sijawa': {
		m.reply(mess.wait);
		const fetch = require('node-fetch');
		let content = args.join(' ');
		let response = await fetch(`https://api.siputzx.my.id/api/ai/joko?content=${encodeURIComponent(content)}`);
		let data = await response.json(); // Mengambil data dalam format JSON
		if (data.status) {
			m.reply(data.data);
		} else {
			m.reply('Terjadi kesalahan. Coba lagi nanti.');
		}
	}
		break;
	case 'simi':case 'woi':  {
		if (!text) return m.reply(`Example: ${prefix + command} (pertanyaan)`);
		try {
			const hasil = await simi(text);
			m.reply(hasil.success);
		} catch (e) {
			m.reply('❌ Server simi sedang offline!');
		}
	}
	break;
	case 'txt2img': case 'texttoimage': {
		if (!text) return m.reply(`Example: ${prefix + command} anime, HD`);
		try {
			await naze.sendFileUrl(m.chat, `https://widipe.com/ai/text2img?text=${encodeURIComponent(text)}`, 'Done', m);
		} catch (e) {
			m.reply('❌ Gagal membuat gambar!');
		}
	}
	break;
	//==================================================================
	// botmenu = 27
	case 'allinfo': {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
	
		// Format tampilan pesan
		let responseMessage = `
╔═〇 *BOT INFO* 
╠═════════〇
╠» *Total Fitur*         : ${totalfitur}
╠» *Mode*                  :  ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
╚» *Pengguna*         : ${Object.keys(global.db.users).length}


╔═〇 *JARINGAN INFO* 
╠═════════〇
╠» *Respon    :* ${latensi.toFixed(4)} detik
╠» *Ping*          : ${(oldd - neww).toFixed(4)} milidetik
╚» *Status Koneksi :* ${latensi < 1 ? 'Stabil' : 'Tidak Stabil'}


╔═〇 *RUN TIME* 
╠═════════〇
╚» ${runtime(process.uptime())}`;
	
		// Mengirimkan pesan
		m.reply(responseMessage);
	}
	break;
	case 'confes': case 'confess': case 'menfes': case 'menfess': {
		if (m.isGroup) return m.reply(mess.private)
		if (menfes[m.sender]) return m.reply(`Kamu Sedang Berada Di Sesi ${command}!`)
		if (!text) return m.reply(`Example : ${prefix + command} 62xxxx|Nama Samaran`)
		let [teks1, teks2] = text.split`|`
		if (teks1) {
			const tujuan = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
			const onWa = await naze.onWhatsApp(tujuan)
			if (!onWa.length > 0) return m.reply('Nomer Tersebut Tidak Terdaftar Di Whatsapp!')
			menfes[m.sender] = {
				tujuan: tujuan,
				nama: teks2 ? teks2 : 'Orang',
				waktu: setTimeout(() => {
					if (menfes[m.sender]) m.reply(`_Waktu ${command} habis_`)
					delete menfes[m.sender];
				}, 600000)
			};
			menfes[tujuan] = {
				tujuan: m.sender,
				nama: 'Penerima',
				waktu: setTimeout(() => {
					if (menfes[tujuan]) naze.sendMessage(tujuan, { text: `_Waktu ${command} habis_` });
					delete menfes[tujuan];
				}, 600000)
			};
			naze.sendMessage(tujuan, { text: `_${command} connected_\n*Note :* jika ingin mengakhiri ketik _*${prefix}del${command}*_` });
			m.reply(`_Memulai ${command}..._\n*Silahkan Mulai kirim pesan/media*\n*Durasi ${command} hanya selama 10 menit*\n*Note :* jika ingin mengakhiri ketik _*${prefix}del${command}*_`)
		} else {
			m.reply(`Masukkan Nomernya!\nExample : ${prefix + command} 62xxxx|Nama Samaran`)
		}
	}
	break
	case 'delconfes': case 'delconfess': case 'delmenfes': case 'delmenfess': {
		if (!menfes[m.sender]) return m.reply(`Kamu Tidak Sedang Berada Di Sesi ${command.split('del')[1]}!`)
		let anu = menfes[m.sender]
		naze.sendMessage(anu.tujuan, { text: `Chat Di Akhiri Oleh ${anu.nama ? anu.nama : 'Seseorang'}` })
		m.reply(`Sukses Mengakhiri Sesi ${command.split('del')[1]}!`)
		delete menfes[anu.tujuan];
		delete menfes[m.sender];
	}
	break
	case 'addmsg': {
		if (!isCreator) return m.reply(mess.owner)
		if (!m.quoted) return m.reply('Reply Pesan Yang Ingin Disave Di Database')
		if (!text) return m.reply(`Example : ${prefix + command} waalaikumsalam`)
		let msgs = db.database
		if (text.toLowerCase() in msgs) return m.reply(`'${text}' telah terdaftar di list pesan`)
		msgs[text.toLowerCase()] = m.quoted
		delete msgs[text.toLowerCase()].chat
		m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'\nAkses otomatis dengan mengirim '${text}'\nLihat list Pesan Dengan ${prefix}listmsg`)
	}
	break
	case 'delmsg': case 'deletemsg': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply('Nama msg yg mau di delete?')
		let msgs = db.database
		if (text == 'allmsg') {
			db.database = {}
			m.reply('Berhasil menghapus seluruh msg dari list pesan')
		} else {
			if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' tidak terdaftar didalam list pesan`)
			delete msgs[text.toLowerCase()]
			m.reply(`Berhasil menghapus '${text}' dari list pesan`)
		}
	}
	break
	case 'getgalau':   {
		const dirPath = './data/assets/galau/';
		const soundFiles = fs.readdirSync(dirPath);
	
		// Jika tidak ada file di folder
		if (soundFiles.length === 0) {
			return m.reply('Tidak ada file di folder ini.');
		}
	
		// Mengurutkan file berdasarkan nama secara abjad
		const sortedFiles = soundFiles.sort((a, b) => a.localeCompare(b));
	
		// Jika tidak ada argumen, tampilkan daftar lagu
		if (args.length < 1) {
			let listMessage = '*Gunakan perintah seperti ini:*\ngetgalau (nomor urut lagu)\n\n*List Nomor Lagu:*\n';
	
			// Menambahkan nomor urut dan judul lagu pada daftar
			sortedFiles.forEach((file, index) => {
				listMessage += `${index + 1}. ${file.replace('.mp3', '')}\n`;
			});
	
			return m.reply(listMessage); // Mengirim daftar lagu dan instruksi penggunaan
		}
	
		// Jika ada argumen, cari lagu berdasarkan nomor urut
		const laguIndex = parseInt(args[0]) - 1;
	
		if (isNaN(laguIndex) || laguIndex < 0 || laguIndex >= sortedFiles.length) {
			return m.reply('Nomor lagu tidak valid. Mohon pilih nomor yang sesuai dari daftar.');
		}
	
		const selectedFile = sortedFiles[laguIndex];
		const filePath = `${dirPath}${selectedFile}`;
		const judul = selectedFile.replace('.mp3', '');
	
		// Mengirimkan file sebagai pesan suara (VN)
		try {
			m.reply(`Mengirimkan file *${judul}*...\n\nJangan galau terus yaaa🥹🥺\n_kalau ada masalah cerita aja gak papa kok_`);
			await naze.sendMessage(m.chat, { audio: fs.readFileSync(filePath), mimetype: 'audio/mp4', ptt: true }, { quoted: m });
		} catch (err) {
			m.reply(`Terjadi kesalahan saat mengirim file: ${err.message}`);
		}
	}
	break;
	case 'getmsg':  {
		if (!text) return m.reply(`Example : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`)
		let msgs = db.database
		if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' tidak terdaftar di list pesan`)
		await naze.relayMessage(m.chat, msgs[text.toLowerCase()], {})
	}
	break
	case 'listmsg': {
		let seplit = Object.entries(db.database).map(([nama, isi]) => { return { nama, message: getContentType(isi) }})
		let teks = '「 LIST DATABASE 」\n\n'
		for (let i of seplit) {
			teks += `${setv} *Name :* ${i.nama}\n${setv} *Type :* ${i.message?.replace(/Message/i, '')}\n───────────────\n`
		}
		m.reply(teks)
	}
	break
	case 'listimage':  {
		let teks = '┌──⭓「 *Image List* 」\n│\n'
		for (let x of ImageNano) {
		teks += `│⭔ ${x}\n`
		}
		teks += `│\n└────────────⭓\n\n*total : ${ImageNano.length}*`
		m.reply(teks)
		}
	break
	case 'listvideo':  {
		let teks = '┌──⭓「 *Video List* 」\n│\n'
		for (let x of VideoNano) {
		teks += `│⭔ ${x}\n`
		}
		teks += `│\n└────────────⭓\n\n*total : ${VideoNano.length}*`
		m.reply(teks)
		}
	break
	case 'liststicker':{
		let teks = '┌──⭓「 *Sticker List* 」\n│\n'
		for (let x of NanoSticker) {
		teks += `│⭔ ${x}\n`
		}
		teks += `│\n└────────────⭓\n\n*total : ${NanoSticker.length}*`
		m.reply(teks)
		}
	break
	case 'listgalau':  {
		const dirPath = './data/assets/galau/';
		
		// Mengambil semua file dari folder
		const soundFiles = fs.readdirSync(dirPath);
		
		if (soundFiles.length === 0) {
			return m.reply('Tidak ada file di folder ini.');
		}
		
		// Mengurutkan file berdasarkan nama secara abjad
		const sortedFiles = soundFiles.sort((a, b) => a.localeCompare(b));
		
		// Membuat teks daftar lagu dengan nomor urut
		let listMessage = "🎶 Daftar Lagu Galau 🎶\n\n";
		sortedFiles.forEach((file, index) => {
			listMessage += `${index + 1}. ${file.replace('.mp3', '')}\n`;
		});
		
		// Mengirim pesan daftar lagu tanpa tombol
		await m.reply(listMessage);
	}
	break;	
	case 'inspect': {
		if (!text) return m.reply('Masukkan Link Group!')
		let code = q.match(/chat.whatsapp.com\/([\w\d]*)/g);
		if (code === null) return m.reply('No invite url detected.');
		code = code[0].replace('chat.whatsapp.com/', '');
		await naze.groupGetInviteInfo(code).then(anu => {
			let { id, subject, owner, subjectOwner, creation, desc, descId, participants, size, descOwner } = anu
			console.log(anu);
			let par = `*Nama Gc* : ${subject}\n*ID* : ${id}\n${owner ? `*Creator* : @${owner.split('@')[0]}` : '*Creator* : -'}\n*Jumlah Member* : ${size}\n*Gc Dibuat Tanggal* : ${new Date(creation * 1000).toLocaleString()}\n*DescID* : ${descId ? descId : '-'}\n${subjectOwner ? `*Nama GC Diubah Oleh* : @${subjectOwner.split('@')[0]}` : '*Nama GC Diubah Oleh* : -'}\n${descOwner ? `*Desc diubah oleh* : @${descOwner.split('@')[0]}` : '*Desc diubah oleh* : -'}\n\n*Desc* : ${desc ? desc : '-'}\n`;
			naze.sendTextMentions(m.chat, par, m);
		}).catch((res) => {
			if (res.data == 406) return m.reply('Grup Tidak Di Temukan❗');
			if (res.data == 410) return m.reply('Url Grup Telah Di Setel Ulang❗');
		});
	}
	break
	case 'npm': case 'npmjs': {
		if (!text) return m.reply(`Example: ${prefix + command} axios`)
		let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
		let { objects } = await res.json()
		if (!objects.length) return m.reply('Pencarian Tidak di temukan')
		let txt = objects.map(({ package: pkg }) => {
			return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
		}).join`\n\n`
		m.reply(txt)
	}
	break
	case 'ping':  case 'botstatus':   case 'statusbot': {
		
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		
		// Format tampilan pesan
		let responseMessage = `
		🚀 *Respon    :* ${latensi.toFixed(4)} detik
		📶 *Ping          :* ${(oldd - neww).toFixed(4)} milidetik
		🌐 *Status Koneksi :* ${latensi < 1 ? 'Stabil' : 'Tidak Stabil'}\n
		⏳ *Waktu Aktif :*\n         ${runtime(process.uptime())}\n
		`;
		
		// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULSTART',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'quoted': case 'q':  {
		if (!m.quoted) return m.reply('Reply Pesannya!')
		const anu = await m.getQuotedObj()
		if (!anu) return m.reply('Format Tidak Tersedia!')
		if (!anu.quoted) return m.reply('Pesan Yang Anda Reply Tidak Mengandung Reply')
		await naze.relayMessage(m.chat, { [anu.quoted.type]: anu.quoted.msg }, {})
	}
	break
	case 'react':   {
		naze.sendMessage(m.chat, { react: { text: args[0], key: m.quoted ? m.quoted.key : m.key }})
	}
	break
	case 'read': case 'readviewonce': case 'readviewone': case 'rvo': {
	if (!m.quoted) return m.reply(`Reply view once message\nExample: ${prefix + command}`);

	try {
		let msg = m.quoted;
		let type = Object.keys(msg.message)[0]; // Dapatkan tipe pesan (imageMessage/videoMessage/etc)

		if (type.endsWith('Message') && msg.message[type].viewOnce) {
			let stream = await downloadContentFromMessage(msg.message[type], type.replace('Message', ''));
			let buffer = Buffer.from([]);
			
			for await (const chunk of stream) {
				buffer = Buffer.concat([buffer, chunk]); // Gabungkan data media yang diunduh
			}

			let mimetype = msg.message[type].mimetype;
			let caption = msg.message[type].caption || ''; // Ambil caption jika ada

			await naze.sendMessage(m.chat, { 
				image: buffer,  // Bisa juga video: { video: buffer }
				mimetype, 
				caption: caption // Tambahkan caption jika ada
			}, { quoted: m });

		} else {
			m.reply(`Reply view once message\nExample: ${prefix + command}`);
		}
	} catch (e) {
		console.error(e);
		m.reply('Gagal memproses media!');
	}
}
break;
	case 'tagme':   {
		naze.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
	}
	break
	case 'runtime': case 'rt': case 'tes' : {
    // Menampilkan waktu bot aktif
    naze.sendMessage(m.chat, { 
        text: `*BangsulBotz 🤖 Aktif Selama:*\n\n ⏳ *Durasi Aktif:*\n       *${runtime(process.uptime())}*\n\n🧑‍ *Pengguna*         : ${Object.keys(global.db.users).length}` 
    }, { quoted: m });
}
break;
	case 'speedtest': case 'speed': {
		m.reply('_Testing Speed..._')
		let cp = require('child_process')
		let { promisify } = require('util')
		let exec = promisify(cp.exec).bind(cp)
		let o
		try {
			o = await exec('python3 speed.py')
		} catch (e) {
			o = e
		} finally {
			let { stdout, stderr } = o
			if (stdout.trim()) m.reply(stdout)
			if (stderr.trim()) m.reply(stderr)
		}
	}
	break
	case 'totalfitur': {
		m.reply(`Total Fitur : ${totalfitur}`);
	}
	break
	case 'database':   case 'db':   case 'totaluser':   case 'totalpengguna': {
    // Menghitung asal negara pengguna di database
    let userKeys = Object.keys(global.db.users);
    let countryCount = {};
    let unknownCountryCount = {};
    
    for (let user of userKeys) {
        let countryCode = user.split('@')[0].slice(0, 3); // Ambil 3 digit pertama
        let countryName = countryCodes[countryCode] || countryCodes[countryCode.slice(0, 2)];

        if (!countryName) {
            countryName = `Negara Tidak Diketahui (${countryCode})`;
            unknownCountryCount[countryCode] = (unknownCountryCount[countryCode] || 0) + 1; // Menghitung berdasarkan kode negara
        } else {
            countryCount[countryName] = (countryCount[countryName] || 0) + 1;
        }
    }

    let runtimeText = `🧑‍ *Pengguna*         : ${Object.keys(global.db.users).length} *user*\n\n🌍 *Statistik Asal Negara Pengguna Bot*\n`;

    // Menampilkan statistik untuk negara yang diketahui
    for (let [country, count] of Object.entries(countryCount)) {
        runtimeText += `*${country}* : ${count} pengguna\n`;
    }

    // Menampilkan negara yang tidak diketahui dengan kode negara
    if (Object.keys(unknownCountryCount).length > 0) {
        runtimeText += `\n🚫 *Kode Negara Tidak Diketahui*\n`;
        for (let [countryCode, count] of Object.entries(unknownCountryCount)) {
            runtimeText += `+${countryCode} = ${count} user\n`;
        }
    }

    // Mengirimkan hasil statistik negara
    m.reply(runtimeText);
}
break;
	case 'req': case 'request': {
		if (!text) return m.reply('Mau Request apa ke Owner?')
		await naze.sendMessage(m.chat, { text: `*Request Telah Terkirim Ke Owner*\n_Terima Kasih🙏_` }, { quoted: m })
		await naze.sendFromOwner(owner, `Pesan Dari : @${m.sender.split('@')[0]}\nUntuk Owner\n\nRequest ${text}`, m, { contextInfo: { mentionedJid: [m.sender], isForwarded: true }})
	}
	break
	case 'owner':   {
		const menunya = `
	Klik foto di atas jika Anda memerlukan bantuan lebih lanjut atau memiliki pertanyaan.
	`;
	
		await naze.sendMessage(m.chat, {
			text: menunya,
			contextInfo: {
				externalAdReply: {
					title: '📞 Owner Information 📞',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.linkwa, // URL GitHub yang dituju
					sourceUrl: my.linkwa, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'githubowner':       {
		// URL gambar untuk thumbnail
		//const thumbnailUrl = 'https://telegra.ph/file/138cbd275bd94d4fb0602.jpg'; // Ganti dengan URL gambar yang sesuai
	
		const menunya = `
	⬆️ *klik gambar profilnya untuk ke GitHub!*
	`;
	
		await naze.sendMessage(m.chat, {
			text: menunya,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULSTART',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'sc': case 'script': {
		let responseMessage = `https://github.com/nazedev/hitori\n⬆️ Itu Sc nya cuy`;
		
		// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULSTART',
					body: 'Follow My Github',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'ownernya':   { //ini ga kehitung
		
		const ownerNumber = '6282268881337'; // Ganti dengan nomor owner Anda
		const ownerName = 'Bangsulstart'; // Nama pemilik atau nama bot
	
		const caption = `📞 *Owner Information* 📞\n\nHalo! Jika Anda memerlukan bantuan lebih lanjut atau memiliki pertanyaan, Anda dapat menghubungi owner kami.\n\n👤 *Nama*: ${ownerName}\n📱 *Nomor*: ${ownerNumber}\n\nTerima kasih telah menggunakan bot kami! 😊`;
	
		// Mengirim pesan dengan informasi owner
		await naze.sendMessage(m.chat, { text: caption });
		
		// Mengirim kontak owner
		await naze.sendContact(m.chat, [{ displayName: ownerName, vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nTEL;type=CELL;waid=${ownerNumber}:${ownerNumber}\nEND:VCARD` }], { quoted: m });
	}
	break;
	case 'runspeed':   { //ini ga kehitung
		m.reply('_Testing Speed..._')
		let cp = require('child_process')
		let { promisify } = require('util')
		let exec = promisify(cp.exec).bind(cp)
		let o
		try {
			o = await exec('python3 runspeed.py')
		} catch (e) {
			o = e
		} finally {
			let { stdout, stderr } = o
			if (stdout.trim()) m.reply(stdout)
			if (stderr.trim()) m.reply(stderr)
		}
	}
	break
	//==================================================================
	// downloadmenu = 7
	case 'gdrive': case 'googledrive':  {
		if (!args[0]) return m.reply(`Enter the Google Drive link`)
			m.reply(mess.wait)
	try {
	let res = await fg.GDriveDl(args[0])
	m.reply(`*GDrive DL*

	•° *Nama:* ${res.fileName}
	• *Size:* ${res.fileSize}
	•° *Type:* ${res.mimetype}`)
	setTimeout(() => {
	naze.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, {})
	}, 1000)
	} catch {
	reply('Error: Check link or try another link') 
	}
	}
	break
	case 'ig': case 'igdl': case 'instagram': {
		try {
			if (!args[0]) return m.reply('Harap masukkan URL Instagram yang valid!', m);
			
			// Ambil data dari API
			const apiUrl = `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(args[0])}`;
			const response = await axios.get(apiUrl);
			
			if (!response.data.status || !response.data.data || response.data.data.length === 0) {
				return m.reply('Gagal mengambil data. Pastikan URL benar dan dapat diakses.', m);
			}
			
			const mediaUrl = response.data.data[0].url; // Ambil URL media
			const isVideo = mediaUrl.includes('.mp4'); // Cek apakah media berupa video
	
			// Kirim media sebagai foto atau video langsung
			if (isVideo) {
				await naze.sendMessage(m.chat, { video: { url: mediaUrl }, caption: 'Berikut hasil unduhan dari Instagram.' }, { quoted: m });
			} else {
				await naze.sendMessage(m.chat, { image: { url: mediaUrl }, caption: 'Berikut hasil unduhan dari Instagram.' }, { quoted: m });
			}
		} catch (error) {
			console.error('Error:', error);
			m.reply('Terjadi kesalahan dalam memproses permintaan.', m);
		}
	}
	break;
	case 'mediafire': case 'mfdl': 
	if (args.length < 1) {
	  return m.reply('Mohon berikan URL MediaFire yang valid!');
	}
	
	let url = args.join(' ').replace(/ /g, '').replace('https://', '').replace('www.', '');
	let apiUrl = `https://api.siputzx.my.id/api/d/mediafire?url=${url}`;
  
	// Mengirimkan permintaan ke API MediaFire
	fetch(apiUrl)
	  .then(response => response.json())
	  .then(async data => {
		if (data.success) {
		  // Mendapatkan URL file untuk diunduh
		  let downloadUrl = data.url;
		  
		  // Unduh file menggunakan URL yang didapat
		  const buffer = await downloadFile(downloadUrl);  // Pastikan Anda punya fungsi untuk mengunduh file
		  
		  // Kirimkan file yang sudah diunduh ke pengguna
		  m.reply('Berikut file yang telah diunduh dari MediaFire:', {
			document: { url: buffer },
			mimetype: 'application/octet-stream', // atau tipe mime sesuai jenis file
			fileName: 'file_unduhan' // Nama file yang diunduh, bisa Anda sesuaikan
		  });
		} else {
		  // Jika gagal
		  m.reply('Gagal mendapatkan link download dari MediaFire. Pastikan URL yang diberikan benar.');
		}
	  })
	  .catch(err => {
		console.log(err);
		m.reply('Terjadi kesalahan saat mengakses API.');
	  });
	break;
	case 'mediafire1': {
		if (!text) return m.reply(`Example: ${prefix + command} https://www.mediafire.com/file/xxxxxxxxx/xxxxx.zip/file`)
		if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return m.reply('Url Invalid!')
		try {
			const anu = await mediafireDl(text)
			await naze.sendMessage(m.chat, { document: { url: anu[0].link }, caption: `*MEDIAFIRE DOWNLOADER*\n\n*${setv} Name* : ${anu[0].name}\n*${setv} Size* : ${anu[0].size}\n*${setv} Type* : ${anu[0].type}\n*${setv} Link* : ${anu[0].link}`, fileName: anu[0].name, mimetype: anu[0].type }, { quoted: m })
		} catch (e) {
			m.reply('Server download sedang offline!')
		}
		}
		break	
	case 'ttmp3': 	case 'tiktokmp3': 	case 'ttaudio': 	case 'tiktokaudio': {
		if (!text) return m.reply(`Example: ${prefix + command} url_tiktok`)
		if (!text.includes('tiktok.com')) return m.reply('Url Tidak Mengandung Result Dari Tiktok!')
		try {
			const hasil = await tiktokDl(text);
			m.reply(mess.wait)
			await naze.sendMessage(m.chat, {
				audio: { url: hasil.music_info.url },
				mimetype: 'audio/mpeg',
				contextInfo: {
					externalAdReply: {
						title: 'TikTok • ' + hasil.author.nickname,
						body: hasil.stats.likes + ' suka, ' + hasil.stats.comment + ' komentar. ' + hasil.title,
						previewType: 'PHOTO',
						thumbnailUrl: hasil.cover,
						mediaType: 1,
						renderLargerThumbnail: true,
						sourceUrl: text
					}
				}
			}, { quoted: m });
		} catch (e) {
			m.reply('Gagal/Url tidak valid!')
		}
		}
		break	
	case 'tiktok': 	case 'tiktokdown': 	case 'ttdown': 		case 'ttdl': 		case 'tt': 			case 'ttmp4': 		case 'ttvideo': 	case 'tiktokmp4': case 'tiktokvideo':  {
			if (!text) return m.reply(`Example: ${prefix + command} url_tiktok`)
			if (!text.includes('tiktok.com')) return m.reply('Url Tidak Mengandung Result Dari TikTok!')
		
			try {
				const hasil = await tiktokDl(text);
			m.reply(mess.wait)
			if (hasil && hasil.size_nowm) {
				await naze.sendFileUrl(m.chat, hasil.data[1].url, '')
			} else {
				for (let i = 0; i < hasil.data.length; i++) {
					await naze.sendFileUrl(m.chat, hasil.data[i].url,'')
				}
			}
		
				// Mengirim Audio
				if (hasil.music_info && hasil.music_info.url) {
					await naze.sendMessage(m.chat, {
						audio: { url: hasil.music_info.url },
						mimetype: 'audio/mpeg',
						contextInfo: {
							externalAdReply: {
								title: 'TikTok • ' + hasil.author.nickname,
								body: hasil.stats.likes + ' suka, ' + hasil.stats.comment + ' komentar. ' + hasil.title,
								previewType: 'PHOTO',
								thumbnailUrl: hasil.cover,
								mediaType: 1,
								renderLargerThumbnail: true,
								sourceUrl: text
							}
						}
					}, { quoted: m });
				} else {
					m.reply('Gagal mengunduh audio!')
				}
			} catch (e) {
				m.reply('Gagal/Url tidak valid!')
			}
		}
		break
	case 'ytmp3': case 'youtubemp3': {
		if (!text) return m.reply(`Contoh: ${prefix + command} url_youtube`);
		if (!text.includes('youtu')) return m.reply('URL Tidak Mengandung Result Dari YouTube!');
		
		m.reply(mess.wait);
	
		try {
			// API utama (er-api.biz.id)
			let apiUrl = `https://er-api.biz.id/dl/ermp3?u=${encodeURIComponent(text)}`;
			let response = await fetch(apiUrl);
			let result = await response.json();
	
			console.log("LOG API Utama:", result); // Debugging log API utama
	
			// Jika API utama gagal atau tidak ada hasil, coba API cadangan
			if (!result.status || !result.hasil || result.hasil.length === 0) {
				console.log("API utama gagal, mencoba API cadangan...");
	
				let backupApiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(text)}`;
				let backupResponse = await fetch(backupApiUrl);
				let backupResult = await backupResponse.json();
	
				console.log("LOG API Cadangan:", backupResult); // Debugging log API cadangan
	
				// Jika API cadangan juga gagal
				if (!backupResult.status || !backupResult.data) {
					return m.reply(`Gagal mendapatkan tautan unduhan dari kedua API. API Error: ${backupResult.error || "Tidak diketahui"}`);
				}
	
				// Menggunakan hasil dari API cadangan
				let audioUrl = backupResult.data.dl;
				let title = backupResult.data.title || `audio_${new Date().getTime()}`; // Menggunakan title jika tersedia
	
				let audioDoc = {
					audio: { url: audioUrl },
					mimetype: 'audio/mp4',
					fileName: `${title}.mp3`
				};
	
				return naze.sendMessage(m.chat, audioDoc, { quoted: m });
			}
	
			// Jika API utama berhasil, gunakan hasil dari API utama
			let audioUrl = result.hasil[0].link_download;
			let title = result.hasil[0].judul || `audio_${new Date().getTime()}`; // Menggunakan title jika tersedia
	
			let audioDoc = {
				audio: { url: audioUrl },
				mimetype: 'audio/mp4',
				fileName: `${title}.mp3`
			};
	
			return naze.sendMessage(m.chat, audioDoc, { quoted: m });
		} catch (error) {
			console.error("Error Fetching API:", error);
			return m.reply("Terjadi kesalahan saat mengunduh audio.");
		}
	}
	break;		
	case 'ytmp4': case 'youtubemp4': {
		if (!text) return m.reply(`Contoh: ${prefix + command} url_youtube`);
		if (!text.includes('youtu')) return m.reply('URL Tidak Mengandung Result Dari YouTube!');
	
		m.reply(mess.wait);
	
		try {
			// API utama (er-api.biz.id)
			let apiUrl = `https://er-api.biz.id/dl/ermp4?u=${encodeURIComponent(text)}`;
			let response = await fetch(apiUrl);
			let result = await response.json();
	
			console.log("LOG API Utama:", result); // Debugging log API utama
	
			// Jika API utama gagal atau tidak ada hasil, coba API cadangan
			if (!result.status || !result.hasil || result.hasil.length === 0) {
				console.log("API utama gagal, mencoba API cadangan...");
	
				let backupApiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`;
				let backupResponse = await fetch(backupApiUrl);
				let backupResult = await backupResponse.json();
	
				console.log("LOG API Cadangan:", backupResult); // Debugging log API cadangan
	
				// Jika API cadangan juga gagal
				if (!backupResult.status || !backupResult.data || !backupResult.data.dl) {
					return m.reply(`Gagal mendapatkan tautan unduhan dari kedua API. API Error: ${backupResult.error || "Tidak diketahui"}`);
				}
	
				// Menggunakan hasil dari API cadangan
				let videoUrl = backupResult.data.dl;
	
				return naze.sendMessage(m.chat, {
					video: { url: videoUrl }
				}, { quoted: m });
			}
	
			// Jika API utama berhasil, gunakan hasil dari API utama
			let videoUrl = result.hasil[0].link_download;
	
			return naze.sendMessage(m.chat, {
				video: { url: videoUrl }
			}, { quoted: m });
		} catch (error) {
			console.error("Error Fetching API:", error);
			return m.reply("Terjadi kesalahan saat mengunduh video.");
		}
	}
	break;
	//==================================================================
	//funmenu = 25
	case 'apakah': {
		let from = m.chat || m.sender;
		if (!text) return m.reply(`Contoh: ${prefix + command} saya menang?`);

		// Variasi teks random dengan emoji yang sesuai
		const possibleAnswers = [
			'Iya 👍', 'Tidak ❌', 'Bisa Jadi 🤔', 
			'Mungkin Saja 🤷‍♂️', 'Coba Tanyakan Dukun 🧙‍♂️', 
			'Pasti ✅', 'Tidak Mungkin 🚫', 'Kemungkinan Besar 💯', 
			'Ragu-ragu 😐', 'Tidak Bisa Dipastikan 🤷‍♀️', 
			'Ya, tapi nanti 🕒', 'Tidak Sekarang ⛔', 
			'Hanya Waktu yang Bisa Menjawab ⏳', 'Tunggu Dulu ⏲️', 
			'Tidak Pernah ❎', 'Sangat Mungkin 👍', 
			'Sama Sekali Tidak 🚫', 'Bisa Juga 🤷‍♂️'
		];

		// Pilih jawaban secara acak
		const randomAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

		// Tampilkan pesan dengan format yang lebih menarik
		const message = `*⏳ Pertanyaan dari  :* @${m.sender.split('@')[0]}\n` +
						`*❓ Pertanyaan           :* apakah ${text}\n` +
						`*📌 Jawaban                :* ${randomAnswer}`;
		naze.sendMessage(from, { text: message, mentions: [m.sender] }, { quoted: m });
	}
	break;
	case 'kapan': case 'kapankah': {
		let from = m.chat || m.sender;
		if (!text) return m.reply(`Contoh: ${prefix + command} saya menang?`);

		// Pilihan waktu dengan unit waktu yang beragam
		const timeUnits = ['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'dekade', 'tahun'];
		
		// Fungsi untuk menghasilkan angka acak untuk waktu
		const randomTime = () => Math.floor(Math.random() * 60) + 1; // Menghasilkan angka antara 1 hingga 60

		// Pilih unit waktu secara acak
		const chosenUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
		
		// Hasil waktu acak
		const randomResult = `${randomTime()} ${chosenUnit} lagi`;

		// Tampilkan pertanyaan dan jawaban dalam format yang lebih menarik
		const message = `*⏳ Pertanyaan dari  :* @${m.sender.split('@')[0]}\n` +
						`*❓ Pertanyaan           :* ${text}\n` +
						`*🕰️ Jawaban                :* ${randomResult}`;

		// Mengirimkan pesan dengan format yang keren
		naze.sendMessage(from, { text: message, mentions: [m.sender] }, { quoted: m });
	}
	break;
	case 'siapa': case 'siapakah': {
		if (!m.isGroup) return m.reply(mess.group);
		
		// Mendapatkan daftar peserta grup
		let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id);
		// Memilih peserta secara acak
		let randomMember = members[Math.floor(Math.random() * members.length)];
		
		// Mendapatkan pertanyaan dari pengguna
		let question = `${text}`;
		// Menambahkan tanda tanya di akhir jika belum ada
		let questionWithMark = question.trim().endsWith('?') ? question : `${question}?`;
		let answer = questionWithMark.replace(/\?$/, ''); // Menghilangkan tanda tanya

		// Ganti "aku" dengan "kamu" dan imbuhan "ku" dengan "mu"
		answer = answer.replace(/\baku\b/g, 'kamu').replace(/ku\b/g, 'mu');

		// Pesan langsung jawaban
		let finalMessage = `*⏳ Pertanyaan dari* @${m.sender.split('@')[0]}\n` +
						`*❓ Pertanyaan :*\n \`siapa ${questionWithMark}\`\n\n` +
						`*📌 Jawaban       :*\n dia @${randomMember.split('@')[0]} ${answer}`;
						
		// Kirim pesan final langsung tanpa proses pengeditan
		await m.reply(finalMessage);
	}
	break;
	case 'cekbau': case 'cekambu': {
		let from = m.chat || m.sender;

		// Daftar aroma bau secara random dalam bahasa Indonesia dan Jawa
		const bauList = [
			'Bau Ketiak 🦨', 'Bau Jengkol 😷', 'Bau Terasi 🦐', 
			'Bau Tahu Busuk 🤢', 'Bau Ngganteng 😎', 'Bau Asem 😖', 
			'Bau Kambing 🐐', 'Bau Pete 🌿', 'Bau Nggak Enak 🤮',
			'Bau Sepatu 👞', 'Bau Nggaring 🥴', 'Bau Kecut 🤢',
			'Bau Wangi Parfum 🌸', 'Bau Dupa 🔥', 'Bau Minyak Kayu Putih 🌿',
			'Bau Kencing 😷', 'Bau Asem Kecut 😖', 'Bau Kopi ☕',
			'Bau Roko 🚬', 'Bau Gembus 👃', 'Bau Angin 😤'
		];

		// Pilih aroma bau secara acak
		const randomBau = bauList[Math.floor(Math.random() * bauList.length)];

		// Format pesan yang akan dikirim
		const message = `*⏳ Pertanyaan dari  :* @${m.sender.split('@')[0]}\n` +
						`*❓ Pertanyaan           :* cek bau\n` +
						`*📌 Bau kamu              :* ${randomBau}`;

		// Mengirimkan pesan dengan format yang keren dan menyebut user
		naze.sendMessage(from, { text: message, mentions: [m.sender] }, { quoted: m });
	}
	break;
	case 'jodoh': case 'jodohku':  {
	if (!m.isGroup) return m.reply(mess.group)
	let member = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let jodoh = pickRandom(member)
	m.reply(`JODOHMU ADALAH🩷

	@${m.sender.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`)
	}
	break
	case 'jadian':       {
	if (!m.isGroup) return m.reply(mess.group)
	let member = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let jadian1 = pickRandom(member)
	let jadian2 = pickRandom(member)
	m.reply(`@${jadian1.split('@')[0]} ❤️ @${jadian2.split('@')[0]}\n
	wuiih udah jadian, semoga sampai ke pelaminan yaa..🤣😹`)
	}
	break
	case 'siapacantik':  {
	if (!m.isGroup) return m.reply(mess.group)
	let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let randomMember = members[Math.floor(Math.random() * members.length)];
	m.reply(`pertanyaan : siapa orang paling CANTIK di grup ini?\n\nhai 🫱🏻‍🫲🏻 @${randomMember.split('@')[0]}\nkamu terpilih menjadi orang paling CANTIK di grup ini🫅🏻\nselamat yaa...🫵🏻🫦🫀`)        
	}

	break
	case 'siapaganteng': {
	if (!m.isGroup) return m.reply(mess.group)
	let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let randomMember = members[Math.floor(Math.random() * members.length)];
	m.reply(`pertanyaan : siapa orang paling GANTENG di grup ini?\n\nhai 🫱🏻‍🫲🏻 @${randomMember.split('@')[0]}\nkamu terpilih menjadi orang paling GANTENG di grup ini🤴🏻\nselamat yaa...🫵🏻🫦🫀`)        
	}

	break
	case 'siapajelek':   {
	if (!m.isGroup) return m.reply(mess.group)
	let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let randomMember = members[Math.floor(Math.random() * members.length)];
	m.reply(`pertanyaan : siapa orang paling JELEK di grup ini?\n\nhai 🫱🏻‍🫲🏻 @${randomMember.split('@')[0]}\nkamu di terpilih menjadi orang PALING JELEK di grup ini\nhaha kasihan jelek...🫵🏻😹💩🤮`)        
	}
	break
	case 'siapagoblok':  {
	if (!m.isGroup) return m.reply(mess.group)
	let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
	let randomMember = members[Math.floor(Math.random() * members.length)];
	m.reply(`*❓ Pertanyaan: Siapa orang paling GOBLOK di grup ini?*\n\nHai 🙏🏻 @${randomMember.split('@')[0]}\nDengan berat hati, kamu terpilih menjadi orang paling GOBLOK di grup ini! 🫵🏻😹💩\n\nSelamat yaa... 🤪`,)        
	}
	break
	case 'cekmati':      {
	let from = m.chat || m.sender;
	if (!m.isGroup) return m.reply('Fitur ini hanya bisa digunakan di dalam grup.')

	const getUsername = (id) => {
	// Mengambil nama kontak dari ID
	return m.message.extendedTextMessage?.contextInfo?.mentionedJid[0]
	? naze.getName(m.message.extendedTextMessage.contextInfo.mentionedJid[0])
	: `@${id.split('@')[0]}`
	}

	const getRandomTime = () => {
	const randomYears = Math.floor(Math.random() * 80) + 1;
	const randomMonths = Math.floor(Math.random() * 12);
	const randomDays = Math.floor(Math.random() * 30);
	const randomHours = Math.floor(Math.random() * 24);
	const randomMinutes = Math.floor(Math.random() * 60);
	const randomSeconds = Math.floor(Math.random() * 60);
	return {
	years: randomYears,
	months: randomMonths,
	days: randomDays,
	hours: randomHours,
	minutes: randomMinutes,
	seconds: randomSeconds
	};
	}

	const deathTime = getRandomTime();
	const targetUser = m.sender;
	const username = getUsername(targetUser);

	const pesan = `
	🌟 *Ramalan Kehidupan* 🌟
	🧑 *Pengguna*: ${username}
	⏳ *Sisa Umur*: ${deathTime.years} tahun, ${deathTime.months} bulan, ${deathTime.days} hari, ${deathTime.hours} jam, ${deathTime.minutes} menit, ${deathTime.seconds} detik lagi\n
	⚠️ *Pesan*: "Waktumu terbatas, ${username}. Jangan lupa untuk selalu berbuat baik dan cepat bertaubat. Setiap detik adalah anugerah, gunakanlah dengan bijak."\n
	💭 *Ingat*: Hanya Tuhan yang tahu kapan kita akan dipanggil. Ini hanyalah sebuah hiburan, jangan diambil serius. 😊
	`;

	await naze.sendMessage(from, { text: pesan, mentions: [targetUser] }, { quoted: m });
	}
	break;
	case 'ceksifat':     {
	let sifat_a = ['Bijak','Sabar','Kreatif','Humoris','Mudah bergaul','Mandiri','Setia','Jujur','Dermawan','Idealis','Adil','Sopan','Tekun','Rajin','Pemaaf','Murah hati','Ceria','Percaya diri','Penyayang','Disiplin','Optimis','Berani','Bersyukur','Bertanggung jawab','Bisa diandalkan','Tenang','Kalem','Logis'];
	let sifat_b = ['Sombong','Minder','Pendendam','Sensitif','Perfeksionis','Caper','Pelit','Egois','Pesimis','Penyendiri','Manipulatif','Labil','Penakut','Vulgar','Tidak setia','Pemalas','Kasar','Rumit','Boros','Keras kepala','Tidak bijak','Pembelot','Serakah','Tamak','Penggosip','Rasis','Ceroboh','Intoleran'];

	let teks = `
	┏━━━━━━━━━━━━━━━┓
	┃   𝓒𝓮𝓴 𝓢𝓲𝓯𝓪𝓽   ┃
	┗━━━━━━━━━━━━━━━┛
	┃• Nama: ${text && m.mentionedJid ? text : '@' + m.sender.split('@')[0]}
	┃• Orang yang: *${pickRandom(sifat_a)}*
	┃• Kekurangan: *${pickRandom(sifat_b)}*
	┃
	┏━━━━━━━━━━━━━━━┓
	┃   𝓟𝓮𝓷𝓲𝓵𝓪𝓲𝓪𝓷   ┃
	┗━━━━━━━━━━━━━━━┛
	┃• Keberanian: *${Math.floor(Math.random() * 100)}%*
	┃• Kepedulian: *${Math.floor(Math.random() * 100)}%*
	┃• Kecemasan: *${Math.floor(Math.random() * 100)}%*
	┃• Ketakutan: *${Math.floor(Math.random() * 100)}%*
	┃• Akhlak Baik: *${Math.floor(Math.random() * 100)}%*
	┃• Akhlak Buruk: *${Math.floor(Math.random() * 100)}%*
	┗━━━━━━━━━━━━━━━━━┛
	🌟 𝓓𝓲𝓷𝓲𝓵𝓪𝓲 𝓼𝓮𝓬𝓪𝓻𝓪 𝓪𝓬𝓪𝓴! 🌟
	`;

	m.reply(teks);
	}
	break;
	case 'cekkhodam':    {
		if (!text) return m.reply(`📖 *Cara Penggunaan:*\nKetik: *${prefix + command} [Nama Kamu]*\n\n📌 *Contoh:* ${prefix + command} Budi`);
		
		// Ambil data secara acak dari JSON
		const hasil = pickRandom(await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/random/cekkhodam.json'));

		// Pesan respons dengan format yang lebih menarik
		let pesan = `*Hasil Penelusuran Khodam* \n\n` +
					`🔮 *Nama*: ${text}\n` +
					`🕊️ *Khodam Anda*: *${hasil.nama}*\n\n` +
					`📖 *Keterangan Khodam:*\n_${hasil.deskripsi}_`;

		// Kirim respons ke pengguna
		m.reply(pesan);
	}
	break;
	case 'checkme': case 'cekaku': {
	if (!m.isGroup) return m.reply(mess.group);

	const getUsername = (id) => {
	// Mengambil nama kontak dari ID
	return naze.getName(id) || `@${id.split('@')[0]}`;
	}

	const username = getUsername(m.sender);

	// Data acak
	const sifat = ["Baik", "Tidak ramah", "Chapri", "Nibba/nibbi", "Mengganggu", "Rusak", "Orang marah", "Sopan", "Beban", "Hebat", "Cringe", "Pembohong"];
	const hobi = ['Memasak', 'Menari', 'Bermain', 'Bermain game', 'Melukis', 'Membantu Orang Lain', 'Menonton anime', 'Membaca', 'Bersepeda', 'Bernyanyi', 'Berbincang-bincang', 'Berbagi Meme', 'Menggambar', 'Menghabiskan Uang Orang Tua', 'Bermain Truth or Dare', 'Menghabiskan Waktu Sendirian'];
	const percentages = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
	const cakep = ['Ya', 'Tidak', 'Sangat jelek', 'Sangat tampan'];
	const watak = ['Peduli', 'Murah hati', 'Orang marah', 'Maaf', 'Tunduk', 'Baik', 'Maafkan aku', 'Berhati baik', 'Sabar', 'UwU', 'Terbaik', 'Membantu'];

	// Pilihan acak
	const randomSifat = sifat[Math.floor(Math.random() * sifat.length)];
	const randomHobi = hobi[Math.floor(Math.random() * hobi.length)];
	const randomBucin = percentages[Math.floor(Math.random() * percentages.length)];
	const randomGreat = percentages[Math.floor(Math.random() * percentages.length)];
	const randomCakep = cakep[Math.floor(Math.random() * cakep.length)];
	const randomWatak = watak[Math.floor(Math.random() * watak.length)];
	const randomBaik = percentages[Math.floor(Math.random() * percentages.length)];
	const randomBuruk = percentages[Math.floor(Math.random() * percentages.length)];
	const randomCerdas = percentages[Math.floor(Math.random() * percentages.length)];
	const randomBerani = percentages[Math.floor(Math.random() * percentages.length)];
	const randomPenakut = percentages[Math.floor(Math.random() * percentages.length)];

	// Teks Profil dengan Visual yang Ditingkatkan
	const profileText = `
	╭━━━━━━━━━━━━━━━╮
	┃      ≡《 👤 Check *${username}* 》≡         ┃
	╰━━━━━━━━━━━━━━━╯

	*🌟 Nama:* ${m.pushName ? m.pushName : 'Tanpa Nama'}
	*🧬 Karakteristik:* ${randomSifat}
	*🎨 Hobi:* ${randomHobi}
	*❤️ Bucin Level:* ${randomBucin}%
	*💪 Greatness Level:* ${randomGreat}%
	*💋 Ganteng/Cantik:* ${randomCakep}
	*🌈 Watak:* ${randomWatak}
	*👍 Moral Baik:* ${randomBaik}%
	*👎 Moral Buruk:* ${randomBuruk}%
	*🧠 Kecerdasan:* ${randomCerdas}%
	*🛡️ Keberanian:* ${randomBerani}%
	*😱 Penakut:* ${randomPenakut}%
	`;

	// Mengirim pesan dengan profil pengguna
	naze.sendMessage(m.chat, { text: profileText }, { quoted: m });
	}
	break;
	case 'jelekcek': case 'jomblocek': case 'gaycek': case 'imutcek': case 'lesbicek': case 'gantengcek': case 'cantikcek': case 'goblokcek': case 'bodohcek': case 'gilacek':case 'pintarcek': {
		if (!m.isGroup) return m.reply(mess.group);

		// Mendapatkan nama perintah sebagai pertanyaan
		const pertanyaan = command; 
		const persentase = Math.floor(Math.random() * 100) + 1;

		// Fungsi untuk mendapatkan nama pengguna
		const getUsername = (id) => {
			let contact;
			if (m.message?.extendedTextMessage?.contextInfo) {
				contact = m.message.extendedTextMessage.contextInfo.mentionedJid
					? m.message.extendedTextMessage.contextInfo.mentionedJid[0]
					: id;
			} else {
				contact = id;
			}

			// Pastikan contact adalah string yang valid
			return (typeof contact === 'string' && contact.endsWith('@s.whatsapp.net'))
				? naze.getName(contact) || `@${contact.split('@')[0]}`
				: `@${id.split('@')[0]}`;
		};

		// Mengambil username dari pengirim atau target
		const target = m.sender;
		const username = getUsername(target);

		// Membuat pesan respon dengan format yang menarik
		const pesanRespon = `
	*📝 Pertanyaan :* ${pertanyaan.charAt(0).toUpperCase() + pertanyaan.slice(1)}
	*👤 Pemeriksa   :* @${m.sender.split('@')[0]}
	*🔮 Jawaban      :* ${persentase}%`;

		// Mengirimkan pesan dengan mentions dan format yang lebih menarik
		naze.sendMessage(m.chat, { text: pesanRespon, mentions: [target] }, { quoted: m });
	}
	break;
	case 'kontolcek':    {
		if (!m.isGroup) return m.reply(mess.group);
		const pertanyaan = command; 
		// Fungsi untuk mendapatkan nama pengguna
		const getUsername = (id) => {
			let contact;
			if (m.message?.extendedTextMessage?.contextInfo) {
				contact = m.message.extendedTextMessage.contextInfo.mentionedJid
					? m.message.extendedTextMessage.contextInfo.mentionedJid[0]
					: id;
			} else {
				contact = id;
			}

			// Pastikan contact adalah string yang valid
			return (typeof contact === 'string' && contact.endsWith('@s.whatsapp.net'))
				? naze.getName(contact) || `@${contact.split('@')[0]}`
				: `@${id.split('@')[0]}`;
		};

		// Mendapatkan ukuran kelamin secara acak
		const panjang = Math.floor(Math.random() * 100) + 1; // Nilai random antara 1-100
		const satuan = ['cm', 'meter', 'mm', 'km']; // Pilihan satuan
		const randomSatuan = satuan[Math.floor(Math.random() * satuan.length)]; // Pilih satuan random

		// Mengambil username dari pengirim
		const target = m.sender;
		const username = getUsername(target);

		// Membuat pesan respon dengan format yang menarik
		const pesanRespon = `
	*📝 Pertanyaan :* ${pertanyaan.charAt(0).toUpperCase() + pertanyaan.slice(1)}
	*👤 Pemeriksa   :* @${m.sender.split('@')[0]}
	*📏 Ukuran        :* ${panjang} ${randomSatuan}`;

		// Mengirimkan pesan dengan mentions dan format yang lebih menarik
		naze.sendMessage(m.chat, { text: pesanRespon, mentions: [target] }, { quoted: m });
	}
	break;
//==================================================================
// gamemenu = 11
	case 'caklontong':   {
		if (iGame(caklontong, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/caklontong.json')));
		let { key } = await m.reply(`🎮 Jawab Pertanyaan Berikut :\n\n${hasil.soal}\n\nWaktu : 60s\n`)
		caklontong[m.chat + key.id] = {
			...hasil,
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(60000); // Tunggu selama 60 detik
		if (rdGame(caklontong, m.chat, key.id)) {
			m.reply(`Waktu Habis\nJawaban: ${caklontong[m.chat + key.id].jawaban}\n"${caklontong[m.chat + key.id].deskripsi}"`)
			delete caklontong[m.chat + key.id]
		}
	}
	break
	case 'family100':    {
		let id = m.chat;
		if (id in family100) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!');

		let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json();
		let json = src[Math.floor(Math.random() * src.length)];
		let winScore = 10000;

		let soal = `*🎮 GAME FAMILY 100 🎮*\n\n*Soal:*\n ${json.soal}\n\n*keterangan!!!*\nTerdapat *${json.jawaban.length}* jawaban ${json.jawaban.find(v => v.includes(' ')) ? `(beberapa jawaban terdapat spasi)\n\n` : ''}`;

		family100[id] = {
			id,
			msg: await m.reply(soal),
			...json,
			terjawab: Array.from(json.jawaban, () => false),
			winScore,
		};
	}
	break;
	case 'mtk': case 'math': case 'matematika': {
		const { genMath, modes } = require('./lib/math');
		const inputMode = ['noob', 'easy', 'medium', 'hard', 'extreme', 'impossible', 'impossible2'];

		if (iGame(kuismath, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!');
		if (!text) return m.reply(`Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix}math medium`);
		if (!inputMode.includes(text.toLowerCase())) return m.reply('Mode tidak ditemukan!');

		let result = await genMath(text.toLowerCase());
		let { key } = await m.reply(`*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nWaktu : 60 detik`);

		// Menyimpan informasi permainan di kuismath
		kuismath[m.chat + key.id] = {
			jawaban: result.jawaban,
			mode: text.toLowerCase(),
			id: key.id
		};

		// Menggunakan setTimeout untuk memberikan hitung mundur tanpa memblokir thread utama
		setTimeout(() => {
			if (kuismath[m.chat + key.id]) {
				m.reply('Waktu Habis\nJawaban: ' + kuismath[m.chat + key.id].jawaban);
				delete kuismath[m.chat + key.id]; // Menghapus sesi permainan setelah waktu habis
			}
		}, 60000); // 60.000 ms = 60 detik
	}
	break;
	case 'susunkata':    {
		if (iGame(susunkata, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/susunkata.json')));
		let { key } = await m.reply(`🎮 Susun Kata Berikut :\n\n${hasil.soal}\nTipe : ${hasil.tipe}\n\nWaktu : 60s\n`)
		susunkata[m.chat + key.id] = {
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(susunkata, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + susunkata[m.chat + key.id].jawaban)
			delete susunkata[m.chat + key.id]
		}
	}
	break
	case 'tebakbendera': {
		if (iGame(tebakbendera, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebakbendera.json')));
		let { key } = await m.reply(`🎮 Tebak Bendera Berikut :\n\n*Bendera : ${hasil.bendera}*\n\nWaktu : 60s\nHadiah *+3499*`)
		tebakbendera[m.chat + key.id] = {
			jawaban: hasil.negara.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(tebakbendera, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebakbendera[m.chat + key.id].jawaban)
			delete tebakbendera[m.chat + key.id]
		}
	}
	break
	case 'tebakgambar':  {
		if (iGame(tebakgambar, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebakgambar.json')));
		let { key } = await naze.sendFileUrl(m.chat, hasil.img, `🎮 Tebak Gambar Berikut :\n\n${hasil.deskripsi}\n\nWaktu : 60s\nHadiah *+3499*`, m)
		tebakgambar[m.chat + key.id] = {
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(tebakgambar, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebakgambar[m.chat + key.id].jawaban)
			delete tebakgambar[m.chat + key.id]
		}
	}
	break
	case 'tebakkata':    {
		if (iGame(tebakkata, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebakkata.json')));
		let { key } = await m.reply(`🎮 Tebak Kata Berikut :\n\n${hasil.soal}\n\nWaktu : 60s\n`)
		tebakkata[m.chat + key.id] = {
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(tebakkata, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebakkata[m.chat + key.id].jawaban)
			delete tebakkata[m.chat + key.id]
		}
	}
	break
	case 'tebakkimia':   {
		if (iGame(tebakkimia, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebakkimia.json')));
		let { key } = await m.reply(`🎮 Tebak Kimia Berikut :\n\n${hasil.unsur}\n\nWaktu : 60s\nHadiah *+3499*`)
		tebakkimia[m.chat + key.id] = {
			jawaban: hasil.lambang.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(tebakkimia, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebakkimia[m.chat + key.id].jawaban)
			delete tebakkimia[m.chat + key.id]
		}
	}
	break
	case 'tebaklirik':   {
		if (iGame(tebaklirik, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebaklirik.json')));
		let { key } = await m.reply(`🎮 Tebak Lirik Berikut :\n\n${hasil.soal}\n\nWaktu : 90s\n`)
		tebaklirik[m.chat + key.id] = {
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(90000); // Tunggu selama 60 detik
		if (rdGame(tebaklirik, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebaklirik[m.chat + key.id].jawaban)
			delete tebaklirik[m.chat + key.id]
		}
	}
	break
	case 'tebaknegara':  {
		if (iGame(tebaknegara, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tebaknegara.json')));
		let { key } = await m.reply(`🎮 Tebak Negara Dari Tempat Berikut :\n\n*Tempat : ${hasil.tempat}*\n\nWaktu : 60s\nHadiah *+3499*`)
		tebaknegara[m.chat + key.id] = {
			jawaban: hasil.negara.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik
		if (rdGame(tebaknegara, m.chat, key.id)) {
			m.reply('Waktu Habis\nJawaban: ' + tebaknegara[m.chat + key.id].jawaban)
			delete tebaknegara[m.chat + key.id]
		}
	}
	break
	case 'tekateki':     {
		if (iGame(tekateki, m.chat)) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/games/tekateki.json')));
		let { key } = await m.reply(`🎮 Teka Teki Berikut :\n\n${hasil.soal}\n\nWaktu : 60s\n`)
		tekateki[m.chat + key.id] = {
			jawaban: hasil.jawaban.toLowerCase(),
			id: key.id
		}
		
	await sleep(30000); // Tunggu selama 60 detik

	if (rdGame(tekateki, m.chat, key.id)) {
		m.reply('Waktu Habis\nJawaban: ' + tekateki[m.chat + key.id].jawaban);
		delete tekateki[m.chat + key.id];
	}
}
break;
	case 'kalikalian':   { //tidak di pakai
		const buttonOptions = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "🧠 PILIH LEVEL MATEMATIKA 🧠",
					sections: [
						{
							title: "💡 BangsulBotz Challenge 💡",
							rows: [
								{ header: "🔰 LEVEL NOOB", title: "💪 Sangat Mudah", description: "Tantangan termudah untuk pemula", id: ".kalikalian noob" },
								{ header: "🔹 LEVEL EASY", title: "😊 Mudah", description: "Tantangan ringan", id: ".kalikalian easy" },
								{ header: "🔸 LEVEL MEDIUM", title: "🤔 Menengah", description: "Untuk yang ingin tantangan sedang", id: ".kalikalian medium" },
								{ header: "🔺 LEVEL HARD", title: "😎 Sulit", description: "Tantangan serius untuk yang berani", id: ".kalikalian hard" },
								{ header: "⚠️ LEVEL EXTREME", title: "😤 Sangat Sulit", description: "Hanya untuk yang benar-benar berani", id: ".kalikalian extreme" },
								{ header: "🚨 LEVEL IMPOSSIBLE", title: "💀 Mustahil (Level 1)", description: "Benar-benar mustahil", id: ".kalikalian impossible" },
								{ header: "💀 LEVEL IMPOSSIBLE 2", title: "👻 Mustahil (Level 2)", description: "Lebih mustahil dari sebelumnya", id: ".kalikalian impossible2" }
							]
						}
					]
				}
			},
			{
				name: "quick_reply",
				buttonParamsJson: {
					display_text: "🎮 GAME LAINNYA 🎮",
					id: ".gamemenu"
				}
			}
		];
	
		await naze.sendButtonMsg(
			m.chat,
			"🧩 Pilih mode matematika yang ingin kamu mainkan:",
			ucapanWaktu,
			"🧠 MATEMATIKA CHALLENGE 🧠",
			null,
			buttonOptions,
			m
		);
	}
	break;
	//==================================================================
	//grupmenu = 23
	case 'add': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
			try {
				await naze.groupParticipantsUpdate(m.chat, [numbersOnly], 'add').then(async (res) =>{
					for (let i of res) {
						let invv = await naze.groupInviteCode(m.chat)
						if (i.status == 408) return m.reply('Dia Baru-Baru Saja Keluar Dari Grub Ini!')
						if (i.status == 401) return m.reply('Dia Memblokir Bot!')
						if (i.status == 409) return m.reply('Dia Sudah Join!')
						if (i.status == 500) return m.reply('Grub Penuh!')
						if (i.status == 403) {
							await naze.sendMessage(m.chat, { text: `@${numbersOnly.split('@')[0]} Tidak Dapat Ditambahkan\n\nKarena Target Private\n\nUndangan Akan Dikirimkan Ke\n-> wa.me/${numbersOnly.replace(/\D/g, '')}\nMelalui Jalur Pribadi`, mentions: [numbersOnly] }, { quoted : m })
							await naze.sendMessage(`${numbersOnly ? numbersOnly : '6282113821188@s.whatsapp.net'}`, { text: `${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin: @${m.sender.split('@')[0]}\nMengundang anda ke group ini\nSilahkan masuk jika berkehendak🙇`, detectLink: true, mentions: [numbersOnly, m.sender] }, { quoted : fkontak }).catch((err) => m.reply('Gagal Mengirim Undangan!'))
						} else if (i.status !== 200) {
							m.reply('Gagal Add User')
						}
					}
				})
			} catch (e) {
				m.reply('Gagal Add User')
			}
		}
	}
	break
	case 'afk': {
		let user = db.users[m.sender]
		user.afkTime = + new Date
		user.afkReason = text
		m.reply(`@${m.sender.split('@')[0]} Telah Afk${text ? '\n\nalasan nya : ' + text : ''}`)
	}
	break
	case 'antidelete': {
		if (!m.isGroup) return m.reply(mess.group);
		if (!m.isAdmin) return m.reply(mess.admin);
		if (!m.isBotAdmin) return m.reply(mess.botAdmin);
	
		if (text === 'on') {
			if (db.groups[m.chat].antidelete) return m.reply('*Sudah Aktif Sebelumnya*');
			db.groups[m.chat].antidelete = true;
			m.reply('*Anti Delete Aktif !*');
		} else if (text === 'off') {
			db.groups[m.chat].antidelete = false;
			m.reply('*Anti Delete Tidak Aktif !*');
		} else {
			m.reply('*Format salah!*\nGunakan perintah:\n➜ *antidelete on* _(untuk mengaktifkan)_\n➜ *antidelete off* _(untuk menonaktifkan)_');
		}
	}
	break;
	case 'antilink': {
		if (!m.isGroup) return m.reply(mess.group);
		if (!m.isAdmin) return m.reply(mess.admin);
		if (!m.isBotAdmin) return m.reply(mess.botAdmin);
	
		if (text === 'on') {
			if (db.groups[m.chat].antilink) return m.reply('*Sudah Aktif Sebelumnya*');
			db.groups[m.chat].antilink = true;
			m.reply('*Anti Link Aktif! Siap untuk kick user yang mengirim link*');
		} else if (text === 'off') {
			db.groups[m.chat].antilink = false;
			m.reply('*Anti Link Tidak Aktif!*');
		} else {
			m.reply('*Format salah!*\nGunakan perintah:\n➜ *antilink on* _(untuk mengaktifkan)_\n➜ *antilink off* _(untuk menonaktifkan)_');
		}
	}
	break;
	case 'antilinkall': {
		if (!m.isGroup) return m.reply(mess.group);
		if (!m.isAdmin) return m.reply(mess.admin);
		if (!m.isBotAdmin) return m.reply(mess.botAdmin);
	
		if (text === 'on') {
			if (db.groups[m.chat].antilinkall) return m.reply('*Anti Link All Sudah Aktif Sebelumnya!*');
			db.groups[m.chat].antilinkall = true;
			m.reply('*Anti Link All Aktif !*');
		} else if (text === 'off') {
			db.groups[m.chat].antilinkall = false;
			m.reply('*Anti Link All Tidak Aktif !*');
		} else {
			m.reply('*Format salah!*\nGunakan perintah:\n➜ *antilinkall on* _(untuk mengaktifkan)_\n➜ *antilinkall off* _(untuk menonaktifkan)_');
		}
	}
	break;
	case 'antivirtex': {
		if (!m.isGroup) return m.reply(mess.group);
		if (!m.isAdmin) return m.reply(mess.admin);
		if (!m.isBotAdmin) return m.reply(mess.botAdmin);
	
		if (text === 'on') {
			if (db.groups[m.chat].antivirtex) return m.reply('*Sudah Aktif Sebelumnya*');
			db.groups[m.chat].antivirtex = true;
			m.reply('*Anti Virtex Aktif !*');
		} else if (text === 'off') {
			db.groups[m.chat].antivirtex = false;
			m.reply('*Anti Virtex Tidak Aktif !*');
		} else {
			m.reply('*Format salah!*\nGunakan perintah:\n➜ *antivirtex on* _(untuk mengaktifkan)_\n➜ *antivirtex off* _(untuk menonaktifkan)_');
		}
	}
	break;
	case 'delete': case 'del': case 'd': {
		if (!m.quoted) return m.reply('Reply pesan yang mau di delete')
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: m.isBotAdmin ? false : true, id: m.quoted.id, participant: m.quoted.sender }})
	}
	break
	case 'demote': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
			await naze.groupParticipantsUpdate(m.chat, [numbersOnly], 'demote').catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'getpp': {
		if (!m.isGroup) return m.reply(mess.group);
	
		// Ambil ID chat dari objek pesan
		let from = m.chat;
	
		// Cek apakah ada mentionedJid atau quoted message
		let userss = (m.mentionedJid && m.mentionedJid[0]) 
					? m.mentionedJid[0] 
					: (m.quoted && m.quoted.sender) 
					? m.quoted.sender 
					: (text && text.trim() !== '') 
					? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
					: null;
		
		if (!userss) return m.reply('Harap mention pengguna atau balas pesan yang akan diambil foto profilnya.');
	
		let ghosst = userss;
		try {
			var ppuser = await naze.profilePictureUrl(ghosst, 'image');
		} catch (err) {
			var ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
		}
	
		await naze.sendMessage(from, { image: { url: ppuser } }, { quoted: m });
	}
	break;
	case 'group': case 'grup': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (text === 'close') {
			await naze.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`*Sukses Menutup Group*`))
		} else if (text === 'open') {
			await naze.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`*Sukses Membuka Group*`))
		} else if (text && text.startsWith('set')) {
			let buttonnya = [{
				name: 'single_select',
				buttonParamsJson: {
					title: 'Pilih',
					sections: [{
						title: 'Mode Group',
						rows: [
							{ title: 'Open Group', description: 'Membuka Group', id: '.grup open' },
							{ title: 'Close Group', description: 'Menutup Group', id: '.grup close' },
						]
					}]
				}
			}]
			await naze.sendButtonMsg(m.chat, 'Mode Group', ucapanWaktu, 'Silahkan dipilih 🎋', null, buttonnya, m);
		} else {
			let anu = db.groups[m.chat]
			m.reply(`${m.metadata.subject}\n- Anti Link : ${anu.antilink ? '✅' : '❌'}\n- Anti Link all : ${anu.antilinkall ? '✅' : '❌'}\n- Anti Virtex : ${anu.antivirtex ? '✅' : '❌'}\n- Anti Delete : ${anu.antidelete ? '✅' : '❌'}\n- Welcome : ${anu.welcome ? '✅' : '❌'}`)
		}
	}
	break
	case 'hidetag': case 'h': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		naze.sendMessage(m.chat, { text : q ? q : '' , mentions: m.metadata.participants.map(a => a.id)}, { quoted: m })
	}
	break
	case 'kick': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
			await naze.groupParticipantsUpdate(m.chat, [numbersOnly], 'remove').catch((err) => m.reply('Gagal Kick User!'))
		}
	}
	break
	case 'linkgroup': case 'linkgrup': case 'linkgc': case 'urlgroup': case 'urlgrup': case 'urlgc': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		let response = await naze.groupInviteCode(m.chat)
		await naze.sendMessage(m.chat, { text: `https://chat.whatsapp.com/${response}\n\nLink Group : ${(await naze.groupMetadata(m.chat)).subject}`, detectLink: true }, { quoted: m });
	}
	break
	case 'listonline': case 'liston': {
		if (!m.isGroup) return m.reply(mess.group)
		let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
		if (!store.presences || !store.presences[id]) return m.reply('Sedang Tidak ada yang online!')
		let online = [...Object.keys(store.presences[id]), botNumber]
		await naze.sendMessage(m.chat, { text: 'List Online:\n\n' + online.map(v => setv + ' @' + v.replace(/@.+/, '')).join`\n`, mentions: online }, { quoted: m }).catch((e) => m.reply('Gagal'))
	}
	break
	case 'newlink': case 'revoke':  case 'newurl': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		await naze.groupRevokeInvite(m.chat).then((a) => {
			m.reply(`Sukses Menyetel Ulang, Tautan Undangan Grup ${m.metadata.subject}`)
		}).catch((err) => m.reply('Gagal!'))
	}
	break
	case 'promote': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
			await naze.groupParticipantsUpdate(m.chat, [numbersOnly], 'promote').catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'setdesc': case 'setdescgc': case 'setdesk': case 'setdeskgc': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} textnya`)
		} else {
			const teksnya = text ? text : m.quoted.text
			await naze.groupUpdateDescription(m.chat, teksnya).catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'setname': case 'setnamegc': case 'setsubject': case 'setsubjectgc': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} textnya`)
		} else {
			const teksnya = text ? text : m.quoted.text
			await naze.groupUpdateSubject(m.chat, teksnya).catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'setppgroups': case 'setppgrup': case 'setppgc': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!m.quoted) return m.reply('Reply Gambar yang mau dipasang di Profile Bot')
		if (!/image/.test(mime) && /webp/.test(mime)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`)
		let media = await naze.downloadAndSaveMediaMessage(quoted, 'ppgc.jpeg')
		if (text.length > 0) {
			let { img } = await generateProfilePicture(media)
			await naze.query({
				tag: 'iq',
				attrs: {
					to: m.chat,
					type: 'set',
					xmlns: 'w:profile:picture'
				},
				content: [{
					tag: 'picture',
					attrs: { type: 'image' },
					content: img
				}]
			})
			await fs.unlinkSync(media)
			m.reply('Sukses')
		} else {
			await naze.updateProfilePicture(m.chat, { url: media })
			await fs.unlinkSync(media)
			m.reply('Sukses')
		}
	}
	break
	case 'tagall': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)

			const pembuka1 = '╔═〇';
			const pembuka2 = '╠═════════〇';
			const pembuka3 = '╚═════════════════〇';
			const fitur1   = '╔»';
			const fitur2   = '╠»';
			const fitur3   = '╚»';
			

let setv = pickRandom(listv)
let teks = `
${pembuka1} *Tag All*
${pembuka2}
${fitur2} *Pesan :* ${q ? q : ''}
${pembuka2}\n`
		for (let mem of m.metadata.participants) {
			teks += `${fitur2} @${mem.id.split('@')[0]}\n`
		}
		await naze.sendMessage(m.chat, { text: teks, mentions: m.metadata.participants.map(a => a.id) }, { quoted: m })
	}
	break
	case 'totag': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply(mess.admin)
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (!m.quoted) return m.reply(`Reply pesan dengan caption ${prefix + command}`)
		delete m.quoted.chat
		await naze.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: m.metadata.participants.map(a => a.id) })
	}
	break
	case 'welcome': {
		if (!m.isGroup) return m.reply(mess.group)
		if (!m.isAdmin) return m.reply('_welcome yang mulia_')
		if (!m.isBotAdmin) return m.reply(mess.botAdmin)
		if (text === 'on') {
			if (db.groups[m.chat].welcome) return m.reply('*Sudah Aktif Sebelumnya*')
			db.groups[m.chat].welcome = true
			m.reply('*Welcome Aktif !*')
		} else if (text === 'off') {
			db.groups[m.chat].welcome = false
			m.reply('*Welcome Tidak Aktif !*')
		} else {
			let buttonnya = [{
				name: 'single_select',
				buttonParamsJson: {
					title: 'Pilih',
					sections: [{
						title: 'Welcome',
						rows: [
							{ title: 'Welcome Aktif', description: 'Mengaktifkan Welcome', id: '.welcome on' },
							{ title: 'Welcome Tidak Aktif', description: 'Mematikan Welcome', id: '.welcome off' },
						]
					}]
				}
			}]
			await naze.sendButtonMsg(m.chat, 'Mode Group', ucapanWaktu, 'Silahkan dipilih 🎋', null, buttonnya, m);
		}
	}
	break
	case 'asalnegara': case'wargagrup': case'asalmember': case 'negaramember':  {
		if (!m.isGroup) return m.reply(mess.group);
	
		let members = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id);
		let countryCount = {};
	
		for (let member of members) {
			let countryCode = member.split('@')[0].slice(0, 3); // Ambil 3 digit pertama
			let countryName = countryCodes[countryCode] || countryCodes[countryCode.slice(0, 2)] || `Negara Tidak Diketahui (${countryCode})`;
	
			countryCount[countryName] = (countryCount[countryName] || 0) + 1;
		}
	
		let result = `🌍 *Statistik Asal Negara Anggota Grup*\n\n`;
		let totalMembers = members.length;
	
		for (let [country, count] of Object.entries(countryCount)) {
			result += `🌎 *${country}* : ${count} anggota\n`;
		}
	
		result += `\n👥 *Total Anggota*: ${totalMembers}`;
	
		await m.reply(result);
	}
	break;
	//==================================================================
	//listsewa = 1
	case 'listsewa': {
		const bukajudul = '╔═════════〇';
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup = '╚═════════════════〇';
	
		m.reply ( `
	${barisjudul} 🎫 *Daftar Harga Sewa* 🎫 
	${penutup}
	
	${barisjudul} 📦 *Paket 1*
	${tutupjudul}
	${barisfitur} 💵 Rp. 5.000 / grup
	${barisfitur} ⏳ Waktu: 7 Hari
	${penutup}
	
	${barisjudul} 📦 *Paket 2*
	${tutupjudul}
	${barisfitur} 💵 Rp. 15.000 / grup
	${barisfitur} ⏳ Waktu: 1 Bulan
	${penutup}
	
	${barisjudul} 📦 *Paket 3*
	${tutupjudul}
	${barisfitur} 💵 Rp. 50.000 / grup
	${barisfitur} ⏳ Waktu: PERMANEN
	${penutup}
	
	Untuk informasi lebih lanjut,
	silakan hubungi \`owner\`. Terima kasih!
	`)}
	break;
	//==================================================================
	// toolsmenu = 49
	case 'brat':case 'bratsticker': case 'bratstiker':case 'bratstick': {
		if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Kirim/reply pesan *${prefix + command}* Teksnya`)
		try {
			await naze.sendAsSticker(m.chat, 'https://brat.caliphdev.com/api/brat?text=' + (text || m.quoted.text), m, { packname: packname, author: author })
			setLimit(m, db)
		} catch (e) {
			try {
				await naze.sendMessage(m.chat, { image: { url: 'https://mannoffc-x.hf.space/brat?q=' + (text || m.quoted.text) }}, { quoted: m })
			} catch (e) {
				m.reply('Server Brat Sedang Offline!')
			}
		}
	}
	break
	case 'bratvid': case 'bratvideo': {
		if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Kirim/reply pesan *${prefix + command}* Teksnya`)
		const teks = (m.quoted ? m.quoted.text : text).split(' ');
		const tempDir = path.join(process.cwd(), 'database/sampah');
		try {
			const framePaths = [];
			for (let i = 0; i < teks.length; i++) {
				const currentText = teks.slice(0, i + 1).join(' ');
				const res = await axios.get('https://brat.caliphdev.com/api/brat?text=' + encodeURIComponent(currentText), { responseType: 'arraybuffer' });
				const framePath = path.join(tempDir, `${m.sender + i}.mp4`);
				fs.writeFileSync(framePath, res.data);
				framePaths.push(framePath);
			}
			const fileListPath = path.join(tempDir, `${m.sender}.txt`);
			let fileListContent = '';
			for (let i = 0; i < framePaths.length; i++) {
				fileListContent += `file '${framePaths[i]}'\n`;
				fileListContent += `duration 0.5\n`;
			}
			fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
			fileListContent += `duration 3\n`;
			fs.writeFileSync(fileListPath, fileListContent);
			const outputVideoPath = path.join(tempDir, `${m.sender}-output.mp4`);
			execSync(`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf 'fps=30' -c:v libx264 -preset veryfast -pix_fmt yuv420p -t 00:00:10 ${outputVideoPath}`);
			naze.sendAsSticker(m.chat, outputVideoPath, m, { packname: packname, author: author })
			framePaths.forEach((filePath) => fs.unlinkSync(filePath));
			fs.unlinkSync(fileListPath);
			fs.unlinkSync(outputVideoPath);
			setLimit(m, db)
		} catch (e) {
			console.log(e)
			m.reply('Terjadi Kesalahan Saat Memproses Permintaan!')
		}
	}
	break
	case 'brat2': case 'bratsticker2': case 'bratstiker2':case 'bratstick2':{
		const { createCanvas, registerFont } = require('canvas');
		const Jimp = require('jimp');
	
		async function BratGenerator(teks) {
			let width = 2048;
			let height = 2048;
			let margin = 30;
			let wordSpacing = 90;
			let canvas = createCanvas(width, height);
			let ctx = canvas.getContext('2d');
	
			// Latar belakang putih
			ctx.fillStyle = 'white';
			ctx.fillRect(2, 0, width, height);
	
			// Mendaftarkan font
			registerFont('./lib/arialnarrow.ttf', { family: 'Narrow' });
	
			let fontSize = 480;
			let lineHeightMultiplier = 1.2;
			ctx.textAlign = 'left';
			ctx.textBaseline = 'top';
			ctx.fillStyle = 'black';
			ctx.font = `${fontSize}px Narrow`;
	
			let words = teks.split(' ');
			let lines = [];
	
			let rebuildLines = () => {
				lines = [];
				let currentLine = '';
				for (let word of words) {
					let testLine = currentLine ? `${currentLine} ${word}` : word;
					let lineWidth =
						ctx.measureText(testLine).width + (currentLine.split(' ').length - 1) * wordSpacing;
					if (lineWidth < width - 2 * margin) {
						currentLine = testLine;
					} else {
						lines.push(currentLine);
						currentLine = word;
					}
				}
				if (currentLine) {
					lines.push(currentLine);
				}
			};
	
			rebuildLines();
	
			// Menyesuaikan ukuran font agar teks pas dalam canvas
			while (lines.length * fontSize * lineHeightMultiplier > height - 2 * margin) {
				fontSize -= 2;
				ctx.font = `${fontSize}px Narrow`;
				rebuildLines();
			}
	
			let lineHeight = fontSize * lineHeightMultiplier;
			let y = margin;
	
			for (let line of lines) {
				let wordsInLine = line.split(' ');
				let x = margin;
				for (let word of wordsInLine) {
					ctx.fillText(word, x, y);
					x += ctx.measureText(word).width + wordSpacing;
				}
				y += lineHeight;
			}
	
			let buffer = canvas.toBuffer('image/png');
			let image = await Jimp.read(buffer);
			image.blur(3);
			let blurredBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
	
			return naze.sendAsSticker(m.chat, blurredBuffer, m, { packname: "", author: "" });
		}
	
		if (!text) return m.reply("Masukkan teks untuk stiker.\n\nContoh:\n.brat Atmin Ganteng");
	
		await BratGenerator(text);
	}
	break;
	case 'bratvid2': case 'bratvideo2': {
	const { createCanvas, registerFont } = require('canvas');
	const Jimp = require('jimp');
	const { execSync } = require('child_process');
	const path = require('path');
	const fs = require('fs');
	if (!text) return m.reply("Masukkan teks untuk video stiker.\n\nContoh:\n.bratvideo Atmin Ganteng");
	if (text.length > 40) return m.reply("Karakter terbatas, max 40 huruf!");
	m.reply(mess.wait);
	const words = text.split(" ");
	const tempDir = path.join(process.cwd(), 'lib');
	if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
	const framePaths = [];

	try {
	for (let i = 0; i < words.length; i++) {
	let width = 2048;
	let height = 2048;
	let margin = 20;
	let wordSpacing = 50;
	let canvas = createCanvas(width, height);
	let ctx = canvas.getContext('2d');

	// Latar belakang putih
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, width, height);

	// Mendaftarkan font
	registerFont('./lib/arialnarrow.ttf', { family: 'Narrow' });

	let fontSize = 680;
	let lineHeightMultiplier = 1.3;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillStyle = 'black';
	ctx.font = `${fontSize}px Narrow`;

	let currentText = words.slice(0, i + 1).join(" ");
	let lines = [];

	let rebuildLines = () => {
	lines = [];
	let currentLine = '';
	for (let word of currentText.split(' ')) {
	let testLine = currentLine ? `${currentLine} ${word}` : word;
	let lineWidth =
	ctx.measureText(testLine).width + (currentLine.split(' ').length - 1) * wordSpacing;
	if (lineWidth < width - 2 * margin) {
	currentLine = testLine;
	} else {
	lines.push(currentLine);
	currentLine = word;
	}
	}
	if (currentLine) {
	lines.push(currentLine);
	}
	};

	rebuildLines();

	while (lines.length * fontSize * lineHeightMultiplier > height - 2 * margin) {
	fontSize -= 2;
	ctx.font = `${fontSize}px Narrow`;
	rebuildLines();
	}

	let lineHeight = fontSize * lineHeightMultiplier;
	let y = margin;

	for (let line of lines) {
	let wordsInLine = line.split(' ');
	let x = margin;
	for (let word of wordsInLine) {
	ctx.fillText(word, x, y);
	x += ctx.measureText(word).width + wordSpacing;
	}
	y += lineHeight;
	}

	let buffer = canvas.toBuffer('image/png');
	let image = await Jimp.read(buffer);
	image.blur(3);
	let blurredBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
	let framePath = path.join(tempDir, `frame${i}.png`);
	fs.writeFileSync(framePath, blurredBuffer);
	framePaths.push(framePath);
	}

	// Buat daftar file untuk FFmpeg
	const fileListPath = path.join(tempDir, "filelist.txt");
	let fileListContent = framePaths.map(frame => `file '${frame}'\nduration 0.7`).join("\n");
	fileListContent += `\nfile '${framePaths[framePaths.length - 1]}'\nduration 2`;
	fs.writeFileSync(fileListPath, fileListContent);

	// Gabungkan gambar menjadi video
	const outputVideoPath = path.join(tempDir, "output.mp4");
	execSync(
	`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30,format=yuv420p" -c:v libx264 -preset ultrafast ${outputVideoPath}`
	);

	// Kirim sebagai sticker video
	await naze.sendAsSticker(m.chat, outputVideoPath, m, {
	packname: global.packname,
	author: global.author
	});

	// Bersihkan file sementara
	framePaths.forEach(frame => fs.existsSync(frame) && fs.unlinkSync(frame));
	if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
	if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath);

	} catch (e) {
	console.error(e);
	m.reply('Terjadi kesalahan dalam pembuatan video stiker.');
	}
	}
	break;
	case 'carbonify': case 'karbonify': {
		if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Kirim/reply pesan *${prefix + command}* Teksnya`)
		try {
			await naze.sendAsSticker(m.chat, 'https://api.siputzx.my.id/api/m/carbonify?input=' + (text || m.quoted.text), m, { packname: packname, author: author })
			setLimit(m, db)
		} catch (error) {
			console.error(error);
			m.reply('Terjadi kesalahan saat mengubah teks menjadi gambar karbonified.');
		}
	}
	break	
	case 'cuaca': case 'weather': {
		if (!text) {
			return m.reply('Silakan masukkan nama kota yang ingin Anda cek cuacanya.');
		}
	
		try {
			let wdata = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&lang=id`
			);
	
			// Deskripsi lengkap cuaca
			const cuacaUtama = wdata.data.weather[0].main;
			const deskripsiCuaca = wdata.data.weather[0].description;
			const suhu = wdata.data.main.temp;
			const suhuMin = wdata.data.main.temp_min;
			const suhuMax = wdata.data.main.temp_max;
			const terasaSeperti = wdata.data.main.feels_like;
			const tekananUdara = wdata.data.main.pressure;
			const tekananLaut = wdata.data.main.sea_level || 'N/A'; // Tekanan air laut (jika tersedia)
			const tekananTanah = wdata.data.main.grnd_level || 'N/A'; // Tekanan permukaan tanah (jika tersedia)
			const kelembaban = wdata.data.main.humidity;
			const kecepatanAngin = wdata.data.wind.speed;
			const arahAngin = wdata.data.wind.deg;
			const jarakPandang = wdata.data.visibility / 1000; // Mengubah ke kilometer
			const tutupanAwan = wdata.data.clouds.all;
			const volumeHujan = (wdata.data.rain && wdata.data.rain['1h']) || 0; // Volume hujan (jika tersedia)
			const lintang = wdata.data.coord.lat;
			const bujur = wdata.data.coord.lon;
			const negara = wdata.data.sys.country;
			
			// Mendapatkan timezone dari respons API
			const zonaWaktu = wdata.data.timezone; // Mengambil data timezone dari API (dalam detik)
			const waktuLocal = new Date().getTimezoneOffset() * 60; // Selisih waktu sistem lokal dengan UTC (dalam detik)
			
			// Menghitung offset untuk zona waktu kota
			const offset = zonaWaktu - waktuLocal; // Selisih waktu dari UTC (dalam detik)
	
			// Konversi waktu matahari terbit dan terbenam dari UTC ke waktu lokal
			const sunrise = new Date((wdata.data.sys.sunrise + offset) * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
			const sunset = new Date((wdata.data.sys.sunset + offset) * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	
			// Menyusun pesan cuaca
let textw = `*Informasi Cuaca untuk Kota ${text.charAt(0).toUpperCase() + text.slice(1)}*\n\n`;
textw += `🌤️ *Cuaca Utama*         : ${cuacaUtama}\n`;
textw += `📖 *Deskripsi*                 : ${deskripsiCuaca}\n`;
textw += `🌡️ *Suhu Rata-rata*     : ${suhu} °C\n`;
textw += `🔻 *Suhu Minimum*      : ${suhuMin} °C\n`;
textw += `🔺 *Suhu Maksimum*   : ${suhuMax} °C\n`;
textw += `🔥 *Terasa Seperti*       : ${terasaSeperti} °C\n`;
textw += `🌬️ *Kecepatan Angin*  : ${kecepatanAngin} m/s\n`;
textw += `🧭 *Arah Angin*              : ${arahAngin}°\n`;
textw += `💧 *Kelembaban*           : ${kelembaban}%\n`;
textw += `🎈 *Tekanan Udara*      : ${tekananUdara} hPa\n`;
textw += `🌊 *Tekanan Air Laut*  : ${tekananLaut} hPa\n`;
textw += `🌍 *Tekanan Tanah*     : ${tekananTanah} hPa\n`;
textw += `🌫️ *Jarak Pandang*      : ${jarakPandang} km\n`;
textw += `☁️ *Tutup Awan*            : ${tutupanAwan}%\n`;
textw += `🌧️ *Volume Hujan*        : ${volumeHujan} mm/h\n\n`;
textw += `📍 *Koordinat*  \n`;
textw += `   - Lintang : ${lintang}\n`;
textw += `   - Bujur      : ${bujur}\n\n`;
textw += `🌅 *Matahari Terbit*          : ${sunrise}\n`;
textw += `🌇 *Matahari Terbenam* : ${sunset}\n\n`;
textw += `🏳️ *Negara*           : ${negara}\n`;

			// Mengirimkan pesan dengan format yang lebih menarik
			naze.sendMessage(m.chat, { text: textw }, { quoted: m });
	
		} catch (error) {
			m.reply('Maaf, terjadi kesalahan saat mengambil data cuaca. Pastikan nama kota yang Anda masukkan sudah benar.');
		}
	}
	break;
	case 'emojimix': {
		if (!text) return m.reply(`Example: ${prefix + command} 😅+🤔`)
		let [emoji1, emoji2] = text.split`+`
		if (!emoji1 && !emoji2) return m.reply(`Example: ${prefix + command} 😅+🤔`)
		try {
			let anu = await axios.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
			if (anu.data.results.length < 1) return m.reply(`Mix Emoji ${text} Tidak Ditemukan!`)
			for (let res of anu.data.results) {
				await naze.sendAsSticker(m.chat, res.url, m, { packname: packname, author: author })
			}
		} catch (e) {
			m.reply('Gagal Mix Emoji!')
		}
	}
	break
	case 'get': case 'fetch':  {
		if (!/^https?:\/\//.test(text)) return m.reply('Awali dengan http:// atau https://');
		const { data } = await axios.get('https://api.ipify.org?format=json')
		try {
			const res = await axios.get(isUrl(text) ? isUrl(text)[0] : text)
			if (!/json|html|plain/.test(res.headers['content-type'])) {
				await m.reply(text)
			} else {
				m.reply(util.format(res.data).replace(new RegExp(data.ip.replace(/\./g, '\\.'), 'g'), 'xxx-xxx-xxx-xxx'))
			}
		} catch (e) {
			m.reply(util.format(e).replace(new RegExp(data.ip.replace(/\./g, '\\.'), 'g'), 'xxx-xxx-xxx-xxx'))
		}
	}
	break
	case 'getexif': {
		if (!m.quoted) return m.reply(`Reply sticker\nDengan caption ${prefix + command}`)
		if (!/sticker|webp/.test(quoted.type)) return m.reply(`Reply sticker\nDengan caption ${prefix + command}`)
		const { Image } = require('node-webpmux')
		const img = new Image()
		await img.load(await m.quoted.download())
		m.reply(util.format(JSON.parse(img.exif.slice(22).toString())))
	}
	break
	case 'gitclone': case 'git':  {
		if (!args[0]) return m.reply(`Example: ${prefix + command} https://github.com/nazedev/hitori`)
		if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply('Gunakan Url Github!')
		let [, user, repo] = args[0].match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || []
		try {
			naze.sendMessage(m.chat, { document: { url: `https://api.github.com/repos/${user}/${repo}/zipball` }, fileName: repo + '.zip', mimetype: 'application/zip' }, { quoted: m }).catch((e) => m.reply(mess.error))
		} catch (e) {
			m.reply('Gagal!')
		}
	}
	break
	case 'hd':case 'tohd': case 'remini':  {
		if (/image/.test(mime)) {
			const { remini } = require('./lib/remini');
			let media = await (m.quoted ? m.quoted.download() : m.download());
			
			// Proses HD pertama
			try {
				let enhanced1 = await remini(media, 'enhance');
				m.reply('_⏳ Proses HD..._');
				
				// Proses HD kedua
				let enhanced2 = await remini(enhanced1, 'enhance');
				
				// Kirim hasil HD dua kali
				await naze.sendMessage(m.chat, { image: enhanced2, caption: '_gambar sudah di HD kan_' }, { quoted: m });
			} catch (e) {
				m.reply(`❌ Gagal meningkatkan kualitas gambar: ${e.message}`);
			}
		} else {
			m.reply(`Kirim/Reply gambar dengan format\nExample: ${prefix + command}`);
		}
	}
	break;
	case 'kelompokacak': {
		if (!m.isGroup) return m.reply('Perintah ini hanya bisa digunakan di dalam grup!');
		
		let jumlahPerKelompok = parseInt(args[0]);
		if (isNaN(jumlahPerKelompok)) return m.reply('Harap masukkan jumlah anggota per kelompok yang benar! Contoh: \n*kelompokacak 5*');
	
		// Ambil semua ID anggota grup
		let participants = m.metadata.participants.map(a => a.id);
		let totalUser = participants.length;
	
		// Acak urutan anggota
		participants = participants.sort(() => Math.random() - 0.5);
	
		let hasilKelompok = [];
		for (let i = 0; i < totalUser; i += jumlahPerKelompok) {
			hasilKelompok.push(participants.slice(i, i + jumlahPerKelompok));
		}
	
		// Gabungkan sisa anggota ke kelompok terakhir jika ada
		if (hasilKelompok[hasilKelompok.length - 1].length < jumlahPerKelompok) {
			let sisa = hasilKelompok.pop();
			hasilKelompok[hasilKelompok.length - 1] = hasilKelompok[hasilKelompok.length - 1].concat(sisa);
		}
	
		// Format hasil output kelompok
		let output = '';
		hasilKelompok.forEach((kelompok, index) => {
			output += `*Kelompok ${index + 1}*\n`;
			kelompok.forEach(user => {
				output += `@${user.split('@')[0]}\n`;
			});
			output += '\n';
		});
	
		// Kirim hasil dengan mention ke semua peserta
		naze.sendMessage(m.chat, { text: output, mentions: participants }, { quoted: m });
	}
	break;
	case 'konversi': {
		// Peta simbol mata uang
		const currencySymbols = {
			USD: '$',
			IDR: 'Rp.',
			EUR: '€',
			GBP: '£',
			JPY: '¥',
			AUD: 'A$',
			CAD: 'C$',
			SGD: 'S$',
			MYR: 'RM',
			// Tambahkan simbol lain sesuai kebutuhan
		};
	
		// Fungsi untuk menambahkan pemisah ribuan
		function formatNumber(number) {
			return parseFloat(number).toLocaleString(); // Menggunakan format lokal default untuk pemisah ribuan
		}
	
		// Ambil argumen dari pengguna, misalnya: 'konversi 100 USD ke IDR'
		let args = m.text.split(' ');
		
		if (args.length < 4) {
			return m.reply('Format salah. Contoh: konversi 100 USD ke IDR');
		}
		
		let amount = parseFloat(args[1]); // Jumlah uang yang akan dikonversi
		let fromCurrency = args[2].toUpperCase(); // Mata uang asal
		let toCurrency = args[4].toUpperCase(); // Mata uang tujuan
		
		if (isNaN(amount)) {
			return m.reply('Jumlah uang tidak valid. Harap masukkan angka yang benar.');
		}
	
		// API URL untuk mendapatkan nilai tukar
		let apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
	
		// Panggil API nilai tukar mata uang
		try {
			let fetch = require('node-fetch');
			let response = await fetch(apiUrl);
			let data = await response.json();
	
			if (!data.rates[toCurrency]) {
				return m.reply(`Mata uang ${toCurrency} tidak valid atau tidak ditemukan.`);
			}
	
			let rate = data.rates[toCurrency];
			let convertedAmount = (amount * rate).toFixed(2); // Hitung hasil konversi
	
			// Ambil simbol mata uang jika ada, jika tidak tampilkan kode mata uang
			let fromSymbol = currencySymbols[fromCurrency] || fromCurrency;
			let toSymbol = currencySymbols[toCurrency] || toCurrency;
	
			// Format angka dengan pemisah ribuan
			let formattedAmount = formatNumber(amount);
			let formattedConvertedAmount = formatNumber(convertedAmount);
	
			// Kirim hasil konversi dengan simbol mata uang
			m.reply(`💸 ${fromSymbol}${formattedAmount} ${fromCurrency} = ${toSymbol}${formattedConvertedAmount} ${toCurrency}\nNilai tukar: 1 ${fromCurrency} = ${rate.toLocaleString()} ${toCurrency}`);
		} catch (error) {
			m.reply('Maaf, terjadi kesalahan saat melakukan konversi. Coba lagi nanti.');
		}
	}
	break;
	case 'konvert': {
		const input = args.join(' ').toLowerCase(); // Menggabungkan argumen input dari pengguna
		
		// Kurs konversi untuk setiap cent ke IDR
		const conversionRates = {
			auc: { rate: 106.4, flag: '🇦🇺', description: 'Australian Cent' },
			cac: { rate: 102.5, flag: '🇨🇦', description: 'Canadian Cent' },
			chc: { rate: 104.0, flag: '🇨🇳', description: 'Chinese Cent' },
			euc: { rate: 150.0, flag: '🇪🇺', description: 'European Cent' },
			gbc: { rate: 130.0, flag: '🇬🇧', description: 'British Cent' },
			usc: { rate: 151.7, flag: '🇺🇸', description: 'US Cent' },
		};
	
		// Jika input mengonversi dari cent ke IDR
		if (input.includes('cent ke idr')) {
			const parts = input.split(' '); // Memisahkan input berdasarkan spasi
			const amount = parseFloat(parts[0]); // Mengambil jumlah dari input
	
			if (isNaN(amount)) return m.reply('Masukkan jumlah cent yang valid.');
	
			// Konversi semua cent ke IDR
			let resultMessage = `💵 *Konversi dari ${amount} Cent ke IDR :*\n\n`;
	
			for (const [code, { rate, flag, description }] of Object.entries(conversionRates)) {
				const idrValue = amount * rate;
				resultMessage += `${flag} ${code.toUpperCase()} (${description}):\n ${amount} ${code.toUpperCase()} = Rp. ${idrValue.toLocaleString('id-ID')}\n\n`;
			}
	
			m.reply(resultMessage);
	
		// Jika input mengonversi dari IDR ke cent
		} else if (input.includes('idr ke cent')) {
			const parts = input.split(' '); // Memisahkan input berdasarkan spasi
			const idrValue = parseFloat(parts[0].replace(/\./g, '')); // Mengambil nilai IDR dan menghapus titik
	
			if (isNaN(idrValue)) return m.reply('Masukkan jumlah IDR yang valid.');
	
			// Menampilkan hasil konversi dari IDR ke semua mata uang cent
			let resultMessage = `💵 *Konversi dari Rp. ${idrValue.toLocaleString('id-ID')} ke Cent :*\n\n`;
	
			for (const [code, { rate, flag, description }] of Object.entries(conversionRates)) {
				const centValue = idrValue / rate;
				resultMessage += `${flag} ${code.toUpperCase()} (${description}): \n Rp. ${idrValue} = ${centValue.toFixed(2)} ${code.toUpperCase()}\n\n`;
			}
	
			m.reply(resultMessage);
	
		} else {
			m.reply('Format yang salah. Gunakan format:\n- konvert <jumlah> cent ke idr\n- konvert <jumlah> idr ke cent');
		}
	}
	break;
	case 'profitkalkulator': {
		if (!text) return m.reply(`Example: ${prefix + command} 200000 5`);
		let args = text.replace(/\./g, '').replace(/,/g, '').split(' ');
		if (args.length !== 2 || isNaN(args[0]) || isNaN(args[1])) {
		return m.reply(`Format salah! Gunakan: ${prefix + command} (jumlah modal) (persentase keuntungan)\nContoh: ${prefix + command} 200000 5`);
		}
		
		let modalAwal = parseFloat(args[0]);
		let persenKeuntungan = parseFloat(args[1]);
	   
		let hasil = `\n*Modal awal:* Rp ${modalAwal.toLocaleString('id-ID')}\n`;
		hasil += `*Keuntungan per hari:* ${persenKeuntungan}%\n\n`;
	   
		for (let i = 1; i <= 30; i++) {
		let keuntungan = modalAwal * (persenKeuntungan / 100);
		let modalAkhir = modalAwal + keuntungan;
		hasil += `- *Hari ke-${i}*\n Modal awal: Rp ${modalAwal.toLocaleString('id-ID')}\n Modal akhir: Rp ${modalAkhir.toLocaleString('id-ID')}\n\n`;
		modalAwal = modalAkhir;
		}
		
		m.reply(hasil);
	   }
	   break;
	case 'qc': case 'quote': case 'fakechat': {
		// Cek apakah ada teks yang di-reply atau teks langsung dari pengguna
		let textToQuote = '';
		let name = ''; // Variabel untuk menyimpan nama yang akan digunakan
		let senderId = m.sender; // Default menggunakan ID pengirim perintah

		if (m.quoted && m.quoted.text) {
			textToQuote = m.quoted.text; // Mengambil teks dari pesan yang di-reply
			senderId = m.quoted.sender; // Menggunakan ID pengirim pesan yang di-reply
			name = m.quoted.pushName || '🗿☕'; // Menggunakan nama dari pesan yang di-reply atau fallback ke string kosong
		} else if (text) {
			textToQuote = text; // Menggunakan teks yang diberikan langsung
			name = m.pushName; // Menggunakan nama pengirim perintah
		} else {
			return m.reply(`Kirim/reply pesan *${prefix + command}* Teksnya`);
		}

		try {
			// Mengambil foto profil user yang mengirim pesan yang di-reply atau pengirim perintah
			let ppnya = await naze.profilePictureUrl(senderId, 'image').catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');

			// Menghasilkan stiker dari teks
			let res = await quotedLyo(textToQuote, name, ppnya);
			await naze.sendAsSticker(m.chat, Buffer.from(res.result.image, 'base64'), m, { packname: packname, author: author });
		} catch (e) {
			m.reply('Server Create Sedang Offline!');
		}
	}
	break;
	case 'readmore': {
		let teks1 = text.split`|`[0] ? text.split`|`[0] : ''
		let teks2 = text.split`|`[1] ? text.split`|`[1] : ''
		m.reply(teks1 + readmore + teks2)
	}
	break
	case 'shorturl': case 'tinyurl':  case 'shortlink': {
		if (!text || !isUrl(text)) return m.reply(`Example: ${prefix + command} https://github.com/nazedev/hitori`)
		try {
			let anu = await axios.get('https://tinyurl.com/api-create.php?url=' + text)
			m.reply('Url : ' + anu.data)
		} catch (e) {
			m.reply('Gagal!')
		}
	}
	break
	case 'statistikdata': {
		if (!args.length) return m.reply("Harap masukkan nilai data, contoh: statistikdata 23 45 65 43 33");
	
		let data = args.map(Number);
		if (data.some(isNaN)) return m.reply("Semua nilai harus berupa angka.");
	
		// 1. Rata-rata (mean)
		let total = data.reduce((sum, value) => sum + value, 0);
		let mean = total / data.length;
	
		// 2. Median
		let sorted = [...data].sort((a, b) => a - b);
		let middle = Math.floor(data.length / 2);
		let median = data.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
	
		// 3. Modus
		let frequency = {};
		let maxFreq = 0;
		let mode = [];
		for (let num of data) {
			frequency[num] = (frequency[num] || 0) + 1;
			if (frequency[num] > maxFreq) {
				maxFreq = frequency[num];
				mode = [num];
			} else if (frequency[num] === maxFreq) {
				mode.push(num);
			}
		}
		mode = [...new Set(mode)]; // Remove duplicates
	
		// 4. Range
		let range = Math.max(...data) - Math.min(...data);
	
		// 5. Nilai tertinggi dan terendah
		let max = Math.max(...data);
		let min = Math.min(...data);
	
		// 6. Standar Deviasi
		let varianceSum = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
		let variance = varianceSum / data.length;
		let stdDev = Math.sqrt(variance);
	
		// Menyusun output perhitungan
		let output = `
*Data yang dimasukkan:* ${data.join(", ")}

1. Rata-rata (Mean): ${mean.toFixed(2)}
	\[Rata-rata = ( ${data.join(" + ")} ) / ${data.length} = ${total} / ${data.length} = ${mean.toFixed(2)}\]

2. Median: ${median.toFixed(2)}
	\[Median = ${sorted.length % 2 === 0 ? `( ${sorted[middle - 1]} + ${sorted[middle]} ) / 2 = ${median.toFixed(2)}` : `${sorted[middle]} = ${median.toFixed(2)}`}\]

3. Modus: ${mode.length > 0 ? mode.join(", ") : "Tidak ada"}
	${mode.length > 0 ? `Modus adalah angka yang paling sering muncul: ${mode.join(", ")}` : `Tidak ada modus karena semua angka muncul sama rata.`}

4. Range: ${range}
	\[Range = ${max} - ${min} = ${range}\]

5. Nilai Tertinggi: ${max}
	Nilai tertinggi adalah ${max}.

6. Nilai Terendah: ${min}
	Nilai terendah adalah ${min}.

*Langkah-langkah perhitungan Standar Deviasi:*

1. Hitung rata-rata (mean): 
	\[Mean = ( ${data.join(" + ")} ) / ${data.length} = ${mean.toFixed(2)}\]

2. Kurangkan setiap nilai dengan rata-rata, lalu kuadratkan hasilnya:
${
		data.map(value => `   (${value} - ${mean.toFixed(2)})² = ${(Math.pow(value - mean, 2)).toFixed(2)}`).join("\n")
	}

3. Jumlahkan semua hasil kuadrat:
	\[Jumlah = ${varianceSum.toFixed(2)}\]

4. Bagi hasil jumlah kuadrat dengan jumlah data:
	\[Variance = ${varianceSum.toFixed(2)} / ${data.length} = ${variance.toFixed(2)}\]

5. Ambil akar kuadrat dari variance:
	\[Standar Deviasi = √${variance.toFixed(2)} = ${stdDev.toFixed(2)}\]

*Standar Deviasi (σ):* ${stdDev.toFixed(2)}
	`;
	
		m.reply(output);
	}
	break;
	case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
		try {
			if (!/image|webp/.test(mime)) return m.reply(`Kirim/reply image/sticker\nDengan caption ${prefix + command} atas|bawah`)
			if (!text) return m.reply(`Kirim/reply image/sticker dengan caption ${prefix + command} atas|bawah`)
			m.reply(mess.wait)
			let atas = text.split`|`[0] ? text.split`|`[0] : '-'
			let bawah = text.split`|`[1] ? text.split`|`[1] : '-'
			let media = await (m.quoted ? m.quoted.download() : m.download())
			let mem = await UguuSe(media)
			let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem.url}`
			await naze.sendAsSticker(m.chat, smeme, m, { packname: packname, author: author })
		} catch (e) {
			m.reply('Server Meme Sedang Offline!')
		}
	}
	break
	case 'ssweb': case 'ss':  {
		if (!text) return m.reply(`Example: ${prefix + command} https://github.com/nazedev/naze-md`)
		try {
			if (!text.startsWith('http')) {
				let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/https://' + q;
				await naze.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
			} else {
				let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + q;
				await naze.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
			}
		} catch (e) {
			m.reply('Server SS web Sedang Offline!')
		}
	}
	break
	case 'stele': case 'stickertelegram': case 'stickertele': case 'sticktele': {
		console.log(`[LOG] Perintah ${command} diterima dengan teks:`, text);
	
		if (!text) return m.reply(`Format salah!
		Untuk mengirim stiker tertentu, gunakan perintah:
		\`${prefix + command} (jumlah stiker) (nama pack sticker)\`
		
		Atau untuk mengirim semua stiker, gunakan perintah:
		\`${prefix + command} all (nama pack sticker)\``);
	
		let [limit, ...stickerName] = text.split(' ');
		stickerName = stickerName.join(' ');  // Menyatukan kembali nama pack sticker
	
		if (!stickerName) {
			console.log(`[LOG] Nama pack sticker kosong.`);
			return m.reply('Harap masukkan nama pack stiker atau URL yang valid.');
		}
	
		// Cek apakah input adalah URL
		if (stickerName.includes('https://t.me/addstickers/')) {
			const packNameFromUrl = stickerName.split('https://t.me/addstickers/')[1];
			if (!packNameFromUrl) {
				console.log(`[LOG] URL sticker tidak valid.`);
				return m.reply('URL stiker tidak valid. Harap masukkan URL yang benar.');
			}
	
			stickerName = packNameFromUrl;  // Mengambil nama pack dari URL
			console.log(`[LOG] Nama pack diambil dari URL:`, stickerName);
		}
	
		try {
			console.log(`[LOG] Mengambil data stiker dari API untuk query: ${stickerName}`);
	
			const res = await fetch(`https://api.siputzx.my.id/api/d/telegramsticker?query=${stickerName}`);
			const result = await res.json();
	
			if (!result || !Array.isArray(result.stickers)) {
				console.log(`[LOG] API response tidak valid atau tidak berbentuk array.`);
				return m.reply('Gagal mengambil stiker. Mungkin nama pack tidak ditemukan atau terjadi masalah dengan API.');
			}
	
			const stickerCount = result.stickers.length;
			console.log(`[LOG] Ditemukan ${stickerCount} stiker untuk pack: ${stickerName}`);
	
			if (stickerCount === 0) {
				return m.reply('Tidak ditemukan stiker dengan query yang diberikan.');
			}
	
			let stickersToSend = limit.toLowerCase() === 'all' ? result.stickers : result.stickers.slice(0, parseInt(limit) || 1);
			console.log(`[LOG] Akan mengirim ${stickersToSend.length} stiker dari total ${stickerCount}.`);
	
			await m.reply(`Sedang mengirim ${stickersToSend.length} dari ${stickerCount} stiker. Proses ini membutuhkan waktu.`);
	
			for (let sticker of stickersToSend) {
				const fileUrl = sticker.fileUrl;
				console.log(`[LOG] Mengirim stiker: ${fileUrl}`);
				await naze.sendMessage(m.chat, { sticker: { url: fileUrl } });
			}
	
			m.reply(`Berhasil mengirim ${stickersToSend.length} dari ${stickerCount} stiker yang mulia. Semoga berkenan.😊`);
	
			setLimit(m, db);
			console.log(`[LOG] Proses selesai, limit dikurangi.`);
		} catch (error) {
			console.error(`[ERROR] Terjadi kesalahan saat mengambil stiker:`, error);
			m.reply('Terjadi kesalahan saat mengambil stiker.');
		}
	}
	break;
	case 'stele1': {
		if (!args[0]) return m.reply(`Format salah!
	Gunakan perintah:
	\`${prefix}stele1 (nama pack sticker Telegram atau URL)\``);
	
		let link = args[0];
		if (!link.includes('t.me/addstickers/')) return m.reply(`URL yang Anda masukkan salah! Harap masukkan URL dengan benar.`);
	
		m.reply('Sebentar yang mulia, hamba sedang mengambil daftar stiker...');
	
		try {
			let stickerPackName = link.split('addstickers/')[1];
			console.log(`[INFO] Mengambil sticker pack: ${stickerPackName}`);
	
			let response = await fetch(`https://api.telegram.org/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/getStickerSet?name=${stickerPackName}`);
			let result = await response.json();
	
			if (!result.ok || !result.result.stickers) {
				console.error(`[ERROR] Gagal mendapatkan stiker dari pack: ${stickerPackName}`);
				return m.reply('Hamba gagal mendapatkan stiker dari pack tersebut.');
			}
	
			let stickers = result.result.stickers.filter(sticker => sticker.is_animated !== true);
			let totalStickers = stickers.length;
			console.log(`[INFO] Ditemukan ${totalStickers} stiker dalam pack ${stickerPackName}`);
	
			if (totalStickers === 0) {
				return m.reply('Hamba tidak menemukan stiker dalam pack tersebut.');
			}
	
			m.reply(`Hamba telah menemukan ${totalStickers} stiker yang mulia. Hamba akan mengirimkan satu per satu...`);
	
			for (let i = 0; i < stickers.length; i++) {
				let fileId = stickers[i].file_id;
				
				try {
					let fileResponse = await fetch(`https://api.telegram.org/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/getFile?file_id=${fileId}`);
					let fileData = await fileResponse.json();
	
					if (!fileData.ok) {
						console.error(`[ERROR] Gagal mendapatkan file_path untuk stiker ${i + 1}`);
						continue;
					}
	
					let filePath = fileData.result.file_path;
					let stickerUrl = `https://api.telegram.org/file/bot8076926331:AAF250aEaHEgyHQ0URzV6dJRcAbMwsePCdc/${filePath}`;
	
					console.log(`[INFO] Mengunduh stiker ${i + 1}/${totalStickers}: ${stickerUrl}`);
	
					let stickerFilePath = `./temp/sticker_${i}.webp`;
					let response = await axios({ url: stickerUrl, responseType: 'arraybuffer' });
					fs.writeFileSync(stickerFilePath, Buffer.from(response.data));
	
					// Konversi ke WebP jika formatnya bukan webp
					let convertedStickerPath = `./temp/sticker_${i}_converted.webp`;
					await new Promise((resolve, reject) => {
						exec(`ffmpeg -i ${stickerFilePath} -vf scale=512:512 ${convertedStickerPath}`, (error) => {
							if (error) {
								console.error(`[ERROR] Gagal mengonversi stiker ${i + 1}: ${error.message}`);
								reject(error);
							} else {
								resolve();
							}
						});
					});
	
					console.log(`[INFO] Mengirim stiker ${i + 1}/${totalStickers}`);
					await naze.sendMessage(m.chat, { sticker: fs.readFileSync(convertedStickerPath) });
	
					// Hapus file setelah dikirim untuk menghemat ruang
					fs.unlinkSync(stickerFilePath);
					fs.unlinkSync(convertedStickerPath);
	
					await new Promise(resolve => setTimeout(resolve, 100)); // Jeda 100ms
				} catch (sendError) {
					console.error(`[ERROR] Gagal mengirim stiker ${i + 1}: ${sendError.message}`);
					m.reply(`⚠️ Gagal mengirim stiker ke-${i + 1}. Lanjut mengirim yang lain...`);
				}
			}
	
			m.reply('Semua stiker telah dikirim yang mulia! Semoga berkenan.😊');
		} catch (error) {
			console.error(`[ERROR] Terjadi kesalahan umum: ${error.message}`);
			m.reply(`Maaf yang mulia, terjadi kesalahan saat mengambil stiker.\n\n🚨 Error: ${error.message}`);
		}
	}
	break;
	case 'sticker': case 'stiker': case 's': case 'stickergif': case 'stikergif': case 'sgif': {
		if (!/image|video|sticker/.test(quoted.type)) return m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`)
		let media = await (m.quoted ? m.quoted.download() : m.download())
		if (/image|webp/.test(mime)) {
			m.reply(mess.wait)
			if (text == 'meta') {
				await naze.sendAsSticker(m.chat, media, m, { packname: packname, author: author, isAvatar: 1 })
			} else {
				await naze.sendAsSticker(m.chat, media, m, { packname: packname, author: author })
			}
		} else if (/video/.test(mime)) {
			if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
			m.reply(mess.wait)
			await naze.sendAsSticker(m.chat, media, m, { packname: packname, author: author })
		} else {
			m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`)
		}
	}
	break
	case 'stickercrop':case 'scrop':  {
		if (!/image|video|sticker/.test(quoted.type)) return m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`);
	
		let media = await (m.quoted ? m.quoted.download() : m.download());
		const mediaPath = path.join(__dirname, 'data', `media.${mime.split('/')[1]}`);
		fs.writeFileSync(mediaPath, media);
	
		// Function to check aspect ratio
		const checkAspectRatio = async (mediaPath) => {
			let metadata = await sharp(mediaPath).metadata();
			return metadata.width / metadata.height;
		};
	
		// Function to crop image into 1:1 aspect ratio
		const cropImage = async (mediaPath, output) => {
			let metadata = await sharp(mediaPath).metadata();
			let size = Math.min(metadata.width, metadata.height);  // Use the smallest dimension
			await sharp(mediaPath)
				.resize(size, size, { fit: 'cover' })  // Crop to square (1:1 aspect ratio)
				.toFile(output);
		};
	
		// Function to crop video into 1:1 aspect ratio
		const cropVideo = async (mediaPath, output) => {
			return new Promise((resolve, reject) => {
				ffmpeg(mediaPath)
					.videoFilters('crop=in_w:in_w') // Crop video to square (1:1 aspect ratio)
					.on('end', () => resolve(true))
					.on('error', (err) => reject(err))
					.save(output);
			});
		};
	
		const aspectRatio = await checkAspectRatio(mediaPath);
		const output = path.join(__dirname, 'temp', `output.${mime.split('/')[1]}`);
	
		try {
			if (/image|webp/.test(mime)) {
				m.reply(mess.wait);
				await cropImage(mediaPath, output);
				media = fs.readFileSync(output);
				await naze.sendAsSticker(m.chat, media, m, { packname: packname, author: author });
			} else if (/video/.test(mime)) {
				if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!');
				m.reply(mess.wait);
				await cropVideo(mediaPath, output);
				media = fs.readFileSync(output);
				await naze.sendAsSticker(m.chat, media, m, { packname: packname, author: author });
			} else {
				m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`);
			}
		} catch (err) {
			console.error(err);
			m.reply('Terjadi kesalahan saat memproses media.');
		} finally {
			// Clean up temporary files
			if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
			if (fs.existsSync(output)) fs.unlinkSync(output);
		}
	}
	break;
	case 'stickerly': {
		if (!text) return m.reply('Masukkan URL stickerly yang mulia.\n\n*Contoh:* stickerly https://sticker.ly/s/J9TZWA');
	
		let apiUrl = `https://api.siputzx.my.id/api/d/stickerly?url=${encodeURIComponent(text)}`;
		
		try {
			m.reply('_Sebentar yang mulia, hamba sedang mengambil daftar stiker..._');
	
			let response = await fetch(apiUrl);
			let result = await response.json();
	
			if (!result.status || !result.data || !result.data.stickers) {
				return m.reply('_Maaf yang mulia, hamba gagal mendapatkan stiker dari URL tersebut._');
			}
	
			let stickers = result.data.stickers;
			let totalStickers = stickers.length;
	
			m.reply(`_Hamba telah menemukan ${totalStickers} stiker yang mulia, mohon bersabar, hamba akan mengirimnya satu per satu..._`);
	
			for (let stickerUrl of stickers) {
				await naze.sendMessage(m.chat, { sticker: { url: stickerUrl } }, { quoted: m });
				await new Promise(resolve => setTimeout(resolve, 1000)); // Jeda 1 detik antar sticker
			}
	
			m.reply('_Semua stiker telah dikirim yang mulia! Semoga berkenan._');
	
		} catch (error) {
			console.error(error);
			m.reply('_Maaf yang mulia, terjadi kesalahan saat mengambil stiker. Coba lagi nanti._');
		}
	}
	break;	
	case 'stickerwm': case 'swm': case 'curi': case 'colong': case 'take': case 'stickergifwm': case 'sgifwm': {
		if (!/image|video|sticker/.test(quoted.type)) return m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`)
		let media = await (m.quoted ? m.quoted.download() : m.download())
		let teks1 = text.split`|`[0] ? text.split`|`[0] : ' '
		let teks2 = text.split`|`[1] ? text.split`|`[1] : ' '
		if (/image|webp/.test(mime)) {
			m.reply(mess.wait)
			if (text == 'meta') {
				await naze.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2, isAvatar: 1 })
			} else {
				await naze.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
			}
		} else if (/video/.test(mime)) {
			if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
			m.reply(mess.wait)
			await naze.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
		} else {
			m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
		}
	}
	break
	case 'style':     {
		if (!text) return m.reply(`Example: ${prefix + command} bangsulstart`)
		let anu = await styletext(text)
		let txt = anu.map(a => `*${a.name}*\n${a.result}`).join`\n\n`
		m.reply(txt)
		}
		break
	case 'toaudio':case 'toaud':  {
		if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
		m.reply(mess.wait)
		let media = await quoted.download()
		let audio = await toAudio(media, 'mp4')
		await naze.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
	}
	break
	case 'togift':case'togif': {
		if (!/webp|video/.test(mime)) return m.reply(`Reply Video/Stiker dengan caption *${prefix + command}*`)
		m.reply(mess.wait)
		let media = await naze.downloadAndSaveMediaMessage(qmsg)
		let ran = `./database/sampah/${getRandom('.gif')}`;
		exec(`convert ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return m.reply('Gagal❗')
			let buffer = fs.readFileSync(ran)
			naze.sendMessage(m.chat, { video: buffer, gifPlayback: true }, { quoted: m })
			fs.unlinkSync(ran)
		})
	}
	break
	case 'toimage': case 'toimg': {
		if (!/webp/.test(mime)) return m.reply(`Balas sticker dengan caption *${prefix + command}*`)
		m.reply(mess.wait)
		let media = await naze.downloadAndSaveMediaMessage(qmsg)
		let ran = `./database/sampah/${getRandom('.png')}`
		exec(`ffmpeg -i ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return m.reply('Gagal❗')
			let buffer = fs.readFileSync(ran)
			naze.sendMessage(m.chat, { image: buffer }, { quoted: m })
			fs.unlinkSync(ran)
		})
	}
	break
	case 'tomp3': {
		if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
		m.reply(mess.wait)
		let media = await quoted.download()
		let audio = await toAudio(media, 'mp4')
		await naze.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `Convert By Naze Bot.mp3`}, { quoted : m })
	}
	break
	case 'toptv': {
		if (!/video/.test(mime)) return m.reply(`Kirim/Reply Video Yang Ingin Dijadikan PTV Message Dengan Caption ${prefix + command}`)
		if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
			const anu = await (m.quoted ? m.quoted.download() : m.download())
			const msg = await generateWAMessageContent({ video: anu }, { upload: naze.waUploadToServer })
			await naze.relayMessage(m.chat, { ptvMessage: msg.videoMessage }, {})
		} else {
			m.reply('Reply Video Yang Mau Di Ubah Ke PTV Message!')
		}
	}
	break
	case 'toqr': case 'qr': {
		if (!text) return m.reply(`Ubah Text ke Qr dengan *${prefix + command}* textnya`)
		m.reply(mess.wait)
		await naze.sendMessage(m.chat, { image: { url: 'https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=' + text }, caption: 'Nih Bro' }, { quoted: m })
	}
	break
	case 'tourl': {
		try {
			let { fileIO, TelegraPh } = require('./lib/uploader')
			if (/jpg|jpeg|png/.test(mime)) {
				m.reply(mess.wait)
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let anu = await TelegraPh(media)
				m.reply('Url : ' + anu)
			} else if (/webp|video|sticker|audio/.test(mime)) {
				m.reply(mess.wait)
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let anu = await UguuSe(media)
				m.reply('Url : ' + anu.url)
			} else {
				m.reply('Send Media yg ingin di Upload!')
			}
		} catch (e) {
			m.reply('Server Uploader sedang offline!')
		}
	}
	break
	case 'tovn':  case 'toptt': case 'tovoice': {
		if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
		m.reply(mess.wait)
		let media = await (m.quoted ? m.quoted.download() : m.download())
		let audio = await toPTT(media, 'mp4')
		await naze.sendMessage(m.chat, { audio: audio, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m })
	}
	break
	case 'translate': case 'tr': {
		// Objek untuk menghubungkan kode bahasa dengan nama negara/bahasa\
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const penutup    = '╚═════════════════〇';
		const barisfitur = '╠»';
		const fiturtutup = '╚»';

		const bahasaList = {
			af: 'Afrikaans 🇿🇦',
			ar: 'Arab 🇸🇦',
			zh: 'Chinese 🇨🇳',
			en: 'English 🇬🇧',
			'en-us': 'English (United States) 🇺🇸',
			fr: 'French 🇫🇷',
			de: 'German 🇩🇪',
			hi: 'Hindi 🇮🇳',
			hu: 'Hungarian 🇭🇺',
			is: 'Icelandic 🇮🇸',
			id: 'Indonesian 🇮🇩',
			it: 'Italian 🇮🇹',
			ja: 'Japanese 🇯🇵',
			ko: 'Korean 🇰🇷',
			la: 'Latin 🇻🇦',
			no: 'Norwegian 🇳🇴',
			pt: 'Portuguese 🇵🇹',
			'pt-br': 'Portuguese (Brazil) 🇧🇷',
			ro: 'Romanian 🇷🇴',
			ru: 'Russian 🇷🇺',
			sr: 'Serbian 🇷🇸',
			es: 'Spanish 🇪🇸',
			sv: 'Swedish 🇸🇪',
			ta: 'Tamil 🇮🇳',
			th: 'Thai 🇹🇭',
			tr: 'Turkish 🇹🇷',
			vi: 'Vietnamese 🇻🇳'
		};
	
		// Daftar kode bahasa dengan emoji bendera dan bingkai
		let list_tr = `
${barisjudul} *🌍 Kode Bahasa*
${tutupjudul}
${barisfitur} 🇿🇦 af : Afrikaans
${barisfitur} 🇸🇦 ar : Arab
${barisfitur} 🇨🇳 zh : Chinese
${barisfitur} 🇬🇧 en : English
${barisfitur} 🇺🇸 en-us : English (United States)
${barisfitur} 🇫🇷 fr : French
${barisfitur} 🇩🇪 de : German
${barisfitur} 🇮🇳 hi : Hindi
${barisfitur} 🇭🇺 hu : Hungarian
${barisfitur} 🇮🇸 is : Icelandic
${barisfitur} 🇮🇩 id : Indonesian
${barisfitur} 🇮🇹 it : Italian
${barisfitur} 🇯🇵 ja : Japanese
${barisfitur} 🇰🇷 ko : Korean
${barisfitur} 🇻🇦 la : Latin
${barisfitur} 🇳🇴 no : Norwegian
${barisfitur} 🇵🇹 pt : Portuguese
${barisfitur} 🇧🇷 pt-br : Portuguese (Brazil)
${barisfitur} 🇷🇴 ro : Romanian
${barisfitur} 🇷🇺 ru : Russian
${barisfitur} 🇷🇸 sr : Serbian
${barisfitur} 🇪🇸 es : Spanish
${barisfitur} 🇸🇪 sv : Swedish
${barisfitur} 🇮🇳 ta : Tamil
${barisfitur} 🇹🇭 th : Thai
${barisfitur} 🇹🇷 tr : Turkish
${barisfitur} 🇻🇳 vi : Vietnamese
${penutup}
	
✍️ *keterangan penggunaan*:
.translete (kode bahasa) (teks/reply pesan)\n
Contoh: *.translete en Halo*`;
	
		// Jika user hanya mengetik 'tr' atau 'translate', tampilkan list bahasa
		if (!text || args.length === 0) {
			return m.reply(list_tr);
		} else {
			// Proses translasi
			if (!m.quoted && (!text || !args[1])) return m.reply(`Kirim/reply teks dengan caption *.${command} (kode bahasa) (teks/reply pesan)*`);
			
			let lang = args[0] ? args[0] : 'id';  // Gunakan bahasa 'id' sebagai default jika tidak ada
			let teks = args[1] ? args.slice(1).join(' ') : m.quoted.text;  // Ambil teks dari argumen atau reply
			try {
				let hasil = await translate(teks, { to: lang, autoCorrect: true });
				
				// Ambil nama bahasa dari bahasaList, jika tidak ditemukan, tampilkan kode bahasa
				let namaBahasa = bahasaList[lang] || lang.toUpperCase();
	
				// Hasil terjemahan dengan gaya menarik
				let hasil_tr = `
*Dari*  : ${m.quoted ? m.quoted.text : teks}
*Ke*     : ${namaBahasa}
				
${barisjudul} *Hasil*
${fiturtutup}  ${hasil[0]}`;
	
				m.reply(hasil_tr);
			} catch (e) {
				m.reply(`❌ *Kode bahasa ${lang} tidak ditemukan!*`);
			}
		}
	}
	break;
	case 'tts': case 'texttospech': case 'tospech': {
		if (!text) return m.reply('Mana text yg mau diubah menjadi audio?')
		let { tts } = require('./lib/tts')
		let anu = await tts(text)
		naze.sendMessage(m.chat, { audio: anu, ptt: true, mimetype: 'audio/mpeg' }, { quoted: m })
	}
	break
	case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':{

		try {
		let set
		if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
		if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
		if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
		if (/earrape/.test(command)) set = '-af volume=12'
		if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
		if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
		if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
		if (/reverse/.test(command)) set = '-filter_complex "areverse"'
		if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
		if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
		if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
		if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
		if (/audio/.test(mime)) {
		let media = await naze.downloadAndSaveMediaMessage(qmsg)
		let ran = getRandom('.mp3')
		exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
		fs.unlinkSync(media)
		if (err) return m.reply(err)
		let buff = fs.readFileSync(ran)
		naze.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
		fs.unlinkSync(ran)
		})
		} else m.reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)
		} catch (e) {
		console.log(e)
		m.reply('error')
		}}
		break
	//==================================================================
	// ownermenu = 46
	case 'addcase': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text && !text.startsWith('case')) return m.reply('Masukkan Casenya!')
		fs.readFile('naze.js', 'utf8', (err, data) => {
			if (err) {
				console.error('Terjadi kesalahan saat membaca file:', err);
				return;
			}
			const posisi = data.indexOf("case '19rujxl1e':");
			if (posisi !== -1) {
				const codeBaru = data.slice(0, posisi) + '\n' + `${text}` + '\n' + data.slice(posisi);
				fs.writeFile('naze.js', codeBaru, 'utf8', (err) => {
					if (err) {
						m.reply('Terjadi kesalahan saat menulis file: ', err);
					} else {
						m.reply('Case berhasil ditambahkan');
					}
				});
			} else {
				m.reply('Gagal Menambahkan case!');
			}
		});
	}
	break
	case 'addgalau':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}addgalau (namanya) `)
		if (NanoVoiceNote.includes(q)) return m.reply("nama telah di gunakan!!!")
		let delb = await naze.downloadAndSaveMediaMessage(quoted)
		NanoVoiceNote.push(q)
		await fse.copy(delb, `./data/assets/galau/${q}.mp3`)
		fs.unlinkSync(delb)
		m.reply(`sukses menambahkan ke dalam database`)
		}
	break
	case 'addimage':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delimage (namanya)  `)
		if (ImageNano.includes(q)) return m.reply("nama telah di gunakan!!!")
		let delb = await naze.downloadAndSaveMediaMessage(quoted)
		ImageNano.push(q)
		await fse.copy(delb, `./data/NanoMedia/image/${q}.jpg`)
		fs.writeFileSync('./data/NanoMedia/database/xeonimage.json', JSON.stringify(ImageNano))
		fs.unlinkSync(delb)
		m.reply(`sukses menambah "${q}" ke dalam database`)
		}
	break
	case 'addprem': case 'addpr': case 'addprem': case 'addpremium': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply(`Example:\n${prefix + command} @tag|waktu\n${prefix + command} @${m.sender.split('@')[0]}|30d\n_d = day_`)
		let [teks1, teks2] = text.split`|`
		const nmrnya = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
		const onWa = await naze.onWhatsApp(nmrnya)
		if (!onWa.length > 0) return m.reply('Nomer Tersebut Tidak Terdaftar Di Whatsapp!')
		if (teks2) {
			if (!db.users[nmrnya] && !db.users[nmrnya].limit) return m.reply('Nomer tidak terdaftar di BOT !')
			prem.addPremiumUser(nmrnya, teks2, premium);
			m.reply(`Sukses ${command} @${nmrnya.split('@')[0]} Selama ${teks2}`)
			db.users[nmrnya].limit += db.users[nmrnya].vip ? limit.vip : limit.premium
			db.users[nmrnya].uang += db.users[nmrnya].vip ? uang.vip : uang.premium
		} else {
			m.reply(`Masukkan waktunya!\Example:\n${prefix + command} @tag|waktu\n${prefix + command} @${m.sender.split('@')[0]}|30d\n_d = day_`)
		}
	}
	break
	case 'addquotesgalau': {
		if (!isCreator) return m.reply(mess.owner);
		
		// Mendapatkan teks dari argumen
		const quoteText = q.trim();
	
		if (!quoteText) return m.reply('Teks tidak boleh kosong!');
	
		const filePath = './database/kata-kata/quotesgalau.json';
	
		try {
			// Membaca file JSON
			const quotes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	
			// Menambahkan teks baru ke dalam array
			quotes.push(quoteText);
	
			// Menyimpan kembali ke file JSON
			fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2), 'utf8');
	
			// Mengirim pesan konfirmasi
			m.reply(`Teks baru telah berhasil ditambahkan ke dalam file quotesgalau.json:\n\n"${quoteText}"`);
		} catch (err) {
			// Menangani kesalahan jika terjadi
			m.reply(`Terjadi kesalahan saat menambahkan teks: ${err.message}`);
		}
	}
	break;
	case 'addsticker':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delsticker (namanya) `)
		if (NanoSticker.includes(q)) return m.reply("nama telah di gunakan!!!")
		let delb = await naze.downloadAndSaveMediaMessage(quoted)
		NanoSticker.push(q)
		await fse.copy(delb, `./data/NanoMedia/sticker/${q}.webp`)
		fs.writeFileSync('./data/NanoMedia/database/xeonsticker.json', JSON.stringify(NanoSticker))
		fs.unlinkSync(delb)
		m.reply(`sukses menambah "${q}" ke dalam database`)
		}
	break
	case 'addvideo':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delvideo (namanya) `)
		if (VideoNano.includes(q)) return m.reply("nama telah di gunakan!!!")
		let delb = await naze.downloadAndSaveMediaMessage(quoted)
		VideoNano.push(q)
		await fse.copy(delb, `./data/NanoMedia/video/${q}.mp4`)
		fs.writeFileSync('./data/NanoMedia/database/xeonvideo.json', JSON.stringify(VideoNano))
		fs.unlinkSync(delb)
		m.reply(`sukses menambah Video\nsilahkan cek pada list ya..\n gunakan perintah:  ${prefix}listvideo`)
		}
	break
	case 'addvn':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}addvn (namanya) `)
		if (NanoVoiceNote.includes(q)) return m.reply("nama telah di gunakan!!!")
		let delb = await naze.downloadAndSaveMediaMessage(quoted)
		NanoVoiceNote.push(q)
		await fse.copy(delb, `./data/assets/audio/${q}.mp3`)
		fs.writeFileSync('./data/NanoMedia/database/xeonvn.json', JSON.stringify(NanoVoiceNote))
		fs.unlinkSync(delb)
		m.reply(`sukses menambah "${q}" ke dalam database`)
		}
	break
	case 'blockchat': {
		if (!isCreator) return m.reply(mess.owner);
		if (!text) return m.reply('Contoh: .blockchat 628xxxxxxxxxx, 08xxxxxxxxxx, +255xxxxxxxxx');
	
		// Pisahkan input berdasarkan koma dan hapus spasi berlebih
		let numbers = text.split(',').map(num => num.trim());
	
		let blockedNow = [];
		let alreadyBlocked = [];
		let invalidNumbers = [];
	
		numbers.forEach(num => {
			// Normalisasi nomor
			let normalizedNum = num.replace(/[^0-9+]/g, ''); // Hanya biarkan angka dan +
			
			if (normalizedNum.startsWith('0')) {
				normalizedNum = '62' + normalizedNum.slice(1); // Ubah 08xxxx menjadi 628xxxx
			} else if (normalizedNum.startsWith('+')) {
				normalizedNum = normalizedNum.slice(1); // Hapus tanda + di depan
			} else if (!/^\d+$/.test(normalizedNum)) {
				invalidNumbers.push(num); // Nomor tidak valid
				return;
			}
	
			let jid = normalizedNum + '@s.whatsapp.net';
	
			if (global.blockedChats.has(jid)) {
				alreadyBlocked.push(num);
			} else {
				global.blockedChats.add(jid);
				blockedNow.push(num);
			}
		});
	
		// Simpan ke database
		saveBlockedUsers(global.blockedChats);
	
		// Buat respon berdasarkan hasil proses
		let replyMsg = '';
		if (blockedNow.length) replyMsg += `✅ Berhasil memblokir:\n${blockedNow.join('\n')}\n\n`;
		if (alreadyBlocked.length) replyMsg += `⚠️ Sudah diblokir sebelumnya:\n${alreadyBlocked.join('\n')}\n\n`;
		if (invalidNumbers.length) replyMsg += `❌ Nomor tidak valid:\n${invalidNumbers.join('\n')}`;
	
		m.reply(replyMsg || 'Tidak ada nomor yang diproses.');
	}
	break;
	case 'blokir': case 'block': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
			await naze.updateBlockStatus(numbersOnly, 'block').then((a) => m.reply(mess.done)).catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'bot': {
		const settings = {
			anticall: 'Anti Call',
			autobio: 'Auto Bio',
			autoread: 'Auto Read',
			autotyping: 'Auto Type',
			readsw: 'Read SW',
			multiprefix: 'Multi Prefix',
			antitoxic: 'Anti Toxic' // Pengaturan baru untuk mendeteksi kata kotor
		};

		if (!text) return; // Jika user hanya mengetik "bot", bot tidak merespon

		if (text === '--settings' || text === '--setting') {
			// Semua user bisa melihat pengaturan bot yang aktif atau tidak
			const settingsList = Object.keys(settings)
				.map(key => `${settings[key]}: ${db.set[botNumber][key] ? 'On🟢' : 'Off🔴'}`)
				.join('\n');

			await naze.sendMessage(m.chat, { 
				text: `🔧 *Pengaturan Bot:*\n\n${settingsList}\n\n⚠️ Hanya owner yang dapat mengubah pengaturan.\n\n📌 *Cara Mengubah Pengaturan:*\nKetik: \`.bot <setting> on/off\`\nContoh: \`.bot autoread on\``, 
			}, { quoted: m });

		} else if (isCreator) {
			const action = text.split(' ');
			const settingKey = action[0].toLowerCase();
			const settingValue = action[1]?.toLowerCase();

			if (settings[settingKey]) {
				if (settingValue === 'on' || settingValue === 'off') {
					db.set[botNumber][settingKey] = settingValue === 'on';
					m.reply(`✅ *${settings[settingKey]}* telah ${settingValue === 'on' ? '*diaktifkan 🟢*' : '*dimatikan 🔴*'}`);
				} else {
					m.reply(`⚠️ *Format salah!*\nGunakan: \`.bot ${settingKey} on/off\``);
				}
			} else {
				m.reply(`⚠️ *Setting tidak ditemukan!*\nGunakan: \`.bot --settings\` untuk melihat daftar setting yang tersedia.`);
			}
		}
	}
	break;
	case 'change-id-cai': {
		if (!isCreator) return m.reply(mess.owner); // Hanya untuk owner
		if (!text) return m.reply(`*Cara Penggunaan:*\nKetik: ${prefix + command} <kode baru>\n`);
	
		const autoAIPath = './database/autoai.json';
		if (!fs.existsSync(autoAIPath)) fs.writeFileSync(autoAIPath, JSON.stringify({}));
	
		try {
			// Baca dan parsing data autoAI
			let autoAIData = JSON.parse(fs.readFileSync(autoAIPath));
	
			// Perbarui kode ID CAI
			autoAIData.caiCode = text.trim();
			fs.writeFileSync(autoAIPath, JSON.stringify(autoAIData, null, 2));
	
			// Konfirmasi ke owner
			m.reply(`Kode ID CAI berhasil diubah menjadi:\n*${text.trim()}*`);
		} catch (err) {
			console.error("Error saat memperbarui kode CAI:", err);
			m.reply("Maaf, terjadi kesalahan saat mengganti kode ID CAI.");
		}
	}
	break;
	case 'creategc': case 'buatgc': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply(`Example:\n${prefix + command} *Nama Gc*`)
		let group = await naze.groupCreate(q, [m.sender])
		let res = await naze.groupInviteCode(group.id)
		await naze.sendMessage(m.chat, { text: `*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Nama Group :* *${q}*`, detectLink: true }, { quoted: m });
		await naze.groupParticipantsUpdate(group.id, [m.sender], 'promote')
		await naze.sendMessage(group.id, { text: 'Done' })
	}
	break
	case 'delcase': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply('Masukkan Nama Casenya!')
		fs.readFile('naze.js', 'utf8', (err, data) => {
			if (err) {
				console.error('Terjadi kesalahan saat membaca file:', err);
				return;
			}
			const regex = new RegExp(`case\\s+'${text.toLowerCase()}':[\\s\\S]*?break`, 'g');
			const modifiedData = data.replace(regex, '');
			fs.writeFile('naze.js', modifiedData, 'utf8', (err) => {
				if (err) {
					m.reply('Terjadi kesalahan saat menulis file: ', err);
				} else {
					m.reply('Case berhasil dihapus dari file');
				}
			});
		});
	}
	break
	case 'delgalau': {
		if (!isCreator) return m.reply(mess.owner);
		if (args.length < 1) return m.reply(`*Gunakan perintah seperti ini:* ${prefix}delgalau (judul lagu)`);
		
		const judul = q.trim().toLowerCase(); // Mengubah input ke huruf kecil
		const dirPath = './data/assets/galau/';
		
		// Mencari file yang cocok
		const files = fs.readdirSync(dirPath);
		const matchedFile = files.find(file => file.toLowerCase() === `${judul}.mp3`);
		
		if (!matchedFile) return m.reply(`File dengan nama *${judul}* tidak ditemukan.`);
		
		const filePath = `${dirPath}${matchedFile}`;
		
		// Menghapus file
		try {
			fs.unlinkSync(filePath);
			
			// Menghapus dari array NanoVoiceNote
			const index = NanoVoiceNote.findIndex(item => item.toLowerCase() === judul);
			if (index > -1) {
				NanoVoiceNote.splice(index, 1);
			}
			
			m.reply(`File *${judul}* telah dihapus dari database.`);
		} catch (err) {
			m.reply(`Terjadi kesalahan saat menghapus file: ${err.message}`);
		}
	}
	break;
	case 'delimage':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delimage (namanya) `)
		if (!ImageNano.includes(q)) return m.reply("nama tidak tersedia di dalam database!!!")
		let wanu = ImageNano.indexOf(q)
		ImageNano.splice(wanu, 1)
		fs.writeFileSync('./data/NanoMedia/database/xeonimage.json', JSON.stringify(ImageNano))
		fs.unlinkSync(`./data/NanoMedia/image/${q}.jpg`)
		m.reply(`sukses menghapus "${q}" dari database`)
		}
	break
	case 'delpr': case 'delprem': case 'delpremium': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply(`Example:\n${prefix + command} @tag`)
		const nmrnya = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
		if (!db.users[nmrnya] && !db.users[nmrnya].limit) return m.reply('Nomer tidak terdaftar di BOT !')
		if (prem.checkPremiumUser(nmrnya, premium)) {
			premium.splice(prem.getPremiumPosition(nmrnya, premium), 1);
			fs.writeFileSync('./database/premium.json', JSON.stringify(premium));
			m.reply(`Sukses ${command} @${nmrnya.split('@')[0]}`)
			db.users[nmrnya].limit += db.users[nmrnya].vip ? limit.vip : limit.free
			db.users[nmrnya].uang += db.users[nmrnya].vip ? uang.vip : uang.free
		} else {
			m.reply(`User @${nmrnya.split('@')[0]} Bukan Premium❗`)
		}
	}
	break
	case 'deletesampah': case 'delsampah': {
		if (!isCreator) return m.reply(mess.owner)
		fs.readdir('./database/sampah', async function (err, files) {
			if (err) {
				console.log('Unable to scan directory: ' + err);
				return m.reply('Unable to scan directory: ' + err);
			}
			let filteredArray = await files.filter(item => item.endsWith('gif') || item.endsWith('png') || item.endsWith('mp3')  || item.endsWith('mp4') || item.endsWith('jpg') ||item.endsWith('webp') ||item.endsWith('webm') || item.endsWith('opus') || item.endsWith('jpeg'));
			let teks = `Terdeteksi ${filteredArray.length} Sampah file\n\n`
			if(filteredArray.length == 0) return m.reply(teks);
			filteredArray.map(function(e, i) {
				teks += (i+1)+`. ${e}\n`
			})
			if (text && text == 'true') {
				let { key } = await m.reply('Menghapus Sampah File..')
				await filteredArray.forEach(function (file) {
					fs.unlinkSync('./database/sampah/' + file)
				});
				sleep(2000)
				m.reply('Berhasil Menghapus Semua Sampah', { edit: key })
			} else m.reply(teks + `\nKetik _${prefix + command} true_\nUntuk Menghapus`)
		});
	}
	break
	case 'deletesession': case 'delsesi': {
		if (!isCreator) return m.reply(mess.owner)
		
		const folderPath = './nazedev';
		const mainSessionFile = 'creds.json';
	
		fs.readdir(folderPath, async (err, files) => {
			if (err) {
				console.log('Unable to scan directory: ' + err);
				return m.reply('Unable to scan directory: ' + err);
			}
	
			// Filter semua file kecuali creds.json
			let sessionFiles = files.filter(file => file !== mainSessionFile);
			let teks = `Terdeteksi ${sessionFiles.length} Session file\n\n`;
	
			if (sessionFiles.length === 0) return m.reply(teks);
	
			sessionFiles.forEach((file, i) => {
				teks += `${i + 1}. ${file}\n`;
			});
	
			if (text && text === 'true') {
				let { key } = await m.reply('Menghapus Session File..');
				
				// Hapus file satu per satu secara async
				for (let file of sessionFiles) {
					try {
						await fs.promises.unlink(`${folderPath}/${file}`);
					} catch (error) {
						console.log(`Gagal menghapus ${file}: ${error.message}`);
					}
				}
	
				await sleep(2000);
				m.reply('Berhasil Menghapus Semua Sampah Session', { edit: key });
			} else {
				m.reply(teks + `\nKetik _${prefix + command} true_\nUntuk Menghapus`);
			}
		});
	}
	break;
	case 'delsticker':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delsticker (namanya) `)
		if (!NanoSticker.includes(q)) return m.reply("nama tidak tersedia di dalam database!!!")
		let wanu = NanoSticker.indexOf(q)
		NanoSticker.splice(wanu, 1)
		fs.writeFileSync('./data/NanoMedia/database/xeonsticker.json', JSON.stringify(NanoSticker))
		fs.unlinkSync(`./data/NanoMedia/sticker/${q}.webp`)
		m.reply(`sukses menghapus "${q}" dari database`)
		}
	break
	case 'delvideo':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delvideo (namanya) `)
		if (!VideoNano.includes(q)) return m.reply("The name does not exist in the database")
		let wanu = VideoNano.indexOf(q)
		VideoNano.splice(wanu, 1)
		fs.writeFileSync('./data/NanoMedia/database/xeonvideo.json', JSON.stringify(VideoNano))
		fs.unlinkSync(`./data/NanoMedia/video/${q}.mp4`)
		m.reply(`sukses menghapus "${q}" dari database`)
		}
	break
	case 'delvn':{
		if (!isCreator) return m.reply(mess.owner)
		if (args.length < 1) return m.reply(`*reply pesan!!!* lalu gunakan perintah seperti ini:\n\n${prefix}delvn (namanya)  `)
		if (!NanoVoiceNote.includes(q)) return m.reply("The name does not exist in the database")
		let wanu = NanoVoiceNote.indexOf(q)
		NanoVoiceNote.splice(wanu, 1)
		fs.writeFileSync('./data/NanoMedia/database/xeonvn.json', JSON.stringify(NanoVoiceNote))
		fs.unlinkSync(`./data/assets/audio/${q}.mp3`)
		m.reply(`sukses menghapus "${q}" dari database`)
		}
	break
	case 'getcase': {
		if (!isCreator) return m.reply(mess.owner);
		if (!text) return m.reply('Masukkan Nama Casenya!');
		
		const getCase = (cases) => {
			const fileContent = fs.readFileSync("naze.js").toString();
			const caseStartIndex = fileContent.indexOf(`case '${cases}'`);
			
			if (caseStartIndex === -1) {
				return `Case '${cases}' tidak ditemukan!`;
			}
			
			const caseContent = fileContent.split(`case '${cases}'`)[1];
			
			if (!caseContent || caseContent.indexOf('break') === -1) {
				return `Tidak bisa mendapatkan konten case '${cases}'.`;
			}
			
			return `case '${cases}'` + caseContent.split("break")[0] + "break";
		};
		
		m.reply(`${getCase(text)}`);
	}
	break;
	case 'getdatabase': case 'getdb':  {
	if (!isCreator) return m.reply(mess.owner)
	let from = m.chat || m.sender;
	
	// Tentukan path ke file database
	const databasePath = './database/database.json';
	
	// Periksa apakah file database.json ada
	if (fs.existsSync(databasePath)) {
		try {
			// Mengirim file database.json ke pengguna
			await naze.sendMessage(from, { document: { url: databasePath }, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m });
			console.log('File database.json berhasil dikirim');
		} catch (error) {
			console.error(`Gagal mengirim file: ${error.message}`);
		}
	} else {
		console.error('File database.json tidak ditemukan');
		// Kirim pesan ke pengguna jika file tidak ditemukan
		await naze.sendMessage(from, 'Maaf, file database.json tidak ditemukan.', MessageType.text, { quoted: m });
	}
}
break;
	case 'getfile': {
		if (!isCreator) return m.reply(mess.owner);
		let from = m.chat || m.sender;
		
		// Ambil seluruh teks setelah perintah 'getfile' dan hilangkan spasi berlebih
		let filePath = m.text.trim().replace(/\s+/g, ' ').split(' ').slice(1).join(' '); // Menghapus spasi berlebih dan mengambil seluruh teks setelah perintah
		
		if (!filePath) {
			return naze.sendMessage(from, { text: 'Anda harus memasukkan jalur file yang ingin diambil. Contoh: getfile ./folder/subfolder/nama_file.json' }, { quoted: m });
		}
	
		// Kirim pesan bahwa permintaan sedang diproses
		await naze.sendMessage(from, { text: '*Permintaan sedang diproses, harap tunggu...*' }, { quoted: m });
	
		// Tentukan jalur file (jika pengguna tidak memasukkan jalur, cari di direktori './')
		const fileLocation = filePath.startsWith('./') ? filePath : `./${filePath}`;
		
		// Periksa apakah file ada dan valid
		if (fs.existsSync(fileLocation) && fs.lstatSync(fileLocation).isFile()) {
			try {
				// Mengirim file yang diminta ke pengguna
				await naze.sendMessage(from, { document: { url: fileLocation }, mimetype: 'application/octet-stream', fileName: filePath.split('/').pop() }, { quoted: m });
				console.log(`File ${filePath} berhasil dikirim`);
			} catch (error) {
				console.error(`Gagal mengirim file: ${error.message}`);
				await naze.sendMessage(from, { text: `Maaf, terjadi kesalahan saat mengirim file: ${error.message}` }, { quoted: m });
			}
		} else {
			console.error(`File ${filePath} tidak ditemukan atau bukan file yang valid.`);
			// Kirim pesan ke pengguna jika file tidak ditemukan atau jalur salah
			await naze.sendMessage(from, { text: `Maaf, file ${filePath} tidak ditemukan. Pastikan Anda memasukkan jalur file dengan benar.` }, { quoted: m });
		}
	}
	break;
	case 'getidgc': {
		// Memeriksa apakah pengirim adalah owner
		if (!isCreator) return m.reply(mess.owner);
	
		// Memeriksa apakah bot sedang berada dalam grup
		if (!m.isGroup) return m.reply('Fitur ini hanya bisa digunakan di dalam grup.');
	
		// Mendapatkan ID grup
		const groupId = m.chat;
	
		// Mengirimkan ID grup ke owner
		m.reply(`ID grup ini adalah:\n ${groupId}`);
	}
		break;
    case 'getsc': case 'getscript': {
        if (!isCreator) return m.reply(mess.owner)
        let from = m.chat || m.sender;
    
        console.log("Perintah 'getsc' dipanggil");
    
        // Tentukan nama file zip yang akan dibuat
        const outputPath = './BangsulBotz.zip';
        
        // Buat stream output ke file ZIP
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set level kompresi
        });
    
        // Tangani event close, end, dan error
        output.on('close', async () => {
            console.log(`File ZIP sebesar ${archive.pointer()} total bytes telah dibuat.`);
    
            // Kirim file ZIP ke pengguna
            try {
                await naze.sendMessage(from, { document: { url: outputPath }, mimetype: 'application/zip', fileName: 'BangsulBotz.zip' }, { quoted: m });
                console.log('File ZIP berhasil dikirim.');
                m.reply('done yang mulia.');
                
                // Hapus file ZIP setelah dikirim
                fs.unlinkSync(outputPath);
                console.log('File ZIP dihapus dari server.');
    
            } catch (error) {
                console.error(`Gagal mengirim file ZIP: ${error.message}`);
                m.reply(`❌ Gagal mengirim file ZIP: ${error.message}`);
            }
        });
    
        output.on('end', () => {
            console.log('Data telah dikirim.');
        });
    
        archive.on('error', (err) => {
            console.error(`Error during archiving: ${err.message}`);
            m.reply(`❌ Terjadi kesalahan saat mengarsipkan: ${err.message}`);
            throw err;
        });
    
        // Pipe data archiver ke output file
        archive.pipe(output);
        console.log("Memulai proses pengarsipan...");
        m.reply("sedang di proses yang mulia...");
    
        try {
            archive.directory('./database/', 'database');
            archive.directory('./lib/', 'lib');
            archive.directory('./src/', 'src');
            archive.directory('./temp/', 'temp');
            archive.file('./app.json', { name: 'app.json' });
            archive.file('./index.js', { name: 'index.js' });
            archive.file('./LICENSE', { name: 'LICENSE' });
            archive.file('./package.json', { name: 'package.json' });
            archive.file('./procfile', { name: 'procfile' });
            archive.file('./README.md', { name: 'README.md' });
            archive.file('./settings.js', { name: 'settings.js' });
            archive.file('./speed.py', { name: 'speed.py' });
            archive.file('./runspeed.py', { name: 'runspeed.py' });
            archive.file('./start.js', { name: 'start.js' });
    
            // Tambahkan hanya file creds.js dari folder nazedev jika ada
            const credsPath = './nazedev/creds.js';
            if (fs.existsSync(credsPath)) {
                archive.file(credsPath, { name: 'nazedev/creds.js' });
            } else {
                console.warn("⚠️ File creds.js tidak ditemukan di folder nazedev.");
            }
    
            // Selesaikan proses pengarsipan
            archive.finalize().then(() => {
                console.log('Proses pengarsipan selesai.');
            }).catch((err) => {
                console.error(`Error during finalizing: ${err.message}`);
                m.reply(`❌ Terjadi kesalahan saat menyelesaikan pengarsipan: ${err.message}`);
            });
        } catch (err) {
            console.error(`Error during archiving setup: ${err.message}`);
            m.reply(`❌ Terjadi kesalahan saat menyiapkan pengarsipan: ${err.message}`);
        }
    }
    break;
    case 'getsc1': case 'getscript1': case 'getdata': {
    if (!isCreator) return m.reply(mess.owner)
    let from = m.chat || m.sender;

    console.log("Perintah 'getsc1' dipanggil");

    // Tentukan nama file zip yang akan dibuat
    const outputPath = './data-media.zip';
    
    // Buat stream output ke file ZIP
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Set level kompresi
    });

    // Tangani event close, end, dan error
    output.on('close', async () => {
        console.log(`File ZIP sebesar ${archive.pointer()} total bytes telah dibuat.`);

        // Kirim file ZIP ke pengguna
        try {
            await naze.sendMessage(from, { document: { url: outputPath }, mimetype: 'application/zip', fileName: 'BangsulBotz.zip' }, { quoted: m });
            console.log('File ZIP berhasil dikirim.');
            m.reply('done yang mulia.');
            
            // Hapus file ZIP setelah dikirim
            fs.unlinkSync(outputPath);
            console.log('File ZIP dihapus dari server.');

        } catch (error) {
            console.error(`Gagal mengirim file ZIP: ${error.message}`);
            m.reply(`❌ Gagal mengirim file ZIP: ${error.message}`);
        }
    });

    output.on('end', () => {
        console.log('Data telah dikirim.');
    });

    archive.on('error', (err) => {
        console.error(`Error during archiving: ${err.message}`);
        m.reply(`❌ Terjadi kesalahan saat mengarsipkan: ${err.message}`);
        throw err;
    });

    // Pipe data archiver ke output file
    archive.pipe(output);
    console.log("Memulai proses pengarsipan...");
    m.reply("sedang di proses yang mulia...")
    // Tambahkan folder 'data' dan file 'naze.js' ke dalam arsip ZIP
    try {
        archive.directory('./data/', 'data');
        
        // Selesaikan proses pengarsipan
        archive.finalize().then(() => {
            console.log('Proses pengarsipan selesai.');
        }).catch((err) => {
            console.error(`Error during finalizing: ${err.message}`);
            m.reply(`❌ Terjadi kesalahan saat menyelesaikan pengarsipan: ${err.message}`);
        });
    } catch (err) {
        console.error(`Error during archiving setup: ${err.message}`);
        m.reply(`❌ Terjadi kesalahan saat menyiapkan pengarsipan: ${err.message}`);
    }
}
break;
	case 'getsession': case 'getsesi': {
		if (!isCreator) return m.reply(mess.owner)
		await naze.sendMessage(m.chat, {
			document: fs.readFileSync('./nazedev/creds.json'),
			mimetype: 'application/json',
			fileName: 'creds.json'
		}, { quoted: m });
	}
	break
	case 'join': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply('Masukkan Link Group!')
		if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
		const result = args[0].split('https://chat.whatsapp.com/')[1]
		m.reply(mess.wait)
		await naze.groupAcceptInvite(result).catch((res) => {
			if (res.data == 400) return m.reply('Grup Tidak Di Temukan❗');
			if (res.data == 401) return m.reply('Bot Di Kick Dari Grup Tersebut❗');
			if (res.data == 409) return m.reply('Bot Sudah Join Di Grup Tersebut❗');
			if (res.data == 410) return m.reply('Url Grup Telah Di Setel Ulang❗');
			if (res.data == 500) return m.reply('Grup Penuh❗');
		})
	}
	break
	case 'leave': {
		if (!isCreator) return m.reply(mess.owner)
		await naze.groupLeave(m.chat).then(() => naze.sendFromOwner(owner, 'Sukses Keluar Dari Grup', m, { contextInfo: { isForwarded: true }}))
	}
	break
	case 'listbadword': {
		if (!isOwner) return m.reply("Perintah ini hanya untuk owner.");
		m.reply(`Daftar kata kotor:\n\n${global.kataKotor.join('\n')}`);
		}
		break;
	case 'listblock': {
		let anu = await naze.fetchBlocklist()
		m.reply(`Total Block : ${anu.length}\n` + anu.map(v => '• ' + v.replace(/@.+/, '')).join`\n`)
	}
	break
	case 'listblockchat': {
		if (!isCreator) return m.reply(mess.owner);
	
		let blockedList = [...global.blockedChats];
	
		if (blockedList.length === 0) return m.reply('Tidak ada nomor yang diblokir.');
	
		let response = '📋 *Daftar Nomor Diblokir:*\n' + blockedList.map(num => `- ${num}`).join('\n');
	
		m.reply(response);
	}
	break;
	case 'listfile': {
		if (!isCreator) return m.reply(mess.owner);
		let from = m.chat || m.sender;
	
		// Ambil path direktori yang diberikan oleh pengguna
		let directoryPath = m.text.trim().replace(/\s+/g, ' ').split(' ')[1] || './'; // Ambil path setelah perintah, jika tidak ada gunakan './'
	
		// Kirim pesan bahwa permintaan sedang diproses
		await naze.sendMessage(from, { text: '*Memproses permintaan, harap tunggu...*' }, { quoted: m });
	
		// Baca isi direktori
		fs.readdir(directoryPath, (err, items) => {
			if (err) {
				console.error(`Gagal membaca direktori: ${err.message}`);
				return naze.sendMessage(from, { text: `Maaf, terjadi kesalahan saat membaca direktori: ${err.message}` }, { quoted: m });
			}
	
			// Pisahkan folder dan file
			let folders = [];
			let filesList = [];
	
			items.forEach(item => {
				const itemPath = path.join(directoryPath, item);
				const isDirectory = fs.statSync(itemPath).isDirectory();
				if (isDirectory) {
					folders.push(item);
				} else {
					filesList.push(item);
				}
			});
	
			// Buat pesan daftar folder dan file
			let listMessage = `*periksa directory dari:*\n${directoryPath}:\n\n`;
			listMessage += '*Folder:*\n';
			if (folders.length === 0) listMessage += 'Tidak ada folder.\n';
			folders.forEach(folder => {
				listMessage += `📁 ${folder}\n`;
			});
	
			listMessage += '\n*File:*\n';
			if (filesList.length === 0) listMessage += 'Tidak ada file.\n';
			filesList.forEach(file => {
				listMessage += `📄 ${file}\n`;
			});
	
			// Kirim daftar folder dan file
			naze.sendMessage(from, { text: listMessage }, { quoted: m });
		});
	}
	break;
	case 'listgc': {
		if (!isCreator) return m.reply(mess.owner)
		
			const pembuka1 = '╔═〇';
			const pembuka2 = '╠═════════〇';
			const pembuka3 = '╚═════════════════〇';
			const fitur1   = '╔»';
			const fitur2   = '╠»';
			const fitur3   = '╚»';
		// Ambil semua chat grup
		let anu = store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
		let teks = `${pembuka1} *LIST GROUP CHAT*\n${fitur3} *Total Group* : ${anu.length} Group\n\n`
		if (anu.length === 0) return m.reply(teks)
		
		for (let i of anu) {
			// Ambil metadata grup
			let metadata = store.groupMetadata[i] || await naze.groupMetadata(i)
			
			// Tambahkan detail grup ke teks
			teks += `${fitur1} *Nama :* ${metadata.subject}\n` +
					`${fitur2} *Admin :* ${metadata.owner ? `@${metadata.owner.split('@')[0]}` : '-'}\n` +
					`${fitur2} *ID :* ${metadata.id}\n` +
					`${fitur2} *Member :* ${metadata.participants.length}\n` +
					`${pembuka3}\n\n`
		}
		
		// Kirim teks dengan mentions
		await naze.sendTextMentions(m.chat, teks, m)
	}
	break
	case 'listpc': {
		if (!isCreator) return m.reply(mess.owner)
		let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
		let teks = `● *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
		if (anu.length === 0) return m.reply(teks)
		for (let i of anu) {
			if (store.messages[i] && store.messages[i].array && store.messages[i].array[0]) {
				let nama = store.messages[i].array[0].pushName
				teks += `${setv} *Nama :* ${nama}\n${setv} *User :* @${i.split('@')[0]}\n${setv} *Chat :* https://wa.me/${i.split('@')[0]}\n\n=====================\n\n`
			}
		}
		await naze.sendTextMentions(m.chat, teks, m)
	}
	break
	case 'listpr': case 'listprem': case 'listpremium': {
		if (!isCreator) return m.reply(mess.owner)
		let txt = `*------「 LIST PREMIUM 」------*\n\n`
		for (let userprem of premium) {
			txt += `➸ *Nomer*: @${userprem.id.split('@')[0]}\n➸ *Limit*: ${db.users[userprem.id].limit}\n➸ *Uang*: ${db.users[userprem.id].uang.toLocaleString('id-ID')}\n➸ *Expired*: ${formatDate(userprem.expired)}\n\n`
		}
		m.reply(txt)
	}
	break
	case 'listvn':{
		let teks = '┌──⭓「 *VN List* 」\n│\n'
		for (let x of NanoVoiceNote) {
		teks += `│⭔ ${x}\n`
		}
		teks += `│\n└────────────⭓\n\n*total : ${NanoVoiceNote.length}*`
		m.reply(teks)
		}
	break
	case 'mode': {
		if (!isCreator) return m.reply(mess.owner)
		if (text === 'public') {
			if (naze.public) return m.reply('*Sudah Aktif Sebelumnya*')
			naze.public = true
			m.reply('*Sukse Change To Public Usage*')
		} else if (text === 'self') {
			naze.public = false
			m.reply('*Sukse Change To Self Usage*')
		} else {
			let buttonnya = [{
				name: 'single_select',
				buttonParamsJson: {
					title: 'Pilih',
					sections: [{
						title: 'Mode Bot',
						rows: [
							{ title: 'Mode Public', description: 'Mengaktifkan Mode Public', id: 'mode public' },
							{ title: 'Mode Self', description: 'Mengubah Ke Mode Self', id: 'mode self' },
						]
					}]
				}
			}]
			await naze.sendButtonMsg(m.chat, 'Mode Bot', ucapanWaktu, 'Silahkan dipilih Owner🫡', null, buttonnya, m);
		}
	}
	break
	case 'newchat-id-cai': {
		if (!isCreator) return m.reply(mess.owner);
		if (!text) return m.reply(`Cara penggunaan: *${prefix + command} (id link cai)*`);
		
		const fetch = require('node-fetch');
		const idCai = text.trim();
		const url = `https://cai.neekoi.me/newchat?id=${idCai}`;
		
		m.reply("Memproses ID CAI, harap tunggu sebentar...");
		
		try {
			// Ambil data dari URL
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Gagal mengambil data. Status kode: ${response.status}`);
			
			const data = await response.json();
			
			// Periksa apakah response memiliki status "OK"
			if (data.status !== "OK") throw new Error("ID CAI tidak valid atau terjadi kesalahan.");
			
			// Ambil informasi penting untuk ditampilkan
			const createdAt = data.created || "Tidak tersedia";
			const charId = data.external_id || "Tidak tersedia";
			const lastInteraction = data.last_interaction || "Tidak tersedia";
			const botName = data.participants.find(p => !p.is_human)?.name || "Tidak tersedia";
			const userName = data.participants.find(p => p.is_human)?.name || "Tidak tersedia";
			const firstBotMessage = data.messages?.[0]?.text || "Tidak tersedia";
			
			// Format pesan ke owner
			const resultMessage = `*✅ ID CAI berhasil dibuat*\n\n` +
				`🔹 *Waktu Dibuat:* ${createdAt}\n` +
				`🔹 *ID Karakter:* ${charId}\n` +
				`🔹 *Nama Bot:* ${botName}\n` +
				`🔹 *Pengguna:* ${userName}\n` +
				`🔹 *Interaksi Terakhir:* ${lastInteraction}\n\n`;
			
			m.reply(resultMessage);
			
		} catch (error) {
			// Tangani kesalahan dan beri tahu owner
			console.error("Error fetching newchat ID:", error);
			m.reply(`❌ Terjadi kesalahan: ${error.message}`);
		}
	}
	break;
	case 'setbio': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply('Mana text nya?')
		naze.setStatus(q)
		m.reply(`*Bio telah di ganti menjadi ${q}*`)
	}
	break
	case 'setppbot': {
		if (!isCreator) return m.reply(mess.owner)
		if (!/image/.test(mime)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`)
		let media = await naze.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
		if (text.length > 0) {
			let { img } = await generateProfilePicture(media)
			await naze.query({
				tag: 'iq',
				attrs: {
					to: botNumber,
					type: 'set',
					xmlns: 'w:profile:picture'
				},
				content: [{
					tag: 'picture',
					attrs: { type: 'image' },
					content: img
				}]
			})
			await fs.unlinkSync(media)
			m.reply('Sukses')
		} else {
			await naze.updateProfilePicture(botNumber, { url: media })
			await fs.unlinkSync(media)
			m.reply('Sukses')
		}
	}
	break
	case 'spam-pairing': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text) return m.reply(`⚠️ *Contoh Penggunaan:*\n${prefix + command} +628xxxxxx|150\n\n📌 *Keterangan:*\n- Masukkan nomor target dengan format lengkap.\n- Gunakan tanda | untuk memisahkan nomor dan jumlah spam.`);
		
		m.reply(`⏳ *Sedang memproses...*\nMohon tunggu, bot akan mengirim kode pairing secara bertahap.`);
	
		// Parsing input
		let [peenis, pepekk = "200"] = text.split("|");
		let target = peenis.replace(/[^0-9]/g, '').trim();
	
		// Inisialisasi koneksi Baileys
		let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
		let { state } = await useMultiFileAuthState('pepek');
		let { version } = await fetchLatestBaileysVersion();
		let pino = require("pino");
		let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) });
	
		// Loop untuk mengirim pairing code
		let count = 0;
		for (let i = 0; i < pepekk; i++) {
			await sleep(1500);
			let prc = await sucked.requestPairingCode(target);
			count++;
			console.log(`Spam Pairing Code Berhasil\nNomor: ${target}\nKode: ${prc}\nProses ke-${count} dari ${pepekk}.\n`);
		}
	
		// Pesan selesai
		m.reply(`🎉 *Selesai!*\nBot telah menyelesaikan spam pairing code untuk nomor ${target} sebanyak ${pepekk} kali.\n\n💡 *Tips: Gunakan fitur ini dengan bijak.*`);
		await sleep(15000);
	}
	break;
	case 'spamuser': {
		// Memeriksa apakah pengirim adalah owner
		if (!isCreator) return m.reply(mess.owner);
	
		// Memeriksa apakah format yang diberikan benar
		if (!text) return m.reply('gunakan perintah\n\nspamuser (nomor target atau ID grup),(teks),(jumlah pesan)\n\ncontoh:\nspamuser 628xxx,hai,100\natau\nspamuser 120363198691979061@g.us,macam kentut bang,100');
	
		// Memisahkan input menjadi target (nomor atau ID grup), teks, dan jumlah pesan
		const [target, message, count] = text.split(',');
	
		// Memeriksa validitas input
		if (!target || !message || !count) {
			return m.reply('Format salah! Contoh:\nspamuser 6281266021317,macam kentut bang,100\natau\nspamuser 120363198691979061@g.us,macam kentut bang,100');
		}
	
		const numMessages = parseInt(count);
	
		// Fungsi untuk mengirim pesan secara berulang
		const sendMessages = async () => {
			const startTime = new Date();
			for (let i = 0; i < numMessages; i++) {
				await naze.sendMessage(target.includes('@g.us') ? target : `${target}@s.whatsapp.net`, { text: message });
			}
			const endTime = new Date();
			const duration = (endTime - startTime) / 1000; // Durasi dalam detik
			return duration;
		};
	
		// Mulai mengirim pesan
		m.reply(`_Mulai mengirim ${numMessages} pesan ke ${target}_`);
		sendMessages().then((duration) => {
			m.reply(`Berhasil mengirim ${numMessages} pesan ke ${target}\n dalam waktu : ${duration.toFixed(2)} detik.`);
		}).catch(err => {
			console.error(err);
			m.reply('Terjadi kesalahan saat mengirim pesan.');
		});
	}
	break;
	case 'unblokir':case 'openblokir':  case 'openblock': case 'unblock': {
		if (!isCreator) return m.reply(mess.owner)
		if (!text && !m.quoted) {
			m.reply(`Contoh: ${prefix + command} 62xxx`)
		} else {
			const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
			await naze.updateBlockStatus(numbersOnly, 'unblock').then((a) => m.reply(mess.done)).catch((err) => m.reply('Gagal!'))
		}
	}
	break
	case 'unblockchat': {
		if (!isCreator) return m.reply(mess.owner);
		if (!text) return m.reply('Contoh: .unblockchat 628xxxxxxxxxx');
	
		let target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
	
		if (!global.blockedChats.has(target)) return m.reply('Nomor ini tidak dalam daftar blokir.');
	
		global.blockedChats.delete(target); // Hapus dari daftar blokir
		saveBlockedUsers(); // Simpan perubahan ke database
	
		m.reply(`✅ Nomor ${text} telah di-unblock.`);
	}
	break;
	case 'listgalau1': { //tidak dihitung
		const dirPath = './data/assets/galau/';
		
		// Mengambil semua file dari folder
		const soundFiles = fs.readdirSync(dirPath);
		
		if (soundFiles.length === 0) {
			return m.reply('Tidak ada file di folder ini.');
		}
		
		// Mengurutkan file berdasarkan nama secara abjad
		const sortedFiles = soundFiles.sort((a, b) => a.localeCompare(b));
		
		// Membuat tombol untuk setiap file
		const buttonOptions = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "🎶 PILIH LAGU GALAU 🎶",
					sections: [
						{
							title: "Daftar Lagu",
							rows: sortedFiles.map((file) => ({
								title: file.replace('.mp3', ''), // Menampilkan nama file tanpa .mp3
								id: `.getgalau ${file.replace('.mp3', '')}` // Mengirim perintah getgalau dengan nama file
							}))
						}
					]
				}
			}
		];
		
		// Mengirim pesan dengan tombol
		await naze.sendButtonMsg(
			m.chat,
			"Pilih lagu galau yang ingin Anda dengarkan:",
			"Playlist Lagu Galau",
			"🎶 LIST LAGU GALAU 🎶",
			null,
			buttonOptions,
			m
		);
	}
	break;
	case 'getgalau1': { //tidak di hitung
		if (args.length < 1) return m.reply(`*Gunakan perintah seperti ini:* ${prefix}getgalau (judul lagu)`);
		
		const judul = q.trim().toLowerCase(); // Mengubah input ke huruf kecil
		const dirPath = './data/assets/galau/';
		
		// Mencari file yang cocok
		const files = fs.readdirSync(dirPath);
		const matchedFile = files.find(file => file.toLowerCase() === `${judul}.mp3`);
		
		if (!matchedFile) return m.reply(`File dengan nama *${judul}* tidak ditemukan.`);
		
		const filePath = `${dirPath}${matchedFile}`;
		
		// Mengirimkan file sebagai pesan suara (VN)
		try {
			m.reply(`Mengirimkan file *${judul}*...\n\njangan galau terus yaaa🥹🥺\n_kalau ada masalah cerita aja gak papa kok_`);
			await naze.sendMessage(m.chat, { audio: fs.readFileSync(filePath), mimetype: 'audio/mp4', ptt: true }, { quoted: m });
		} catch (err) {
			m.reply(`Terjadi kesalahan saat mengirim file: ${err.message}`);
		}
	}
	break;
	//==================================================================
	// quotesmenu = 9
	case 'quotesbucin':		case 'qbucin':    {
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesbucin.json')));
				// Memformat teks menjadi bold dan menambahkan tanda petik
			const formattedText = `*${hasil}*`; // Teks bold
	
			// Mengirim pesan
			m.reply(`"${formattedText}"`); // Menambahkan tanda petik
		}
		break
	case 'quotesmotivasi':	case 'qmotivasi': {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesmotivasi.json')));
			// Memformat teks menjadi bold dan menambahkan tanda petik
		const formattedText = `*${hasil}*`; // Teks bold

		// Mengirim pesan
		m.reply(`"${formattedText}"`); // Menambahkan tanda petik
	}
	break
	case 'quotesgalau':     case 'qgalau':    {
		// Kumpulan emoji sedih
		const sadEmojis = ['😌', '🥀', '😢', '😔', '😣', '🥺', '😿', '🌧️'];

		// Mengambil quote galau secara acak dari file JSON
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesgalau.json')));

		// Memilih emoji sedih secara acak
		const randomSadEmoji = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];

		// Memformat teks menjadi bold dan menambahkan tanda petik serta emoji sedih
		const formattedText = `"*${hasil}*" ${randomSadEmoji}`; // Teks bold dan emoji

		let from = m.chat || m.sender;

		// Mendapatkan semua file sound yang ada di direktori './data/assets/galau'
		const soundFiles = fs.readdirSync('./data/assets/galau');

		// Memilih file sound secara acak
		const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];

		// Periksa apakah file audio ada
		if (!fs.existsSync(`./data/assets/galau/${randomSound}`)) {
			console.error(`File tidak ditemukan: ./data/assets/galau/${randomSound}`);
			return;
		}

		// Mengirim quote dengan format dan mereply pesan user
		const sentMsg = await naze.sendMessage(from, { text: formattedText }, { quoted: m });

		// Mengirim voice note (VN) secara acak dari folder './data/assets/galau'
		await naze.sendMessage(from, { 
			audio: { url: `./data/assets/galau/${randomSound}` }, 
			mimetype: 'audio/mp4',
			ptt: true // Menandakan bahwa ini adalah voice note
		}, { quoted: sentMsg }); // Voice note mereply pesan quotes
	}
	break;
	case 'quotesgombal': 	case 'qgombal':   {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesgombal.json')));
			// Memformat teks menjadi bold dan menambahkan tanda petik
		const formattedText = `*${hasil}*`; // Teks bold

		// Mengirim pesan
		m.reply(`"${formattedText}"`); // Menambahkan tanda petik
	}
	break
	case 'quoteshacker':	case 'qhacker':   {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quoteshacker.json')));
			// Memformat teks menjadi bold dan menambahkan tanda petik
		const formattedText = `*${hasil}*`; // Teks bold

		// Mengirim pesan
		m.reply(`"${formattedText}"`); // Menambahkan tanda petik
	}
	break
	case 'quotesbijak':		case 'qbijak':    {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesbijak.json')));
			// Memformat teks menjadi bold dan menambahkan tanda petik
		const formattedText = `*${hasil}*`; // Teks bold

		// Mengirim pesan
		m.reply(`"${formattedText}"`); // Menambahkan tanda petik
	}
	break
	case 'truth':    {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/truth.json')));
	m.reply(`_${hasil}_`)
	}
	break
	case 'renungan': {
	const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/renungan.json')));
	m.reply('', {
		contextInfo: {
			forwardingScore: 10,
			isForwarded: true,
			externalAdReply: {
				title: (m.pushName || 'Anonim'),
				thumbnailUrl: hasil,
				mediaType: 1,
				previewType: 'PHOTO',
				renderLargerThumbnail: true,
			}
		}
	});
	}
	break
	case 'quotesbacot':		case 'qbacot': 	  {
		const hasil = pickRandom(JSON.parse(fs.readFileSync('./database/kata-kata/quotesbacot.json')));	
		const formattedText = `*${hasil}*`;
		m.reply(`"${formattedText}"`); 
		}
	break		   
	//==================================================================
	// searchmenu = 10
	case 'bingimage': case 'bimg': case 'bingimg':
			if (!text) return m.reply('Mohon berikan kata kunci pencarian gambar!');
		  
			// Mengirimkan pesan "wait"
			await m.reply(mess.wait);
		  
			// Fungsi untuk membuat pesan gambar
			async function createImage(url) {
			  const { imageMessage } = await generateWAMessageContent({
				image: { url }
			  }, { 
				upload: naze.waUploadToServer 
			  });
			  return imageMessage;
			}
		  
			// Fungsi untuk mengacak array
			function shuffleArray(array) {
			  for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			  }
			}
		  
			try {
			  let push = [];
			  // Mengambil data dari API Bing Image
			  let { data } = await axios.get(`https://api.siputzx.my.id/api/s/bimg?query=${text}`);
			  if (data.status) {
				let images = data.data; // Ambil 10 gambar pertama dari API
				shuffleArray(images); // Mengacak array gambar
				let ult = images.slice(0, 10); // Mengambil 10 gambar pertama yang sudah diacak
				let i = 1;
		  
				// Mengisi array push dengan konten gambar
				for (let imgUrl of ult) {
				  push.push({
					body: proto.Message.InteractiveMessage.Body.fromObject({
					  text: `Image ke - ${i++}`
					}),
					footer: proto.Message.InteractiveMessage.Footer.fromObject({
					  text: 'Powered by Bot'
					}),
					header: proto.Message.InteractiveMessage.Header.fromObject({
					  title: 'Hasil Pencarian',
					  hasMediaAttachment: true,
					  imageMessage: await createImage(imgUrl)
					}),
					nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
					  buttons: [
						{
						  name: "cta_url",
						  buttonParamsJson: `{"display_text":"Lihat di Bing","url":"https://www.bing.com/images/search?q=${text}"}`
						}
					  ]
					})
				  });
				}
		  
				// Membuat pesan carousel dengan gambar
				const bot = generateWAMessageFromContent(m.chat, {
				  viewOnceMessage: {
					message: {
					  messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					  },
					  interactiveMessage: proto.Message.InteractiveMessage.fromObject({
						body: proto.Message.InteractiveMessage.Body.create({
						  text: 'Berikut adalah 10 gambar teratas yang ditemukan.'
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
						  text: "> Hasil diambil dari Bing"
						}),
						header: proto.Message.InteractiveMessage.Header.create({
						  hasMediaAttachment: false
						}),
						carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
						  cards: [...push]
						})
					  })
					}
				  }
				}, {});
		  
				// Mengirim pesan melalui bot
				await naze.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
			  } else {
				m.reply('Gagal mengambil gambar. Coba lagi nanti.');
			  }
			} catch (error) {
			  console.error(error);
			  m.reply('Terjadi kesalahan saat mengambil data dari Bing.');
			}
			break;
	case 'ghstalk':case 'ghstalker': case 'githubstalk':case 'githubstalker':
		if (!text) return m.reply('Harap Masukkan Username')
	
		try {
			// Fetch data dari GitHub API
			let response = await fetch(`https://api.github.com/users/${encodeURIComponent(text)}`)
			let userData = await response.json()
	
			// Validasi respons
			if (!userData || response.status !== 200) {
				return m.reply('Tidak dapat menemukan pengguna GitHub dengan username tersebut.')
			}
	
			// Ambil avatar
			let thumb = await getBuffer(userData.avatar_url)
	
			// Siapkan hasil
			let hasil = `*GITHUB STALK*\n\n` +
						`*name           :* ${userData.name}\n` +
						`*Username :* ${userData.login}\n` +
						`*ID*                  : ${userData.id}\n` +
						`*Bio* : ${userData.bio || 'Tidak ada'}\n\n` +
						`*Dibuat  :* ${userData.created_at}\n` +
						`*Update :* ${userData.updated_at}\n` +
						`*Lokasi  :* ${userData.location || 'Tidak ada'}\n\n` +
						`*Perusahaan* : ${userData.company || 'Tidak ada'}\n` +
						`*Repo Publik :* ${userData.public_repos}\n` +
						`*Gists Publik :* ${userData.public_gists}\n\n` +
						`*Follower   :* ${userData.followers}\n` +
						`*Following :* ${userData.following}\n\n` +
						`*Link :* ${userData.html_url}\n`
	
			// Kirim pesan dengan gambar
			await naze.sendMessage(m.chat, { image: thumb, caption: hasil, quoted: m })
	
		} catch (error) {
			console.error('Error:', error)
			m.reply('Terjadi kesalahan saat mencoba mengambil data dari GitHub. Silakan coba lagi nanti.')
		}
	break
	case 'gimage': case 'googleimage': {
		if (!text) return m.reply(mess.text);
	
		// Mengirim pesan "wait"
		await m.reply(mess.wait);
	
		// Fungsi untuk membuat pesan gambar
		async function createImage(url) {
			const { imageMessage } = await generateWAMessageContent({
				image: { url }
			}, { 
				upload: naze.waUploadToServer 
			});
			return imageMessage;
		}
	
		// Fungsi untuk mengacak array
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
	
		try {
			let push = [];
			let { data } = await axios.get(`https://api.siputzx.my.id/api/images?query=${text}`);
			let res = data.data.map(v => v.url); // Ambil URL gambar
	
			shuffleArray(res); // Mengacak array gambar
			let ult = res.splice(0, 10); // Mengambil 10 gambar pertama dari array yang sudah diacak
			let i = 1;
	
			// Mengisi array push dengan konten gambar
			for (let lucuy of ult) {
				push.push({
					body: proto.Message.InteractiveMessage.Body.fromObject({
						text: `Image ke - ${i++}`
					}),
					footer: proto.Message.InteractiveMessage.Footer.fromObject({
						text: global.poweredt
					}),
					header: proto.Message.InteractiveMessage.Header.fromObject({
						title: 'Hasil.',
						hasMediaAttachment: true,
						imageMessage: await createImage(lucuy)
					}),
					nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
						buttons: [
							{
								name: "cta_url",
								buttonParamsJson: `{"display_text":"Source","url":"https://www.google.com/search?q=${text}"}`
							}
						]
					})
				});
			}
	
			// Membuat pesan carousel dengan gambar
			const bot = generateWAMessageFromContent(m.chat, {
				viewOnceMessage: {
					message: {
						messageContextInfo: {
							deviceListMetadata: {},
							deviceListMetadataVersion: 2
						},
						interactiveMessage: proto.Message.InteractiveMessage.fromObject({
							body: proto.Message.InteractiveMessage.Body.create({
								text: mess.done
							}),
							footer: proto.Message.InteractiveMessage.Footer.create({
								text: "> hasil diambil dari 10 gambar teratas"
							}),
							header: proto.Message.InteractiveMessage.Header.create({
								hasMediaAttachment: false
							}),
							carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
								cards: [...push]
							})
						})
					}
				}
			}, {});
	
			// Mengirim pesan melalui bot
			await naze.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
		} catch (error) {
			console.error(error);
			m.reply('Terjadi kesalahan saat mengambil data dari Google Images.');
		}
	
	}
	break;
	case 'lirik':      case 'lyric':     {
		if (!text) return m.reply('Masukkan nama artis dan judul lagu! Contoh: !lirik Adele Someone Like You');
		
		// Pisahkan nama artis dan judul lagu dari input pengguna
		let [artist, ...song] = text.split(' ');
		song = song.join(' ');
		
		if (!artist || !song) return m.reply('Format salah! Contoh: !lirik Adele Someone Like You');

		// Mengirim pesan sedang mencari lirik
		let { key } = await m.reply('Mencari lirik lagu . . .');

		// Panggil API untuk mencari lirik
		try {
			let response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
			let lyrics = response.data.lyrics;

			if (lyrics) {
				m.reply(`Lirik lagu *${song}* oleh *${artist}*\n\n${lyrics}`, { edit: key });
			} else {
				m.reply(`Lirik tidak ditemukan untuk lagu *${song}* oleh *${artist}*.`, { edit: key });
			}
		} catch (error) {
			console.error(error);
			m.reply('Maaf, terjadi kesalahan saat mencari lirik. Silakan coba lagi nanti.', { edit: key });
		}
	}
	break;
	case 'pinterest':  case 'pin':      case 'pint': {
		if (!text) return m.reply(mess.text);
		
		// Mengirim pesan "wait"
		await m.reply(mess.wait);

		// Fungsi untuk membuat pesan gambar
		async function createImage(url) {
			const { imageMessage } = await generateWAMessageContent({
				image: { url }
			}, { 
				upload: naze.waUploadToServer 
			});
			return imageMessage;
		}

		// Fungsi untuk mengacak array
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}

		try {
			let push = [];
			let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
			let res = data.resource_response.data.results.map(v => v.images.orig.url);

			shuffleArray(res); // Mengacak array gambar
			let ult = res.splice(0, 10); // Mengambil 10 gambar pertama dari array yang sudah diacak
			let i = 1;

			// Mengisi array push dengan konten gambar
			for (let lucuy of ult) {
				push.push({
					body: proto.Message.InteractiveMessage.Body.fromObject({
						text: `Image ke - ${i++}`
					}),
					footer: proto.Message.InteractiveMessage.Footer.fromObject({
						text: global.poweredt
					}),
					header: proto.Message.InteractiveMessage.Header.fromObject({
						title: 'Hasil.',
						hasMediaAttachment: true,
						imageMessage: await createImage(lucuy)
					}),
					nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
						buttons: [
							{
								name: "cta_url",
								buttonParamsJson: `{"display_text":"Source","url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}"}`
							}
						]
					})
				});
			}

			// Membuat pesan carousel dengan gambar
			const bot = generateWAMessageFromContent(m.chat, {
				viewOnceMessage: {
					message: {
						messageContextInfo: {
							deviceListMetadata: {},
							deviceListMetadataVersion: 2
						},
						interactiveMessage: proto.Message.InteractiveMessage.fromObject({
							body: proto.Message.InteractiveMessage.Body.create({
								text: mess.done
							}),
							footer: proto.Message.InteractiveMessage.Footer.create({
								text: "> hasil diambil dari 10 gambar teratas"
							}),
							header: proto.Message.InteractiveMessage.Header.create({
								hasMediaAttachment: false
							}),
							carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
								cards: [...push]
							})
						})
					}
				}
			}, {});

			// Mengirim pesan melalui bot
			await naze.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
		} catch (error) {
			console.error(error);
			m.reply('Terjadi kesalahan saat mengambil data dari Pinterest.');
		}

	}
	break;
	case 'play': case 'ytplay': case 'yts': case 'ytsearch': {
		if (!text) return m.reply(`Contoh: ${prefix + command} dj komang`);
	
		m.reply(mess.wait);
	
		try {
			const res = await yts.search(text);
			const video = res.all[0]; // Mengambil hasil pencarian teratas
	
			if (!video) return m.reply("Tidak ada hasil yang ditemukan.");
	
			const teksnya = `*● Judul:* ${video.title}\n*● Channel:* ${video.author.name}\n*● Durasi:* ${video.timestamp}\n*● Link:* ${video.url}`;
	
			// Mengirim informasi video dengan thumbnail
			await naze.sendMessage(m.chat, { 
				image: { url: video.thumbnail }, 
				caption: teksnya 
			}, { quoted: m });
	
			// Fungsi untuk mendapatkan link download dari API utama & cadangan
			async function getDownloadUrl(apiType) {
				let urls = {
					mp3: [
						`https://er-api.biz.id/dl/ermp3?u=${encodeURIComponent(video.url)}`, // API utama
						`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(video.url)}` // API cadangan
					],
					mp4: [
						`https://er-api.biz.id/dl/ermp4?u=${encodeURIComponent(video.url)}`, // API utama
						`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(video.url)}` // API cadangan
					]
				};
	
				for (let url of urls[apiType]) {
					try {
						let response = await fetch(url);
						let result = await response.json();
						console.log(`LOG API (${apiType}):`, result); // Debugging
	
						if (result.status && result.hasil && result.hasil.length > 0) {
							return result.hasil[0].link_download;
						} else if (result.status && result.data && result.data.dl) {
							return result.data.dl;
						}
					} catch (err) {
						console.log(`API gagal (${apiType}):`, err);
					}
				}
				return null;
			}
	
			// Mengunduh Audio menggunakan API
			let audioUrl = await getDownloadUrl('mp3');
			if (audioUrl) {
				await naze.sendMessage(m.chat, {
					audio: { url: audioUrl },
					mimetype: 'audio/mpeg',
					fileName: `${video.title}.mp3`,
					contextInfo: {
						externalAdReply: {
							title: video.title,
							body: video.author.name,
							previewType: 'PHOTO',
							thumbnailUrl: video.thumbnail,
							mediaType: 1,
							renderLargerThumbnail: true,
							sourceUrl: video.url
						}
					}
				}, { quoted: m });
			} else {
				m.reply('Gagal Mendownload Audio!');
			}
	
			// Mengunduh Video menggunakan API
			let videoUrl = await getDownloadUrl('mp4');
			if (videoUrl) {
				await naze.sendMessage(m.chat, {
					video: { url: videoUrl }
				}, { quoted: m });
			} else {
				m.reply('Gagal Mendownload Video!');
			}
	
		} catch (e) {
			console.error(e);
			m.reply("Terjadi kesalahan dalam mencari video.");
		}
	}
	break;	
	case 'ringtone':  {
		if (!text) return m.reply(`Example: ${prefix + command} black rover`)
		let anu = await ringtone(text)
		let result = pickRandom(anu)
		await naze.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
		}
		break
	case 'spotify': case 'spotifysearch': {
		if (!text) return m.reply(`Example: ${prefix + command} alan walker alone`)
			
		try {
			let hasil = await fetchJson('https://www.bhandarimilan.info.np/spotisearch?query=' + encodeURIComponent(text));
			let txt = hasil.map(a => {
				return `
				*Name     : ${a.name}*
				*Artist :* ${a.artist}
				*Url      :* ${a.link}`
			}).join`\n\n`
			m.reply(txt)
		} catch (e) {
			m.reply('Server Search Offline!')
		}
	}
	break
	case 'spotifydl': case'spotifydownload':{
		if (!text) return m.reply(`Example: ${prefix + command} https://open.spotify.com/track/0JiVRyTJcJnmlwCZ854K4p`)
		if (!isUrl(args[0]) && !args[0].includes('open.spotify.com/track')) return m.reply('Url Invalid!')
		try {
			await naze.sendMedia(m.chat, 'https://spotifyapi.caliphdev.com/api/download/track?url=' + text, '','', m)
		} catch (e) {
			m.reply('Server download sedang offline!')
		}
	}
	break
	case 'wallpaper': {
		if (!text) return m.reply(`Example: ${prefix + command} hu tao`)
		try {
			let anu = await wallpaper(text)
			let result = pickRandom(anu)
			if (anu.length < 1) {
				m.reply('Pencarian tidak ditemukan!');
			} else {
				await naze.sendMessage(m.chat, { image: { url: result.image[0] }, caption: `⭔ title : ${q}\n⭔ category : ${result.type}\n⭔ media url : ${result.image[2] || result.image[1] || result.image[0]}`}, { quoted: m })
			}
		} catch (e) {
			m.reply('Server wallpaper sedang offline!')
		}
		}
		break
	case 'gimage1': { //tidak dihitung
		if (!text) return m.reply(`Example: ${prefix + command} query`)
		gis(text, async (err, result) => {
			if (err) return m.reply(`Image Untuk Query : _${text}_\nTidak Ditemukan!`)
			if (result == undefined) {
				m.reply(`Image Untuk Query : _${text}_\nTidak Ditemukan!`)
			} else if (result.length > 1) {
				let anu = pickRandom(result)
				await naze.sendMessage(m.chat, { image: { url: anu.url }, caption: 'Url : '+ anu.url }, { quoted: m })
			} else m.reply('Gagal Mencari Gambar!')
		});
		}
		break
	//==================================================================
	// Menu
	case 'menu': 		 {	
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *WAKTU* 
${tutupjudul}
${barisfitur} *Tanggal* : ${tanggal}
${barisfitur} *Hari*        : ${hari}
${barisfitur} *Jam*        : ${jam} WIB
${penutup}

${barisjudul} *LIST MENU* 
${tutupjudul}
${barisfitur} ${prefix}allmenu                   \`(total ${totalfitur} fitur)\`
${barisfitur} ${prefix}aimenu                    \`(total ${aimenu} fitur)\`
${barisfitur} ${prefix}botmenu                 \`(total ${botmenu} fitur)\`
${barisfitur} ${prefix}downloadmenu   \`(total ${downloadmenu} fitur)\`
${barisfitur} ${prefix}funmenu                \`(total ${funmenu} fitur)\`
${barisfitur} ${prefix}gamemenu           \`(total ${gamemenu} fitur)\`
${barisfitur} ${prefix}grupmenu             \`(total ${grupmenu} fitur)\`
${barisfitur} ${prefix}ownermenu          \`(total ${ownermenu} fitur)\`
${barisfitur} ${prefix}quotesmenu         \`(total ${quotesmenu} fitur)\`
${barisfitur} ${prefix}searchmenu         \`(total ${searchmenu} fitur)\`
${barisfitur} ${prefix}toolsmenu             \`(total ${toolsmenu} fitur)\`
${penutup}
`;
		
		// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'menuold': 	 {
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		const nano_sad = `

	${barisjudul} *USER INFO* 
	${tutupjudul}
	${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
	${barisfitur} *Id*         : ${m.sender.split('@')[0]}
	${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
	${penutup}

	${barisjudul} *BOT INFO* 
	${tutupjudul}
	${barisfitur} *Nama Bot*          : ${botname}
	${barisfitur} *Pengembang*   : BANGSULSTART
	${barisfitur} *Total Fitur*         : ${totalfitur}
	${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
	${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
	${penutup}

	${barisjudul} *WAKTU* 
	${tutupjudul}
	${barisfitur} *Tanggal* : ${tanggal}
	${barisfitur} *Hari*        : ${hari}
	${barisfitur} *Jam*        : ${jam} WIB
	${penutup}

	${barisjudul} *LIST MENU* 
	${tutupjudul}
	${barisfitur} ${prefix}allmenu
	${barisfitur} ${prefix}aimenu
	${barisfitur} ${prefix}botmenu
	${barisfitur} ${prefix}downloadmenu
	${barisfitur} ${prefix}funmenu
	${barisfitur} ${prefix}gamemenu
	${barisfitur} ${prefix}grupmenu
	${barisfitur} ${prefix}ownermenu
	${barisfitur} ${prefix}quotesmenu
	${barisfitur} ${prefix}searchmenu
	${barisfitur} ${prefix}toolsmenu
	${penutup}
	`;


	m.reply(nano_sad);
	}
	break
	case 'aimenu':       {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}


${barisjudul} *AI MENU* \`${aimenu}\`
${tutupjudul}
${barisfitur} ${prefix}ai  (query)  
${barisfitur} ${prefix}autoai  (on/off) 
${barisfitur} ${prefix}deepseek  (query) 
${barisfitur} ${prefix}gpt (query)  
${barisfitur} ${prefix}gpt4 (query)  
${barisfitur} ${prefix}jokosijawa (query)  
${barisfitur} ${prefix}openai (query)  
${barisfitur} ${prefix}simi (query)  
${barisfitur} ${prefix}texttoimage (teks)
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'botmenu':      {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *BOT MENU* \`(total ${botmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}allinfo 
${barisfitur} ${prefix}confess 
${barisfitur} ${prefix}delconfess  
${barisfitur} ${prefix}addmsg (only creator)
${barisfitur} ${prefix}delmsg (only creator)
${barisfitur} ${prefix}getgalau 
${barisfitur} ${prefix}getmsg 
${barisfitur} ${prefix}listgalau 
${barisfitur} ${prefix}listimage 
${barisfitur} ${prefix}liststicker 
${barisfitur} ${prefix}listvideo 
${barisfitur} ${prefix}listmsg 
${barisfitur} ${prefix}inspect 
${barisfitur} ${prefix}npm 
${barisfitur} ${prefix}ping 
${barisfitur} ${prefix}quoted (reply pesan) 
${barisfitur} ${prefix}react (emoji) 
${barisfitur} ${prefix}read (reply media 1x lihat) 
${barisfitur} ${prefix}tagme 
${barisfitur} ${prefix}runtime 
${barisfitur} ${prefix}speedtest 
${barisfitur} ${prefix}totalfitur 
${barisfitur} ${prefix}totaluser 
${barisfitur} ${prefix}request (teks) 
${barisfitur} ${prefix}owner 
${barisfitur} ${prefix}githubowner 
${barisfitur} ${prefix}script 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'downloadmenu': {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *DOWNLOAD MENU* \`(total ${downloadmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}gdrive (url google drive) 
${barisfitur} ${prefix}ig (url instagram) 
${barisfitur} ${prefix}mediafire (url mediafire) 
${barisfitur} ${prefix}tt (url tiktok) 
${barisfitur} ${prefix}ttaudio (url tiktok) 
${barisfitur} ${prefix}ytmp3 (url youtube) 
${barisfitur} ${prefix}ytmp4 (url youtube) 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'funmenu':      {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *FUN MENU* \`(total ${funmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}bodohcek 
${barisfitur} ${prefix}cantikcek 
${barisfitur} ${prefix}gantengcek 
${barisfitur} ${prefix}gaycek 
${barisfitur} ${prefix}gilacek 
${barisfitur} ${prefix}goblokcek 
${barisfitur} ${prefix}imutcek 
${barisfitur} ${prefix}jelekcek 
${barisfitur} ${prefix}jomblocek 
${barisfitur} ${prefix}lesbicek 
${barisfitur} ${prefix}pintarcek 
${barisfitur} ${prefix}cekaku 
${barisfitur} ${prefix}cekbau 
${barisfitur} ${prefix}cekmati 
${barisfitur} ${prefix}ceksifat 
${barisfitur} ${prefix}cekkhodam (nama) 
${barisfitur} ${prefix}jadian 
${barisfitur} ${prefix}jodohku 
${barisfitur} ${prefix}siapacantik 
${barisfitur} ${prefix}siapaganteng 
${barisfitur} ${prefix}siapagoblok 
${barisfitur} ${prefix}siapajelek 
${barisfitur} ${prefix}apakah (teks) 
${barisfitur} ${prefix}kapankah (teks) 
${barisfitur} ${prefix}siapakah (teks) 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'gamemenu':     {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *GAME MENU* \`(total ${gamemenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}caklontong
${barisfitur} ${prefix}family100
${barisfitur} ${prefix}mtk
${barisfitur} ${prefix}susunkata
${barisfitur} ${prefix}tebakbendera
${barisfitur} ${prefix}tebakgambar
${barisfitur} ${prefix}tebakkata
${barisfitur} ${prefix}tebakkimia
${barisfitur} ${prefix}tebaklirik
${barisfitur} ${prefix}tebaknegara
${barisfitur} ${prefix}tekateki
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'groupmenu': case 'grupmenu': {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *GRUP MENU* \`(total ${grupmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}add (62xxx) 
${barisfitur} ${prefix}afk (alasan) 
${barisfitur} ${prefix}antidelete 
${barisfitur} ${prefix}antilink 
${barisfitur} ${prefix}antilinkall 
${barisfitur} ${prefix}antivirtex 
${barisfitur} ${prefix}delete (reply) 
${barisfitur} ${prefix}demote 
${barisfitur} ${prefix}getpp (tag/reply pesan) 
${barisfitur} ${prefix}grup (open/close) 
${barisfitur} ${prefix}hidetag (teks) 
${barisfitur} ${prefix}kick (reply pesan/number user) 
${barisfitur} ${prefix}linkgc 
${barisfitur} ${prefix}listonline 
${barisfitur} ${prefix}newlink 
${barisfitur} ${prefix}promote 
${barisfitur} ${prefix}setdescgc (teks) 
${barisfitur} ${prefix}setnamegc (teks) 
${barisfitur} ${prefix}setppgc (reply foto) 
${barisfitur} ${prefix}tagall 
${barisfitur} ${prefix}totag 
${barisfitur} ${prefix}welcome 
${barisfitur} ${prefix}wargagrup
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'ownermenu':    {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}


${barisjudul} *OWNER MENU* \`(total ${ownermenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}addcase (nama case) 
${barisfitur} ${prefix}addgalau (reply audio) 
${barisfitur} ${prefix}addimage (reply foto) 
${barisfitur} ${prefix}addprem 
${barisfitur} ${prefix}addquotesgalau 
${barisfitur} ${prefix}addsticker (reply sticker) 
${barisfitur} ${prefix}addvideo (reply video) 
${barisfitur} ${prefix}addvn (reply audio) 
${barisfitur} ${prefix}block (62xxx) 
${barisfitur} ${prefix}blockchat (62xxx) 
${barisfitur} ${prefix}bot --settings
${barisfitur} ${prefix}change-id-cai 
${barisfitur} ${prefix}creategc (nama grup) 
${barisfitur} ${prefix}delcase (nama case) 
${barisfitur} ${prefix}delgalau (nama lagu) 
${barisfitur} ${prefix}delimage (nama image) 
${barisfitur} ${prefix}delprem 
${barisfitur} ${prefix}delsampah  
${barisfitur} ${prefix}delsession 
${barisfitur} ${prefix}delsticker (nama sticker) 
${barisfitur} ${prefix}delvideo (nama video) 
${barisfitur} ${prefix}delvn (nama audio) 
${barisfitur} ${prefix}getcase (nama case) 
${barisfitur} ${prefix}getdatabase 
${barisfitur} ${prefix}getfile (nama file) 
${barisfitur} ${prefix}getidgc 
${barisfitur} ${prefix}getscript 
${barisfitur} ${prefix}getsession 
${barisfitur} ${prefix}join (link grup) 
${barisfitur} ${prefix}leave 
${barisfitur} ${prefix}listbadword 
${barisfitur} ${prefix}listblock 
${barisfitur} ${prefix}listblockchat 
${barisfitur} ${prefix}listfile 
${barisfitur} ${prefix}listgc 
${barisfitur} ${prefix}listpc 
${barisfitur} ${prefix}listprem 
${barisfitur} ${prefix}listvn 
${barisfitur} ${prefix}mode (self/public) 
${barisfitur} ${prefix}newchat-id-cai 
${barisfitur} ${prefix}setbio (teks) 
${barisfitur} ${prefix}setppbot (reply foto) 
${barisfitur} ${prefix}spam-pairing 
${barisfitur} ${prefix}spamuser (62xxx,teks,jumlah) 
${barisfitur} ${prefix}unblock (62xxx) 
${barisfitur} ${prefix}unblockchat (62xxx) 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'searchmenu':   {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *SEARCH MENU* \`(total ${searchmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}bingimage (teks) 
${barisfitur} ${prefix}gimage (teks) 
${barisfitur} ${prefix}githubstalk (teks) 
${barisfitur} ${prefix}lirik (judul lagu) 
${barisfitur} ${prefix}pinterest (teks) 
${barisfitur} ${prefix}play (teks search youtube) 
${barisfitur} ${prefix}ringtone (teks) 
${barisfitur} ${prefix}spotify (teks) 
${barisfitur} ${prefix}spotifydl (teks) 
${barisfitur} ${prefix}wallpaper (teks) 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'toolsmenu':    {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *TOOLS MENU* \`(total ${toolsmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}brat (teks)
${barisfitur} ${prefix}brat2 (versi HD)
${barisfitur} ${prefix}bratvid (teks)
${barisfitur} ${prefix}bratvid2 (versi HD)
${barisfitur} ${prefix}carbonify (teks)
${barisfitur} ${prefix}cuaca (nama kota)
${barisfitur} ${prefix}emojimix (😁+😌)
${barisfitur} ${prefix}get
${barisfitur} ${prefix}getexif
${barisfitur} ${prefix}gitclone (url github)
${barisfitur} ${prefix}hd (reply foto)
${barisfitur} ${prefix}kelompokacak (jumlah orang)
${barisfitur} ${prefix}konversi (mata uang)
${barisfitur} ${prefix}konvert (konversi cent)
${barisfitur} ${prefix}profitkalkulator
${barisfitur} ${prefix}qc (teks/reply pesan)
${barisfitur} ${prefix}readmore (teks1|teks2)
${barisfitur} ${prefix}shorturl (url)
${barisfitur} ${prefix}statistikdata (masukkan angka)
${barisfitur} ${prefix}smeme (teks|teks)
${barisfitur} ${prefix}ssweb (url)
${barisfitur} ${prefix}stele (nama pack/URL sticker telegram)
${barisfitur} ${prefix}stele1 (versi cadangan)
${barisfitur} ${prefix}sticker (reply foto/caption)
${barisfitur} ${prefix}stickercrop (reply foto/caption)
${barisfitur} ${prefix}stickerwm (nama)
${barisfitur} ${prefix}stickerly (url stickerly)
${barisfitur} ${prefix}style (teks)
${barisfitur} ${prefix}toaudio (reply video/audio)
${barisfitur} ${prefix}togift (reply video)
${barisfitur} ${prefix}toimage (reply sticker)
${barisfitur} ${prefix}tomp3 (reply video/audio)
${barisfitur} ${prefix}toptv (reply video/caption)
${barisfitur} ${prefix}toqr (teks)
${barisfitur} ${prefix}tourl (reply foto/caption)
${barisfitur} ${prefix}tovn (reply video/audio)
${barisfitur} ${prefix}translate
${barisfitur} ${prefix}tts (teks)
${barisfitur} ${prefix}bass (reply audio) 
${barisfitur} ${prefix}blown (reply audio) 
${barisfitur} ${prefix}deep (reply audio) 
${barisfitur} ${prefix}earrape (reply audio) 
${barisfitur} ${prefix}fast (reply audio) 
${barisfitur} ${prefix}fat (reply audio) 
${barisfitur} ${prefix}nightcore (reply audio) 
${barisfitur} ${prefix}reverse (reply audio) 
${barisfitur} ${prefix}robot (reply audio) 
${barisfitur} ${prefix}slow (reply audio) 
${barisfitur} ${prefix}smooth (reply audio) 
${barisfitur} ${prefix}tupai (reply audio) 
${penutup}`
			// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'quotesmenu':case 'quotes':  {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}


${barisjudul} *QUOTES MENU* \`(total ${quotesmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}quotesbacot
${barisfitur} ${prefix}quotesbijak
${barisfitur} ${prefix}quotesbucin
${barisfitur} ${prefix}quotesgalau
${barisfitur} ${prefix}quotesgombal
${barisfitur} ${prefix}quoteshacker
${barisfitur} ${prefix}quotesmotivasi
${barisfitur} ${prefix}renungan
${barisfitur} ${prefix}truth
${penutup}`
		// Mengirimkan pesan
		await naze.sendMessage(m.chat, {
			text: responseMessage,
			contextInfo: {
				externalAdReply: {
					title: 'BANGSULBOTZ🤖',
					body: 'Bot Whatsapp',
					showAdAttribution: true,
					thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh, // URL GitHub yang dituju
					sourceUrl: my.gh, // Sumber URL GitHub
				}
			}
		},{quoted: m});
	}
	break;
	case 'allmenu':      {
		let timestamp = speed();
		let latensi = speed() - timestamp;
		let neww = performance.now();
		let oldd = performance.now();
		const barisjudul = '╔═〇';
		const tutupjudul = '╠═════════〇';
		const barisfitur = '╠»';
		const penutup    = '╚═════════════════〇';
		// Format tampilan pesan
		let responseMessage =
`${barisjudul} *USER INFO* 
${tutupjudul}
${barisfitur} *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
${barisfitur} *Id*         : ${m.sender.split('@')[0]}
${barisfitur} *User*   : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
${penutup}

${barisjudul} *BOT INFO* 
${tutupjudul}
${barisfitur} *Nama Bot*          : ${botname}
${barisfitur} *Pengembang*   : BANGSULSTART
${barisfitur} *Total Fitur*         : ${totalfitur}
${barisfitur} *Mode*                  : ${naze.public ? 'Publik 🌍' : 'Self 🔒'}
${barisfitur} *Pengguna*         : ${Object.keys(global.db.users).length}
${penutup}

${barisjudul} *WAKTU* 
${tutupjudul}
${barisfitur} *Tanggal* : ${tanggal}
${barisfitur} *Hari*        : ${hari}
${barisfitur} *Jam*        : ${jam} WIB
${penutup}



${barisjudul} *AI MENU* \`(total ${aimenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}ai  (query)  
${barisfitur} ${prefix}autoai  (on/off) 
${barisfitur} ${prefix}deepseek  (query)  
${barisfitur} ${prefix}gpt (query)   
${barisfitur} ${prefix}gpt4 (query)   
${barisfitur} ${prefix}jokosijawa (query)   
${barisfitur} ${prefix}openai (query)   
${barisfitur} ${prefix}simi (query)   
${barisfitur} ${prefix}texttoimage (teks) 
${penutup}


${barisjudul} *BOT MENU* \`(total ${botmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}allinfo 
${barisfitur} ${prefix}confess 
${barisfitur} ${prefix}delconfess  
${barisfitur} ${prefix}addmsg (only creator)
${barisfitur} ${prefix}delmsg (only creator)
${barisfitur} ${prefix}getgalau 
${barisfitur} ${prefix}getmsg 
${barisfitur} ${prefix}listgalau 
${barisfitur} ${prefix}listimage 
${barisfitur} ${prefix}liststicker 
${barisfitur} ${prefix}listvideo 
${barisfitur} ${prefix}listmsg 
${barisfitur} ${prefix}inspect 
${barisfitur} ${prefix}npm 
${barisfitur} ${prefix}ping 
${barisfitur} ${prefix}quoted (reply pesan) 
${barisfitur} ${prefix}react (emoji) 
${barisfitur} ${prefix}read (reply media 1x lihat) 
${barisfitur} ${prefix}tagme 
${barisfitur} ${prefix}runtime 
${barisfitur} ${prefix}speedtest 
${barisfitur} ${prefix}totalfitur 
${barisfitur} ${prefix}totaluser 
${barisfitur} ${prefix}request (teks) 
${barisfitur} ${prefix}owner 
${barisfitur} ${prefix}githubowner 
${barisfitur} ${prefix}script 
${penutup}


${barisjudul} *DOWNLOAD MENU* \`(total ${downloadmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}gdrive (url google drive) 
${barisfitur} ${prefix}ig (url instagram) 
${barisfitur} ${prefix}mediafire (url mediafire) 
${barisfitur} ${prefix}tt (url tiktok) 
${barisfitur} ${prefix}ttaudio (url tiktok) 
${barisfitur} ${prefix}ytmp3 (url youtube) 
${barisfitur} ${prefix}ytmp4 (url youtube) 
${penutup}


${barisjudul} *FUN MENU* \`(total ${funmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}bodohcek 
${barisfitur} ${prefix}cantikcek 
${barisfitur} ${prefix}gantengcek 
${barisfitur} ${prefix}gaycek 
${barisfitur} ${prefix}gilacek 
${barisfitur} ${prefix}goblokcek 
${barisfitur} ${prefix}imutcek 
${barisfitur} ${prefix}jelekcek 
${barisfitur} ${prefix}jomblocek 
${barisfitur} ${prefix}lesbicek 
${barisfitur} ${prefix}pintarcek 
${barisfitur} ${prefix}cekaku 
${barisfitur} ${prefix}cekbau 
${barisfitur} ${prefix}cekmati 
${barisfitur} ${prefix}ceksifat 
${barisfitur} ${prefix}cekkhodam (nama) 
${barisfitur} ${prefix}jadian 
${barisfitur} ${prefix}jodohku 
${barisfitur} ${prefix}siapacantik 
${barisfitur} ${prefix}siapaganteng 
${barisfitur} ${prefix}siapagoblok 
${barisfitur} ${prefix}siapajelek 
${barisfitur} ${prefix}apakah (teks) 
${barisfitur} ${prefix}kapankah (teks) 
${barisfitur} ${prefix}siapakah (teks) 
${penutup}


${barisjudul} *GAME MENU* \`(total ${gamemenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}caklontong
${barisfitur} ${prefix}family100
${barisfitur} ${prefix}mtk
${barisfitur} ${prefix}susunkata
${barisfitur} ${prefix}tebakbendera
${barisfitur} ${prefix}tebakgambar
${barisfitur} ${prefix}tebakkata
${barisfitur} ${prefix}tebakkimia
${barisfitur} ${prefix}tebaklirik
${barisfitur} ${prefix}tebaknegara
${barisfitur} ${prefix}tekateki
${penutup}


${barisjudul} *GRUP MENU* \`(total ${grupmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}add (62xxx) 
${barisfitur} ${prefix}afk (alasan) 
${barisfitur} ${prefix}antidelete 
${barisfitur} ${prefix}antilink 
${barisfitur} ${prefix}antilinkall 
${barisfitur} ${prefix}antivirtex 
${barisfitur} ${prefix}delete (reply) 
${barisfitur} ${prefix}demote 
${barisfitur} ${prefix}getpp (tag/reply pesan) 
${barisfitur} ${prefix}grup (open/close) 
${barisfitur} ${prefix}hidetag (teks) 
${barisfitur} ${prefix}kick (reply pesan/number user) 
${barisfitur} ${prefix}linkgc 
${barisfitur} ${prefix}listonline 
${barisfitur} ${prefix}newlink 
${barisfitur} ${prefix}promote 
${barisfitur} ${prefix}setdescgc (teks) 
${barisfitur} ${prefix}setnamegc (teks) 
${barisfitur} ${prefix}setppgc (reply foto) 
${barisfitur} ${prefix}tagall 
${barisfitur} ${prefix}totag 
${barisfitur} ${prefix}welcome 
${barisfitur} ${prefix}wargagrup
${penutup}


${barisjudul} *OWNER MENU* \`(total ${ownermenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}addcase (nama case) 
${barisfitur} ${prefix}addgalau (reply audio) 
${barisfitur} ${prefix}addimage (reply foto) 
${barisfitur} ${prefix}addprem 
${barisfitur} ${prefix}addquotesgalau 
${barisfitur} ${prefix}addsticker (reply sticker) 
${barisfitur} ${prefix}addvideo (reply video) 
${barisfitur} ${prefix}addvn (reply audio) 
${barisfitur} ${prefix}block (62xxx) 
${barisfitur} ${prefix}blockchat (62xxx) 
${barisfitur} ${prefix}bot --settings
${barisfitur} ${prefix}change-id-cai 
${barisfitur} ${prefix}creategc (nama grup) 
${barisfitur} ${prefix}delcase (nama case) 
${barisfitur} ${prefix}delgalau (nama lagu) 
${barisfitur} ${prefix}delimage (nama image) 
${barisfitur} ${prefix}delprem 
${barisfitur} ${prefix}delsampah  
${barisfitur} ${prefix}delsession 
${barisfitur} ${prefix}delsticker (nama sticker) 
${barisfitur} ${prefix}delvideo (nama video) 
${barisfitur} ${prefix}delvn (nama audio) 
${barisfitur} ${prefix}getcase (nama case) 
${barisfitur} ${prefix}getdatabase 
${barisfitur} ${prefix}getfile (nama file) 
${barisfitur} ${prefix}getidgc 
${barisfitur} ${prefix}getscript 
${barisfitur} ${prefix}getsession 
${barisfitur} ${prefix}join (link grup) 
${barisfitur} ${prefix}leave 
${barisfitur} ${prefix}listbadword 
${barisfitur} ${prefix}listblock 
${barisfitur} ${prefix}listblockchat
${barisfitur} ${prefix}listfile 
${barisfitur} ${prefix}listgc 
${barisfitur} ${prefix}listpc 
${barisfitur} ${prefix}listprem 
${barisfitur} ${prefix}listvn 
${barisfitur} ${prefix}mode (self/public) 
${barisfitur} ${prefix}newchat-id-cai 
${barisfitur} ${prefix}setbio (teks) 
${barisfitur} ${prefix}setppbot (reply foto) 
${barisfitur} ${prefix}spam-pairing 
${barisfitur} ${prefix}spamuser (62xxx,teks,jumlah) 
${barisfitur} ${prefix}unblock (62xxx) 
${barisfitur} ${prefix}unblockchat (62xxx) 
${penutup}


${barisjudul} *QUOTES MENU* \`(total ${quotesmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}quotesbacot
${barisfitur} ${prefix}quotesbijak
${barisfitur} ${prefix}quotesbucin
${barisfitur} ${prefix}quotesgalau
${barisfitur} ${prefix}quotesgombal
${barisfitur} ${prefix}quoteshacker
${barisfitur} ${prefix}quotesmotivasi
${barisfitur} ${prefix}renungan
${barisfitur} ${prefix}truth
${penutup}


${barisjudul} *SEARCH MENU* \`(total ${searchmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}bingimage (teks) 
${barisfitur} ${prefix}gimage (teks) 
${barisfitur} ${prefix}githubstalk (teks) 
${barisfitur} ${prefix}lirik (judul lagu) 
${barisfitur} ${prefix}pinterest (teks) 
${barisfitur} ${prefix}play (teks search youtube) 
${barisfitur} ${prefix}ringtone (teks) 
${barisfitur} ${prefix}spotify (teks) 
${barisfitur} ${prefix}spotifydl (teks) 
${barisfitur} ${prefix}wallpaper (teks) 
${penutup}

${barisjudul} *TOOLS MENU* \`(total ${toolsmenu} fitur)\`
${tutupjudul}
${barisfitur} ${prefix}brat (teks)
${barisfitur} ${prefix}brat2 (versi HD)
${barisfitur} ${prefix}bratvid (teks)
${barisfitur} ${prefix}bratvid2 (versi HD)
${barisfitur} ${prefix}carbonify (teks)
${barisfitur} ${prefix}cuaca (nama kota)
${barisfitur} ${prefix}emojimix (😁+😌)
${barisfitur} ${prefix}get
${barisfitur} ${prefix}getexif
${barisfitur} ${prefix}gitclone (url github)
${barisfitur} ${prefix}hd (reply foto)
${barisfitur} ${prefix}kelompokacak (jumlah orang)
${barisfitur} ${prefix}konversi (mata uang)
${barisfitur} ${prefix}konvert (konversi cent)
${barisfitur} ${prefix}profitkalkulator
${barisfitur} ${prefix}qc (teks/reply pesan)
${barisfitur} ${prefix}readmore (teks1|teks2)
${barisfitur} ${prefix}shorturl (url)
${barisfitur} ${prefix}statistikdata (masukkan angka)
${barisfitur} ${prefix}smeme (teks|teks)
${barisfitur} ${prefix}ssweb (url)
${barisfitur} ${prefix}stele (nama pack/URL sticker telegram)
${barisfitur} ${prefix}stele1 (versi cadangan)
${barisfitur} ${prefix}sticker (reply foto/caption)
${barisfitur} ${prefix}stickercrop (reply foto/caption)
${barisfitur} ${prefix}stickerwm (nama)
${barisfitur} ${prefix}stickerly (url stickerly)
${barisfitur} ${prefix}style (teks)
${barisfitur} ${prefix}toaudio (reply video/audio)
${barisfitur} ${prefix}togift (reply video)
${barisfitur} ${prefix}toimage (reply sticker)
${barisfitur} ${prefix}tomp3 (reply video/audio)
${barisfitur} ${prefix}toptv (reply video/caption)
${barisfitur} ${prefix}toqr (teks)
${barisfitur} ${prefix}tourl (reply foto/caption)
${barisfitur} ${prefix}tovn (reply video/audio)
${barisfitur} ${prefix}translate
${barisfitur} ${prefix}tts (teks)
${barisfitur} ${prefix}bass (reply audio) 
${barisfitur} ${prefix}blown (reply audio) 
${barisfitur} ${prefix}deep (reply audio) 
${barisfitur} ${prefix}earrape (reply audio) 
${barisfitur} ${prefix}fast (reply audio) 
${barisfitur} ${prefix}fat (reply audio) 
${barisfitur} ${prefix}nightcore (reply audio) 
${barisfitur} ${prefix}reverse (reply audio) 
${barisfitur} ${prefix}robot (reply audio) 
${barisfitur} ${prefix}slow (reply audio) 
${barisfitur} ${prefix}smooth (reply audio) 
${barisfitur} ${prefix}tupai (reply audio) 
${penutup}`

	// Mengirimkan pesan
	await naze.sendMessage(m.chat, {
		text: responseMessage,
		contextInfo: {
			externalAdReply: {
				title: 'BANGSULBOTZ🤖',
				body: 'Bot Whatsapp',
				showAdAttribution: true,
				thumbnailUrl: my.thumb, // Menggunakan URL gambar sebagai thumbnail
				mediaType: 1,
				previewType: 0,
				renderLargerThumbnail: true,
				mediaUrl: my.gh, // URL GitHub yang dituju
				sourceUrl: my.gh, // Sumber URL GitHub
			}
		}
	},{quoted: m});
}
break;
	default:
	if (budy.startsWith('>')) {
		if (!isCreator) return
		try {
			let evaled = await eval(budy.slice(2))
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
			await m.reply(evaled)
		} catch (err) {
			await m.reply(String(err))
		}
	}
	if (budy.startsWith('<')) {
		if (!isCreator) return
		try {
			let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
			await m.reply(evaled)
		} catch (err) {
			await m.reply(String(err))
		}
	}
	if (budy.startsWith('1$')) {
		if (!isCreator) return
		if (!text) return
		exec(budy.slice(2), (err, stdout) => {
			if (err) return m.reply(`${err}`)
			if (stdout) return m.reply(stdout)
		})
	}
	naze.CAI = naze.CAI ? naze.CAI : {};
if (m.isBaileys && m.fromMe) return;
if (!m.text) return;
if (!naze.CAI[m.sender]) return; // Gunakan `m.sender` untuk mendefinisikan pengirim.

if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
) return;

if (naze.CAI[m.sender] && m.text) { // Gunakan `m.sender` di sini.
    let name = naze.getName(m.sender); // Gunakan `m.sender` untuk mendapatkan nama pengirim.

    try {
        const C = require('node-fetch');
        const spychat2 = m.text.trim(); // Gunakan teks pesan dari `m.text`.
        const V = await C("https://cai.neekoi.me/cai?char=erqIS4WQ6ADt3wPn3-3_gauvPgULDdUdZeE3iRYZHfE&message=" + encodeURIComponent(spychat2));
        const L = await V.json();
        const answer = L.reply;
        m.reply(answer);
    } catch (error) {
        console.error("Error fetching data:", error);
        m.reply("Maaf, terjadi kesalahan saat memproses permintaan Anda.");
    }
}


}

} catch (err) {
	console.log(util.format(err));
	//m.reply('*❗ Internal server error️*');
	naze.sendFromOwner(owner, 'Halo BANGSULSTART, sepertinya ada yang error nih, jangan lupa diperbaiki ya\n\n*Log error:*\n\n' + util.format(err), m, { contextInfo: { isForwarded: true }})
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})};
