const app = require ("express")()
const fileUpload = require ("express-fileupload")
const got = require('got')
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
const image = async(q)=>{
	return await got.post("https://freeimagegenerator.com/queries/queryCreateAIImagesFromTextPrompt.php?server=1", {form:{action:"createAIImages", aiPrompt:q ? q : 'ayam'}}).json()
}

const tiktok = async (url) => {
    let result;
    const REGEXP = /video\/([\d|\+]+)?\/?/;
    const valid = url.match(REGEXP);
    if (valid) {
       let anu = await got(`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${valid[0]}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=FrierenDv&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`).json()
let results = { result: true}
 const obj = anu.aweme_list.find((o) => o.aweme_id === result);
                Object.assign(results, {result:false,aweme_id: obj.aweme_id,region: obj.region,desc: obj.desc,create_time: obj.create_time,author: {    uid: obj.author.uid,    unique_id: obj.author.unique_id,    nickname: obj.author.nickname,    birthday: obj.author.birthday, // Probably unused
                    },
                    duration: obj.music.duration,
                    download: {
                        nowm: obj.video.play_addr.url_list[0],
                        wm: obj.video.download_addr.url_list[0],
                        music: obj.music.play_url.url_list[0],
		    },
                    
                    statistics: {
                        comment_count: (_a = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _a === void 0 ? void 0 : _a.comment_count,
                        digg_count: (_b = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _b === void 0 ? void 0 : _b.digg_count,
                        download_count: (_c = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _c === void 0 ? void 0 : _c.download_count,
                        play_count: (_d = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _d === void 0 ? void 0 : _d.play_count,
                        share_count: (_e = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _e === void 0 ? void 0 : _e.share_count,
                    
		    } })
 return results;
    }
    else {
        result = true;
        try {
            const data = await got(url, {
                headers: {
                    'Accept-Encoding': 'deflate',
                },
                maxRedirects: 0,
            }).text()
                .catch((e) => { var _a, _b; return (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.location; });
            if (data) {
                const _url = data;
                const _valid = _url.match(REGEXP);
                if (_valid) {
                    result = _valid[1];
                }
            }
        }
        catch { }
    }
	
    let anu = await got(`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${result}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=FrierenDv&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`).json()
let results = { status: false}
 const obj = anu.aweme_list.find((o) => o.aweme_id === result);
                Object.assign(results, {result:false,aweme_id: obj.aweme_id,region: obj.region,desc: obj.desc,create_time: obj.create_time,author: {    uid: obj.author.uid,    unique_id: obj.author.unique_id,    nickname: obj.author.nickname,    birthday: obj.author.birthday, // Probably unused
                    },
                    duration: obj.music.duration,
                    download: {
                        nowm: obj.video.play_addr.url_list[0],
                        wm: obj.video.download_addr.url_list[0],
                        music: obj.music.play_url.url_list[0],
		    },
                    // Take what we need
                    statistics: {
                        comment_count: (_a = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _a === void 0 ? void 0 : _a.comment_count,
                        digg_count: (_b = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _b === void 0 ? void 0 : _b.digg_count,
                        download_count: (_c = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _c === void 0 ? void 0 : _c.download_count,
                        play_count: (_d = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _d === void 0 ? void 0 : _d.play_count,
                        share_count: (_e = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _e === void 0 ? void 0 : _e.share_count,
                    },
                });
 return results;
				      };

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
if (!req.header('author')) return res.send('false')
let data = req.files.file.data
let pack = req.header('packname')
let author = req.header('author')
let rs = await stiker(data,{pack: pack ? pack : '', author: author ? author : '',keepScale: true, circle: false
                                                                               })
res.send(rs)
})
app.get("/tiktok", async (req,res)=> {
	if (!req.query.url) return res.json({msg:false});
	let data = await tiktok(req.query.url)
	if (!data) return res.json({msg:false})
	res.json(data)
})
app.get("/text-image", async(req,res)=> {
let q = req.query.q
	if (!q) return res.send("Input Query")

	let data = await image(q)
	res.json(data)

})
app.listen(4000)
