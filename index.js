const express = require("express")
const app = express()
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const got = require("got");
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Data Pemilu");
const axios = require("axios");
const cheerio = require("cheerio");
const ytdl = require("ytdl-core");
const xml2js = require("xml2js");
const { v4: uuidv4 } = require('uuid');

const {fromBuffer} = require("file-type")
const dataRouter = require("./router"); // Sesuaikan dengan path file Anda
app.use("/api/db", dataRouter);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
async function getTranscript(e){try{const t=await ytdl.getInfo(e);if(!("captions"in t.player_response))return;const a=t.player_response.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl,r=await fetch(a),n=await r.text();return new Promise(((e,t)=>{xml2js.parseString(n,((a,r)=>{if(a)t(a);else{const t=r.transcript.text.map((e=>e._)).join(" ").replace(/&#39;/g,"'").replace(/i /g,"I ").replace(/ \[Music\]/g,"");e(t)}}))}))}catch(e){}}
const processImg=async(e,n)=>new Promise((async(t,o)=>{let r=["enhance","recolor","dehaze"];n=r.includes(n)?n:r[0];let a=new require("form-data")(),i="https://inferenceengine.vyro.ai/"+n;a.append("model_version",1,{"Content-Transfer-Encoding":"binary",contentType:"multipart/form-data; charset=uttf-8"}),a.append("image",Buffer.from(e),{filename:"enhance_image_body.jpg",contentType:"image/jpeg"}),a.submit({url:i,host:"inferenceengine.vyro.ai",path:"/"+n,protocol:"https:",headers:{"User-Agent":"okhttp/4.9.3",Connection:"Keep-Alive","Accept-Encoding":"gzip"}},(function(e,n){e&&o();let r=[];n.on("data",(function(e,n){r.push(e)})).on("end",(()=>{t(Buffer.concat(r))})),n.on("error",(e=>{o()}))}))}));
const igdl = function (url){
return new Promise(async(resolve, reject) => {
try {
  const jsonObject = {
  type: 'post',
  link:url
};
  
const response = await got.post('https://saverapi.com/insta.php', {
  headers: {
    'Token': `${uuidv4()}/${Date.now()}-${Math.floor(Math.random() * 900000)}`
  },
  json: jsonObject
}).json();
resolve(response)
} catch (e) {
reject(e);
}})
}
const yt_dl=t=>new Promise((async(e,i)=>{try{let i="en";const s=await got.post("https://www.y2mate.com/mates/analyzeV2/ajax",{headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _gat_gtag_UA_84863187_21=1; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683249010.0.0.0; _ga=GA1.1.1570308475.1683248122",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{k_query:t,k_page:"home",hl:i,q_auto:0}}).json();function o(t){const e=parseFloat(t);return(isNaN(e)?0:e)*(/GB/i.test(t)?1e6:/MB/i.test(t)?1e3:/KB/i.test(t)?1:/bytes?/i.test(t)?.001:/B/i.test(t)?.1:0)}const n=s.vid,a={},c={};let l=[];for(const t in s.links.mp4){const e=s.links.mp4[t];if("mp4"!==e.f)continue;const i=o(e.size);l.push(e.q),a[e.q]={quality:e.q,fileSizeH:e.size,fileSize:i,q:e.k}}let p=[];for(const t in s.links.mp3){const e=s.links.mp3[t];if("mp3"!==e.f)continue;const i=o(e.size);p.push(e.q),c[e.q]={quality:e.q,fileSizeH:e.size,fileSize:i,q:e.k}}e({id:n,thumbnail:`https://i.ytimg.com/vi/${n}/0.jpg`,title:s.title,duration:`${Math.floor(s.t/60)}:${s.t%60}`,qualities:l,video:a,audio:c})}catch(t){i(t)}}));
const convert2=async function(e,t){return(await got("https://www.y2mate.com/mates/convertV2/index",{method:"POST",headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _ga=GA1.1.1570308475.1683248122; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683248164.0.0.0; prefetchAd_3381349=true",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{vid:e,k:t}}).json())};
const youtube=t=>new Promise((async(e,i)=>{try{let i="en";const n=await got.post("https://www.y2mate.com/mates/analyzeV2/ajax",{headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _gat_gtag_UA_84863187_21=1; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683249010.0.0.0; _ga=GA1.1.1570308475.1683248122",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{k_query:t,k_page:"home",hl:i,q_auto:0}}).json();function o(t){const e=parseFloat(t);return(isNaN(e)?0:e)*(/GB/i.test(t)?1e6:/MB/i.test(t)?1e3:/KB/i.test(t)?1:/bytes?/i.test(t)?.001:/B/i.test(t)?.1:0)}const c=async function(t,e){return(await got("https://www.y2mate.com/mates/convertV2/index",{method:"POST",headers:{accept:"*/*","accept-encoding":"gzip, deflate, br","content-type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:"_gid=GA1.2.2055666962.1683248123; _ga=GA1.1.1570308475.1683248122; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683248164.0.0.0; prefetchAd_3381349=true",origin:"https://www.y2mate.com","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"},form:{vid:t,k:e}}).json()).dlink},s=n.vid,r={};for(const t in n.links.mp4){const e=n.links.mp4[t],i=e.q;if("mp4"!==e.f)continue;const a=e.size,l=o(a);r[i]={quality:i,fileSizeH:a,fileSize:l,download:c.bind(c,s,e.k)}}e({id:s,thumbnail:`https://i.ytimg.com/vi/${s}/0.jpg`,title:n.title,duration:(a=n.t,`${Math.floor(a/60)}:${a%60}`),url:await r.auto.download()})}catch(t){i(t)}var a}));
async function cocofun(s){return new Promise(((t,o)=>{axios({url:s,method:"get",headers:{Cookie:"client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"}}).then((s=>{let o,e,r,p;$=cheerio.load(s.data);const a=$("script#appState").get();for(let s of a){s.children&&s.children[0]&&s.children[0].data&&(ress=s.children[0].data.split("window.APP_INITIAL_STATE=")[1],o=JSON.parse(ress)),o.share.post.post.videos?(e=o.share.post.post.videos[o.share.post.post.imgs[0].id].dur,p=o.share.post.post.videos[o.share.post.post.imgs[0].id].coverUrls[0],r=o.share.post.post.videos[o.share.post.post.imgs[0].id].urlext):o.share.post.post.imgs&&(e=0,p=o.share.post.post.imgs[0].urls[540].urls[0],r=o.share.post.post.imgs[0].urls.origin.urls[0]);const a={topic:o.share.post.post.content?o.share.post.post.content:o.share.post.post.topic.topic,caption:$("meta[property='og:description']").attr("content"),play:o.share.post.post.playCount,like:o.share.post.post.likes,share:o.share.post.post.share,thumbnail:p,duration:e,url:r};t(a)}})).catch(o)}))}
const tiktok=t=>new Promise(((e,a)=>{t=t.replace("https://vm","https://vt"),axios(t).then((({request:t})=>{const{responseUrl:a}=t.res;let i=a.match(/\d{17,21}/g);if(null===i)return e({status:"error",message:"Failed to fetch tiktok url. Make sure your tiktok url is correct!"});i=i[0],axios.get((t=>`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?${t}`)(new URLSearchParams(withParams({aweme_id:i})).toString())).then((({data:t})=>{const a=t.aweme_list.filter((t=>t.aweme_id===i))[0];if(!a)return e({status:"error",message:"Failed to find tiktok data. Make sure your tiktok url is correct!"});const s={playCount:a.statistics.play_count,downloadCount:a.statistics.download_count,shareCount:a.statistics.share_count,commentCount:a.statistics.comment_count,likeCount:a.statistics.digg_count,favoriteCount:a.statistics.collect_count,forwardCount:a.statistics.forward_count,whatsappShareCount:a.statistics.whatsapp_share_count,loseCount:a.statistics.lose_count,loseCommentCount:a.statistics.lose_comment_count},r={uid:a.author.uid,username:a.author.unique_id,nickname:a.author.nickname,signature:a.author.signature,region:a.author.region,avatarThumb:a.author.avatar_thumb.url_list,avatarMedium:a.author.avatar_medium.url_list,url:`https://www.tiktok.com/@${a.author.unique_id}`},o={id:a.music.id,title:a.music.title,author:a.music.author,album:a.music.album,playUrl:a.music.play_url.url_list,coverLarge:a.music.cover_large.url_list,coverMedium:a.music.cover_medium.url_list,coverThumb:a.music.cover_thumb.url_list,duration:a.music.duration};a.image_post_info?e({status:"success",result:{type:"image",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter((t=>void 0!==t.hashtag_name)).map((t=>t.hashtag_name)),author:r,statistics:s,images:a.image_post_info.images.map((t=>t.display_image.url_list[0])),music:o}}):e({status:"success",result:{type:"video",id:a.aweme_id,createTime:a.create_time,description:a.desc,hashtag:a.text_extra.filter((t=>void 0!==t.hashtag_name)).map((t=>t.hashtag_name)),duration:toMinute(a.duration),author:r,statistics:s,video:a.video.play_addr.url_list,cover:a.video.cover.url_list,dynamicCover:a.video.dynamic_cover.url_list,originCover:a.video.origin_cover.url_list,music:o}})})).catch((t=>e({status:"error",message:t.message})))})).catch((t=>e({status:"error",message:t.message})))})),withParams=t=>({...t,version_name:"1.1.9",version_code:"2018111632",build_number:"1.1.9",manifest_version_code:"2018111632",update_version_code:"2018111632",openudid:randomChar("0123456789abcdef",16),uuid:randomChar("1234567890",16),_rticket:1e3*Date.now(),ts:Date.now(),device_brand:"Google",device_type:"Pixel 4",device_platform:"android",resolution:"1080*1920",dpi:420,os_version:"10",os_api:"29",carrier_region:"US",sys_region:"US",region:"US",app_name:"trill",app_language:"en",language:"en",timezone_name:"America/New_York",timezone_offset:"-14400",channel:"googleplay",ac:"wifi",mcc_mnc:"310260",is_my_cn:0,aid:1180,ssmix:"a",as:"a1qwert123",cp:"cbfhckdckkde1"}),toMinute=t=>{const e=~~t%60;let a="";return a+=~~(t%3600/60)+":"+(e<10?"0":""),a+=""+e},randomChar=(t,e)=>{let a="";for(let i=0;i<e;i++)a+=t[Math.floor(Math.random()*t.length)];return a};
async function deepenglish(e){const t=[{role:"system",content:"You are a ChatGPT And you were created by someone named zidni you speak Indonesian "},{role:"user",content:e}];try{return await got("https://deepenglish.com/wp-json/ai-chatbot/v1/chat",{method:"POST",headers:{Accept:"text/event-stream","Content-Type":"application/json"},body:JSON.stringify({messages:t})}).json()}catch(e){throw e}}

const stiker=(e,a={author:"‎",pack:"‎",keepScale:!0,circle:!1,removebg:"HQ"})=>new Promise((async(i,s)=>{let t=Buffer.isBuffer(e)?e.toString("base64"):"string"==typeof e&&fs.existsSync(e)?fs.readFileSync(e).toString("base64"):null;if(!t)return s("File Base64 Undefined");const r=await require("file-type").fromBuffer(e);let o=r.mime.includes("image")?"image":"file";const c={[o]:`data:${r.mime};base64,${t}`,stickerMetadata:{...a},sessionInfo:{WA_VERSION:"2.2106.5",PAGE_UA:"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",WA_AUTOMATE_VERSION:"3.6.10 UPDATE AVAILABLE: 3.6.11",BROWSER_VERSION:"HeadlessChrome/88.0.4324.190",OS:"Windows Server 2016",START_TS:1614310326309,NUM:"6247",LAUNCH_TIME_MS:7934,PHONE_VERSION:"2.20.205.16"},config:{sessionId:"session",headless:!0,qrTimeout:20,authTimeout:0,cacheEnabled:!1,useChrome:!0,killProcessOnBrowserClose:!0,throwErrorOnTosBlock:!1,chromiumArgs:["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],executablePath:"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",skipBrokenMethodsCheck:!0,stickerServerEndpoint:!0}};await require("axios")({url:"https://sticker-api.openwa.dev/"+("image"===o?"prepareWebp":"convertMp4BufferToWebpDataUrl"),method:"post",headers:{Accept:"application/json, text/plain, /","Content-Type":"application/json;charset=utf-8"},data:JSON.stringify(c)}).then((async({data:e})=>{const s=new(0,require("node-webpmux").Image),t={"sticker-pack-id":1*new Date,"sticker-pack-name":a.pack?a.pack:"","sticker-pack-publisher":a.author,"sticker-pack-publisher-id":a.author,"sticker-pack-version":"1.0.0","android-app-store-link":"https://wibusoft.site","ios-app-store-link":"https://wibusoft.site","sticker-pack-description":"sticker ini merupakan sticker yang telah di generate oleh jamal",emojis:["❤","😍","😘","💕","😻","💑","👩‍❤‍👩","👨‍❤‍👨","💏","👩‍❤‍💋‍👩","👨‍❤‍💋‍👨","🧡","💛","💚","💙","💜","🖤","💔","❣","💞","💓","💗","💖","💘","💝","💟","♥","💌","💋","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","👩‍❤️‍👨","👩‍❤️‍👩","👨‍❤️‍👨","👩‍❤️‍💋‍👨","👬","👭","👫","🥰","😚","😙","👄","🌹","😽","❣️","❤️","😀","😃","😄","😁","😆","😅","😂","🤣","🙂","😛","😝","😜","🤪","🤗","😺","😸","😹","☺","😌","😉","🤗","😊","🎊","🎉","🎁","🎈","👯‍♂️","👯","👯‍♀️","💃","🕺","🔥","⭐️","✨","💫","🎇","🎆","🍻","🥂","🍾","🎂","🍰","☹","😣","😖","😫","😩","😢","😭","😞","😔","😟","😕","😤","😠","😥","😰","😨","😿","😾","😓","🙍‍♂","🙍‍♀","💔","🙁","🥺","🤕","☔️","⛈","🌩","🌧,😯","😦","😧","😮","😲","🙀","😱","🤯","😳","❗","❕","🤬","😡","😠","🙄","👿","😾","😤","💢","👺","🗯️","😒","🥵","👋"]};let r,c=Buffer.from([73,73,42,0,8,0,0,0,1,0,65,87,7,0,0,0,0,0,22,0,0,0]),n=Buffer.from(JSON.stringify(t),"utf8"),l=Buffer.concat([c,n]);if(l.writeUIntLE(n.length,14,4),"image"===o)r=Buffer.from(e.webpBase64,"base64");else{const a=e.replace(/^data:(.*?);base64,/,"").replace(/ /g,"+");r=Buffer.from(a,"base64")}return await s.load(r),s.exif=l,i(await s.save(null))})).catch((e=>s(e)))}));
app.post("/cocofun", async (req, res) => {
  const text = req.body.q;
  if (!text) return res.json({ msg: "Gagal" });
  if (text.includes("youtu")) {
    let data = await youtube(text);
    res.json(data);
  } else if (text.includes("instagram.com")) {
    let data = await igdl(text);
    res.json(data);
  } else if (text.includes("cocofun")) {
    let data = await cocofun(text);
    res.json(data);
  } else res.json({ msg: false });
});
app.get("/cocofun", async (req, res) => {
  const text = req.query.q;
  if (!text) return res.json({ msg: "Gagal" });
  if (text.includes("youtu")) {
    let data = await youtube(text);
    res.json(data);
  } else if (text.includes("instagram.com")) {
    let data = await igdl(text);
    res.json(data);
  } else if (text.includes("cocofun")) {
    let data = await cocofun(text);
    res.json(data);
  } else res.json({ msg: false });
});
app.post("/aichat", async (req, res) => {
  const model = "gpt-3.5-turbo";
  const text = req.body.text;
  if (!text) return res.json({ text: "Empety Param" });
  const messages = [
    {
      role: "system",
      content: "Anda adalah asisten yang membantu.",
    },
    {
      role: "user",
      content: text,
    },
  ];

  const response = await deepenglish(text);
  res.json({ text: response.answer });
});
app.post("/enhance", async (req, res) => {
  let buffer = req.files.file.data;
  const out = await processImg(buffer, "enhance");
  res.send(out);
});
app.post("/api/createExcel", async (req, res) => {
  worksheet.columns = [
  { header: "Nama", key: "name", width: 18, headerStyle: { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } } } },
  { header: "Tanggal Lahir", key: "birth_date", width: 14, headerStyle: { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } } } },
  { header: "Umur", key: "age", width: 5, headerStyle: { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } } } },
  { header: "Jenis Kelamin", key: "gender", width: 14, headerStyle: { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } } } },
  { header: "Status Pemilih", key: "voter_status", width: 18, headerStyle: { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } } } }
];

// Add data to the table (example)
if (req.body) {
  for (let i of req.body)
    worksheet.addRow({
      name: i.nama,
      birth_date: i.tanggalLahir,
      age: i.umur,
      gender: i.gender,
      voter_status: i.status,
    });
}

// Save workbook to a buffer
const buffer = await workbook.xlsx.writeBuffer();

// Mengaplikasikan perubahan style dan mengembalikan buffer
res.send(buffer);

  
});
app.get("/", (req, res) => res
  .status(200)
  .json({
    message: `Hallo world!, my name is Zidni Al 'Azmi`
  });
);
app.post("/", (req, res) => res.json({message:`Hallo world!, my name is Zidni Al 'Azmi`}));
app.post("/searchmusic", async (req, res) => {
  let buffer = req.files.file.data;
  const acrcloud = require("acrcloud");
  let acr = new acrcloud({
    host: "identify-eu-west-1.acrcloud.com",
    access_key: "c33c767d683f78bd17d4bd4991955d81",
    access_secret: "bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu",
  });
  let audio = await acr.identify(buffer);
  res.json(audio);
});
app.post(["/sticker", "/stiker"], async (req, res) => {
  if (!req.header("author")) return res.send("false");
  let data = req.files.file.data;
  let pack = req.header("packname");
  let author = req.header("author");
  let rs = await stiker(data, {
    pack: pack ? pack : "",
    author: author ? author : "",
    keepScale: true,
    circle: false,
  });
  res.send(rs);
});
app.get("/transcript", async (req, res) => {
  const videoId = req.query.v;
  if (!videoId) {
    return res.status(400).send("Missing video ID parameter");
  }

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const transcript = await getTranscript(url);
    res.send(transcript);
  } catch (error) {
    res.status(500).send("Error getting transcript");
  }
});
app.get("/youtube", async (req,res)=>{
  let url = req.query.url
  let type = req.query.type
  if (!url) return res.json({msg:false});
  if (type === 'mp3'){
let json = await yt_dl(url)
  let data = await convert2(json.id, json.audio['128kbps'].q)
    data.duration = json.duration
    data.dlink = await got(data.dlink, {referer:"https://www.y2mate.com"}).buffer()
  res.json(data)
      } else {
  let json = await yt_dl(url)
  let data = await convert2(json.id, json.video.auto.q)
      data.duration = json.duration
  res.json(data)
  }
})

app.get("/instagram", async(req,res)=>{

  let url = req.query.url;
  if (!url) return res.json({msg:false});
  let json = await igdl(url)
  res.status(200).json(json)
  

  
})




app.get("/tiktok", async (req, res) => {
  if (!req.query.url) return res.json({ msg: false });
  let data = await tiktok(req.query.url);
  if (!data) return res.json({ msg: false });
  res.json(data);
});

app.listen(4000);
