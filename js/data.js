/* =========================================================
 * data.js — 全站唯一内容数据源
 * ---------------------------------------------------------
 * 以后新增品牌 / 案例 / 图片 / 视频 / 链接，
 * 只需修改本文件，无需改动任何组件代码。
 *
 * 素材填写说明：
 *   - 图片：把文件放入 assets/images/，然后把 src 填为
 *       "assets/images/xxx.jpg"
 *   - 视频：把文件放入 assets/videos/，type 写 "video"，src 填路径；
 *       也可以直接填抖音/小红书等外链，type 写 "link"
 *   - 留空（""）时页面自动显示「待补充」占位，不会报错
 * ========================================================= */

const SITE_DATA = {

  /* ---------- 1. Profile Card（职业名片） ---------- */
  profile: {
    name: "苏紫琪",
    nameEn: "Suki",
    avatar: "assets/images/avatar-3x4.jpg",
    title: "内容营销｜达人合作｜媒介运营",
    tagline: "5年新媒体经验｜内容策略｜文案策划｜KOL/KOC达人投放",
    meta: [
      { label: "出生年月", value: "1999年06月" },
      { label: "现居地",   value: "深圳" }
    ],
    contacts: {
      email:  "suzq797@qq.com",
      wechat: "sututu797",
      resume: "resume/苏紫琪-简历-399e8e64.pdf"
    }
  },

  /* ---------- 2. 工作经历 ----------
   * intro        = 一段工作介绍（无标题）
   * achievements = 数据成果 Bullet List（无标题）
   */
  experience: [
    {
      company: "深圳乐创工场数字技术有限公司（乙方）",
      role: "内容策划主管",
      period: "2025.07 — 至今",
      tags: ["内容策略", "达人投放", "品牌种草", "项目统筹"],
      intro: "内容营销与达人投放项目（抖音、小红书）：围绕品牌传播目标与产品定位，负责内容策略、KOL/KOC达人投放及项目统筹；结合平台热点、传播数据与用户反馈持续优化内容方向，并通过爆款拆解与项目复盘沉淀可复用的方法论。",
      achievements: [
        "复方阿胶浆：项目累计曝光4161万+，项目平均 CPM ¥46.34、CPE ¥1.09。",
        "小青盒：项目累计曝光3500万+，项目平均 CPM ¥17.66、CPE ¥0.38。",
        "和兴白花油：抖音、小红书单月目标完成率均达200%。"
      ],
      highlightNums: true
    },
    {
      company: "广州医视信息科技有限公司（MCN）",
      role: "新媒体运营",
      period: "2024.04 — 2025.07",
      tags: ["账号孵化", "59万+ 抖音涨粉", "8万+ 小红书涨粉", "千万级内容播放"],
      intro: "负责运营“三甲医生妈妈吴实”“皮肤科林立教授”“皮肤科医生郑跃”等医生IP账号，参与选题策划、脚本创作、账号运营及品牌商单内容制作，打造多条高传播内容。",
      achievements: [
        "抖音累计涨粉59万+",
        "小红书累计涨粉8万+",
        "商单视频单条最高曝光1682万+"
      ],
      highlightNums: true
    },
    {
      company: "万物有翼科技有限公司（武志红心理团队）",
      role: "新媒体运营",
      period: "2023.08 — 2024.04",
      tags: ["IP矩阵运营", "10万+ 账号涨粉", "千万级内容播放"],
      intro: "负责武志红全平台IP矩阵账号运营及内容策划，推进抖音、小红书、视频号、B站等平台内容运营及跨平台传播，参与账号增长、新书宣传及品牌合作项目。",
      achievements: [
        "全平台账号累计涨粉10万+",
        "内容累计浏览量1000万+",
        "单条视频最高点赞29万+"
      ],
      highlightNums: true
    },
    {
      company: "泉州晚报社 · 泉州网",
      role: "编辑",
      period: "2021.07 — 2023.08",
      tags: ["政务新媒体", "专题策划", "活动策划"],
      intro: "负责“泉州应急”“泉州政务”等政务微信公众号内容运营，参与新闻采写、编辑排版、专题策划及政府宣传项目执行，持续输出政务新媒体内容。",
      achievements: [
        "政务公众号累计涨粉20万+",
        "内容累计阅读量100万+",
        "参与安全生产月、防灾减灾日等大型政务宣传项目"
      ],
      highlightNums: true
    }
  ],

  /* ---------- 3. 案例作品（核心模块） ----------
   * group   = 左侧分组导航（同名自动归为一组，组按首次出现顺序排列）
   * summary = 项目简介（一句话）
   * outcome = 项目介绍（展示标题已改为「项目介绍」，不含商业敏感数据）
   * duties  = 我的职责 Bullet List
   * media   = 代表案例（手机 Mockup 内容，缩略图切换）：
   *   { type: "image" | "video" | "link", label: "案例标题（可替换）", src: "", note: "" }
   *   src 为空 → 自动显示占位
   */
  cases: [
    /* ===== KOL投放｜产品种草营销 ===== */
    {
      id: "dongejiao",
      group: "KOL投放｜产品种草营销",
      brand: "东阿阿胶",
      summary: "服务东阿阿胶品牌内容营销项目，负责抖音/小红书平台的投放策略、KOL达人合作及传播复盘。",
      outcome: "负责复方阿胶浆抖音、视频号平台种草内容规划、达人选号、项目执行及复盘。",
      duties: [
        "制定品牌种草内容策略与达人合作策略",
        "协同媒介完成达人筛选、资源匹配及合作落地",
        "审核并优化内容大纲、脚本及视频成片",
        "统筹内容发布、评论区运营及搜索小蓝词维护",
        "结合飞瓜/千瓜/聚光等平台数据开展传播复盘与策略优化"
      ],
      media: [
        { type: "image", label: "中腰部达人高曝光", src: "assets/images/cases/dongejiao/gushi_juqing.cd997fae.webp", fallback: "assets/images/cases/dongejiao/gushi_juqing.cd997fae.jpg", thumb: "assets/images/cases/dongejiao/gushi_juqing.cd997fae.thumb.webp", link: "https://weixin.qq.com/sph/APwJjFyJj", overlay: { exposure: "1000w+", likes: "42.5w+", cpm: "¥9.12", cpe: "¥0.17" } },
        { type: "image", label: "头部达人低CPM", src: "assets/images/cases/dongejiao/houjieer.webp", fallback: "assets/images/cases/dongejiao/houjieer.db904576.jpg", thumb: "assets/images/cases/dongejiao/thumb_houjieer.webp", link: "https://www.douyin.com/video/7633334031933839793", overlay: { exposure: "510w+", likes: "19.6w+", cpm: "¥5.58", cpe: "¥0.15" } },
        { type: "image", label: "创意赛道高曝光", src: "assets/images/cases/dongejiao/dahua.webp", fallback: "assets/images/cases/dongejiao/dahua.78390c64.jpg", thumb: "assets/images/cases/dongejiao/thumb_dahua.webp", link: "https://www.douyin.com/video/7645152668595862257", overlay: { exposure: "90w+", likes: "4.6w+", cpm: "¥38.96", cpe: "¥0.75" } },
        { type: "image", label: "中腰部达人高转化", src: "assets/images/cases/dongejiao/liubuchiyao.webp", fallback: "assets/images/cases/dongejiao/liubuchiyao.b9d87ced.jpg", thumb: "assets/images/cases/dongejiao/thumb_liubuchiyao.webp", link: "https://www.douyin.com/video/7640008193548061979", overlay: { exposure: "80w+", likes: "2.8w+", cpm: "¥55.83", cpe: "¥1.39" } }
      ],
      /* ★ 新增「项目成效」模块；品牌营销/账号孵化等项目复用，见各 case.results */
      results: {
        metrics: [
          { label: "累计曝光量", value: "4161万+", main: true },
          { label: "平均 CPM", value: "¥46.34" },
          { label: "平均 CPE", value: "¥1.09" }
        ],
        summary: "投放期间搜索环比最高上涨18.64%",
        figure: {
          webp: "assets/images/cases/dongejiao/ajiao_sousuo_fenshu_900.webp",
          webpSmall: "assets/images/cases/dongejiao/ajiao_sousuo_fenshu_600.webp",
          sizes: "(max-width: 768px) 300px, 700px",
          fallback: "assets/images/cases/dongejiao/ajiao_sousuo_fenshu.png",
          alt: "阿胶浆搜索分涨幅",
          w: 900, h: 404
        }
      },
      /* 案例图片右上角数据浮层（按媒体项配置；兜底对象保留兼容） */
      screenOverlay: {
        exposure: "XX万",
        likes:    "XX万",
        cpm:      "XX元",
        cpe:      "XX元"
      }
    },
    {
      id: "xiaoqinghe",
      group: "KOL投放｜产品种草营销",
      brand: "小青盒",
      summary: "项目简介（待补充）。",
      outcome: "负责小青盒（玛舒拉沙韦片）抖音平台医学科普及达人种草策略制定、媒介选号、项目执行及复盘。",
      duties: ["内容策略制定", "达人合作", "内容审核", "项目推进"],
      media: [
        { type: "image", label: "低粉爆文", src: "assets/images/cases/xiaoqinghe/yishulaowei.webp", fallback: "assets/images/cases/xiaoqinghe/yishulaowei.eaacdc84.jpg", thumb: "assets/images/cases/xiaoqinghe/thumb_yishulaowei.webp", link: "https://v.douyin.com/sFpTN7mS5E0/", overlay: { exposure: "710w+", likes: "35.5w+", cpm: "¥2.53", cpe: "¥0.04" } },
        { type: "image", label: "中腰部爆款", src: "assets/images/cases/xiaoqinghe/ladeng.webp", fallback: "assets/images/cases/xiaoqinghe/ladeng.2fae8fdc.jpg", thumb: "assets/images/cases/xiaoqinghe/thumb_ladeng.webp", link: "https://v.douyin.com/l_4_Pu1TVp4/", overlay: { exposure: "200w+", likes: "4.1w+", cpm: "¥15.32", cpe: "¥0.51" } },
        { type: "image", label: "KOC爆文", src: "assets/images/cases/xiaoqinghe/yinningqi.webp", fallback: "assets/images/cases/xiaoqinghe/yinningqi.da94f343.jpg", thumb: "assets/images/cases/xiaoqinghe/thumb_yinningqi.webp", link: "https://v.douyin.com/3lLh-1RVvGc/", overlay: { exposure: "66w+", likes: "2.8w+", cpm: "¥43.12", cpe: "¥0.63" } }
      ],
      /* 新增「项目成效」模块（共用品牌营销版式） */
      results: {
        metrics: [
          { label: "累计曝光量", value: "3500万+", main: true },
          { label: "平均 CPM", value: "¥17.66" },
          { label: "平均 CPE", value: "¥0.38" }
        ],
        summary: "集中投放期间，搜索指数连续上涨，最高搜索分达1.6w",
        figure: {
          webp: "assets/images/cases/xiaoqinghe/xiaoqinghe_sousuo_zhishu_900.webp",
          webpSmall: "assets/images/cases/xiaoqinghe/xiaoqinghe_sousuo_zhishu_600.webp",
          sizes: "(max-width: 768px) 300px, 700px",
          fallback: "assets/images/cases/xiaoqinghe/xiaoqinghe_sousuo_zhishu.55f6d455.jpg",
          alt: "小青盒搜索指数涨幅",
          w: 900, h: 381
        }
      }
    },
    {
      id: "hexing",
      group: "KOL投放｜产品种草营销",
      brand: "和兴白花油",
      summary: "服务项目内容营销传播，围绕品牌调性与平台生态策划达人内容。",
      outcome: "负责和兴白花油抖音、小红书双平台种草内容规划、媒介选号、项目执行及复盘。",
      duties: ["内容策略制定", "达人合作", "内容审核", "传播复盘"],
      media: [
        { type: "image", label: "抖音·高曝光", src: "assets/images/cases/hexing/miea_douyin.webp", fallback: "assets/images/cases/hexing/miea_douyin.a3e3baae.jpg", thumb: "assets/images/cases/hexing/thumb_miea_douyin.webp", link: "" },
        { type: "image", label: "小红书·高曝光", src: "assets/images/cases/hexing/miea_xhs.webp", fallback: "assets/images/cases/hexing/miea_xhs.75733c08.jpg", thumb: "assets/images/cases/hexing/thumb_miea_xhs.webp", link: "" }
      ],
      /* 「项目成效」模块：双平台分开展示（曝光 / 成本 / 信息图） */
      results: {
        exposure: [
          { label: "抖音单条最高曝光", value: "778万+" },
          { label: "小红书单条最高阅读", value: "40万+" }
        ],
        cost: [
          { label: "抖音", items: [ { k: "CPM", v: "¥20.48" }, { k: "CPE", v: "¥0.53" } ] },
          { label: "小红书", items: [ { k: "单次阅读成本", v: "¥0.73" }, { k: "单次互动成本", v: "¥1.15" } ] }
        ],
        summary: "投放期间，抖音单月目标完成最高达200%，小红书单月目标完成最高达200%。",
        infoGraphic: {
          modules: [
            { title: "抖音", targetLabel: "单月目标播放", target: "500万", actualLabel: "单月实际播放", actual: "1000万", rateLabel: "完成率", rate: "200%" },
            { title: "小红书", targetLabel: "单月目标阅读", target: "20万", actualLabel: "单月实际阅读", actual: "40万", rateLabel: "完成率", rate: "200%" }
          ]
        }
      }
    },

    /* ===== 账号孵化运营 ===== */
    {
      id: "doctor-kol",
      group: "账号孵化运营",
      brand: "医生IP",
      category: "账号孵化运营",
      summary: "负责医生达人账号从 0 到 1 孵化运营，运营“三甲医生妈妈吴实”“皮肤科林立教授”“皮肤科医生郑跃”等抖音、小红书账号。",
      outcome: "负责运营“三甲医生妈妈吴实”“皮肤科林立教授”“皮肤科医生郑跃”等医生IP账号，打造多条爆款商单视频。",
      duties: [
        "账号定位与人设打造",
        "选题策划与脚本打磨",
        "协同医生完成内容共创",
        "数据分析与内容迭代",
        "医药品牌商单内容创作与交付"
      ],
      media: [
        { type: "image", label: "皮肤科医生郑跃", src: "assets/images/cases/doctor-kol/dk-zhengyue.d82590a7.webp",
            srcset: "assets/images/cases/doctor-kol/dk-zhengyue.d82590a7.sm.webp 320w, assets/images/cases/doctor-kol/dk-zhengyue.d82590a7.webp 480w",
            sizes: "(max-width: 768px) 200px, 238px",
            fallback: "assets/images/cases/doctor-kol/dk-zhengyue.d82590a7.jpg",
            thumb: "assets/images/cases/doctor-kol/dk-zhengyue.d82590a7.thumb.webp",
            lqip: "data:image/webp;base64,UklGRsIBAABXRUJQVlA4ILYBAAAQDQCdASogAEYAPzGIvFWuqKYjKbqradAmCUAYm7bGNvPJumc1xWj4CwMuKoRT829xx6u82I1d5F8+O7i2O9/Rn/82StIAL5/ps0/KrZ9g+vzfNzrNyRjHFoLEOm6kBywrfdVAhGrpsFmJ2l/Tsv/JgAD9fIxEBs9hQ06HVaR7FHnW7EeXW+QG3+a0HEvZs2bdL2uP6sUQ/LcPMdahyh2ijkzQyPLwkg3ALCGA8hj6H6y0Y8j/IMZ+kQZTALxjqligFULehWH+SBktJxRpSbV1sf7aucZYdHRjgLZHDhp0hs9P7ZTB7SyijN5K++z9X2/klF6N+/fS4GM8K9mP6qRQGZZJNWG06EqsGNoDhWDW81AKPerCZ/+KU0gzjxIZK/HzwQRXpA3hgksurOdbvCbHVfehCDSuV6dvbkPB+wELEtHtkQQQmmnul79j1mnT+sH7K87+1qoGZjthEqVmb1pitZllv4BrnETCtU/ehIiUqRIWLu/pajVP4VFzhPj2/3JTlVtBJ7R29uP4fYlUCs2G7ZiqTZPflaOIyBYpUgiOjFZoc9+L50eRQ4CwIOuurQzbAaAAAAA=", link: "https://xhslink.cn/m/1gGH428XnTI" },
        { type: "image", label: "三甲医生妈妈吴实", src: "assets/images/cases/doctor-kol/dk-wushi.8e67e4b1.webp",
            srcset: "assets/images/cases/doctor-kol/dk-wushi.8e67e4b1.sm.webp 320w, assets/images/cases/doctor-kol/dk-wushi.8e67e4b1.webp 480w",
            sizes: "(max-width: 768px) 200px, 238px",
            fallback: "assets/images/cases/doctor-kol/dk-wushi.8e67e4b1.jpg",
            thumb: "assets/images/cases/doctor-kol/dk-wushi.8e67e4b1.thumb.webp",
            lqip: "data:image/webp;base64,UklGRhACAABXRUJQVlA4IAQCAAAQDgCdASogAEMAPy2CtFKuqSUisBmcydAliWwAudIS5B6F7+ARjF2I6E7M5dYPQRLrsf5ApHSkBxzZYixu+fG3sNuTGZniMXZgb0aXuMZDEtUDtjoumGoL8y0KaDK6f7uw9mf3LM6cu/41kFtvpCZtjSoYf9uWB5kIAP6yH7Z35DsNrkf3YmbCPiOWRG6z6nnak/J7uMNKNyrWXbQtvA7U7NfmXHXM8a+6Hf5GH2rRnZuh32VNx4ipiNITvenPTyAVpi5bwf6oEPpXmD4JWLvRfwF3ksjUWVybBwHKXwjTVhqkCL+YCEqK5zARByz+kOGGxvpaa1Nj6EcAenhrjeGFhbAAuYbn4Msuq3ayoe5ynkCONaOpTCL+P/JEwWYMFuFdXtS8wWkRSZdIjFrrFj530IrQnRNfSNIGPI+r7w67V0sLixOLkZpaFXeFyNxtNzPw5+QTZhlB1EL7FAeQALKjT1cDLn4ZNKQGq4Hjn+WH6gKHAA3UH7CCWYr9cOh8Z3OAhBbOESG64Zw8FQuem6/rsjXkSkBDBSs20STEI1wGgqRIXQ54E3BbXThbQbZ4LR1qYxCUaPtHnkaFuQvd08tr0CDqDjOR8iu//1tlb+X4I8IUpqPC0738DStOmw8BsQSQBOoqanlad9s/BrrX6m59LLxW3NbFLp/Ii68KqPIuvCpYAAA=", link: "https://v.douyin.com/OIwEPXLxVUI/" },
        { type: "image", label: "爆款商单案例", src: "assets/images/cases/doctor-kol/dk-baokuan.10ef0fe8.webp",
            srcset: "assets/images/cases/doctor-kol/dk-baokuan.10ef0fe8.sm.webp 320w, assets/images/cases/doctor-kol/dk-baokuan.10ef0fe8.webp 480w",
            sizes: "(max-width: 768px) 200px, 238px",
            fallback: "assets/images/cases/doctor-kol/dk-baokuan.10ef0fe8.jpg",
            thumb: "assets/images/cases/doctor-kol/dk-baokuan.10ef0fe8.thumb.webp",
            lqip: "data:image/webp;base64,UklGRoIBAABXRUJQVlA4IHYBAACwDACdASogAEYAPyV8tlKuJ6UitnbaqcAkiWwAvRQ0zUBnUuXUf165vpuxCfkw8O0IY6rGv9lxUgQTRyB/tZKLzfIWLsJpIhFVlMftdVdiP7JvGYWLbU7DyZNLGewG4nOK97cit/JqvewLWYL3wADQO3r5gRgLxF1zQRAFBZNHVeLAT938qh/LMIbIS6SbcbWEt+3bT3ZeGFT8V8X5Q/gZEdRJ/0ZSy9AP2tL4wkPLmE9h+pc+6kw/P/7LI1AJys0ZCQPwYnzH37HtYN2Mz6MY7D1cZ7O5kgajWSjcOQjrAzGA5BlMG7duEfCNpi9fMQFQN8vDyqzBIOnn3zjpqOm6dAxpvLKfJlIKkKVERzx644WKtK18QBNGwrZGUu3H27OrvyYCn7oYL9JjUndNCu81oR3DLa50lF67po3TUxV/DlgrqAaS0P2oZhJlKnIfuwEEfXVtoMrmWlMJNz0GSuZiZ/1BkmhNyrEe1HBDrKWO6ShNKgAAAA==",
            overlay: { rows: [ { k: "播放量", v: "1682万+" }, { k: "互动量", v: "32.8万+" } ] },
            link: "https://v.douyin.com/pPAf4fPMKWk/" }
      ],
      /* 医生IP成果展示；仅三张数据卡，无图区/趋势 */
      results: {
        mode: "doctor",
        metrics: [
          { label: "累计抖音涨粉",   value: "59万+" },
          { label: "累计小红书涨粉", value: "8万+" },
          { label: "单条视频最高播放量", value: "1682万+" }
        ]
      }
    },
    {
      id: "wuzhihong",
      layout: "matrix",
      group: "账号孵化运营",
      brand: "「武志红」IP运营",
      category: "心理学｜矩阵运营",
      summary: "负责武志红全平台 IP 矩阵账号运营，参与头部心理学 IP 的日常内容策划与重点项目脚本创作。",
      outcome: "负责武志红全平台 IP 矩阵账号运营及内容策划，推进跨平台传播及联动合作。",
      duties: [
        "IP矩阵账号日常运营",
        "内容选题策划与短视频策划",
        "重点项目脚本创作，包括《深度关系》新书宣传及《鲁豫有约一日行》《全嘻嘻》等合作项目"
      ],
      matrix: [
        { platform: "抖音",   media: { type: "image", label: "武志红抖音主页", src: "assets/images/cases/wuzhihong/wuzhihong_douyin.webp", fallback: "assets/images/cases/wuzhihong/wuzhihong_douyin.aa233247.jpg", thumb: "assets/images/cases/wuzhihong/thumb_wuzhihong_douyin.webp", link: "https://v.douyin.com/Qt6ZR5lJ5G8/" } },
        { platform: "小红书", media: { type: "image", label: "小红书代表案例", src: "assets/images/cases/wuzhihong/wuzhihong_xiaohongshu.webp", fallback: "assets/images/cases/wuzhihong/wuzhihong_xiaohongshu.718ecc4a.jpg", link: "https://xhslink.cn/m/3Ydc9B9fkOz" } },
        { platform: "视频号", media: { type: "image", label: "视频号代表案例", src: "assets/images/cases/wuzhihong/wuzhihong_shipinhao.webp", fallback: "assets/images/cases/wuzhihong/wuzhihong_shipinhao.f8d664cb.jpg", link: "" } },
        { platform: "B站",    media: { type: "image", label: "B站代表案例", src: "assets/images/cases/wuzhihong/wuzhihong_bilibili.webp", fallback: "assets/images/cases/wuzhihong/wuzhihong_bilibili.a7e5cb00.jpg", link: "https://b23.tv/f52nIzc" } }
      ],
      media: [
        { type: "image", label: "武志红抖音主页", src: "assets/images/cases/wuzhihong/wuzhihong_douyin.webp", fallback: "assets/images/cases/wuzhihong/wuzhihong_douyin.aa233247.jpg", thumb: "assets/images/cases/wuzhihong/thumb_wuzhihong_douyin.webp", link: "https://v.douyin.com/Qt6ZR5lJ5G8/" }
      ]
    },

    /* ===== 活动策划 ===== */
    {
      id: "aonuo",
      group: "活动策划",
      brand: "三九✖️澳诺成长加油站",
      category: "动销活动策划",
      layout: "event",
      summary: "项目简介（待补充）。",
      outcome: "负责「三九✖️澳诺成长加油站」长沙专场整合传播规划、项目推进及传播物料制作，保障活动顺利落地。",
      duties: ["活动策划", "内容执行", "项目推进", "活动复盘"],
      /* 活动策划详情：传播规划 / 传播物料 / 活动现场 */
      event: {
        plan: [
          { src: "assets/images/cases/aonuo/chuanbo_guihua_1.webp", webpSmall: "assets/images/cases/aonuo/chuanbo_guihua_1_600.webp", fallback: "assets/images/cases/aonuo/chuanbo_guihua_1.3531b29d.jpg", w: 760, h: 428, alt: "传播节奏规划图 1", sizes: "(max-width: 768px) 290px, 400px" },
          { src: "assets/images/cases/aonuo/chuanbo_guihua_2.webp", webpSmall: "assets/images/cases/aonuo/chuanbo_guihua_2_600.webp", fallback: "assets/images/cases/aonuo/chuanbo_guihua_2.b01425ec.jpg", w: 760, h: 428, alt: "传播节奏规划图 2", sizes: "(max-width: 768px) 290px, 400px" }
        ],
        materials: [
          { src: "assets/images/cases/aonuo/chuanbo_wuliao_1.webp", fallback: "assets/images/cases/aonuo/chuanbo_wuliao_1.823c5768.jpg", w: 600, h: 800, alt: "传播物料 1" },
          { src: "assets/images/cases/aonuo/chuanbo_wuliao_2.webp", fallback: "assets/images/cases/aonuo/chuanbo_wuliao_2.9f8f3475.jpg", w: 600, h: 800, alt: "传播物料 2" }
        ],
        site: { src: "assets/images/cases/aonuo/huodong_xianchang.webp", webpSmall: "assets/images/cases/aonuo/huodong_xianchang_600.webp", fallback: "assets/images/cases/aonuo/huodong_xianchang.jpg", w: 740, h: 555, alt: "活动现场", sizes: "(max-width: 768px) 290px, 400px" }
      },
      media: [
        { type: "image", label: "三九✖️澳诺成长加油站", src: "assets/images/cases/aonuo/aonuo.webp", fallback: "assets/images/cases/aonuo/aonuo.ec9b32df.jpg", thumb: "assets/images/cases/aonuo/thumb_aonuo.webp", link: "https://mp.weixin.qq.com/s/VMn0EjfORzYN9mOPR0GxoQ" }
      ]
    }
  ],

  /* ---------- 4. 专业能力（Capsule Tag，可继续追加） ---------- */
  skills: [
    {
      group: "核心能力",
      items: ["内容策略", "达人合作", "媒介运营", "数据分析与复盘"]
    },
    {
      group: "工具",
      items: ["飞瓜", "千瓜", "聚光", "Office", "剪映", "Final Cut Pro", "PR"]
    },
    {
      group: "AI 工作流",
      items: ["ChatGPT", "Claude", "Codex", "WorkBuddy", "DeepSeek"]
    }
  ]
};
