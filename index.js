const app = require ("express")()
const fileUpload = require ("express-fileupload")
const got = require('got')
const axios = require("axios")
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

const tiktok=t=>new Promise((e,a)=>{t=t.replace("https://vm","https://vt"),axios(t).then(({request:t})=>{const{responseUrl:a}=t.res;let i=a.match(/\d{17,21}/g);if(null===i)return e({status:"error",message:"Failed to fetch tiktok url. Make sure your tiktok url is correct!"});i=i[0],axios.get((t=>`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?${t}`)(new URLSearchParams(withParams({aweme_id:i})).toString())).then(({data:t})=>{const a=t.aweme_list.filter(t=>t.aweme_id===i)[0];if(!a)return e({status:"error",message:"Failed to find tiktok data. Make sure your tiktok url is correct!"});const s={playCount:a.statistics.play_count,downloadCount:a.statistics.download_count,shareCount:a.statistics.share_count,commentCount:a.statistics.comment_count,likeCount:a.statistics.digg_count,favoriteCount:a.statistics.collect_count,forwardCount:a.statistics.forward_count,whatsappShareCount:a.statistics.whatsapp_share_count,loseCount:a.statistics.lose_count,loseCommentCount:a.statistics.lose_comment_count},r={uid:a.author.uid,username:a.author.unique_id,nickname:a.author.nickname,signature:a.author.signature,region:a.author.region,avatarThumb:a.author.avatar_thumb.url_list,avatarMedium:a.author.avatar_medium.url_list,url:`https://www.tiktok.com/@${a.author.unique_id}`},o={id:a.music.id,title:a.music.title,author:a.music.author,album:a.music.album,playUrl:a.music.play_url.url_list,coverLarge:a.music.cover_large.url_list,coverMedium:a.music.cover_medium.url_list,coverThumb:a.music.cover_thumb.url_list,duration:a.music.duration};a.image_post_info?e({status:"success",result:{type:"image",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter(t=>void 0!==t.hashtag_name).map(t=>t.hashtag_name),author:r,statistics:s,images:a.image_post_info.images.map(t=>t.display_image.url_list[0]),music:o}}):e({status:"success",result:{type:"video",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter(t=>void 0!==t.hashtag_name).map(t=>t.hashtag_name),duration:toMinute(a.duration),author:r,statistics:s,video:a.video.play_addr.url_list,cover:a.video.cover.url_list,dynamicCover:a.video.dynamic_cover.url_list,originCover:a.video.origin_cover.url_list,music:o}})}).catch(t=>e({status:"error",message:t.message}))}).catch(t=>e({status:"error",message:t.message}))}),withParams=t=>({...t,version_name:"1.1.9",version_code:"2018111632",build_number:"1.1.9",manifest_version_code:"2018111632",update_version_code:"2018111632",openudid:randomChar("0123456789abcdef",16),uuid:randomChar("1234567890",16),_rticket:1e3*Date.now(),ts:Date.now(),device_brand:"Google",device_type:"Pixel 4",device_platform:"android",resolution:"1080*1920",dpi:420,os_version:"10",os_api:"29",carrier_region:"US",sys_region:"US",region:"US",app_name:"trill",app_language:"en",language:"en",timezone_name:"America/New_York",timezone_offset:"-14400",channel:"googleplay",ac:"wifi",mcc_mnc:"310260",is_my_cn:0,aid:1180,ssmix:"a",as:"a1qwert123",cp:"cbfhckdckkde1"}),toMinute=t=>{const e=~~t%60;let a="";return a+=~~(t%3600/60)+":"+(e<10?"0":""),a+=""+e},randomChar=(t,e)=>{let a="";for(let i=0;i<e;i++)a+=t[Math.floor(Math.random()*t.length)];return a};
																																																																																																																																																																																																			

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
app.post('/searchmusic',async (req, res)=> {
let buffer = req.files.file.data
const acrcloud = require( 'acrcloud');let acr = new acrcloud({host: 'identify-eu-west-1.acrcloud.com',access_key: 'c33c767d683f78bd17d4bd4991955d81',access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'})
	let audio = await acr.identify(buffer)
	res.json(audio);
})
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

app.listen(4000)
