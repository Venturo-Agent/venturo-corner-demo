/**
 * 4 條共用 mock 行程、12 個 demo 用同一批資料、視覺不同。
 * 內容飽滿、不是 lorem ipsum、要呈現「真的旅行社網站」質感。
 */

export type Meal = {
  type: '早餐' | '午餐' | '晚餐';
  name: string;
  description: string;
  highlight?: string;
};

export type Hotel = {
  name: string;
  level: '五星' | '精品' | '溫泉' | '渡假村' | '城市精品' | '頂級奢華';
  description: string;
  features: string[];
};

export type Activity = {
  time: string;
  name: string;
  description: string;
  duration: string;
  highlight?: string;
};

export type ItineraryDay = {
  day: number;
  city: string;
  title: string;
  summary: string;
  activities: Activity[];
  meals: Meal[];
  hotel: Hotel;
};

export type Tour = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  priceFrom: number;
  currency: 'TWD';
  category: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  heroImage: string;
  galleryImages: string[];
  features: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  departureDates: string[];
  groupSize: { min: number; max: number };
  tagline: string;
  story: string;
};

export const tours: Tour[] = [
  {
    id: 'kyoto-bunyei',
    slug: 'kyoto-bunyei',
    title: '京都文藝六日',
    subtitle: '寺院、茶道、和菓子，與千年京都對話',
    destination: '日本京都',
    duration: '6 天 5 夜',
    durationDays: 6,
    durationNights: 5,
    priceFrom: 89800,
    currency: 'TWD',
    category: 'culture',
    heroImage:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
      'https://images.unsplash.com/photo-1583400770989-d3eebcc7f02d?w=1200&q=80',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=80',
    ],
    tagline: '在千年古都裡，把日子放慢',
    story:
      '京都不是觀光地，是一種生活美學。我們安排你住進真正的町家旅館，跟茶道老師學一場無聲的儀式，跟和菓子師傅做一塊只屬於這一週的點心。沒有趕場、沒有打卡，只有日本工藝最安靜的那一面。',
    features: ['町家住宿', '茶道體驗', '和菓子手作', '錦市場深度導覽', '哲學之道散步'],
    highlights: [
      '入住百年町家「八坂庵」',
      '裏千家茶道宗匠親自指導',
      '老舖「鶴屋吉信」和菓子手作',
      '伏見稻荷千本鳥居夜訪',
      '嵐山保津川遊船',
    ],
    inclusions: [
      '台北 / 京都 往返機票（含稅）',
      '5 晚精選旅館（含早餐）',
      '5 場深度文化體驗',
      '專業中文領隊全程隨團',
      '行程內所有交通與門票',
    ],
    exclusions: ['個人消費與小費', '行程外自由活動費用', '簽證費（如需）'],
    departureDates: ['2026-06-15', '2026-07-20', '2026-09-10', '2026-10-18', '2026-11-22'],
    groupSize: { min: 6, max: 14 },
    itinerary: [
      {
        day: 1,
        city: '台北 → 京都',
        title: '抵達京都，町家迎賓',
        summary: '搭乘直飛航班抵達關西，專車入住百年町家，傍晚和服試穿、夜訪八坂神社。',
        activities: [
          {
            time: '14:30',
            name: '抵達關西國際機場',
            description: '專業領隊機場迎接，搭乘 HARUKA 特急列車前往京都',
            duration: '90 分鐘',
          },
          {
            time: '17:00',
            name: '町家「八坂庵」入住',
            description:
              '百年木造町家，榻榻米房型、原木浴池，主理人親自奉茶迎賓',
            duration: '60 分鐘',
            highlight: '住宿亮點',
          },
          {
            time: '19:00',
            name: '八坂神社夜訪',
            description: '燈籠夜照下的祇園鳥居，最京都的開場',
            duration: '90 分鐘',
          },
        ],
        meals: [
          {
            type: '晚餐',
            name: '祇園「八千代」懷石',
            description: '京都料理老舖，七道式懷石套餐，當季食材',
            highlight: '米其林一星',
          },
        ],
        hotel: {
          name: '八坂庵 町家旅館',
          level: '精品',
          description: '百年町家改建，僅 4 間客房，私人庭院',
          features: ['榻榻米', '原木浴池', '主理人迎賓', '日式早餐'],
        },
      },
      {
        day: 2,
        city: '京都市區',
        title: '茶道與和菓子的一日',
        summary: '上午裏千家茶道體驗，下午鶴屋吉信和菓子手作，傍晚錦市場巡禮。',
        activities: [
          {
            time: '09:30',
            name: '裏千家「今日庵」茶道',
            description: '宗匠親自指導，從茶筅到茶碗，學一場日本最安靜的儀式',
            duration: '120 分鐘',
            highlight: '深度體驗',
          },
          {
            time: '13:30',
            name: '鶴屋吉信和菓子手作',
            description: '300 年老舖，師傅 1 對 1 教學，做一塊屬於你的季節練切',
            duration: '90 分鐘',
          },
          {
            time: '16:00',
            name: '錦市場導覽',
            description: '京都的廚房，400 年歷史，邊走邊吃 20 家老攤',
            duration: '120 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '町家朝食', description: '主理人手作和食套餐' },
          {
            type: '午餐',
            name: '鶴屋吉信茶寮',
            description: '抹茶套餐配自做和菓子',
          },
          {
            type: '晚餐',
            name: '錦市場巡禮自由覓食',
            description: '領隊推薦 5 家必吃，自由探索',
          },
        ],
        hotel: {
          name: '八坂庵 町家旅館',
          level: '精品',
          description: '連住第二晚',
          features: ['榻榻米', '原木浴池'],
        },
      },
      {
        day: 3,
        city: '京都 → 嵐山',
        title: '竹林深處，保津川泛舟',
        summary: '清晨嵐山竹林避開人潮，保津川遊船，下午天龍寺禪意散步。',
        activities: [
          {
            time: '07:00',
            name: '嵐山竹林（清晨無人時段）',
            description: '專車提前抵達，避開觀光客的竹林，光線最美',
            duration: '60 分鐘',
            highlight: '時段亮點',
          },
          {
            time: '10:00',
            name: '保津川遊船',
            description: '16 公里峽谷泛舟，2 小時，水聲與山色',
            duration: '120 分鐘',
          },
          {
            time: '14:30',
            name: '天龍寺與曹源池',
            description: '世界遺產禪寺，枯山水庭園',
            duration: '90 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '町家朝食', description: '日式套餐' },
          {
            type: '午餐',
            name: '嵐山「松籟庵」湯豆腐',
            description: '川端康成最愛的老店，湯豆腐套餐',
          },
          {
            type: '晚餐',
            name: '町家私廚',
            description: '主理人特別準備的家庭料理',
          },
        ],
        hotel: {
          name: '八坂庵 町家旅館',
          level: '精品',
          description: '連住第三晚',
          features: ['榻榻米'],
        },
      },
      {
        day: 4,
        city: '京都 → 宇治',
        title: '抹茶之鄉，平等院的午後',
        summary: '宇治抹茶老舖訪茶，平等院鳳凰堂朝拜，下午中村藤吉本店茶宴。',
        activities: [
          {
            time: '09:00',
            name: '中村藤吉本店',
            description: '160 年老舖，看茶葉如何從採摘到磨成抹茶',
            duration: '90 分鐘',
          },
          {
            time: '11:00',
            name: '平等院鳳凰堂',
            description: '世界遺產，日幣 10 圓硬幣上的建築',
            duration: '120 分鐘',
          },
          {
            time: '15:00',
            name: '宇治川散步與茶寮品茗',
            description: '川邊喝抹茶吃和菓子，最京都的午後',
            duration: '90 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '町家朝食', description: '日式套餐' },
          {
            type: '午餐',
            name: '宇治「辰巳屋」鰻魚飯',
            description: '宇治川邊老店，碳烤鰻魚定食',
          },
          {
            type: '晚餐',
            name: '伏見稻荷夜市自由覓食',
            description: '千本鳥居前夜市',
          },
        ],
        hotel: {
          name: '八坂庵 町家旅館',
          level: '精品',
          description: '連住第四晚',
          features: ['榻榻米'],
        },
      },
      {
        day: 5,
        city: '京都 → 伏見',
        title: '清酒、稻荷、與夜的告別',
        summary: '上午伏見清酒酒藏導覽，傍晚千本鳥居夜訪，晚上送別懷石。',
        activities: [
          {
            time: '10:00',
            name: '月桂冠大倉記念館',
            description: '400 年清酒老廠，從米到酒的完整製程',
            duration: '90 分鐘',
            highlight: '老舖訪',
          },
          {
            time: '17:30',
            name: '伏見稻荷千本鳥居（夜訪）',
            description: '日落時分上山，避開人潮，朱紅鳥居最美時刻',
            duration: '120 分鐘',
            highlight: '時段亮點',
          },
        ],
        meals: [
          { type: '早餐', name: '町家朝食', description: '日式套餐' },
          {
            type: '午餐',
            name: '伏見「鳥せい」清酒料理',
            description: '酒藏直營料亭',
          },
          {
            type: '晚餐',
            name: '懷石「未在」送別宴',
            description: '米其林三星，送別最後一晚的懷石',
            highlight: '米其林三星',
          },
        ],
        hotel: {
          name: '八坂庵 町家旅館',
          level: '精品',
          description: '最後一晚',
          features: ['榻榻米'],
        },
      },
      {
        day: 6,
        city: '京都 → 台北',
        title: '帶著茶香回家',
        summary: '上午自由活動，午後 HARUKA 特急前往機場，搭機返台。',
        activities: [
          {
            time: '09:00',
            name: '自由活動 / 採買',
            description: '領隊推薦清水寺到二寧坂的伴手禮路線',
            duration: '180 分鐘',
          },
          {
            time: '14:00',
            name: 'HARUKA 特急前往關西機場',
            description: '專車送站，特急列車 75 分鐘抵達機場',
            duration: '90 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '町家朝食', description: '最後一餐日式朝食' },
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
        ],
        hotel: {
          name: '夜宿台北',
          level: '精品',
          description: '當晚返抵台北',
          features: [],
        },
      },
    ],
  },
  {
    id: 'newzealand-adventure',
    slug: 'newzealand-adventure',
    title: '紐西蘭南島探險九日',
    subtitle: '冰川、星空、與南半球最後一片荒野',
    destination: '紐西蘭 南島',
    duration: '9 天 7 夜',
    durationDays: 9,
    durationNights: 7,
    priceFrom: 168000,
    currency: 'TWD',
    category: 'adventure',
    heroImage:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=80',
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1200&q=80',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1200&q=80',
      'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1200&q=80',
    ],
    tagline: '一輩子要有一次的南半球荒野',
    story:
      '紐西蘭南島是地球上少數還沒被人完全踩遍的地方。我們帶你直升機降落冰川、深夜躺在 Tekapo 湖邊看南半球星空、徒步走進米佛峽灣最內側 — 不是觀光巴士能到的地方。',
    features: [
      '冰川直升機降落',
      'Tekapo 星空保護區',
      '米佛峽灣遊船',
      '皇后鎮高空跳傘（選配）',
      '羊毛剪取體驗',
    ],
    highlights: [
      'Franz Josef 冰川直升機降落 + 冰上健行',
      'Lake Tekapo 國際星空保護區夜訪',
      '米佛峽灣 Milford Sound 過夜遊船',
      '皇后鎮 Skyline 纜車與山頂晚餐',
      'Mount Cook 健行',
    ],
    inclusions: [
      '台北 / 基督城 往返機票（含稅、含香港轉機）',
      '7 晚精選住宿（含全程早餐）',
      '冰川直升機 1 次',
      '米佛峽灣過夜遊船 1 次',
      '專業中英文領隊',
      '行程內所有交通與門票',
    ],
    exclusions: [
      '個人消費與小費',
      '高空跳傘（選配 NT$12,000）',
      '泛舟（選配 NT$3,500）',
    ],
    departureDates: ['2026-06-08', '2026-08-15', '2026-10-22', '2026-12-05'],
    groupSize: { min: 8, max: 16 },
    itinerary: [
      {
        day: 1,
        city: '台北 → 基督城',
        title: '飛越赤道，抵達南島門戶',
        summary: '台北經香港轉機飛抵紐西蘭基督城，入住市中心精品旅館。',
        activities: [
          {
            time: '23:30',
            name: '搭機出發',
            description: '台北桃園機場集合、領隊發放行程包',
            duration: '60 分鐘',
          },
        ],
        meals: [{ type: '晚餐', name: '機上餐', description: '航空公司提供' }],
        hotel: {
          name: 'The George Christchurch',
          level: '五星',
          description: '基督城市中心精品旅館',
          features: ['市區位置', '英式下午茶', '健身房'],
        },
      },
      {
        day: 2,
        city: '基督城 → Tekapo',
        title: '一路向南，星空小鎮夜訪',
        summary: '基督城出發，沿著 8 號公路一路南下，傍晚抵達 Tekapo，深夜星空導覽。',
        activities: [
          {
            time: '09:00',
            name: '基督城市區巡禮',
            description: '紙板大教堂、雅芳河泛舟（30 分鐘短遊）',
            duration: '120 分鐘',
          },
          {
            time: '14:00',
            name: '抵達 Tekapo',
            description: '好牧羊人教堂、湖畔薰衣草田',
            duration: '90 分鐘',
            highlight: '景點亮點',
          },
          {
            time: '22:00',
            name: 'Tekapo 星空導覽',
            description: '國際暗空保護區，專業天文導覽員講解南十字星',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '旅館自助', description: '英式早餐' },
          {
            type: '午餐',
            name: 'Fairlie Bakehouse',
            description: '紐西蘭傳統肉派',
          },
          {
            type: '晚餐',
            name: 'Mackenzies Restaurant',
            description: '湖景餐廳，紐西蘭牛排',
          },
        ],
        hotel: {
          name: 'Peppers Bluewater Resort',
          level: '渡假村',
          description: '湖畔渡假村，房間直接面湖',
          features: ['湖景房', '溫水泳池', '星空陽台'],
        },
      },
      {
        day: 3,
        city: 'Tekapo → Mount Cook',
        title: '南島第一高峰',
        summary: '前往 Mount Cook 國家公園，胡克谷地健行，傍晚回到 Tekapo。',
        activities: [
          {
            time: '08:30',
            name: '前往 Mount Cook',
            description: '一路沿 Pukaki 湖，湖水奶藍色',
            duration: '120 分鐘',
          },
          {
            time: '11:00',
            name: '胡克谷地健行 Hooker Valley Track',
            description: '紐西蘭最美健行步道之一，往返 10 公里、3 小時',
            duration: '180 分鐘',
            highlight: '健行亮點',
          },
        ],
        meals: [
          { type: '早餐', name: '渡假村早餐', description: '湖景自助' },
          {
            type: '午餐',
            name: 'Hermitage Hotel',
            description: 'Mount Cook 山下歷史餐廳',
          },
          {
            type: '晚餐',
            name: 'Tekapo 鎮上自由覓食',
            description: '領隊推薦',
          },
        ],
        hotel: {
          name: 'Peppers Bluewater Resort',
          level: '渡假村',
          description: '連住第二晚',
          features: ['湖景房'],
        },
      },
      {
        day: 4,
        city: 'Tekapo → Franz Josef',
        title: '飛越南阿爾卑斯山',
        summary: '直升機從 Tekapo 直飛 Franz Josef 冰川，省去 8 小時車程。',
        activities: [
          {
            time: '10:00',
            name: '直升機觀景航線',
            description: '直升機飛越南阿爾卑斯山，俯瞰 Tasman 冰川',
            duration: '90 分鐘',
            highlight: '此團精華',
          },
          {
            time: '15:00',
            name: '抵達 Franz Josef',
            description: '冰川小鎮，入住山屋',
            duration: '60 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '渡假村早餐', description: '湖景自助' },
          {
            type: '午餐',
            name: 'Lake Pukaki Salmon Farm',
            description: '湖畔鮭魚直營店',
          },
          {
            type: '晚餐',
            name: 'Speights Landing',
            description: 'Franz Josef 鎮上酒吧餐廳',
          },
        ],
        hotel: {
          name: 'Te Waonui Forest Retreat',
          level: '頂級奢華',
          description: '森林包圍的環保五星，全村最高等級',
          features: ['森林景觀', '永續認證', '熱帶雨林散步道'],
        },
      },
      {
        day: 5,
        city: 'Franz Josef',
        title: '冰川直升機降落 + 冰上健行',
        summary: '直升機降落 Franz Josef 冰川頂端，3 小時冰上健行，冰洞探索。',
        activities: [
          {
            time: '09:00',
            name: '冰川裝備說明',
            description: '冰爪、冰斧、安全帶教學',
            duration: '60 分鐘',
          },
          {
            time: '11:00',
            name: '直升機降落冰川',
            description: '飛上 Franz Josef 冰川頂端，降落點海拔 1,200 公尺',
            duration: '30 分鐘',
            highlight: '此團精華',
          },
          {
            time: '12:00',
            name: '冰上健行 + 冰洞探索',
            description: '專業冰川嚮導，藍冰洞穴、冰瀑',
            duration: '180 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '森林山屋早餐', description: '環保自助' },
          { type: '午餐', name: '冰川野餐盒', description: '山屋準備' },
          {
            type: '晚餐',
            name: '山屋森林晚宴',
            description: '紐西蘭羊排、太平洋鮭魚',
          },
        ],
        hotel: {
          name: 'Te Waonui Forest Retreat',
          level: '頂級奢華',
          description: '連住第二晚',
          features: ['森林景觀'],
        },
      },
      {
        day: 6,
        city: 'Franz Josef → Wanaka',
        title: '南島最美公路，Haast Pass',
        summary: '沿 6 號公路南下，經 Haast Pass 國家公園，傍晚抵達 Wanaka。',
        activities: [
          {
            time: '09:00',
            name: 'Haast Pass 國家公園',
            description: '雨林、瀑布、原始森林，沿途多個停留點',
            duration: '240 分鐘',
          },
          {
            time: '16:00',
            name: '抵達 Wanaka',
            description: 'Wanaka 湖畔，傳奇的「那棵樹」',
            duration: '60 分鐘',
            highlight: '景點亮點',
          },
        ],
        meals: [
          { type: '早餐', name: '森林山屋早餐', description: '環保自助' },
          {
            type: '午餐',
            name: 'Haast 鎮上 Pukeko Cafe',
            description: '路邊咖啡',
          },
          {
            type: '晚餐',
            name: 'Wanaka Big Fig',
            description: '湖畔餐廳，地中海風味',
          },
        ],
        hotel: {
          name: 'Edgewater Wanaka',
          level: '五星',
          description: '湖畔渡假村',
          features: ['湖景房', '溫水泳池', 'SPA'],
        },
      },
      {
        day: 7,
        city: 'Wanaka → Queenstown → 米佛峽灣',
        title: '南半球最美峽灣',
        summary: '上午皇后鎮 Skyline 纜車，下午前往 Te Anau，搭乘米佛峽灣過夜遊船。',
        activities: [
          {
            time: '09:00',
            name: '皇后鎮 Skyline 纜車',
            description: '山頂俯瞰皇后鎮全景，山頂咖啡',
            duration: '120 分鐘',
          },
          {
            time: '14:00',
            name: '前往 Te Anau',
            description: 'Te Anau 是米佛峽灣門戶',
            duration: '150 分鐘',
          },
          {
            time: '17:00',
            name: '搭乘米佛峽灣過夜遊船',
            description: '50 人小船，過夜停泊峽灣最深處',
            duration: '870 分鐘（過夜）',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '渡假村早餐', description: '湖景自助' },
          {
            type: '午餐',
            name: 'Skyline 山頂餐廳',
            description: '自助式紐西蘭料理',
          },
          {
            type: '晚餐',
            name: '遊船晚宴',
            description: '船上主廚晚宴，紐西蘭牛排 + 紅酒',
          },
        ],
        hotel: {
          name: 'Milford Mariner 過夜遊船',
          level: '精品',
          description: '50 人小船，私人艙房',
          features: ['峽灣艙房', '甲板觀星', '船上晚宴'],
        },
      },
      {
        day: 8,
        city: '米佛峽灣 → 皇后鎮',
        title: '清晨海豚與最後的皇后鎮',
        summary: '清晨海豚迎接，回到皇后鎮，自由活動與惜別晚餐。',
        activities: [
          {
            time: '06:30',
            name: '清晨峽灣甲板',
            description: '日出與峽灣，運氣好會有海豚和企鵝',
            duration: '60 分鐘',
            highlight: '此團精華',
          },
          {
            time: '14:00',
            name: '皇后鎮自由活動',
            description: '湖濱漫步、Fergburger 漢堡、選配高空跳傘',
            duration: '240 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '遊船早餐', description: '船上自助' },
          {
            type: '午餐',
            name: 'Fergburger',
            description: '皇后鎮傳奇漢堡店',
          },
          {
            type: '晚餐',
            name: 'The Bunker',
            description: '皇后鎮米其林級獨立餐廳',
            highlight: '惜別晚宴',
          },
        ],
        hotel: {
          name: 'QT Queenstown',
          level: '五星',
          description: '湖畔設計型旅館',
          features: ['湖景房', '頂樓酒吧', '藝術設計'],
        },
      },
      {
        day: 9,
        city: '皇后鎮 → 台北',
        title: '飛越赤道，回家',
        summary: '清晨搭機，經奧克蘭轉機返回台北。',
        activities: [
          {
            time: '06:00',
            name: '搭機返台',
            description: '經奧克蘭轉機',
            duration: '60 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '旅館早餐', description: '湖景自助' },
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
          { type: '晚餐', name: '機上餐', description: '航空公司提供' },
        ],
        hotel: {
          name: '抵達台北',
          level: '精品',
          description: '當晚返抵台北',
          features: [],
        },
      },
    ],
  },
  {
    id: 'maldives-honeymoon',
    slug: 'maldives-honeymoon',
    title: '馬爾地夫水上屋蜜月七日',
    subtitle: '一座島，兩個人，七天什麼都不做',
    destination: '馬爾地夫 北馬列環礁',
    duration: '7 天 5 夜',
    durationDays: 7,
    durationNights: 5,
    priceFrom: 268000,
    currency: 'TWD',
    category: 'honeymoon',
    heroImage:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
      'https://images.unsplash.com/photo-1586500036706-41963de24d8d?w=1200&q=80',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80',
    ],
    tagline: '蜜月不是去玩，是去把彼此重新認識',
    story:
      '我們選的不是大型 chain，是 30 間水上屋的小島 Soneva Jani — 私人沙洲、屋內滑梯直接下海、24 小時管家。蜜月不該打卡，該是兩個人慢慢在一起的七天。',
    features: ['水上屋', '私人沙洲晚餐', '雙人 SPA', '海底餐廳', '24 小時管家'],
    highlights: [
      '入住 Soneva Jani 水上屋（屋內滑梯直接下海）',
      '私人沙洲燭光晚餐',
      '海底餐廳 Subsix 體驗',
      '雙人 60 分鐘 Six Senses SPA',
      '私人遊艇出海賞海豚',
    ],
    inclusions: [
      '台北 / 馬列 往返機票（含稅、含杜拜轉機）',
      '5 晚水上屋住宿（含全餐 all-inclusive）',
      '所有 SPA 與餐廳體驗',
      '機場接送（水上飛機）',
      '島上所有非機動水上活動',
    ],
    exclusions: [
      '個人消費',
      '機動水上活動（水上摩托車等）',
      '潛水證照課程（選配）',
    ],
    departureDates: ['2026-06-22', '2026-09-15', '2026-10-26', '2026-11-30'],
    groupSize: { min: 2, max: 2 },
    itinerary: [
      {
        day: 1,
        city: '台北 → 杜拜 → 馬列',
        title: '飛越印度洋',
        summary: '台北經杜拜轉機飛抵馬爾地夫首都馬列，水上飛機抵達 Soneva Jani。',
        activities: [
          {
            time: '23:00',
            name: '搭機出發',
            description: '台北桃園機場集合',
            duration: '60 分鐘',
          },
        ],
        meals: [{ type: '晚餐', name: '機上餐', description: '航空公司提供' }],
        hotel: {
          name: '機上',
          level: '精品',
          description: '夜班機',
          features: [],
        },
      },
      {
        day: 2,
        city: '馬列 → Soneva Jani',
        title: '水上飛機抵達秘密島嶼',
        summary: '抵達馬列後搭乘水上飛機 40 分鐘抵達私人島嶼，水上屋入住。',
        activities: [
          {
            time: '14:00',
            name: '水上飛機 Trans Maldivian',
            description: '40 分鐘空中俯瞰整片環礁',
            duration: '40 分鐘',
            highlight: '此團精華',
          },
          {
            time: '15:00',
            name: '水上屋入住與管家介紹',
            description: '24 小時專屬管家、屋內滑梯實測',
            duration: '60 分鐘',
            highlight: '住宿亮點',
          },
          {
            time: '18:00',
            name: '日落香檳',
            description: '管家送上香檳，水上屋陽台日落',
            duration: '60 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '機上餐', description: '航空公司提供' },
          {
            type: '午餐',
            name: '抵達迎賓',
            description: '島上 The Gathering 餐廳',
          },
          {
            type: '晚餐',
            name: '水上屋私人 In-Villa Dining',
            description: '管家準備的迎賓晚餐',
          },
        ],
        hotel: {
          name: 'Soneva Jani Water Reserve 1 Bedroom',
          level: '頂級奢華',
          description: '水上屋、屋內滑梯下海、私人泳池',
          features: ['屋內滑梯', '私人泳池', '玻璃地板', '24 小時管家'],
        },
      },
      {
        day: 3,
        city: 'Soneva Jani',
        title: '什麼都不做的一天',
        summary: '管家準備整天無安排，可選 SPA、出海、什麼都不做。',
        activities: [
          {
            time: 'free',
            name: '完全自由',
            description: '想睡到中午、想出海、想在陽台一整天 — 全部 OK',
            duration: '全日',
          },
        ],
        meals: [
          {
            type: '早餐',
            name: '水上屋送餐',
            description: '管家送早餐到房內，海上漂浮早餐選配',
          },
          {
            type: '午餐',
            name: 'The Gathering',
            description: '島上主餐廳，國際自助',
          },
          {
            type: '晚餐',
            name: 'So Hands-On 廚房體驗',
            description: '主廚指導兩人一起做晚餐',
          },
        ],
        hotel: {
          name: 'Soneva Jani Water Reserve',
          level: '頂級奢華',
          description: '連住第二晚',
          features: ['水上屋'],
        },
      },
      {
        day: 4,
        city: 'Soneva Jani',
        title: '海底餐廳與雙人 SPA',
        summary: '上午雙人 SPA，中午海底餐廳 Subsix，下午私人沙洲。',
        activities: [
          {
            time: '10:00',
            name: '雙人 SPA',
            description: 'Six Senses 海上 SPA 屋，2 小時雙人療程',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
          {
            time: '13:00',
            name: '海底餐廳 Subsix 午餐',
            description: '水下 6 公尺玻璃餐廳，360 度海洋',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
          {
            time: '16:00',
            name: '私人沙洲下午茶',
            description: '小艇送你們到無人沙洲，管家擺好下午茶',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '水上屋送餐', description: '管家送餐' },
          {
            type: '午餐',
            name: 'Subsix 海底餐廳',
            description: '水下 6 公尺主廚套餐',
          },
          {
            type: '晚餐',
            name: '私人沙洲燭光晚餐',
            description: '無人沙洲，主廚現場料理',
            highlight: '蜜月亮點',
          },
        ],
        hotel: {
          name: 'Soneva Jani Water Reserve',
          level: '頂級奢華',
          description: '連住第三晚',
          features: ['水上屋'],
        },
      },
      {
        day: 5,
        city: 'Soneva Jani',
        title: '海豚之日',
        summary: '清晨私人遊艇出海賞海豚，下午浮潛或選配深潛。',
        activities: [
          {
            time: '06:30',
            name: '私人遊艇賞海豚',
            description: '清晨海豚最活躍，雙人專屬小艇出海',
            duration: '180 分鐘',
            highlight: '此團精華',
          },
          {
            time: '14:00',
            name: '浮潛 / 選配深潛',
            description: '島周圍的礁石、五顏六色珊瑚與熱帶魚',
            duration: '180 分鐘',
          },
          {
            time: '20:30',
            name: '露天電影院',
            description: '島上的星空電影院，看片配雞尾酒',
            duration: '120 分鐘',
          },
        ],
        meals: [
          {
            type: '早餐',
            name: '遊艇早餐',
            description: '出海途中的甲板早餐',
          },
          { type: '午餐', name: 'Down to Earth', description: '島上有機餐廳' },
          { type: '晚餐', name: 'So Wild', description: '島上戶外料理' },
        ],
        hotel: {
          name: 'Soneva Jani Water Reserve',
          level: '頂級奢華',
          description: '連住第四晚',
          features: ['水上屋'],
        },
      },
      {
        day: 6,
        city: 'Soneva Jani',
        title: '最後一天，把每一刻記住',
        summary: '最後一天自由活動，傍晚惜別晚餐，明天回程。',
        activities: [
          {
            time: 'free',
            name: '自由活動',
            description: '完全空白、做什麼都好、什麼都不做也好',
            duration: '全日',
          },
        ],
        meals: [
          { type: '早餐', name: '水上屋送餐', description: '管家送餐' },
          {
            type: '午餐',
            name: 'The Gathering',
            description: '島上主餐廳',
          },
          {
            type: '晚餐',
            name: '惜別晚宴 Out of the Blue',
            description: '島上頂級海鮮餐廳',
            highlight: '惜別晚宴',
          },
        ],
        hotel: {
          name: 'Soneva Jani Water Reserve',
          level: '頂級奢華',
          description: '最後一晚',
          features: ['水上屋'],
        },
      },
      {
        day: 7,
        city: 'Soneva Jani → 杜拜 → 台北',
        title: '回家',
        summary: '水上飛機回馬列、轉機杜拜、返台。',
        activities: [
          {
            time: '10:00',
            name: '水上飛機返馬列',
            description: '空中告別 Soneva Jani',
            duration: '40 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '水上屋送餐', description: '最後一次管家送餐' },
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
          { type: '晚餐', name: '機上餐', description: '航空公司提供' },
        ],
        hotel: {
          name: '抵達台北',
          level: '精品',
          description: '當晚返抵台北',
          features: [],
        },
      },
    ],
  },
  {
    id: 'nordic-aurora',
    slug: 'nordic-aurora',
    title: '北歐三國極光八日',
    subtitle: '芬蘭、瑞典、挪威，與北極圈的綠光',
    destination: '芬蘭・瑞典・挪威',
    duration: '8 天 6 夜',
    durationDays: 8,
    durationNights: 6,
    priceFrom: 198000,
    currency: 'TWD',
    category: 'aurora',
    heroImage:
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1438449805896-28a666819a20?w=1200&q=80',
      'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200&q=80',
      'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80',
      'https://images.unsplash.com/photo-1486825586573-7131f7991bdd?w=1200&q=80',
    ],
    tagline: '一輩子要有一次的綠光夜空',
    story:
      '看極光不是運氣，是策略。我們選的住宿全部在 KP3+ 的極光帶上、玻璃屋天花板可以躺著看、每個地點停 2 晚提高機率。看不到綠光，我們陪你看冰雪。',
    features: [
      '玻璃屋住宿',
      '哈士奇雪橇',
      '馴鹿農場',
      'ICEHOTEL 冰飯店',
      '挪威峽灣',
    ],
    highlights: [
      '芬蘭 Saariselkä 玻璃屋（躺著看極光）',
      '哈士奇雪橇 + 馴鹿農場',
      '瑞典 ICEHOTEL（世界第一冰飯店）',
      '挪威 Tromsø 極光獵人專車',
      '挪威 Lyngenfjord 峽灣破冰船',
    ],
    inclusions: [
      '台北 / 赫爾辛基 往返機票（含稅）',
      '6 晚精選住宿（含玻璃屋 2 晚 + 冰飯店 1 晚）',
      '極光獵人專車 2 晚',
      '哈士奇雪橇、馴鹿農場',
      '專業中文領隊',
      '所有保暖裝備租借',
    ],
    exclusions: ['個人消費', '雪地摩托車（選配）', '冰釣（選配）'],
    departureDates: ['2026-12-10', '2027-01-15', '2027-02-20', '2027-03-05'],
    groupSize: { min: 8, max: 14 },
    itinerary: [
      {
        day: 1,
        city: '台北 → 赫爾辛基',
        title: '飛越歐亞大陸',
        summary: '台北直飛芬蘭赫爾辛基，抵達後簡單市區巡禮入住。',
        activities: [
          {
            time: '15:00',
            name: '抵達赫爾辛基',
            description: '專車進市區',
            duration: '45 分鐘',
          },
          {
            time: '17:00',
            name: '赫爾辛基大教堂',
            description: '白色新古典主義地標',
            duration: '60 分鐘',
          },
        ],
        meals: [
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
          {
            type: '晚餐',
            name: 'Restaurant Olo',
            description: '赫爾辛基米其林二星、北歐料理',
          },
        ],
        hotel: {
          name: 'Hotel Lilla Roberts',
          level: '城市精品',
          description: '赫爾辛基藝術區精品旅館',
          features: ['設計型', '市中心', '北歐極簡'],
        },
      },
      {
        day: 2,
        city: '赫爾辛基 → Saariselkä',
        title: '飛進北極圈',
        summary: '搭乘國內線飛 Ivalo，前往北極圈內的 Saariselkä，入住玻璃屋。',
        activities: [
          {
            time: '09:00',
            name: '國內線飛 Ivalo',
            description: '90 分鐘航程，飛越北極圈',
            duration: '90 分鐘',
          },
          {
            time: '13:00',
            name: '抵達 Saariselkä 玻璃屋',
            description: 'Kakslauttanen Arctic Resort，躺床看天空',
            duration: '60 分鐘',
            highlight: '住宿亮點',
          },
          {
            time: '21:00',
            name: '玻璃屋夜間極光等候',
            description: '專屬玻璃天花板，零下也不用出門',
            duration: '180 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          {
            type: '早餐',
            name: '旅館早餐',
            description: '北歐自助',
          },
          { type: '午餐', name: '機場輕食', description: '芬蘭三明治' },
          {
            type: '晚餐',
            name: '玻璃屋餐廳',
            description: '馴鹿料理、北極魚',
          },
        ],
        hotel: {
          name: 'Kakslauttanen Arctic Resort',
          level: '頂級奢華',
          description: '玻璃屋，天花板透明，躺床看極光',
          features: ['玻璃天花板', '北極圈內', '私人桑拿'],
        },
      },
      {
        day: 3,
        city: 'Saariselkä',
        title: '哈士奇雪橇與馴鹿',
        summary: '上午哈士奇雪橇，下午馴鹿農場、學薩米族文化。',
        activities: [
          {
            time: '10:00',
            name: '哈士奇雪橇',
            description: '自己駕駛雪橇穿越雪林、12 隻哈士奇',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
          {
            time: '14:30',
            name: '馴鹿農場',
            description: '薩米族（原住民）馴鹿農場，學文化',
            duration: '120 分鐘',
          },
          {
            time: '21:00',
            name: '玻璃屋夜間極光',
            description: '第二晚等候、KP 預測 4+',
            duration: '180 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          {
            type: '早餐',
            name: '玻璃屋早餐',
            description: '北極早餐自助',
          },
          {
            type: '午餐',
            name: '哈士奇基地午餐',
            description: '芬蘭傳統湯品',
          },
          {
            type: '晚餐',
            name: '薩米族傳統晚宴',
            description: '帳篷裡的傳統料理',
            highlight: '文化體驗',
          },
        ],
        hotel: {
          name: 'Kakslauttanen Arctic Resort',
          level: '頂級奢華',
          description: '連住第二晚',
          features: ['玻璃天花板'],
        },
      },
      {
        day: 4,
        city: 'Saariselkä → ICEHOTEL（瑞典）',
        title: '進入冰雪世界',
        summary: '跨境進入瑞典 Kiruna，入住世界第一座冰飯店 ICEHOTEL。',
        activities: [
          {
            time: '09:00',
            name: '跨境瑞典',
            description: '專車前往 Kiruna',
            duration: '300 分鐘',
          },
          {
            time: '15:00',
            name: 'ICEHOTEL 入住',
            description: '世界第一冰飯店、每年由藝術家重新雕刻',
            duration: '120 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '玻璃屋早餐', description: '北極自助' },
          { type: '午餐', name: '邊境餐廳', description: '芬蘭瑞典邊境料理' },
          {
            type: '晚餐',
            name: 'ICEHOTEL Restaurant',
            description: '冰飯店餐廳，瑞典極北料理',
          },
        ],
        hotel: {
          name: 'ICEHOTEL Kiruna',
          level: '頂級奢華',
          description: '世界第一冰飯店，房間零下 5 度，馴鹿皮睡袋',
          features: ['全冰雕房', '藝術家設計', '馴鹿皮睡袋'],
        },
      },
      {
        day: 5,
        city: 'Kiruna → Tromsø（挪威）',
        title: '極光首都',
        summary: '專車跨境挪威，抵達 Tromsø，傍晚極光獵人專車出發。',
        activities: [
          {
            time: '09:00',
            name: '跨境挪威',
            description: '北極圈山路、雪景無敵',
            duration: '300 分鐘',
          },
          {
            time: '21:00',
            name: '極光獵人專車',
            description: '專業團隊 + 4WD 車、追逐 KP 高點區域',
            duration: '300 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: 'ICEHOTEL 早餐', description: '熱湯與咖啡' },
          { type: '午餐', name: '邊境餐廳', description: '挪威薩米族料理' },
          {
            type: '晚餐',
            name: 'Tromsø 市區餐廳',
            description: '挪威海鮮、北極鱈魚',
          },
        ],
        hotel: {
          name: 'Clarion The Edge Tromsø',
          level: '五星',
          description: 'Tromsø 港邊精品旅館',
          features: ['峽灣景觀', '頂樓酒吧', '極光陽台'],
        },
      },
      {
        day: 6,
        city: 'Tromsø',
        title: '挪威峽灣破冰船',
        summary: '白天 Lyngenfjord 峽灣破冰船，傍晚再戰極光獵人。',
        activities: [
          {
            time: '10:00',
            name: 'Lyngenfjord 峽灣破冰船',
            description: '挪威最美峽灣之一、破冰前進、賞海豹',
            duration: '300 分鐘',
            highlight: '此團精華',
          },
          {
            time: '21:00',
            name: '極光獵人 Round 2',
            description: '保險第二晚、提高見光機率',
            duration: '240 分鐘',
            highlight: '此團精華',
          },
        ],
        meals: [
          { type: '早餐', name: '旅館早餐', description: '北歐自助' },
          { type: '午餐', name: '峽灣船上午餐', description: '挪威海鮮湯' },
          {
            type: '晚餐',
            name: 'Mathallen Tromsø',
            description: '美食市集、自由覓食',
          },
        ],
        hotel: {
          name: 'Clarion The Edge Tromsø',
          level: '五星',
          description: '連住第二晚',
          features: ['峽灣景觀'],
        },
      },
      {
        day: 7,
        city: 'Tromsø → 赫爾辛基',
        title: '回到芬蘭',
        summary: '回程飛赫爾辛基、自由活動。',
        activities: [
          {
            time: '13:00',
            name: '飛回赫爾辛基',
            description: '直航 3 小時',
            duration: '180 分鐘',
          },
          {
            time: '18:00',
            name: '赫爾辛基自由活動',
            description: '採買、桑拿、自由覓食',
            duration: '180 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '旅館早餐', description: '北歐自助' },
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
          {
            type: '晚餐',
            name: '惜別晚宴',
            description: 'Restaurant Savoy，芬蘭傳奇老店',
            highlight: '惜別晚宴',
          },
        ],
        hotel: {
          name: 'Hotel Lilla Roberts',
          level: '城市精品',
          description: '回到第一晚的旅館',
          features: ['設計型'],
        },
      },
      {
        day: 8,
        city: '赫爾辛基 → 台北',
        title: '帶著綠光回家',
        summary: '搭機返台。',
        activities: [
          {
            time: '12:00',
            name: '搭機返台',
            description: '直飛',
            duration: '60 分鐘',
          },
        ],
        meals: [
          { type: '早餐', name: '旅館早餐', description: '最後一頓北歐' },
          { type: '午餐', name: '機上餐', description: '航空公司提供' },
        ],
        hotel: {
          name: '抵達台北',
          level: '精品',
          description: '當晚返抵台北',
          features: [],
        },
      },
    ],
  },
];

export const findTourBySlug = (slug: string): Tour | undefined =>
  tours.find((tour) => tour.slug === slug);
