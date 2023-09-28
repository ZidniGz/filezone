const app = require ("express")()
const fileUpload = require ("express-fileupload")
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
const stiker = (file, stickerMetadata = {
				author: '‎',
				pack: '‎',
				keepScale: true,
				circle: false,
				removebg: 'HQ'
			}) => {
	return new Promise(async (resolve, reject) => {
    let getBase64 = Buffer.isBuffer(file) ? file.toString('base64') : (typeof file === 'string' && fs.existsSync(file)) ? fs.readFileSync(file).toString('base64') : null
		if (!getBase64) return reject('File Base64 Undefined')
    const buff = await require("file-type").fromBuffer(file)
    let Type = buff.mime.includes('image') ? 'image' : 'file'
		const Format = {
			[Type] : `data:${buff.mime};base64,${getBase64}`,
			stickerMetadata: {
				...stickerMetadata
			},
			sessionInfo: {
				WA_VERSION: '2.2106.5',PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',OS: 'Windows Server 2016',START_TS: 1614310326309,NUM: '6247',LAUNCH_TIME_MS: 7934,PHONE_VERSION: '2.20.205.16'
			},
			config: {
				sessionId: 'session',
				headless: true,
				qrTimeout: 20,
				authTimeout: 0,
				cacheEnabled: false,
				useChrome: true,
				killProcessOnBrowserClose: true,
				throwErrorOnTosBlock: false,
				chromiumArgs: ['--no-sandbox','--disable-setuid-sandbox','--aggressive-cache-discard','--disable-cache','--disable-application-cache','--disable-offline-load-stale-cache','--disk-cache-size=0'],executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',skipBrokenMethodsCheck: true,stickerServerEndpoint: true
			}
    }
		await require ('axios')({
			url: `https://sticker-api.openwa.dev/${Type === 'image' ? 'prepareWebp' : 'convertMp4BufferToWebpDataUrl'}`,
			method: 'post',
			headers: {
				Accept: 'application/json, text/plain, /',
				'Content-Type': 'application/json;charset=utf-8',
			},
			data: JSON.stringify(Format)
		}).then(async({ data }) => {			 			 
			 let Image = require('node-webpmux').Image
			 const img = new Image()
    const stickerPackId = new Date * 1
     const json = {
      'sticker-pack-id': stickerPackId,
      'sticker-pack-name': stickerMetadata.pack ? stickerMetadata.pack : '',
      'sticker-pack-publisher': stickerMetadata.author,
      'sticker-pack-publisher-id': stickerMetadata.author,
      'sticker-pack-version': '1.0.0',
      'android-app-store-link': 'https://wibusoft.site',
      'ios-app-store-link': 'https://wibusoft.site',
      'sticker-pack-description': 'sticker ini merupakan sticker yang telah di generate oleh jamal',
      emojis: ['❤', '😍', '😘', '💕', '😻', '💑', '👩‍❤‍👩', '👨‍❤‍👨', '💏', '👩‍❤‍💋‍👩', '👨‍❤‍💋‍👨', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '💋', '👩‍❤️‍💋‍👩', '👨‍❤️‍💋‍👨', '👩‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍👨', '👩‍❤️‍💋‍👨', '👬', '👭', '👫', '🥰', '😚', '😙', '👄', '🌹', '😽', '❣️', '❤️', '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🙂', '😛', '😝', '😜', '🤪', '🤗', '😺', '😸', '😹', '☺', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👯‍♂️', '👯', '👯‍♀️', '💃', '🕺', '🔥', '⭐️', '✨', '💫', '🎇', '🎆', '🍻', '🥂', '🍾', '🎂', '🍰', '☹', '😣', '😖', '😫', '😩', '😢', '😭', '😞', '😔', '😟', '😕', '😤', '😠', '😥', '😰', '😨', '😿', '😾', '😓', '🙍‍♂', '🙍‍♀', '💔', '🙁', '🥺', '🤕', '☔️', '⛈', '🌩', '🌧,😯', '😦', '😧', '😮', '😲', '🙀', '😱', '🤯', '😳', '❗', '❕', '🤬', '😡', '😠', '🙄', '👿', '😾', '😤', '💢', '👺', '🗯️', '😒', '🥵', '👋'],
    }
    let exifAttr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
    let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
    let exif = Buffer.concat([exifAttr, jsonBuffer])
    exif.writeUIntLE(jsonBuffer.length, 14, 4)
    let foto;
      if (Type === 'image') {
        foto = Buffer.from(data.webpBase64, 'base64')
      } else {
       const webpBase = data.replace(/^data:(.*?);base64,/, '')
          const webpBase64 = webpBase.replace(/ /g, '+')
          foto = Buffer.from(webpBase64, 'base64')
      }      
    await img.load(foto)
    img.exif = exif
    return resolve(await img.save(null))
		}).catch((err) => reject(err))
	})
      }
app.get('/', (req,res) => res.send('GET'))
app.post('/',(req,res) => res.send('POST'))
app.post(['/sticker','/stiker'],async (req, res) => {
//if (!req.header('author')) return res.send('false')
let data = req.files.file.data
let pack = req.header('packname')
let author = req.header('author')
let rs = await stiker(data,{pack:pack, author: author, keepScale:true,circle:false})
res.send(rs)
})

app.listen(4000)
