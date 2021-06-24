// pages/video/video.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupInfo: [], //videoGroup信息
    navId: "", //导航标识
    videoInfo: [], // video信息
    videoId: "", // videoId
    videoRecordInfo: [],// 记录每个视频播放的时长
    isTriggered: false, //下拉刷新是否开启
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取导航数据
    this.getVideoGroupList();
  },

  async getVideoGroupList() {
    let res = await request("/video/group/list");
    this.setData({
      videoGroupInfo: res.data.slice(0, 14),
      navId: res.data[0].id
    });
    //获取导航对应的video数据
    this.getVideoList(this.data.navId);
  },

  async getVideoList(groupId) {
    let res = await request("/video/group", {"id": groupId});
    //获取到视频数据后,关闭消息提示框
    wx.hideLoading();

    let index = 0;
    this.setData({
      //关闭下拉刷新
      isTriggered: false,
      videoInfo: res.datas.map(item => {
        item.id = index++;
        return item;
      })
    })
  },

  changeNav(event) {
    //let id = event.currentTarget.id;//通过id向event传参的时候如果传的是number会自动转换成string
    let navId = event.currentTarget.dataset.id;//通过data-id向event传参的时候不会自动转数据类型
    this.setData({
      //navId: id*1,//再转成number || id >>> 0 右移0位
      navId: navId,
      videoInfo: [],
    })

    //显示正在加载
    wx.showLoading({
      title: "正在加载..."
    })
    //动态获取导航对应的video
    this.getVideoList(this.data.navId);
  },

  //下拉刷新被触发 scroll-view
  handleRefreshRefresh(event) {
    //再次请求数据
    this.getVideoList(this.data.navId);

  },

  //上拉触底的回调 scroll-view
  handleToLower() {
    // 暂无
    // 获取更多数据,也就是分页效果: 1.后端分页;2前端分页
    // 做个假数据,把原数据追加到后面
    let newVideoList = [
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_7A6C6E9D7EF1407C94E02755B2614EE6",
          "coverUrl": "https://p2.music.126.net/GnGnHdK-L36ySBaNNZG7sw==/109951163570543741.jpg",
          "height": 540,
          "width": 954,
          "title": "十大中文金曲《烈焰红唇》梅艳芳 天啊这二米三的大长腿",
          "description": null,
          "commentCount": 612,
          "shareCount": 734,
          "resolutions": [
            {
              "resolution": 240,
              "size": 30097646
            },
            {
              "resolution": 480,
              "size": 48905897
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 460000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/1dR9Soabgjjx-TIBff2q4w==/109951163704390643.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 460100,
            "birthday": 936291259695,
            "userId": 356777456,
            "userType": 204,
            "nickname": "港圈王祖贤",
            "signature": "伤春悲秋 念旧",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163704390640,
            "backgroundImgId": 109951164462718380,
            "backgroundUrl": "http://p1.music.126.net/mdCPrs2bt4ZSONYRRZ7CnQ==/109951164462718384.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "生活图文达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951163704390643",
            "backgroundImgIdStr": "109951164462718384"
          },
          "urlInfo": {
            "id": "7A6C6E9D7EF1407C94E02755B2614EE6",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/wWqCg9cp_1999317042_hd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=mJfLzsLRsxNHaBkqRXintovXXHvMnyAa&sign=b0ea672aa724b886f753c6fdc33b8058&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 48905897,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 480
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57105,
              "name": "粤语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "烈焰红唇",
              "id": 120869,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 8918,
                  "name": "梅艳芳",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 95,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 12,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 11712,
                "name": "伦流转",
                "picUrl": "http://p3.music.126.net/ZIbeXiOtNwVLc8ogYx38rw==/17985811207419794.jpg",
                "tns": [],
                "pic_str": "17985811207419794",
                "pic": 17985811207419794
              },
              "dt": 227400,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 9099015,
                "vd": -54627
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5459426,
                "vd": -52078
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3639632,
                "vd": -50636
              },
              "a": null,
              "cd": "2",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "mst": 9,
              "cp": 7003,
              "mv": 0,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1143820800000,
              "privilege": {
                "id": 120869,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "7A6C6E9D7EF1407C94E02755B2614EE6",
          "durationms": 341426,
          "playTime": 1290437,
          "praisedCount": 4794,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_EC2A6EF08A35FBD0985B3EF864B299BB",
          "coverUrl": "https://p2.music.126.net/QNSuvuFvtxpjvyGJQTQRLQ==/109951164981161255.jpg",
          "height": 720,
          "width": 1280,
          "title": "二手玫瑰 如你所愿",
          "description": null,
          "commentCount": 447,
          "shareCount": 1008,
          "resolutions": [
            {
              "resolution": 240,
              "size": 16885950
            },
            {
              "resolution": 480,
              "size": 28668655
            },
            {
              "resolution": 720,
              "size": 40540850
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/A8G3tiZX3XtD5W0qCLQT6w==/109951165041288276.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 110105,
            "birthday": -2209017600000,
            "userId": 37067957,
            "userType": 204,
            "nickname": "C大调的姑娘",
            "signature": "ROCK GIRL🤘🏼",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165041288270,
            "backgroundImgId": 109951165942328300,
            "backgroundUrl": "http://p1.music.126.net/pCYxiHSUMBpr2vrOKYXVKA==/109951165942328307.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165041288276",
            "backgroundImgIdStr": "109951165942328307"
          },
          "urlInfo": {
            "id": "EC2A6EF08A35FBD0985B3EF864B299BB",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/UJ1j298X_2997528285_shd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=SAjHgKzFCzbsToiaLYZicjQnEwblfWpx&sign=efdde2652528cdecc689457dbcd8d6dc&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 40540850,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "EC2A6EF08A35FBD0985B3EF864B299BB",
          "durationms": 133000,
          "playTime": 1158310,
          "praisedCount": 4056,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_EB006B4952286B0182C56B0B9964B5B3",
          "coverUrl": "https://p2.music.126.net/zc6xdJYGzKVQMWzgMBRxaA==/109951164186357210.jpg",
          "height": 720,
          "width": 1280,
          "title": "这可能就是种族天赋吧……",
          "description": null,
          "commentCount": 196,
          "shareCount": 152,
          "resolutions": [
            {
              "resolution": 240,
              "size": 10244109
            },
            {
              "resolution": 480,
              "size": 16205432
            },
            {
              "resolution": 720,
              "size": 22837897
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 320000,
            "authStatus": 1,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/ehZVThg1aa7qbM7Y6CTi3g==/109951163233342369.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 320400,
            "birthday": 944668800000,
            "userId": 1360942256,
            "userType": 4,
            "nickname": "Melohxx",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163233342370,
            "backgroundImgId": 109951164294098340,
            "backgroundUrl": "http://p1.music.126.net/bUBIxLwDYkVDMa-mUPFtlQ==/109951164294098331.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951163233342369",
            "backgroundImgIdStr": "109951164294098331"
          },
          "urlInfo": {
            "id": "EB006B4952286B0182C56B0B9964B5B3",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/tVXw4zwR_2571625094_shd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=pgSaQqqxhPCIJRNZZqkalEWIFOwBDLAr&sign=13e6249677e3da9f1ab34ba8fba4d264&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 22837897,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 4101,
              "name": "娱乐",
              "alg": null
            },
            {
              "id": 3101,
              "name": "综艺",
              "alg": null
            },
            {
              "id": 75122,
              "name": "欧美综艺",
              "alg": null
            },
            {
              "id": 76108,
              "name": "综艺片段",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "Roses",
              "id": 27902568,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 673004,
                  "name": "James Arthur",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 25,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 17,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 2692169,
                "name": "James Arthur",
                "picUrl": "http://p4.music.126.net/ximjL73_YYnNciSVJMkWjA==/109951165968576422.jpg",
                "tns": [],
                "pic_str": "109951165968576422",
                "pic": 109951165968576420
              },
              "dt": 254328,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 10174215,
                "vd": -41961
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6104546,
                "vd": -39402
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4069712,
                "vd": -37646
              },
              "a": null,
              "cd": "1",
              "no": 7,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "mst": 9,
              "cp": 7001,
              "mv": 0,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1383494400000,
              "privilege": {
                "id": 27902568,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 320000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "EB006B4952286B0182C56B0B9964B5B3",
          "durationms": 100000,
          "playTime": 726863,
          "praisedCount": 2421,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_6C79A6839B7F8B8FEEED73C9587B0869",
          "coverUrl": "https://p2.music.126.net/5LVsKqJvkm6f8kfUGCV-7Q==/109951163571930862.jpg",
          "height": 480,
          "width": 854,
          "title": "演唱会上母女同台，妈唱女儿的歌，女儿给妈和声！美翻",
          "description": "2016年12月31日王菲上海幻乐一场演唱会母女同台献唱《the way（童殿）》[亲亲]",
          "commentCount": 2515,
          "shareCount": 7756,
          "resolutions": [
            {
              "resolution": 240,
              "size": 15437998
            },
            {
              "resolution": 480,
              "size": 40255815
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 430000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/HEN81NLzZxAuQMVgUepcIQ==/109951165481032499.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 430100,
            "birthday": 693244800000,
            "userId": 16129526,
            "userType": 0,
            "nickname": "屁味香烟",
            "signature": "我很俗 ！\n公😇众😂号/屁味香烟",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165481032500,
            "backgroundImgId": 109951165481018340,
            "backgroundUrl": "http://p1.music.126.net/UhpA5JFsSN2WJGy_X_tApw==/109951165481018337.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951165481032499",
            "backgroundImgIdStr": "109951165481018337"
          },
          "urlInfo": {
            "id": "6C79A6839B7F8B8FEEED73C9587B0869",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/75f31304ea02f99037f2e72f08443332.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=YKukrGbxeSaLuywGgPaipgKTsLCFXlyk&sign=65062ce44540399dda4a7bffbf8b517d&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 40255815,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 480
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": [
            109
          ],
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "6C79A6839B7F8B8FEEED73C9587B0869",
          "durationms": 259000,
          "playTime": 2463302581,
          "praisedCount": 32254,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_C5B8699EBF70B139B702841EA41E7C4B",
          "coverUrl": "https://p2.music.126.net/xoZYYbK8NM-gAEPETAZ0QQ==/109951163805843824.jpg",
          "height": 720,
          "width": 1284,
          "title": "前奏响起的那一刻，彻底泪目了！陪伴了多少人的青春！",
          "description": "前奏响起的那一刻，彻底泪目了！这首歌陪伴了多少人的青春！",
          "commentCount": 4599,
          "shareCount": 7779,
          "resolutions": [
            {
              "resolution": 240,
              "size": 28107136
            },
            {
              "resolution": 480,
              "size": 46696881
            },
            {
              "resolution": 720,
              "size": 66138341
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/VPGeeVnQ0jLp4hK9kj0EPg==/18897306347016806.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 1002400,
            "birthday": -2209017600000,
            "userId": 449979212,
            "userType": 202,
            "nickname": "全球潮音乐",
            "signature": "有时候音乐是陪我熬过那些夜晚的唯一朋友。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18897306347016810,
            "backgroundImgId": 18987466300481468,
            "backgroundUrl": "http://p1.music.126.net/qx6U5-1LCeMT9t7RLV7r1A==/18987466300481468.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "华语音乐|欧美音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "18897306347016806",
            "backgroundImgIdStr": "18987466300481468"
          },
          "urlInfo": {
            "id": "C5B8699EBF70B139B702841EA41E7C4B",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/qEQ9DHFY_2265301626_shd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=TwhblQsvvFUBcfltkstoWdxYtvYrFTGJ&sign=60f4b69901ff8cc1ad133029eb21c102&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 66138341,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 9102,
              "name": "演唱会",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "不得不爱",
              "id": 139764,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 4723,
                  "name": "潘玮柏",
                  "tns": [],
                  "alias": []
                },
                {
                  "id": 9939,
                  "name": "弦子",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 40,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 13933,
                "name": "高手",
                "picUrl": "http://p4.music.126.net/INvCpYVCXacWAKuW83wPkQ==/109951165547357444.jpg",
                "tns": [],
                "pic_str": "109951165547357444",
                "pic": 109951165547357440
              },
              "dt": 279413,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 11179407,
                "vd": -42374
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6707662,
                "vd": -39781
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4471789,
                "vd": -38074
              },
              "a": null,
              "cd": "1",
              "no": 2,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 2,
              "s_id": 0,
              "mst": 9,
              "cp": 7003,
              "mv": 14286679,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1120147200000,
              "privilege": {
                "id": 139764,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "C5B8699EBF70B139B702841EA41E7C4B",
          "durationms": 250521,
          "playTime": 16138417,
          "praisedCount": 87808,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_88D5892D7923A5295BDEBDEB2A44E70E",
          "coverUrl": "https://p2.music.126.net/93PLd_mQnWjdzYP0j2i80w==/109951165128130597.jpg",
          "height": 1080,
          "width": 1920,
          "title": "南韩第一腿精不是盖的，这腿谁受得了？宣美Heroine live现场版",
          "description": "南韩第一腿精，这腿谁受得了？宣美KPOP TV秀Heroine live现场版",
          "commentCount": 71,
          "shareCount": 58,
          "resolutions": [
            {
              "resolution": 240,
              "size": 51796867
            },
            {
              "resolution": 480,
              "size": 90858214
            },
            {
              "resolution": 720,
              "size": 142060866
            },
            {
              "resolution": 1080,
              "size": 264573032
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 440000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/4tDSuCIVZXkyMn3hZEm95w==/109951165671611705.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 440300,
            "birthday": 1617811200000,
            "userId": 327898485,
            "userType": 0,
            "nickname": "请给我糖果",
            "signature": "官方说我搬运，被封杀了，对不起朋友们，要停搬了。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165671611710,
            "backgroundImgId": 2002210674180203,
            "backgroundUrl": "http://p1.music.126.net/bmA_ablsXpq3Tk9HlEg9sA==/2002210674180203.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165671611705",
            "backgroundImgIdStr": "2002210674180203"
          },
          "urlInfo": {
            "id": "88D5892D7923A5295BDEBDEB2A44E70E",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/2Qa5cBHQ_3054883130_uhd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=hBNIlozAEdrhPaAsTKnxFbaVVtGoeXho&sign=73daea7fbc5b22ddd4ec2c3fa5bb05f2&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 264573032,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 58101,
              "name": "听BGM",
              "alg": null
            },
            {
              "id": 1000,
              "name": "MV",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 84105,
              "name": "宣美",
              "alg": null
            },
            {
              "id": 23116,
              "name": "音乐推荐",
              "alg": null
            },
            {
              "id": 25137,
              "name": "音乐资讯",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "88D5892D7923A5295BDEBDEB2A44E70E",
          "durationms": 191008,
          "playTime": 207107,
          "praisedCount": 766,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_E07D386DAD15E32C7552B9463B0C2D72",
          "coverUrl": "https://p2.music.126.net/tf32TriBawbFUIb-kMtK7w==/109951163722384579.jpg",
          "height": 720,
          "width": 1280,
          "title": "邓紫棋现场翻唱beyond经典之作《喜欢你》",
          "description": "#云村视频有奖征稿#邓紫棋现场翻唱beyond经典之作《喜欢你》",
          "commentCount": 820,
          "shareCount": 2200,
          "resolutions": [
            {
              "resolution": 240,
              "size": 28788761
            },
            {
              "resolution": 480,
              "size": 48555557
            },
            {
              "resolution": 720,
              "size": 79648925
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 430000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/w__xNHU-MTxsSPzzJ2he8w==/109951163849259629.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 431000,
            "birthday": 938880000000,
            "userId": 1306359765,
            "userType": 0,
            "nickname": "柯南是洗衣机",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163849259630,
            "backgroundImgId": 109951163849256900,
            "backgroundUrl": "http://p1.music.126.net/NjfcQCPFmG4Rtgys7aBktg==/109951163849256904.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951163849259629",
            "backgroundImgIdStr": "109951163849256904"
          },
          "urlInfo": {
            "id": "E07D386DAD15E32C7552B9463B0C2D72",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/0uHOJbFH_2184920996_shd.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=pdoyGkvHEGysMEQbPCeUtysyfTHhMhNY&sign=b444fd93bd32ff58c35b0b802df07827&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 79648925,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57105,
              "name": "粤语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 16233,
              "name": "G.E.M.邓紫棋",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": [
            101
          ],
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "E07D386DAD15E32C7552B9463B0C2D72",
          "durationms": 248288,
          "playTime": 1996544,
          "praisedCount": 11853,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_11B4EDF878959651265F24BD430328A8",
          "coverUrl": "https://p2.music.126.net/effdRe5iX35XTjphKbMDxQ==/109951163572742978.jpg",
          "height": 1080,
          "width": 1920,
          "title": "让一首《加州旅馆》告诉你，老鹰乐队墨尔本告别演唱会有多经典",
          "description": "《加州旅馆》（Hotel California）是美国著名乡村摇滚乐队老鹰乐队（Eagles）的歌曲，由乐队鼓手Don Henley担任主唱，单曲发行于1977年2月22日，收录在乐队第五张录音室同名专辑《加州旅馆》中。",
          "commentCount": 3549,
          "shareCount": 27372,
          "resolutions": [
            {
              "resolution": 240,
              "size": 23602676
            },
            {
              "resolution": 480,
              "size": 50411609
            },
            {
              "resolution": 720,
              "size": 85397389
            },
            {
              "resolution": 1080,
              "size": 209726307
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 430000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/uEINwsYm7ypsvRYt5kt8tA==/109951163076614388.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 430700,
            "birthday": -2209017600000,
            "userId": 290223760,
            "userType": 0,
            "nickname": "停车坐爱枫林晚_-",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163076614380,
            "backgroundImgId": 109951163377134420,
            "backgroundUrl": "http://p1.music.126.net/zwDIqJCcjeyuTwqGZpOWlw==/109951163377134411.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951163076614388",
            "backgroundImgIdStr": "109951163377134411"
          },
          "urlInfo": {
            "id": "11B4EDF878959651265F24BD430328A8",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/36bc4e4d99c8e25a6ec9660368189154.mp4?ts=1624328485&rid=61DFB40B72793FD8B73D2CA51644A250&rl=3&rs=IUJlzBYKQDRGyYzpykzyEzqTrRusjwYq&sign=d43627015726a133c927c3d4636af3bf&ext=pucKQINn%2F5%2F1rTgBKgM3L7HeFz9%2BsRY%2BpMev1VIP50za1IvcAkhd3tZFTMKPvvhB%2FmaS9NUbzPBPJabq3F8U2jMHRK6t0W94%2FylQ%2FU%2BOysGPU92n0CivbFeF%2BP4fx5LB1t1WakdvVt%2FfTMc%2B41ypQFS2fjKqTFREoLhS2EPmAT%2BG5KvSs0Yayve2F5KRK5ORpnjeRWX7p01KNUtdKYaZO%2Bu2OJA1NMlLjy7SUI46Ts%2B1DY05xqHks6RrJgnyZ5DP",
            "size": 209726307,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 4105,
              "name": "摇滚",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 16131,
              "name": "英文",
              "alg": null
            },
            {
              "id": 24134,
              "name": "弹唱",
              "alg": null
            },
            {
              "id": 14137,
              "name": "感动",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "11B4EDF878959651265F24BD430328A8",
          "durationms": 519147,
          "playTime": 6452774,
          "praisedCount": 51187,
          "praised": false,
          "subscribed": false
        }
      }
    ];
    let {videoInfo} = this.data;
    videoInfo.push(...newVideoList);
    this.setData({
      videoInfo
    })
  },

  //视频播放处理:解决多个视频同时播放的问题
  handlePlay(event) {
    let vid = event.currentTarget.id;
    /**
     * 1.第一次this.videoId !== videoId不成立=>this.videoId = videoId;
     *                                       this.videoContext = wx.createVideoContext(videoId);
     * 2.第二次
     *    1.第二次点的同一个视频:this.videoId !== videoId不成立,继续执行
     *    2.第二次点的不同视频:停掉上一个
     * this.videoId !== videoId作用: 判断两次点击视频不一样
     */
    //this.vid !== vid && this.videoContext && this.videoContext.stop();
    //将videoId做成全局属性
    //this.vid = vid;
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid);
    /**
     * 判断当前视频是否有播放记录, 有则跳转,无则从头播放
     */
    let {videoRecordInfo} = this.data;
    let videoRecord = videoRecordInfo.find(item => item.vid === vid);
    if (videoRecord) {
      this.videoContext.seek(videoRecord.currentTime);
    } else {
      //这里有一个在模拟器中切换视频不自动播放的问题
      this.videoContext.play();
    }
  },

  //视频暂停处理
  handlePause(event) {
    //console.log(event);
  },

  //视频进度变化时触发
  handleTimeUpdate(event) {
    let timeUpdateObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}
    let {videoRecordInfo} = this.data;
    /**
     * 先判断当前的videoRecord数组中有没有与timeUpdateObj对象vid相同的对象
     *    1.有:则修改原对象
     *    2.没有则插入
     */
    let videoRecord = videoRecordInfo.find(item => item.vid === timeUpdateObj.vid);
    if (videoRecord) {
      videoRecord.currentTime = timeUpdateObj.currentTime;
    } else {
      videoRecordInfo.push(timeUpdateObj);
    }
    this.setData({
      videoRecordInfo
    })
  },

  //视频结束触发事件
  handleEnded(event) {
    let {videoRecordInfo} = this.data;
    videoRecordInfo.splice(videoRecordInfo.findIndex(item => item.vid === event.currentTarget.vid), 1);

    //videoRecordInfo.pop(videoRecord); pop()是去数组最后一个元素
    this.setData({
      videoRecordInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //要在json文件中配置 enablePullDownRefresh
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from}) {
    //该事件不写,页面则没有分享按钮
    console.log(from);
    return {
      title: "自定义转发内容",
      page: "/pages/video/video",
      imageUrl: "/static/images/1.JPG"
    }
  }
})