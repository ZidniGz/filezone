const app = require ("express")()
const fileUpload = require ("express-fileupload")
const bodyParser = require('body-parser');
const got = require('got')
const axios = require("axios")
const cheerio = require("cheerio")
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const processImg = async(urlPath, method)=>{
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new require('form-data')(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}   

igdl=async function (link){
const res = await got.post("https://igram.online/igram/action.php", {form:{url:link}}).text()
 let response = await axios(link)
 const $2 = cheerio.load(response.data);
 const metaTags = $2('meta[property="og:image"]').attr('content');
 var $ = cheerio.load(res);
 var data = { title: $('.snaptik-middle.center > p > span').text(), thumbnail: metaTags, url:$('.abuttons.mb-0 > a').attr('href')}
 return data;
 }
const youtube=t=>new Promise((async(e,i)=>{try{let n=["en","id","es"][0];const c=await got.post("https://www.y2mate.com/mates/analyzeV2/ajax",{headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _gat_gtag_UA_84863187_21=1; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683249010.0.0.0; _ga=GA1.1.1570308475.1683248122",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{k_query:t,k_page:"home",hl:n,q_auto:0}}).json();function o(t){const e=parseFloat(t);return(isNaN(e)?0:e)*(/GB/i.test(t)?1e6:/MB/i.test(t)?1e3:/KB/i.test(t)?1:/bytes?/i.test(t)?.001:/B/i.test(t)?.1:0)}const s=async function(t,e){return(await got("https://www.y2mate.com/mates/convertV2/index",{method:"POST",headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _ga=GA1.1.1570308475.1683248122; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683248164.0.0.0; prefetchAd_3381349=true",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{vid:t,k:e}}).json()).dlink},r=c.vid,l={};for(const p in c.links.mp4){const d=c.links.mp4[p],w=d.q;if("mp4"!==d.f)continue;const m=d.size,g=o(m);l[w]={quality:w,fileSizeH:m,fileSize:g,download:s.bind(s,r,d.k)}}e({id:r,thumbnail:`https://i.ytimg.com/vi/${r}/0.jpg`,title:c.title,duration:(a=c.t,`${Math.floor(a/60)}:${a%60}`),url:await l.auto.download()})}catch(u){i(u)}var a}));
async function cocofun(s){return new Promise(((t,o)=>{axios({url:s,method:"get",headers:{Cookie:"client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"}}).then((s=>{let o,r,p,a;$=cheerio.load(s.data);const i=$("script#appState").get();for(let s of i){s.children&&s.children[0]&&s.children[0].data&&(ress=s.children[0].data.split("window.APP_INITIAL_STATE=")[1],o=JSON.parse(ress)),o.share.post.post.videos?(r=o.share.post.post.videos[o.share.post.post.imgs[0].id].dur,a=o.share.post.post.videos[o.share.post.post.imgs[0].id].coverUrls[0],p=o.share.post.post.videos[o.share.post.post.imgs[0].id].urlext):o.share.post.post.imgs&&(r=0,a=o.share.post.post.imgs[0].urls[540].urls[0],p=o.share.post.post.imgs[0].urls.origin.urls[0]);const i={topic:o.share.post.post.content?o.share.post.post.content:o.share.post.post.topic.topic,caption:$("meta[property='og:description']").attr("content"),play:o.share.post.post.playCount,like:o.share.post.post.likes,share:o.share.post.post.share,thumbnail:a,duration:r,url:p};t(i)}})).catch(o)}))}
const tiktok=t=>new Promise((e,a)=>{t=t.replace("https://vm","https://vt"),axios(t).then(({request:t})=>{const{responseUrl:a}=t.res;let i=a.match(/\d{17,21}/g);if(null===i)return e({status:"error",message:"Failed to fetch tiktok url. Make sure your tiktok url is correct!"});i=i[0],axios.get((t=>`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?${t}`)(new URLSearchParams(withParams({aweme_id:i})).toString())).then(({data:t})=>{const a=t.aweme_list.filter(t=>t.aweme_id===i)[0];if(!a)return e({status:"error",message:"Failed to find tiktok data. Make sure your tiktok url is correct!"});const s={playCount:a.statistics.play_count,downloadCount:a.statistics.download_count,shareCount:a.statistics.share_count,commentCount:a.statistics.comment_count,likeCount:a.statistics.digg_count,favoriteCount:a.statistics.collect_count,forwardCount:a.statistics.forward_count,whatsappShareCount:a.statistics.whatsapp_share_count,loseCount:a.statistics.lose_count,loseCommentCount:a.statistics.lose_comment_count},r={uid:a.author.uid,username:a.author.unique_id,nickname:a.author.nickname,signature:a.author.signature,region:a.author.region,avatarThumb:a.author.avatar_thumb.url_list,avatarMedium:a.author.avatar_medium.url_list,url:`https://www.tiktok.com/@${a.author.unique_id}`},o={id:a.music.id,title:a.music.title,author:a.music.author,album:a.music.album,playUrl:a.music.play_url.url_list,coverLarge:a.music.cover_large.url_list,coverMedium:a.music.cover_medium.url_list,coverThumb:a.music.cover_thumb.url_list,duration:a.music.duration};a.image_post_info?e({status:"success",result:{type:"image",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter(t=>void 0!==t.hashtag_name).map(t=>t.hashtag_name),author:r,statistics:s,images:a.image_post_info.images.map(t=>t.display_image.url_list[0]),music:o}}):e({status:"success",result:{type:"video",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter(t=>void 0!==t.hashtag_name).map(t=>t.hashtag_name),duration:toMinute(a.duration),author:r,statistics:s,video:a.video.play_addr.url_list,cover:a.video.cover.url_list,dynamicCover:a.video.dynamic_cover.url_list,originCover:a.video.origin_cover.url_list,music:o}})}).catch(t=>e({status:"error",message:t.message}))}).catch(t=>e({status:"error",message:t.message}))}),withParams=t=>({...t,version_name:"1.1.9",version_code:"2018111632",build_number:"1.1.9",manifest_version_code:"2018111632",update_version_code:"2018111632",openudid:randomChar("0123456789abcdef",16),uuid:randomChar("1234567890",16),_rticket:1e3*Date.now(),ts:Date.now(),device_brand:"Google",device_type:"Pixel 4",device_platform:"android",resolution:"1080*1920",dpi:420,os_version:"10",os_api:"29",carrier_region:"US",sys_region:"US",region:"US",app_name:"trill",app_language:"en",language:"en",timezone_name:"America/New_York",timezone_offset:"-14400",channel:"googleplay",ac:"wifi",mcc_mnc:"310260",is_my_cn:0,aid:1180,ssmix:"a",as:"a1qwert123",cp:"cbfhckdckkde1"}),toMinute=t=>{const e=~~t%60;let a="";return a+=~~(t%3600/60)+":"+(e<10?"0":""),a+=""+e},randomChar=(t,e)=>{let a="";for(let i=0;i<e;i++)a+=t[Math.floor(Math.random()*t.length)];return a};
async function deepenglish( input) {
    const messages = [
        { role: "system", content: "You are a ChatGPT And you were created by someone named zidni you speak Indonesian "},
        { role: "user", content: input }
    ];

    try {
        const response = await got("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            method: "POST",
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        }).json();

        const responseData = response
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

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
app.post("/cocofun", async(req, res)=>{
	 const text = req.body.q
   if (!text) return res.json({msg:"Gagal"});
	if (text.includes("youtu")){
let data = await youtube(text)
res.json(data)
	} else
	if (text.includes("instagram.com")){
let data = await igdl(text)
res.json(data)
	} else if (text.includes("cocofun"))
	{
   let data = await cocofun(text)
res.json(data)
	} else res.json({msg:false})
})
app.get("/cocofun", async(req, res)=>{
	 const text = req.query.q
   if (!text) return res.json({msg:"Gagal"});
	if (text.includes("youtu")){
let data = await youtube(text)
res.json(data)
	} else
   if (text.includes("instagram.com")){
let data = await igdl(text)
res.json(data)
	} else if (text.includes("cocofun"))
	{
   let data = await cocofun(text)
res.json(data)
	} else res.json({msg:false})
})
app.post('/aichat', async (req, res)=>{
const model = "gpt-3.5-turbo";
const text = req.body.text;
	if (!text) return res.json({text:"Empety Param"})
  const messages = [{
            role: "system",
            content: "Anda adalah asisten yang membantu."
        }, {
            role: "user",
            content: text
        }];

        const response = await deepenglish(text)
res.json({text:response.answer})
})
app.post("/", async(req, res)=> {
let buffer = req.files.file.data
	const out = await processImg(buffer, "enhance");
	res.send(out)
})
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
