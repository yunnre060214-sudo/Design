export const patterns = [
  { id: 'onboarding', name: '新手引导', icon: 'spark', description: '把第一次使用拆成几个有明确回报的小动作。' },
  { id: 'search', name: '搜索与发现', icon: 'search', description: '在用户尚未想清楚要找什么时，提供可浏览的线索。' },
  { id: 'checkout', name: '选择与确认', icon: 'bag', description: '在用户提交之前，让关键条件一眼可见。' },
  { id: 'dashboard', name: '数据概览', icon: 'chart', description: '从状态出发组织信息，让数字能引导下一步。' },
  { id: 'settings', name: '偏好与设置', icon: 'sliders', description: '用可解释的默认值与即时反馈减少设置成本。' },
  { id: 'empty', name: '空状态与反馈', icon: 'inbox', description: '把没有结果或刚完成任务的时刻变成下一步的起点。' },
];

export const platforms = [
  { id: 'all', name: '全部案例', icon: 'grid' },
  { id: 'mobile', name: '移动端', icon: 'phone' },
  { id: 'web', name: '网页端', icon: 'monitor' },
];

export const cases = [
  {
    id: 'stillpoint', name: 'Stillpoint', title: '把一次冥想变成习惯', category: '健康与专注', platform: 'mobile', pattern: 'onboarding', theme: 'lilac', glyph: '◕', visual: 'orbit',
    summary: '一个睡前冥想应用。首次打开时先让用户选择今晚想解决的问题，接着就能开始练习。',
    frames: [
      { label: '选择目标', headline: 'Find your\nquiet.', caption: 'Build a little space for yourself.', options: ['Sleep better', 'Feel calmer'], action: 'Continue', insight: '从睡眠或情绪这样熟悉的需求出发，用户第一次使用时只需做一个选择。' },
      { label: '匹配练习', headline: 'A softer\nlanding.', caption: 'Unwind in eight quiet minutes.', options: ['8 min · Wind down', '4 min · Breathing'], action: 'Begin session', insight: '用明确的时长管理预期，短练习作为备用入口，让时间有限的人也能开始。' },
      { label: '练习结束', headline: 'A moment\nfor you.', caption: 'Your first session is complete.', options: ['Set a quiet reminder', 'Explore more sessions'], action: 'Finish', insight: '在结束后提出提醒，比在首次打开时索取通知权限更容易理解它的用处。' },
    ],
  },
  {
    id: 'roomtone', name: 'Roomtone', title: '从一张图逛到一个空间', category: '家居与生活', platform: 'web', pattern: 'search', theme: 'sand', glyph: 'R', visual: 'interior',
    summary: '一个按空间与材质探索家具的编辑型目录。把搜索范围限制在当前场景，使结果一眼可比。',
    frames: [
      { label: '浏览空间', headline: 'A room to\nslow down in.', caption: 'The Sunday edit', options: ['Living room', 'Soft neutrals'], action: 'View the edit', insight: '第一屏交付一个完整场景，筛选词直接来自场景中的材质与房间类型。' },
      { label: '缩小范围', headline: 'Soft neutrals', caption: 'A warmer kind of minimal.', options: ['Seating', 'Lighting'], action: 'Show pieces', insight: '保持用户已选的风格，只暴露这一步有用的物件类别，避免筛选条件相互竞争。' },
      { label: '查看单品', headline: 'The Sunday chair', caption: 'Bouclé · Burnt sienna', options: ['Product details', 'See it in a room'], action: 'Back to the edit', insight: '保留场景回路，用户看完单品后可以连续浏览同一个空间。' },
    ],
  },
  {
    id: 'offbeat', name: 'Offbeat', title: '让声音先于参数出现', category: '音频与电商', platform: 'mobile', pattern: 'checkout', theme: 'peach', glyph: '◒', visual: 'headphones',
    summary: '一个耳机选购流程。把颜色、价格、送达信息分布在三个有清晰任务的屏幕中。',
    frames: [
      { label: '产品详情', headline: 'Sound, in\nfull colour.', caption: 'Offbeat Studio 01', options: ['Burnt orange', 'Warm graphite'], action: 'Select colour', insight: '用大幅实物图建立材质与色彩预期，让产品名、型号和选择控件各司其职。' },
      { label: '选择配置', headline: 'Make it\nyours.', caption: 'Studio 01 · ¥1,299', options: ['Standard delivery', 'Gift packaging'], action: 'Review order', insight: '在同一位置更新总价与配送选项，避免用户为了核对成本来回翻页。' },
      { label: '核对信息', headline: 'Ready\nto go.', caption: 'Review your order summary.', options: ['Studio 01 · ¥1,299', 'Delivery · Included'], action: 'Finish preview', insight: '确认前把商品和配送并列展示，让用户最后一次核对订单里的关键承诺。' },
    ],
  },
  {
    id: 'terrace', name: 'Terrace', title: '把复杂数据变成今日判断', category: '财务与效率', platform: 'web', pattern: 'dashboard', theme: 'sage', glyph: '↗', visual: 'chart',
    summary: '为独立工作室设计的现金流看板。把余额、变化方向和未来支出放在一条阅读路径上。',
    frames: [
      { label: '现金流概览', headline: 'Cash flow', caption: 'Current balance / 30 days', metric: '¥48,260', options: ['Last 30 days', 'Last 90 days'], action: 'See breakdown', insight: '余额给出当前状态，趋势线紧随其后，时间范围独立成控件。' },
      { label: '查看支出', headline: 'Spending', caption: 'Operating expenses / 30 days', metric: '¥12,480', options: ['Fixed costs', 'Variable costs'], action: 'See upcoming', insight: '先区分固定与变动成本，让用户依据两类支出的可调整程度做决策。' },
      { label: '近期付款', headline: 'Upcoming', caption: 'Scheduled / next 14 days', metric: '¥6,800', options: ['Studio rent · Fri', 'Software · Mon'], action: 'Back to overview', insight: '用可读日期和明确金额替换单纯的图标提示，避免为了确认紧迫程度再点进去。' },
    ],
  },
  {
    id: 'moss', name: 'Moss', title: '用场景代替关键词搜索', category: '餐饮与零售', platform: 'mobile', pattern: 'search', theme: 'moss', glyph: '✳', visual: 'matcha',
    summary: '一个城市茶饮手记。访客可以按口感、时间和场景找到下一杯茶。',
    frames: [
      { label: '发现专题', headline: 'A slower\nafternoon.', caption: 'A field guide to green tea.', options: ['Earthy', 'Fresh'], action: 'Explore the guide', insight: '口感提供低门槛的搜索入口，即使用户没记住任何单品名也能开始。' },
      { label: '浏览茶单', headline: 'Green,\ngreener.', caption: 'Find your favourite note.', options: ['Uji matcha', 'Cold-brew sencha'], action: 'Read tasting notes', insight: '结果列表压缩信息到品种与冲泡方式，具体笔记留给详情页。' },
      { label: '品鉴笔记', headline: 'Uji matcha', caption: 'Toasted rice · Fresh grass', options: ['Iced · 8°C', 'Warm · 68°C'], action: 'Finish preview', insight: '具体温度比笼统的推荐好喝更有用，也减少用户离开页面后需要记住的内容。' },
    ],
  },
  {
    id: 'hush', name: 'Hush', title: '解释每个开关改变什么', category: '效率与工具', platform: 'mobile', pattern: 'settings', theme: 'blue', glyph: '∿', visual: 'toggle',
    summary: '面向深度工作的通知管理器，为每个设置提供可预期的作用范围和例外。',
    frames: [
      { label: '专注设置', headline: 'Make room\nfor focus.', caption: 'A little less noise.', options: ['Quiet hours', 'Urgent calls'], action: 'Set schedule', insight: '把日常静音和紧急例外放在同一屏，减少用户开启前的顾虑。' },
      { label: '设置时段', headline: 'Quiet hours', caption: 'Your weekday schedule.', options: ['Start · 21:30', 'End · 08:00'], action: 'Preview settings', insight: '把起止时间放进清晰的可编辑行，即使跨过午夜也能确认时间区间。' },
      { label: '预览结果', headline: 'All set.', caption: 'Weekdays · 21:30–08:00', options: ['Silence non-urgent alerts', 'Allow starred contacts'], action: 'Finish preview', insight: '用自然语言复述开关的实际效果，用户可以在应用前检查例外名单是否符合预期。' },
    ],
  },
  {
    id: 'ridgeline', name: 'Ridgeline', title: '让路线推荐有明确理由', category: '旅行与户外', platform: 'web', pattern: 'onboarding', theme: 'dusk', glyph: '△', visual: 'mountain',
    summary: '按时间预算而非目的地组织轻徒步路线，先了解用户有多久，再推荐选项。',
    frames: [
      { label: '选择时间', headline: 'Go a little\nfurther.', caption: 'Weekend trails, thoughtfully chosen.', options: ['Half a day', 'A full day'], action: 'Find a trail', insight: '先问可支配时间，能过滤掉距离和路况不合适的路线。' },
      { label: '匹配路线', headline: 'Blue Lake loop', caption: '8.4 km · 3 hours', options: ['Beginner-friendly', 'Lake viewpoints'], action: 'See route', insight: '把匹配理由放在卡片上，用户无需打开路线详情也能比较。' },
      { label: '出发前确认', headline: 'Before you go', caption: 'Last light at 17:42', options: ['Offline map', 'Trail conditions'], action: 'Finish preview', insight: '把离线地图和步道状况放在出发前的最后一屏，贴合实际使用环境。' },
    ],
  },
  {
    id: 'petal', name: 'Petal', title: '把送礼的不确定性提前处理', category: '电商与服务', platform: 'mobile', pattern: 'checkout', theme: 'rose', glyph: '✿', visual: 'flower',
    summary: '一个当日鲜花配送概念。花束选择、送达安排和卡片预览组成清晰的任务链。',
    frames: [
      { label: '选择花束', headline: 'Say it\nwith stems.', caption: 'The ranunculus edit.', options: ['Standard bouquet', 'Large bouquet'], action: 'Choose delivery', insight: '用同一朵花的近景让大小选择聚焦在规格与预算，方便快速对照。' },
      { label: '选择送达', headline: 'Just in time.', caption: 'Available delivery windows.', options: ['Today · 16:00–18:00', 'Tomorrow · 10:00–12:00'], action: 'Review gift', insight: '把日期和时段写在同一个可选项里，避免分别选中的组合实际无法配送。' },
      { label: '核对赠礼', headline: 'For someone\nspecial.', caption: 'Your gift at a glance.', options: ['Ranunculus bouquet', 'Handwritten gift note'], action: 'Finish preview', insight: '在确认页面保留礼品与卡片的独立预览，不必重新进入编辑界面才能核对。' },
    ],
  },
  {
    id: 'shapehouse', name: 'Shapehouse', title: '让空白作品夹可立即开始', category: '创作与协作', platform: 'web', pattern: 'empty', theme: 'periwinkle', glyph: '◇', visual: 'glass',
    summary: '给小型创意团队用的作品归档工具。首次使用时提供两条创建路径。',
    frames: [
      { label: '空作品夹', headline: 'A place to\nput ideas.', caption: 'Your first collection starts here.', options: ['Start from scratch', 'Use a template'], action: 'Create collection', insight: '把临时想法如何进入作品夹说具体，再给从空白和模板开始两种选项。' },
      { label: '选择模板', headline: 'A head start', caption: 'Pick a structure you can edit.', options: ['Visual references', 'Project handover'], action: 'Use this template', insight: '模板名字对应工作任务，使用前无需知道工具的内部术语。' },
      { label: '创建成功', headline: 'Room for more.', caption: 'Your collection is ready.', options: ['Add a reference', 'Back to collections'], action: 'Finish preview', insight: '创建成功后给出可以马上完成的小动作，由用户决定是否继续填充。' },
    ],
  },
  {
    id: 'quarter', name: 'Quarter', title: '让团队知道今天优先做什么', category: '协作与管理', platform: 'web', pattern: 'dashboard', theme: 'stone', glyph: '▥', visual: 'chart',
    summary: '小团队的发布进度面板。把完成率与阻塞项放在可以一眼定位的位置。',
    frames: [
      { label: '项目概览', headline: 'Release 04', caption: 'Tasks completed this week', metric: '18 / 24', options: ['All workstreams', 'Needs attention'], action: 'See blockers', insight: '同时展示已完成项与总数，比分数或单独一个百分比更容易判断剩余工作量。' },
      { label: '查看阻塞', headline: 'Needs attention', caption: 'Items blocking release', metric: '02', options: ['Review copy', 'Approve layout'], action: 'View next actions', insight: '阻塞项用动词命名，让标题直接成为行动提示。' },
      { label: '行动摘要', headline: 'Next for release', caption: 'Today · 2 decisions', metric: '2 / 2', options: ['Copy · Design', 'Layout · Product'], action: 'Back to overview', insight: '用角色补足行动的归属，减少查看后还要追问谁来负责的沟通成本。' },
    ],
  },
  {
    id: 'kinetic', name: 'Kinetic', title: '从训练记录里读出下一步', category: '健康与运动', platform: 'mobile', pattern: 'dashboard', theme: 'lemon', glyph: '↯', visual: 'orbit',
    summary: '训练日历把强度与恢复安排串成一周，既显示已经完成的，也提示可以怎样安排下一次。',
    frames: [
      { label: '本周概览', headline: 'A week\nin motion.', caption: 'Three sessions. One recovery day.', options: ['Strength · Mon', 'Mobility · Thu'], action: 'Review progress', insight: '让训练类型而非图表占据首屏，便于用户回忆具体完成了什么。' },
      { label: '恢复建议', headline: 'Give it\na day.', caption: 'Your next session can wait.', options: ['12 min · Stretch', 'Rest day'], action: 'See next week', insight: '同时提供低强度活动与完整休息，允许用户按真实体感调整。' },
      { label: '下周安排', headline: 'Keep it\nsteady.', caption: 'Plan what you can repeat.', options: ['Two sessions', 'Three sessions'], action: 'Finish preview', insight: '把目标表达成可重复的频次，帮助用户维持节奏。' },
    ],
  },
  {
    id: 'margin', name: 'Margin', title: '给阅读界面留下调整余地', category: '阅读与创作', platform: 'mobile', pattern: 'settings', theme: 'mocha', glyph: 'M', visual: 'toggle',
    summary: '一个长文阅读器，用即时预览解释配色和字号的影响。',
    frames: [
      { label: '阅读设定', headline: 'Read in\nyour light.', caption: 'Make the page feel like yours.', options: ['Paper tone', 'Larger type'], action: 'Preview appearance', insight: '让正文样张与设置同行，用户无需反复关闭面板才能看到变化。' },
      { label: '即时预览', headline: 'In the\nmargins.', caption: 'A quieter place for words.', options: ['Wide line spacing', 'Warm background'], action: 'Review preferences', insight: '把字号和行距分开控制，因为阅读舒适度同时受字符大小和换行节奏影响。' },
      { label: '阅读偏好', headline: 'Page ready.', caption: 'Applied to this device.', options: ['Use for all books', 'Keep per book'], action: 'Finish preview', insight: '明确偏好作用范围，允许同一台设备上的不同书籍采用独立设置。' },
    ],
  },
];

export const notes = [
  {
    title: '引导页应该在哪一步索取承诺？', meta: '首次使用 · 3 分钟', cases: ['stillpoint', 'ridgeline'],
    lead: '先给用户一个能判断产品是否合用的结果，再提出提醒、注册或长期偏好。',
    body: 'Stillpoint 把通知提醒放在第一次练习完成后，此时用户已经体验过提醒会带来什么。Ridgeline 先询问时间预算，再推荐能当天走完的路线。两者的共同点是第一步都能改变屏幕上可见的结果。设计时可以逐项问，输入后用户能立刻得到什么，以及这项输入是否值得推迟到结果出现之后。',
  },
  {
    title: '怎样让筛选项读起来像人的问题？', meta: '搜索与发现 · 3 分钟', cases: ['roomtone', 'moss'],
    lead: '用用户能够在开口时说出的线索组织入口，例如房间、口感和使用场景。',
    body: 'Roomtone 的筛选词来自画面中的房间和材质，Moss 则让熟悉茶的人和只知道自己想喝清爽饮品的人从同一页开始。当入口采用场景语言时，结果卡片仍需要给出明确的分类依据。可以请第一次使用的人复述他们预期看到的结果，再对照实际列表调整用词。',
  },
  {
    title: '好的确认页应该能回答哪些问题？', meta: '交易与反馈 · 3 分钟', cases: ['offbeat', 'petal'],
    lead: '把内容、成本、交付条件和可回退的路径放在最终动作附近。',
    body: 'Offbeat 的确认屏明确列出商品与配送费用，Petal 则把礼品和卡片视为两个可以独立核验的对象。信息复杂时，把会改变用户决定的项目放在首屏，把后台参考信息折叠或移到成功页面。用户返回更改时，保留其他已填选项，减少一次修改带来的连锁重复。',
  },
];
