require('../settings');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const prem = require('./premium');
const FileType = require('file-type');
const { writeExif } = require('../lib/exif');
const PhoneNumber = require('awesome-phonenumber');
const { getBuffer, getSizeMedia } = require('../lib/function');
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const { jidNormalizedUser, proto, getBinaryNodeChild, generateWAMessageContent, areJidsSameUser, extractMessageContent, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, getContentType, getDevice } = require('@whiskeysockets/baileys');
const blockUserPath = path.join(__dirname, '../database/block_user.json');

//const { imageToWebp, videoToWebp, writeExif } = require('../lib/exif');
//const { isUrl, getGroupAdmins, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep, getTypeUrlMedia } = require('../lib/function');
//const { jidNormalizedUser, proto, getBinaryNodeChildren, getBinaryNodeChild, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('@whiskeysockets/baileys');


async function GroupUpdate(naze, update, store) {
	try {
		for (let n of update) {
			if (store.groupMetadata[n.id]) {
				store.groupMetadata[n.id] = {
					...(store.groupMetadata[n.id] || {}),
					...(n || {})
				}
			}
		}
	} catch (e) {
		throw e;
	}
}

async function GroupParticipantsUpdate(naze, { id, participants, action }, store) {
	try {
		if (global.db.groups && global.db.groups[id] && global.db.groups[id].welcome && store.groupMetadata && store.groupMetadata[id]) {
			const metadata = store.groupMetadata[id];
			for (let n of participants) {
				let profile;
				try {
					profile = await naze.profilePictureUrl(n, 'image');
				} catch {
					profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png';
				}

				if (action == 'add') {
					await naze.sendMessage(id, {
						text: `╔═〇 *WELCOME* 
╠═════════〇
╠» *user*      : @${n.split('@')[0]}
╠» *grup*     : ${metadata.subject}
╠» *status* : *BERGABUNG*
╠» *pesan*   : *semoga betah ya...* 
╚═════════════════〇`,
						contextInfo: {
							mentionedJid: [n],
							externalAdReply: {
								title: 'selamat datang',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
					metadata.participants.push(...participants.map(id => ({ id: jidNormalizedUser(id), admin: null })));
				} else if (action == 'remove') {
					await naze.sendMessage(id, {
						text: `╔═〇 *OUT* 
╠═════════〇
╠» *user*      : @${n.split('@')[0]}
╠» *grup*     : ${metadata.subject}
╠» *status* : *KELUAR*
╠» *pesan*   : *selamat tinggal* 
╚═════════════════〇`,
						contextInfo: {
							mentionedJid: [n],
							externalAdReply: {
								title: 'selamat tinggal',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
					metadata.participants = metadata.participants.filter(p => !participants.includes(jidNormalizedUser(p.id)));
				} else if (action == 'promote') {
					await naze.sendMessage(id, {
						text: `╔═〇 *NAIK JABATAN* 
╠═════════〇
╠» *user*      : @${n.split('@')[0]}
╠» *grup*     : ${metadata.subject}
╠» *status* : *ADMIN* 
╚═════════════════〇`,
						contextInfo: {
							mentionedJid: [n],
							externalAdReply: {
								title: 'JADI ADMIN',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
					for (const participant of metadata.participants) {
						let id = jidNormalizedUser(participant.id);
						if (participants.includes(id)) {
							participant.admin = (action === 'promote' ? 'admin' : null);
						}
					}
				} else if (action == 'demote') {
					await naze.sendMessage(id, {
						text: `╔═〇 *TURUN JABATAN* 
╠═════════〇
╠» *user*      : @${n.split('@')[0]}
╠» *grup*     : ${metadata.subject}
╠» *status* : *MEMBER* 
╚═════════════════〇`,
						contextInfo: {
							mentionedJid: [n],
							externalAdReply: {
								title: 'TIDAK ADMIN!!!',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
					for (const participant of metadata.participants) {
						let id = jidNormalizedUser(participant.id);
						if (participants.includes(id)) {
							participant.admin = (action === 'promote' ? 'admin' : null);
						}
					}
				}
			}
		}
	} catch (e) {
		throw e;
	}
}

async function LoadDataBase(naze, m) {
	try {
		const botNumber = await naze.decodeJid(naze.user.id);
		const isNumber = x => typeof x === 'number' && !isNaN(x)
		const isBoolean = x => typeof x === 'boolean' && Boolean(x)
		let user = global.db.users[m.sender]
		let setBot = global.db.set[botNumber]
		let limitUser = user ? (user.vip ? global.limit.vip : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free) : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free
		let uangUser = user ? (user.vip ? global.uang.vip : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free) : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free
		if (typeof setBot !== 'object') global.db.set[botNumber] = {}
		if (setBot) {
			if (!('lang' in setBot)) setBot.lang = 'id'
			if (!('limit' in setBot)) setBot.limit = 0
			if (!('uang' in setBot)) setBot.uang = 0
			if (!('status' in setBot)) setBot.status = 0
			if (!('anticall' in setBot)) setBot.anticall = true
			if (!('autobio' in setBot)) setBot.autobio = true
			if (!('autoread' in setBot)) setBot.autoread = true
			if (!('autotyping' in setBot)) setBot.autotyping = false
			if (!('readsw' in setBot)) setBot.readsw = false
			if (!('multiprefix' in setBot)) setBot.multiprefix = false
			if (!('template' in setBot)) setBot.template = 'textMessage'
		} else {
			global.db.set[botNumber] = {
				lang: 'id',
				limit: 0,
				uang: 0,
				status: 0,
				anticall: true,
				autobio: true,
				autoread: true,
				autotyping: false,
				readsw: false,
				multiprefix: false,
				template: 'textMessage',
			}
		}
		
		if (typeof user !== 'object') global.db.users[m.sender] = {}
		if (user) {
			if (!('vip' in user)) user.afkReason = false
			if (!isNumber(user.afkTime)) user.afkTime = -1
			if (!('afkReason' in user)) user.afkReason = ''
			if (!isNumber(user.limit)) user.limit = limitUser
			if (!('uang' in user)) user.uang = uangUser
			if (!('lastclaim' in user)) user.lastclaim = new Date * 1
			if (!('lastbegal' in user)) user.lastbegal = new Date * 1
			if (!('lastrampok' in user)) user.lastrampok = new Date * 1
		} else {
			global.db.users[m.sender] = {
				vip: false,
				afkTime: -1,
				afkReason: '',
				limit: limitUser,
				uang: uangUser,
				lastclaim: new Date * 1,
				lastbegal: new Date * 1,
				lastrampok: new Date * 1,
			}
		}
		
		if (m.isGroup) {
			let group = global.db.groups[m.chat]
			if (typeof group !== 'object') global.db.groups[m.chat] = {}
			if (group) {
				if (!('nsfw' in group)) group.nsfw = false
				if (!('mute' in group)) group.mute = false
				if (!('setinfo' in group)) group.setinfo = true
				if (!('antilink' in group)) group.antilink = false
				if (!('antitoxic' in group)) group.antitoxic = false
				if (!('welcome' in group)) group.welcome = true
				if (!('antivirtex' in group)) group.antivirtex = false
				if (!('antidelete' in group)) group.antidelete = false
				if (!('waktusholat' in group)) group.waktusholat = true
			} else {
				global.db.groups[m.chat] = {
					nsfw: false,
					mute: false,
					setinfo: true,
					antilink: false,
					antitoxic: false,
					welcome: true,
					antivirtex: false,
					antidelete: false,
					waktusholat: true,
				}
			}
		}
	} catch (e) {
		throw e;
	}
}




// Fungsi untuk membaca daftar user yang diblokir dari database
function loadBlockedUsers() {
    if (!fs.existsSync(blockUserPath)) {
        fs.writeFileSync(blockUserPath, JSON.stringify([])); // Buat file jika belum ada
        return new Set();
    }
    return new Set(JSON.parse(fs.readFileSync(blockUserPath, 'utf8')));
}

// Fungsi untuk menyimpan daftar user yang diblokir ke database
function saveBlockedUsers(blockedUsers) {
    try {
        console.log(`💾 Menyimpan data ke database...`);
        fs.writeFileSync(blockUserPath, JSON.stringify([...blockedUsers], null, 2));
        
        console.log(`✅ Data berhasil disimpan ke ${blockUserPath}`);
        
        // Cek apakah file benar-benar tersimpan
        let checkFile = fs.readFileSync(blockUserPath, 'utf8');
        console.log(`🔍 Isi file setelah disimpan:`, checkFile);
    } catch (error) {
        console.error(`❌ Gagal menyimpan data:`, error);
    }
}


// Muat daftar user yang diblokir ke dalam memori saat startup
let blockedUsers = loadBlockedUsers();

async function MessagesUpsert(naze, message, store) {
    try {
        let botNumber = await naze.decodeJid(naze.user.id);
        const msg = message.messages[0];

        if (msg.message && msg.message.protocolMessage) {
            return;
        }

        if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0) {
            store.groupMetadata = await naze.groupFetchAllParticipating();
        }

        const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';
        
        if (!naze.public && !msg.key.fromMe && message.type === 'notify') return;
        if (!msg.message) return;

        const m = await Serialize(naze, msg, store);
        let senderNumber = m.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        
        // Selalu baca ulang daftar block agar up-to-date
        blockedUsers = loadBlockedUsers(); // Pastikan daftar terupdate
        if (blockedUsers.has(senderNumber)) return;
        
        require('../naze')(naze, m, message, store);
    } catch (e) {
        throw e;
    }
}

// Fungsi untuk menambahkan nomor ke daftar blockchat
async function blockChat(naze, number) {
    let jid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    console.log(`📌 Menerima permintaan untuk memblokir: ${jid}`);

    let updatedBlockedUsers = loadBlockedUsers(); // Selalu baca ulang daftar terbaru

    console.log(`📂 Daftar sebelum ditambah:`, [...updatedBlockedUsers]);

    updatedBlockedUsers.add(jid); // Tambahkan nomor ke daftar blokir

    console.log(`✅ Daftar setelah ditambah:`, [...updatedBlockedUsers]);

    saveBlockedUsers(updatedBlockedUsers); // Simpan ulang daftar terbaru

    // Cek apakah benar-benar tersimpan
    let checkSaved = loadBlockedUsers();
    console.log(`🔍 Data setelah disimpan:`, [...checkSaved]);

    return `Nomor ${number} berhasil diblokir dari chat.`;
}


// Fungsi untuk menampilkan daftar blockchat
async function listBlockChat() {
    let latestBlockedUsers = loadBlockedUsers();
    return latestBlockedUsers.size > 0 
        ? `Daftar blockchat:\n${[...latestBlockedUsers].join('\n')}` 
        : 'Tidak ada nomor yang diblokir.';
}



async function Solving(naze, store) {
	naze.public = true
	
	naze.serializeM = (m) => MessagesUpsert(naze, m, store)
	
	naze.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	naze.getName = (jid, withoutContact  = false) => {
		const id = naze.decodeJid(jid);
		if (id.endsWith('@g.us')) {
			const groupInfo = store.contacts[id] || naze.groupMetadata(id) || {};
			return Promise.resolve(groupInfo.name || groupInfo.subject || PhoneNumber('+' + id.replace('@g.us', '')).getNumber('international'));
		} else {
			if (id === '0@s.whatsapp.net') {
				return 'WhatsApp';
			}
		const contactInfo = store.contacts[id] || {};
		return withoutContact ? '' : contactInfo.name || contactInfo.subject || contactInfo.verifiedName || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
		}
	}
	
	naze.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await naze.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await naze.getName(i + '@s.whatsapp.net')}\nFN:${await naze.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD` //vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await naze.getName(i + '@s.whatsapp.net')}\nFN:${await naze.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:whatsapp@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/naze_dev\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
			})
		}
		naze.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
	}
	
	naze.profilePictureUrl = async (jid, type = 'image', timeoutMs) => {
		const result = await naze.query({
			tag: 'iq',
			attrs: {
				target: jidNormalizedUser(jid),
				to: '@s.whatsapp.net',
				type: 'get',
				xmlns: 'w:profile:picture'
			},
			content: [{
				tag: 'picture',
				attrs: {
					type, query: 'url'
				},
			}]
		}, timeoutMs);
		const child = getBinaryNodeChild(result, 'picture');
		return child?.attrs?.url;
	}
	
	naze.setStatus = (status) => {
		naze.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}
	
	naze.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
		return naze.sendMessage(jid, { poll: { name, values, selectableCount }})
	}
	
	naze.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		async function getFileUrl(res, mime) {
			if (mime && mime.includes('gif')) {
				return naze.sendMessage(jid, { video: res.data, caption: caption, gifPlayback: true, ...options }, { quoted });
			} else if (mime && mime === 'application/pdf') {
				return naze.sendMessage(jid, { document: res.data, mimetype: 'application/pdf', caption: caption, ...options }, { quoted });
			} else if (mime && mime.includes('image')) {
				return naze.sendMessage(jid, { image: res.data, caption: caption, ...options }, { quoted });
			} else if (mime && mime.includes('video')) {
				return naze.sendMessage(jid, { video: res.data, caption: caption, mimetype: 'video/mp4', ...options }, { quoted });
			} else if (mime && mime.includes('audio')) {
				return naze.sendMessage(jid, { audio: res.data, mimetype: 'audio/mpeg', ...options }, { quoted });
			}
		}
		
		const res = await axios.get(url, { responseType: 'arraybuffer' });
		let mime = res.headers['content-type'];
		if (!mime || mime === 'application/octet-stream') {
			const fileType = await FileType.fromBuffer(res.data);
			mime = fileType ? fileType.mime : null;
		}
		const hasil = await getFileUrl(res, mime);
		return hasil
	}
	
	naze.sendFakeLink = async (jid, text, title, body, thumbnail, myweb, options = {}) => {
		await naze.sendMessage(jid, {
			text: text,
			contextInfo: {
				externalAdReply: {
					title: title,
					body: body,
					previewType: 'PHOTO',
					thumbnailUrl: myweb,
					thumbnail: thumbnail,
					sourceUrl: myweb
				}
			}
		}, { ...options })
	}
	
	naze.sendFromOwner = async (jid, text, quoted, options = {}) => {
		for (const a of jid) {
			await naze.sendMessage(a.replace(/[^0-9]/g, '') + '@s.whatsapp.net', { text, ...options }, { quoted });
		}
	}
	
	naze.sendTextMentions = async (jid, text, quoted, options = {}) => naze.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
	
	naze.sendAsSticker = async (jid, path, quoted, options = {}) => {
		const buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		const result = await writeExif(buff, options);
		await naze.sendMessage(jid, { sticker: { url: result }, ...options }, { quoted });
		return buff;
	}
	
	naze.sendSticker = async (jid, path, options = {}) => {
		const buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		const result = await writeExif(buff, options);
		
		// Pastikan mengirim stiker, bukan pesan teks
		await naze.sendMessage(jid, { sticker: { url: result }, ...options });
	
		return buff;
	}
	

	naze.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		const quoted = message.msg || message;
		const mime = quoted.mimetype || '';
		const messageType = (message.mtype || mime.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quoted, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		const type = await FileType.fromBuffer(buffer);
		const trueFileName = attachExtension ? `./database/sampah/${filename ? filename : Date.now()}.${type.ext}` : filename;
		await fs.promises.writeFile(trueFileName, buffer);
		return trueFileName;
	}
	
	naze.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../database/sampah/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}
	
	naze.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		const { mime, data, filename } = await naze.getFile(path, true);
		const isWebpSticker = options.asSticker || /webp/.test(mime);
		let type = 'document', mimetype = mime, pathFile = filename;
		if (isWebpSticker) {
			const { writeExif } = require('../lib/exif');
			const media = { mimetype: mime, data };
			pathFile = await writeExif(media, {
				packname: options.packname || global.packname,
				author: options.author || global.author,
				categories: options.categories || [],
			})
			await fs.promises.unlink(filename);
			type = 'sticker';
			mimetype = 'image/webp';
		} else if (/image|video|audio/.test(mime)) {
			type = mime.split('/')[0];
		}
		await naze.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options });
		return fs.promises.unlink(pathFile);
	}
	
	naze.sendButtonMsg = async (jid, body = '', footer = '', title = '', media, buttons = [], quoted, options = {}) => {
		const { type, data, url, ...rest } = media || {}
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						header: proto.Message.InteractiveMessage.Header.fromObject({
							title,
							hasMediaAttachment: !!media,
							...(media ? await generateWAMessageContent({
								[type]: url ? { url } : data, ...rest
							}, {
								upload: naze.waUploadToServer
							}) : {})
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: buttons.map(a => {
								return {
									name: a.name,
									buttonParamsJson: JSON.stringify(a.buttonParamsJson ? (typeof a.buttonParamsJson === 'string' ? JSON.parse(a.buttonParamsJson) : a.buttonParamsJson) : '')
								}
							})
						}),
						contextInfo: {
							forwardingScore: 10,
							isForwarded: true,
							forwardedNewsletterMessageInfo: {
								newsletterJid: global.my.ch,
								serverMessageId: null,
								newsletterName: 'Join For More Info'
							},
							mentionedJid: options.mentions || [],
							...options.contextInfo,
							...(quoted ? {
								stanzaId: quoted.key.id,
								remoteJid: quoted.key.remoteJid,
								participant: quoted.key.participant || quoted.key.remoteJid,
								fromMe: quoted.key.fromMe,
								quotedMessage: quoted.message
							} : {})
						}
					})
				}
			}
		}, {});
		const hasil = await naze.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
		return hasil
	}
	
	naze.sendCarouselMsg = async (jid, body = '', footer = '', cards = [], options = {}) => {
		async function getImageMsg(url) {
			const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: naze.waUploadToServer });
			return imageMessage;
		}
		const cardPromises = cards.map(async (a) => {
			const imageMessage = await getImageMsg(a.url);
			return {
				header: {
					imageMessage: imageMessage,
					hasMediaAttachment: true
				},
				body: { text: a.body },
				footer: { text: a.footer },
				nativeFlowMessage: {
					buttons: a.buttons.map(b => ({
						name: b.name,
						buttonParamsJson: JSON.stringify(b.buttonParamsJson ? JSON.parse(b.buttonParamsJson) : '')
					}))
				}
			};
		});
		
		const cardResults = await Promise.all(cardPromises);
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
							cards: cardResults,
							messageVersion: 1
						})
					})
				}
			}
		}, {});
		const hasil = await naze.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
		return hasil
	}

	return naze
}

/*
	* Create By Naze
	* Follow https://github.com/nazedev
	* Whatsapp : wa.me/6282113821188
*/

async function Serialize(naze, m, store) {
	const botNumber = naze.decodeJid(naze.user.id)
	if (!m) return m
	if (!store.messages[m.key.remoteJid]?.array?.some(a => a.key.id === m.key.id)) return m
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isBot = (m.id.startsWith('BAE5') || m.id.startsWith('HSK') || m.id.length === 22)
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = naze.decodeJid(m.fromMe && naze.user.id || m.participant || m.key.participant || m.chat || '')
		if (m.isGroup) {
			m.metadata = store.groupMetadata[m.chat] || await naze.groupMetadata(m.chat)
			m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, []))
			m.isAdmin = m.admins.some((b) => b.id === m.sender)
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
		}
	}
	if (m.message) {
		m.type = getContentType(m.message) || Object.keys(m.message)[0]
		m.msg = (/viewOnceMessage/i.test(m.type) ? m.message[m.type].message[getContentType(m.message[m.type].message)] : (extractMessageContent(m.message[m.type]) || m.message[m.type]))
		m.body = m.message?.conversation || m.msg?.text || m.msg?.conversation || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
		m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.body) ? m.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
		m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
		m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
		m.device = getDevice(m.id)
		m.expiration = m.msg?.contextInfo?.expiration || 0
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
		if (m.isMedia) {
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ''
			m.width = m.msg?.width || ''
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		m.quoted = m.msg?.contextInfo?.quotedMessage || null
		if (m.quoted) {
			m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
			m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
			m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.device = getDevice(m.quoted.id)
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
			m.quoted.isBot = m.quoted.id ? (m.quoted.id.startsWith('BAE5') || m.quoted.id.startsWith('HSK') || m.quoted.id.length === 22) : false
			m.quoted.sender = naze.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === naze.decodeJid(naze.user.id)
			m.quoted.text = m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.msg = extractMessageContent(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type]
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.getQuotedObj = async () => {
				if (!m.quoted.id) return false
				let q = await store.loadMessage(m.chat, m.quoted.id, naze)
				return await Serialize(naze, q, store)
			}
			m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
				participant: m.quoted.sender,
				fromMe: areJidsSameUser(naze.decodeJid(m.msg?.contextInfo?.participant), naze.decodeJid(naze?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
			}
			m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
			m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.quoted.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.quoted.body) ? m.quoted.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.quoted.body) ? m.quoted.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
			m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
			m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
			if (m.quoted.isMedia) {
				m.quoted.mime = m.quoted.msg?.mimetype
				m.quoted.size = m.quoted.msg?.fileLength
				m.quoted.height = m.quoted.msg?.height || ''
				m.quoted.width = m.quoted.msg?.width || ''
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
				}
			}
			m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: m.quoted,
				...(m.isGroup ? { participant: m.quoted.sender } : {})
			})
			m.quoted.download = async () => {
				const quotednya = m.quoted.msg || m.quoted;
				const mimenya = quotednya.mimetype || '';
				const messageType = (m.quoted.type || mimenya.split('/')[0]).replace(/Message/gi, '');
				const stream = await downloadContentFromMessage(quotednya, messageType);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk]);
				}
				return buffer
			}
			m.quoted.delete = () => {
				naze.sendMessage(m.quoted.chat, {
					delete: {
						remoteJid: m.quoted.chat,
						fromMe: m.isBotAdmins ? false : true,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
			}
		}
	}
	
	m.download = async () => {
		const quotednya = m.msg || m.quoted;
		const mimenya = quotednya.mimetype || '';
		const messageType = (m.type || mimenya.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quotednya, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer
	}
	
	m.copy = () => Serialize(naze, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(m)))
	
	m.reply = async (text, options = {}) => {
		const chatId = options?.chat ? options.chat : m.chat
		const caption = options.caption || '';
		const quoted = options?.quoted ? options.quoted : m
		try {
			if (/^https?:\/\//.test(text)) {
				const data = await axios.get(text, { responseType: 'arraybuffer' });
				const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
				if (/gif|image|video|audio|pdf/i.test(mime)) {
					return naze.sendFileUrl(chatId, text, caption, quoted, options)
				} else {
					return naze.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
				}
			} else {
				return naze.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
			}
		} catch (e) {
			return naze.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
		}
	}

	return m
}

module.exports = { GroupUpdate, GroupParticipantsUpdate, LoadDataBase, MessagesUpsert,blockChat, listBlockChat, Solving }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
