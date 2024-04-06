const crypto = require("crypto");
const got = require("got");
const WebSocket = require("ws");
const chalk = require("chalk");

class BingChat {
    constructor() {
        this.cookies = "MUID=37C20DBF74C56342335D199E75936291; _EDGE_S=SID=208305CD015F6DF60B7E119500096CD2; MUIDB=37C20DBF74C56342335D199E75936291; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=516CFE6F1ECF456B92BE917194986EF0&dmnchg=1; ak_bmsc=7D3E7FB9CFB96D8E34D49CA2417A7368~000000000000000000000000000000~YAAQlyV+aKzfCp2OAQAAq81DrhfBr8nDqDLy22SMV+k2DaLiskYLQEWfnkAN8R5yv04G6TQJ+73h3Pp929rgjxxq0uPo56jIsUQnEaoOBvqV5alRJlg/J8za13HGvDOPuhata6GYno3u+1z73mfFcGU7ObZi8JIfqULI54tcM6Fe663HDjUzOBZKB65caPDCY1jIkFrTXV/BV2fnbeKnM9DS8PnUfz6qEUMus1nf+Mm+aMYim139oIYXPxnZ54m9wKezu6GE0OkvwulAriM2gMMGN7GVxE3UHyPV559UIpL4RyIn2/yneuVNI6RTjYYPImrnBEjRTRj0emR7lqlDjLvrBb2zXFWNkkaK+B8eEAvWwZv3WSSu80FgtkKkvEPJeC7ykiEYFvZA; _UR=cdxcls=0&QS=0&TQS=0; CSRFCookie=5a6f548a-cff3-4d11-b2b3-719e554cc5b8; ANON=A=32E5D52F56B795B7262A4D0DFFFFFFFF&E=1d9c&W=1; NAP=V=1.9&E=1d42&C=3fSe0wFJlPwF0K2dy8KpyukhtE-o_bdu_ByJPAW6X2RnOLQvPqiY3A&W=1; PPLState=1; KievRPSSecAuth=FABSBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACJzqyWF5w2v1EATHczhhPLmGI9eAHTawP4FRPXTj6eePyqTC95ZkGWJZ35wrOZOsuuqWMDaiIPtJS08iOyBV97Xi0yldRTKw0tgcBGniUEiUW06u7CyYk/qkICsFVx3Yuksc/5VVR9l5vHpDzAOtOVrCCl4m2mnBOlzie10jwFJ+e9XTjorHi8JTVy0cez1C8K2sY+w42fC+CPUM5aFxS9onQtQfYfuEsKbAa5ITsFYArw2VwPM8tiGdfJ7SYBaEPBUlI4VC8ejB1ADlf2xfjrnWF7qPAz8Qj9vmFpADfJVXlNHO0fAypTiiHZooM4gh1+7IGjlXGW+Joh9JAUv+LkYCYZTK4c0KNJsMDP30ok5ryZOGjS13r1h6K+PDBh2QfXneFIARMM0pRZzBHyEZzJIscADdOdCWgBTWpF4QyWEWbSW5iJPlxXvqmhG+bici9G1MykK9XX1SaC3WjOufwn+en1dexDRI3MWsD1CWMRA4DWsuB2UQBGlXXCYD6Z2w1fN6u1hZfgBZfJ45aRmNnNgOSz9s+bQIxGbEuZSSkB3cmrGrLxxPp3h+xZNfNLgqmnngNrTHsVOrqNSP7RieOJqb+dn+YqkVKaWF9l/6grlSZc9Y3qJSwQbjvEkI6ueV04wC79kSPXOBN67yGw9+NTaTFDRoSjjJ4ScawtiCNZyh1K0uTXK3uuJ37YQJQIo/P2JzQj7D1ksAwZHKL3+uMlqdd1lklkwH/156kgXGxodZhKrKV4ip7SKC4KLr2e1gBo/gLb9dBjp80xaTcC29RpdKC0wfarQrfivuEMyod8PWca8TROmtj0IZ7t62URxDMAh5zU5t4y1YLADdyImmjz26zs5nYCnjVjR5tOcWMTtqiL8Z6uZSD3OU1joebp3pYHdRYUmppF7yA3dVTsfv3Rl1XVITDqI8nvOR4xYj05KYL4DoBxBoxc/zbItiMu7fHCA93Qgd25qszc4AkRw3I+QmvORi4IuunE3n2075se/vog5pGHOUt+ePP2xsO/PcwsdH2swUAExy+FdskFpvOKjrYdzS68y3YnXFLYT1NIwRcIGK5hbHX5sQQknqX/aAHoEOLCY8rPTFAD3xT0kMOZ5YFuCXFPUpRHRfJ9vm3CohjFIxrBCYSvpEvGlDC3HjrmO1Yk8pA9qH800zhpQ3OG7dTGEhDv3vw/MunNPShclYn6FsfuhqZKfumeB3nwfcQ8U/zD7KGTZIi/LasjC6DFJwD3Dxt3kNZhuRrgprkAy85nt/ouUccti+Pfb272+jnzO60hLtfWxXLUo2sZJBo3MbvNe0N1cAKeoUOe2VkEfL4RNbax3lRVYxPnfFFQ4R7QB4qj3+UmoXmgYqiHGicrdFFSgawtP8oKXUzZufgJBeZJxMj9F5qowABRQA+/75z2ZmyiF30Wubp+fQY415B2M=; _U=1XuS1bqADLbFiYnf8_ErR7vPrAseLSudprsHSmI5bbF0UH6gG8OEWku8AisdraPkVA5VTXzE8QlliOnNyRgedpcF5Cm03JESjRLlpuLcyK_5sLgDKW9EY5HTg08_BJAObPUi7FSX9CAD-Vr_mGPcZ65y8SpL11YemdTaQdAIErjxBf3T2xwyhazMf9hgBDx1p8VuC7dHiUjk1SKk4ud1ffg; WLS=C=7b1c7660d14ebe8a&N=; WLID=aVtv22Yi/M5oqlCyDkJAlt8U5oRLtuuV5QAnvIJGI6bS+yI+Pqb2NjuiFeCMcXNMAoaK07TSjQINiMZtK0N+aVFVtbIgyDaTrTmOtkgYvDY=; _Rwho=u=m&ts=2024-04-05; _SS=SID=208305CD015F6DF60B7E119500096CD2&R=0&RB=0&GB=0&RG=0&RP=0; _RwBf=mta=0&rc=0&rb=0&gb=0&rg=0&pc=0&mtu=0&rbb=0&g=0&cid=&clo=0&v=1&l=2024-04-05T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&ard=0001-01-01T00:00:00.0000000&rwdbt=0001-01-01T16:00:00.0000000-08:00&rwflt=0001-01-01T16:00:00.0000000-08:00&o=0&p=sapphire&c=true&t=1461&s=2024-02-02T09:37:16.3873679+00:00&ts=2024-04-05T12:38:25.2371285+00:00&rwred=0&wls=2&wlb=2&wle=2&ccp=2&lka=0&lkt=0&aad=0&TH=&e=JKuRbODqFwiepEnXaAYS0XaFToTzfgQubUDaC9wG29jmRfgPboaGfcW31V0jY13MEwLDuUTthCRYfkSydY2hVObieniAzxyo3_rikJ7YpvI&A=32E5D52F56B795B7262A4D0DFFFFFFFF; SRCHUSR=DOB=20240405&POEX=W&T=1712320708000; dsc=order=Video; ipv6=hit=1712324323993; USRLOC=HS=1&ELOC=LAT=-7.618442058563232|LON=111.9012451171875|N=Loceret%2C%20Jawa%20Timur|ELT=4|&BLOCK=TS=240405123845; _C_ETH=1; bm_sv=03A65A2968FAB3D4788C51AC5E8D5126~YAAQlyV+aAwJC52OAQAAPphFrhcTxUcEg1ONuS63LNZGyplF0lEdNbOl9mf8CaUH6fpD2T73p0Gh/KghERiJ8QDt7x92j8vhRrWSE1oQpjyIzTXmkorD3chx0j5pfCb5flPn1mLUI80Ryuv4PoIxupiNpZgUS0KTaXZzcixq+XSScatp2L4zGpCtg04loEa37XuwY4o/dfkiwHL6wHtBk1NldlQnA9NH0kAy0LOOO7E3cj4u7mZqzWeS3osGdg==~1; _HPVN=CS=eyJQbiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyNC0wNC0wNVQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjo2LCJUb2JuIjowfQ==; SRCHHPGUSR=SRCHLANG=id&IG=19F5C1888DD14780B8DB846DB42DD940&CW=501&CH=931&SCW=501&SCH=931&BRW=MW&BRH=MT&DPR=1.4&UTC=420&DM=1&PV=9.0.0&HV=1712320795&HBOPEN=2&PRVCW=501&PRVCH=974&CIBV=1.1655.1&cdxtone=Precise&cdxtoneopts=h3precise,clgalileo&cdxupdttm=638478923312722150",
        this.EOL = "";
        this.json = {
            arguments: [{
                source: "cib",
                optionsSets: [
                    "nlu_direct_response_filter",
                    "deepleo",
                    "disable_emoji_spoken_text",
                    "responsible_ai_policy_235",
                    "enablemm",
                    "galileo",
                    "dlwebtrunc",
                    "glpromptv3plus",
                    "serploc",
                    "jbf101",
                    "dv3sugg",
                ],
                allowedMessageTypes: [
                    "Chat",
                    "InternalSearchQuery",
                    "InternalSearchResult",
                    "Disengaged",
                    "InternalLoaderMessage",
                    "RenderCardRequest",
                    "AdsQuery",
                    "SemanticSerp",
                    "GenerateContentQuery",
                    "SearchQuery",
                ],
                sliceIds: [
                    "ssoverlap25",
                    "sspltop5",
                    "sswebtop2",
                    "chk1cln",
                    "fstldsydaoltt",
                    "nofbkcf",
                    "sugdivdis",
                    "sydpayajax",
                    "fixsacodecf",
                    "185fdbk",
                    "321sloc",
                    "324hlthmons0",
                    "403jbf101",
                    "notigersccf",
                    "udsdserlc",
                    "udstrclm10cmp",
                    "udstrclm10",
                    "329v3pwebtrunc",
                ],
                verbosity: "verbose",
                traceId: crypto.randomBytes(16).toString("hex"),
                isStartOfSession: true,
                message: {
                    locationHints: [],
                    author: "user",
                    inputMethod: "Keyboard",
                    text: null,
                    messageType: "Chat",
                },
                conversationSignature: null,
                participant: {
                    id: null,
                },
                conversationId: null,
            }, ],
            invocationId: "0",
            target: "chat",
            type: 4,
        };
    }

    async suggest(query) {
        try {
            const response = await got(
                "https://www.bingapis.com/api/v7/suggestions?appid=B1513F135D0D1D1FC36E8C31C30A31BB25E804D0&setmkt=fr-FR&q=" +
                encodeURIComponent(query), {
                    method: "GET",
                }
            ).json();
              return json.suggestionGroups[0].searchSuggestions.map(
                (suggestion) => suggestion.displayText
            );
        } catch (error) {
            console.log(chalk.red("Error in suggest method:", error));
            throw error;
        }
    }

    async createConversation() {
        try {
            const json = await got("https://www.bing.com/turing/conversation/chats?bundleVersion=1.1655.1", {
                method: "GET",
                headers: {
                    cookie: this.cookies,
                },
            }).json();
           // console.log(json)
            this.json.arguments[0].conversationSignature = json.chats[0].conversationSignature;
            this.json.arguments[0].participant.id = json.clientId;
            this.json.arguments[0].conversationId = json.chats[0].conversationId;
        } catch (error) {
            console.log(chalk.red("Error in createConversation method:", error));
            throw error;
        }
    }

    async sendMessage(msg) {
        try {
            return await new Promise((resolve, reject) => {
                this.json.arguments[0].message.text = msg;
                const chat = new WebSocket("wss://sydney.bing.com/sydney/ChatHub");
                chat.onopen = () => {
                    chat.send('{"protocol":"json","version":1}' + this.EOL);
                };
                chat.onmessage = (event) => {
                    const data = event.data;
                    const message = data.toString().split(this.EOL)[0];
                    const json = JSON.parse(message);
                    if (message == "{}") {
                        chat.send('{"type":6}' + this.EOL);
                        chat.send(JSON.stringify(this.json) + this.EOL);
                        this.json.invocationId = (
                            parseInt(this.json.invocationId) + 1
                        ).toString();
                        this.json.arguments[0].isStartOfSession = false;
                    }
                    if (json.type == 2) {
                        const response =
                            json.item.messages.filter(
                                (e) => e.messageType == "Chat"
                            ).reverse()[0] ||
                            json.item.messages.filter(
                                (e) =>
                                e.author == "bot" &&
                                e.adaptiveCards[0].body[0].type == "TextBlock"
                            ).reverse()[0];
                        chat.close();
                        resolve({
                            text: response.text.replace(/\[\^[0-9]\^\]/g, ""),
                            suggestions: (
                                response.suggestedResponses || {
                                    map: (cb) => undefined
                                }
                            ).map((e) => e.text),
                            card: (
                                json.item.messages.filter(
                                    (e) => e.messageType == "InternalSearchResult"
                                ).reverse()[0] || {}
                            ).groundingInfo,
                            spokenText: (
                                json.item.messages.filter(
                                    (e) => e.spokenText != undefined
                                ).reverse()[0] || {}
                            ).spokenText,
                        });
                    }
                };
            });
        } catch (error) {
            console.log(chalk.red("Error in sendMessage method:", error));
            throw error;
        }
    }
};

module.exports = BingChat