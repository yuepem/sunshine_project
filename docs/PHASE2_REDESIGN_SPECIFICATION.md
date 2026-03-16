# 第二阶段：重新设计规格文档 (Redesign & Structure Specification)

> **基准文档**: `docs/SITE_FUNCTION_AND_SERVICE_AUDIT.md`（第一阶段审计产出）
> **日期**: 2026-03-16
> **状态**: 设计方案（待评审）

---

## 目录

1. [设计原则与目标](#一设计原则与目标)
2. [SEO 战略规划](#二seo-战略规划)
3. [视觉设计系统](#三视觉设计系统)
4. [页面结构重设计](#四页面结构重设计)
5. [导航与用户路径](#五导航与用户路径)
6. [语义化 HTML 与结构化数据](#六语义化-html-与结构化数据)
7. [内容策略与文案方向](#七内容策略与文案方向)
8. [响应式与性能策略](#八响应式与性能策略)
9. [实施优先级](#九实施优先级)

---

## 一、设计原则与目标

### 1.1 核心设计原则

| # | 原则 | 说明 |
|---|------|------|
| P1 | **用户意图优先** | 每个页面的信息层级必须匹配用户到达该页面的意图，而非技术实现逻辑 |
| P2 | **先展示价值，后提供工具** | 用户需要先理解"这个数据意味着什么"，再进入交互操作 |
| P3 | **零术语** | 面向用户的文案中不出现 "preserved"、"migration"、"route"、"experience mode" 等技术词汇 |
| P4 | **SEO 与 UX 共生** | 每一个 SEO 决策都必须同时提升用户体验，不为排名牺牲可用性 |
| P5 | **温暖而专业** | 视觉传达"阳光"的温暖感，同时保持数据工具的精确感和专业信任度 |

### 1.2 设计目标量化

| 目标 | 指标 | 当前状态 | 目标值 |
|------|------|----------|--------|
| 首屏价值传达 | 用户 3 秒内理解网站功能 | 不明确 | Hero 区即传达 |
| 信息层级 | 关键数据在首屏可见 | 交互器在中间，数据在下方 | 数据卡先于交互器 |
| 导航深度 | 任意页面到达核心功能的点击数 | 2-3 次 | ≤2 次 |
| 页面文案 | 技术术语出现次数 | 多处 | 0 |
| 语义结构 | heading 层级跳跃 | 存在 | 无跳跃 (h1→h2→h3) |

---

## 二、SEO 战略规划

### 2.1 内容支柱模型 (Pillar-Cluster Model)

基于网站的核心价值主张，定义 **3 个内容支柱**，每个支柱下延伸出主题集群：

```
支柱 1: 太阳位置追踪 (Sun Position & Tracking)
├── 工具: Sun Position Calculator (核心交互入口)
├── 指南: What Is Sun Azimuth
├── 指南(新): How to Read Sun Position Data
├── 指南(新): Sun Angle for Photography & Golden Hour
└── 城市页: 所有 12 个城市（太阳位置视角的切入）

支柱 2: 日出日落与日照时长 (Sunrise, Sunset & Daylight)
├── 工具: Daylight Hours Calculator (核心交互入口)
├── 指南: Why Daylight Hours Change
├── 指南(新): How Sunrise and Sunset Times Are Calculated
├── 指南(新): Daylight Hours by Latitude — A Visual Comparison
└── 城市页: 所有 12 个城市（日出日落视角的切入）

支柱 3: 太阳正午与日照规划 (Solar Noon & Daylight Planning)
├── 工具: Solar Noon Calculator (核心交互入口)
├── 指南: What Is Solar Noon
├── 指南(新): Solar Noon vs Clock Noon — Why They Differ
├── 指南(新): Best Times for Outdoor Activities by Sun Position
└── 城市页: 所有 12 个城市（太阳正午视角的切入）
```

### 2.2 站点地图结构 (Semantic Sitemap)

```
whereisthesun.org/
│
├── /                                    首页 (Pillar Hub)
│
├── /locations/                          城市集合页 (Hub). // 应该在任何location的地方增加定位按钮，方便用户一键定位
│   ├── /locations/stockholm/            城市页 (Cluster Node)
│   ├── /locations/paris/
│   ├── /locations/london/
│   ├── /locations/new-york/
│   ├── /locations/tokyo/
│   ├── /locations/sydney/
│   ├── /locations/cape-town/
│   ├── /locations/los-angeles/
│   ├── /locations/singapore/
│   ├── /locations/reykjavik/
│   ├── /locations/dubai/
│   └── /locations/mexico-city/
│
├── /tools/                              工具集合页 (Hub)
│   ├── /tools/sun-position-calculator/  工具页 (Pillar Page)
│   ├── /tools/daylight-hours-calculator/
│   └── /tools/solar-noon-calculator/
│
├── /guides/                             指南集合页 (Hub)
│   ├── /guides/what-is-solar-noon/      指南页 (Cluster Content)
│   ├── /guides/what-is-sun-azimuth/
│   ├── /guides/why-daylight-hours-change/
│   ├── /guides/how-sunrise-sunset-calculated/     (新)
│   ├── /guides/sun-angle-photography-golden-hour/ (新)
│   ├── /guides/daylight-hours-by-latitude/        (新)
│   ├── /guides/solar-noon-vs-clock-noon/          (新)
│   └── /guides/best-times-outdoor-activities/     (新)
│
├── /sitemap.xml
└── /robots.txt
```

### 2.3 内链策略 (Internal Linking Architecture)

**规则 1: 每个城市页必须链接到 3 个工具页和至少 2 个指南页**
```
/locations/stockholm → /tools/sun-position-calculator (语境: "查看斯德哥尔摩当前太阳方位")
/locations/stockholm → /tools/daylight-hours-calculator (语境: "对比斯德哥尔摩全年日照")
/locations/stockholm → /tools/solar-noon-calculator (语境: "今天的太阳正午时间")
/locations/stockholm → /guides/why-daylight-hours-change (语境: "为什么北欧日照差异如此极端")
/locations/stockholm → /guides/what-is-sun-azimuth (语境: "理解太阳方位角")
```

**规则 2: 每个工具页必须链接到关联指南和 3-5 个代表性城市**
```
/tools/sun-position-calculator → /guides/what-is-sun-azimuth
/tools/sun-position-calculator → /locations/stockholm, /locations/tokyo, /locations/sydney
```

**规则 3: 每个指南页必须链接到关联工具（CTA）和 2-3 个案例城市**
```
/guides/what-is-solar-noon → /tools/solar-noon-calculator (主 CTA)
/guides/what-is-solar-noon → /locations/reykjavik (极端案例)
/guides/what-is-solar-noon → /locations/singapore (赤道对比)
```

**规则 4: 首页链接到所有 Hub 页和重点城市**
```
/ → /locations (城市入口)
/ → /tools (工具入口)
/ → /guides (指南入口)
/ → /locations/stockholm, /locations/new-york, /locations/tokyo (高搜索量城市)
```

### 2.4 Metadata 策略

| 页面类型 | Title 模板 | Description 模板 |
|----------|-----------|-----------------|
| **首页** | `Sun Position Calculator & Sunrise Sunset Times \| Where Is The Sun` | `Track the sun's position, check sunrise and sunset times, and compare daylight hours for cities worldwide with interactive tools and 3D visualization.` |
| **城市页** | `Sunrise & Sunset Times in {City} Today \| Where Is The Sun` | `See today's sunrise at {sunrise}, sunset at {sunset}, and {daylight_hours} of daylight in {City}, {Country}. Explore sun position, solar noon, and seasonal changes.` |
| **工具页** | `{Tool Name} — Free Online Tool \| Where Is The Sun` | `{具体工具功能描述}. Works for any location with real-time data and interactive visualization.` |
| **指南页** | `{Guide Title} — Explained Simply \| Where Is The Sun` | `{概念一句话解释}. Learn how it works and explore it with our interactive tools.` |
| **城市列表** | `Sunrise & Sunset Times by City \| Where Is The Sun` | `Browse sunrise, sunset, and daylight data for 12 cities across 6 continents — from Reykjavik to Singapore.` |
| **工具列表** | `Free Sun Calculators — Position, Daylight & Solar Noon \| Where Is The Sun` | `Three focused calculators for sun position, daylight hours, and solar noon. Interactive, visual, free.` |
| **指南列表** | `Sun & Daylight Guides \| Where Is The Sun` | `Understand solar noon, sun azimuth, and seasonal daylight changes with clear explanations and linked interactive tools.` |

### 2.5 目标关键词矩阵

| 关键词 | 月搜索量(估) | 意图 | 对应页面 | 优先级 |
|--------|-------------|------|----------|--------|
| sunrise sunset times [city] | 高 | 信息查询 | 城市页 | P0 |
| sun position calculator | 中 | 工具使用 | 工具页 | P0 |
| what time is sunrise today | 高 | 即时查询 | 首页/城市页 | P0 |
| daylight hours [city] | 中 | 信息查询 | 城市页 | P0 |
| golden hour calculator | 中 | 工具使用 | 新指南页 | P1 |
| solar noon today | 中 | 即时查询 | 工具页/城市页 | P1 |
| sun azimuth calculator | 低-中 | 工具使用 | 工具页 | P1 |
| how long is the day today | 中 | 即时查询 | 城市页 | P1 |
| sun angle for photography | 低 | 信息学习 | 新指南页 | P2 |
| why are days longer in summer | 中 | 教育 | 指南页 | P2 |

### 2.6 索引治理与规范化规则 (Indexation & Canonical Control)

**仅以下 URL 类型允许被索引并进入 sitemap**:

- `/`
- `/locations`
- `/locations/[slug]`
- `/tools`
- `/tools/[slug]`
- `/guides`
- `/guides/[slug]`

**必须遵守的规则**:

1. 所有可索引页面都必须有唯一的绝对 canonical URL，且 canonical 指向自身正式地址。
2. 所有由 UI 状态驱动的查询参数（如 `date`、`time`、`view`、`mode`、`compare`、`lat`、`lng`）不得生成可索引变体。
3. 带查询参数的页面若仅用于交互状态保留，canonical 必须回收至基础路径；此类 URL 不进入 sitemap。
4. 不存在的城市、工具、指南 slug 必须返回真实 HTTP `404`，不得返回 `200` + 空内容或兜底内容。
5. 历史 slug 或命名调整后的旧地址必须做 `301` 到新 canonical 地址，避免重复内容沉淀。
6. sitemap 仅收录返回 `200`、允许索引、canonical 正确的正式页面。
7. 任何临时实验页、预览页、内部对照页都必须显式 `noindex, follow`。

**SEO 设计约束**:

- URL 是信息架构的一部分，不能把筛选器状态、地图状态、对比状态设计成新的索引入口。
- 若页面核心内容不足以回答用户问题，则应合并到上级 canonical 页面，而不是保留为弱页面。
- 设计稿中的每一个可点击入口都要先判断其目标 URL 属于“可索引正式页”还是“交互状态页”。

### 2.7 Metadata 与分享卡片规范

除了 `title` 与 `description`，所有正式页面还必须输出完整的分享元数据：

| 字段 | 要求 |
|------|------|
| canonical | 绝对 URL；与当前正式路由完全一致 |
| Open Graph title | 默认复用 SEO title；仅在分享场景明显更优时单独定制 |
| Open Graph description | 默认复用 meta description |
| Open Graph url | 与 canonical 一致 |
| Open Graph image | 使用统一分享图，推荐 1200×630 |
| Twitter card | `summary_large_image` |
| Twitter title/description | 默认与 OG 保持一致 |

**文案约束**:

- Title 目标长度：50-65 字符，优先把核心查询词放在前半段。
- Description 目标长度：120-160 字符，先回答用户问题，再补充工具/内容价值。
- 不允许模板变量泄漏，如 `{City}`、`{sunrise}`、`undefined`、`null` 出现在生产 metadata 中。
- 动态数据暂不可用时，使用通用但完整的 fallback 文案，不等待客户端计算后再补 metadata。
- 分享标题和搜索标题语气可不同，但不能改变页面承诺，避免 clickbait。

### 2.8 页面模板最低 SEO 输出要求

**原则**: SEO 关键内容必须存在于初始 HTML 中，不能依赖 hydration 后才出现。页面即使交互模块加载较慢，搜索引擎也必须能直接读取标题、摘要、正文、关键数据和内链。

| 页面类型 | 初始 HTML 中必须存在的内容 |
|----------|---------------------------|
| 首页 | 1 个明确 h1、价值摘要、3 个 Hub 入口、重点城市入口、工具/指南入口 |
| 城市页 | 1 个 h1、当天核心数据文本（至少日出/日落/日照/太阳正午）、200-300 字城市特色内容、相关工具链接、相关指南链接、对比城市链接 |
| 工具页 | 1 个 h1、工具用途摘要、操作说明或解释性导语、关联指南 CTA、代表性城市链接 |
| 指南页 | 1 个 h1、清晰 lead、至少 3 个内容分节、关联工具 CTA、2-3 个案例城市链接 |
| Hub 页 | 1 个 h1、列表摘要、分组清晰的文本链接列表，不只展示纯视觉卡片 |

**补充要求**:

- 城市页中的关键数据不能只存在于图表、Canvas 或 3D 模拟器中，必须有可抓取的文本表达。
- 工具页不能只有交互器；至少要有一段解释“这个工具解决什么问题、适合谁使用”。
- 指南页不能只有概念定义；必须有“如何应用”或“在哪些城市案例中体现”。
- Hub 页上的链接文案应包含可理解的语义，不使用重复且泛化的 “Learn more” 或 “Explore” 作为唯一锚文本。

---

## 三、视觉设计系统

### 3.1 设计风格定位

**主风格**: Minimal & Direct + Warm Tool
**副风格元素**: 借鉴 Sustainable Energy / Climate Tech 产品和 Weather App 的色彩策略

**风格关键词**: 温暖、清晰、数据驱动、留白充足、单列聚焦、快速加载

### 3.2 色彩系统

基于当前暖色调优化，融合 UI/UX Pro Max 的 Weather App 和 Bookmark 色板推荐，提升对比度和语义清晰度：

```css
:root {
  /* === 核心色 === */
  --color-primary: 30 70% 42%;          /* #B55A1B 深琥珀 — 主品牌色 */
  --color-primary-hover: 30 70% 36%;    /* 悬停态 */
  --color-primary-light: 35 80% 94%;    /* #FEF3E2 极浅琥珀背景 */

  /* === 功能色 === */
  --color-accent: 210 80% 52%;          /* #2577D4 天空蓝 — 链接/辅助强调 */
  --color-success: 150 60% 40%;         /* 成功状态 */
  --color-warning: 45 95% 50%;          /* #F5A800 太阳金 — 高亮/badge */
  --color-destructive: 0 72% 51%;       /* 错误状态 */

  /* === 表面色 === */
  --color-background: 42 30% 97%;       /* #FAF8F5 暖白 */
  --color-surface: 0 0% 100%;           /* #FFFFFF 卡片 */
  --color-surface-muted: 40 15% 95%;    /* #F5F2EF 次要表面 */

  /* === 文字色 === */
  --color-foreground: 25 15% 12%;       /* #221D17 深棕黑 — 主文字 */
  --color-muted-foreground: 25 8% 45%;  /* #6B6560 次要文字 */

  /* === 边框 === */
  --color-border: 30 12% 88%;           /* #E3DFD9 暖灰边框 */
  --color-border-strong: 30 10% 78%;    /* 强调边框 */

  /* === 投射色 === */
  --color-ring: 30 70% 42%;             /* 聚焦环 = 主色 */
}
```

**对比度验证 (WCAG AA)**:
- 主文字 `#221D17` on `#FAF8F5` → 对比度 **15.2:1** (AAA)
- 次要文字 `#6B6560` on `#FAF8F5` → 对比度 **4.7:1** (AA)
- 主色 `#B55A1B` on `#FFFFFF` → 对比度 **4.8:1** (AA)
- 链接蓝 `#2577D4` on `#FFFFFF` → 对比度 **4.6:1** (AA)

### 3.3 字体系统

保留当前 Geist 字体族（已安装且质量高），优化字体层级：

```css
/* 字体族 */
--font-sans: 'Geist Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', 'SF Mono', monospace;

/* 字体比例尺 (Type Scale) */
--text-xs:    0.75rem;   /* 12px — 标签、badge */
--text-sm:    0.875rem;  /* 14px — 辅助文字、meta */
--text-base:  1rem;      /* 16px — 正文 */
--text-lg:    1.125rem;  /* 18px — 大正文、lead */
--text-xl:    1.25rem;   /* 20px — 小标题 */
--text-2xl:   1.5rem;    /* 24px — 区块标题 */
--text-3xl:   1.875rem;  /* 30px — 页面副标题 */
--text-4xl:   2.25rem;   /* 36px — 页面标题 */
--text-5xl:   3rem;      /* 48px — Hero 标题 (桌面) */
```

**字重规则**:
| 用途 | 字重 | 行高 |
|------|------|------|
| Hero 标题 | 700 (Bold) | 1.1 |
| 页面标题 h1 | 700 (Bold) | 1.2 |
| 区块标题 h2 | 600 (SemiBold) | 1.3 |
| 小标题 h3 | 600 (SemiBold) | 1.4 |
| 正文 | 400 (Regular) | 1.6 |
| 辅助/标签 | 500 (Medium) | 1.4 |
| 数据数值 | 600 (SemiBold) + tabular-nums | 1.2 |

### 3.4 间距系统

基于 4px/8px 网格递增：

```
4px   — 极小间隙（图标与文字之间）
8px   — 紧凑间距（行内元素间）
12px  — 组内间距
16px  — 段落间距 / 卡片内 padding
24px  — 区块内间距
32px  — 区块间间距
48px  — 大节之间
64px  — 页面级分隔
```

### 3.5 圆角与阴影

```css
--radius-sm: 6px;     /* 按钮、badge、输入框 */
--radius-md: 10px;    /* 卡片 */
--radius-lg: 16px;    /* 大容器、Hero 区 */
--radius-xl: 24px;    /* 特殊强调区域 */

--shadow-sm: 0 1px 2px rgba(34, 29, 23, 0.05);
--shadow-md: 0 4px 12px rgba(34, 29, 23, 0.08);
--shadow-lg: 0 8px 24px rgba(34, 29, 23, 0.10);
```

### 3.6 组件设计规范

**按钮**:
```
Primary:    bg=primary, text=white, h=44px, px=24px, radius=sm, font=500
Secondary:  bg=transparent, border=border, text=foreground, h=44px, px=24px
Ghost:      bg=transparent, text=muted-foreground, hover:bg=surface-muted
```

**卡片**:
```
Default:    bg=surface, border=border, radius=md, p=24px, shadow=sm
Info:       bg=primary-light, border=primary/20, radius=md, p=24px
Data:       bg=surface, border=border-strong, radius=md, p=16px  (数据密集型)
Link:       bg=surface, border=border, radius=md, p=24px, hover:border=primary, hover:shadow=md, cursor=pointer
```

**标签/Badge**:
```
Default:    bg=surface-muted, text=muted-foreground, px=12px, h=28px, radius=sm, text=sm, font=500
Active:     bg=primary-light, text=primary, border=primary/30
```

---

## 四、页面结构重设计

### 4.1 首页 (Homepage) — 重设计

**设计参考**: Hero-Centric + Interactive Demo 混合模式
**核心理念**: 3 秒内传达"这个网站帮你追踪太阳"，然后引导用户选择路径

```
┌──────────────────────────────────────────────┐
│  SiteHeader (全局导航)                         │
├──────────────────────────────────────────────┤
│                                              │
│  HERO 区                                      │
│  ┌──────────────────────────────────────┐    │
│  │  h1: "Where is the sun right now?"   │    │
│  │  p:  "Track sunrise, sunset, and     │    │
│  │      sun position for any city —     │    │
│  │      today and every day of the year"│    │
│  │                                      │    │
│  │  [快速城市选择器] ← 搜索或选择城市    │    │
│  │  热门城市标签: Stockholm · Paris ·    │    │
│  │  New York · Tokyo · Sydney · ...     │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  "TODAY'S SNAPSHOT" 区 (首次访问=默认城市)     │
│  ┌────────┐┌────────┐┌────────┐┌────────┐   │
│  │ 日出    ││ 日落    ││ 日照时长 ││ 太阳正午 │   │
│  │ 06:32  ││ 18:47  ││ 12h 15m ││ 12:39  │   │
│  │ ↑上升中 ││        ││        ││ 最高46° │   │
│  └────────┘└────────┘└────────┘└────────┘   │
│                                              │
│  3D 交互模拟器 (SunExperience mode=homepage)  │
│  ┌──────────────────────────────────────┐    │
│  │  [3D Sun Simulator]                  │    │
│  │  ──○────────── 时间滑块              │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  "EXPLORE BY CITY" 区                         │
│  ┌──────────────────────────────────────┐    │
│  │  h2: Sunrise & sunset times by city  │    │
│  │  3×4 城市卡片网格                      │    │
│  │  每张卡片: 城市名 + 国旗 + 今日日出    │    │
│  │  → 点击进入城市详情                    │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  "TOOLS" 区 + "GUIDES" 区 (并排)              │
│  ┌─────────────────┐┌─────────────────┐      │
│  │ 3 个工具卡片      ││ 3+ 个指南卡片    │      │
│  │ 每张: 名称+描述   ││ 每张: 标题+摘要   │      │
│  │ + 图标           ││ + 阅读时间       │      │
│  └─────────────────┘└─────────────────┘      │
│                                              │
│  Footer                                      │
└──────────────────────────────────────────────┘
```

**关键变化**:
1. Hero 文案从技术描述改为用户问题 "Where is the sun right now?"
2. 新增快速城市选择器，让用户立即获得个性化数据
3. "Today's Snapshot" 数据卡在模拟器之前，先给答案再给工具
4. 城市网格取代简单的标签列表，提供更丰富的预览信息
5. 去掉所有 "preserved"、"migration" 文案

### 4.2 城市页 (City Page) — 重设计

**核心理念**: 用户搜索 "sunrise time Stockholm" 进入，第一眼看到答案

```
┌──────────────────────────────────────────────┐
│  SiteHeader                                   │
├──────────────────────────────────────────────┤
│  Breadcrumbs: Home > Locations > Stockholm    │
│                                              │
│  HERO 区                                      │
│  ┌──────────────────────────────────────┐    │
│  │  eyebrow: Northern Europe             │    │
│  │  h1: "Sun Times in Stockholm Today"   │    │
│  │  p: 简洁一句话描述当前太阳状态          │    │
│  │                                      │    │
│  │  数据卡 Grid (4列)                    │    │
│  │  ┌──────┐┌──────┐┌──────┐┌──────┐   │    │
│  │  │☀ 日出 ││🌅 日落 ││⏱ 日照  ││☉ 正午 │   │    │
│  │  │06:12 ││18:34 ││12h22m││12:23 │   │    │
│  │  │      ││      ││      ││Alt:46°│   │    │
│  │  └──────┘└──────┘└──────┘└──────┘   │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  交互区标题                                    │
│  ┌──────────────────────────────────────┐    │
│  │  h2: "Explore the sun's path across  │    │
│  │       Stockholm's sky"               │    │
│  │  p: 引导用户使用下方工具               │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  SunExperience (mode=city)                    │
│  ┌──────────────────────────────────────┐    │
│  │  CityHeader                          │    │
│  │  [3D Simulator]                      │    │
│  │  [Time Slider]                       │    │
│  │  [Input Controls + Map]              │    │
│  │  [Yearly Chart]                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  城市特色内容区 (SEO 长文本 — 新增)             │
│  ┌──────────────────────────────────────┐    │
│  │  h2: "Daylight in Stockholm through   │    │
│  │       the year"                      │    │
│  │  p: 200-300 字关于该城市日照特征的      │    │
│  │     独特描述，包含自然关键词            │    │
│  │                                      │    │
│  │  h3: "Key sun facts for Stockholm"   │    │
│  │  • 夏至日照时长                       │    │
│  │  • 冬至日照时长                       │    │
│  │  • 年度日照差异                       │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  交叉链接区                                    │
│  ┌─────────────────┐┌─────────────────┐      │
│  │ 相关工具 (3张)    ││ 对比其他城市      │      │
│  │ 每张带语境化描述   ││ PopularCityLinks │      │
│  └─────────────────┘└─────────────────┘      │
│                                              │
│  Footer                                      │
└──────────────────────────────────────────────┘
```

**关键变化**:
1. h1 从 "Sunrise and Sunset Times in Stockholm" 改为更自然的 "Sun Times in Stockholm Today"
2. 删除 "Preserved simulator and detail modules" 等无意义标题
3. 新增 **城市特色内容区** (200-300 字独特文案)，为每个城市提供差异化的 SEO 内容
4. 交互区标题改为用户友好的引导语
5. 交叉链接带语境化描述（非泛化的 "Continue exploring"）

### 4.3 工具页 (Tool Page) — 重设计

**核心理念**: 工具即答案，直奔主题

```
┌──────────────────────────────────────────────┐
│  SiteHeader                                   │
├──────────────────────────────────────────────┤
│  Breadcrumbs: Home > Tools > Sun Position     │
│                                              │
│  HERO 区                                      │
│  ┌──────────────────────────────────────┐    │
│  │  h1: "Sun Position Calculator"        │    │
│  │  p: "See exactly where the sun is     │    │
│  │      for any location, and watch its  │    │
│  │      path through the day."           │    │
│  │                                      │    │
│  │  信息卡 (3列) — 聚焦用途场景           │    │
│  │  ┌────────────┐┌────────────┐        │    │
│  │  │ 📐 功能     ││ 🌍 入门城市  │        │    │
│  │  │ 实时方位+   ││ Stockholm  │        │    │
│  │  │ 仰角追踪    ││ (可更改)   │        │    │
│  │  └────────────┘└────────────┘        │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  SunExperience (mode=sun-position-calculator) │
│                                              │
│  "How to use this tool" 区                    │
│  ┌──────────────────────────────────────┐    │
│  │  3 步引导 (简洁)                      │    │
│  │  1. 选择城市或输入坐标                │    │
│  │  2. 拖动时间轴查看全天太阳轨迹        │    │
│  │  3. 读取方位角和仰角数据              │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  相关指南 CTA                                 │
│  ┌──────────────────────────────────────┐    │
│  │  "Want to understand sun azimuth?"    │    │
│  │  → Read: What Is Sun Azimuth         │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  PopularCityLinks                             │
│  Footer                                      │
└──────────────────────────────────────────────┘
```

**关键变化**:
1. 删除 "Preserved source of truth"、"This route uses the existing calculator components" 等术语
2. 信息卡从技术描述改为**用途场景**描述
3. 新增 "How to use this tool" 简洁引导区
4. 关联指南 CTA 用问题句式引导，而非泛化链接

### 4.4 指南页 (Guide Page) — 重设计

**核心理念**: 教育性内容，清晰分节，自然引导到工具

```
┌──────────────────────────────────────────────┐
│  SiteHeader                                   │
├──────────────────────────────────────────────┤
│  Breadcrumbs: Home > Guides > What Is Solar..│
│                                              │
│  ARTICLE                                      │
│  ┌──────────────────────────────────────┐    │
│  │  eyebrow: Guide · 3 min read          │    │
│  │  h1: "What Is Solar Noon?"            │    │
│  │  p (lead): 概念一句话解释              │    │
│  │                                      │    │
│  │  h2: 分节标题 1                       │    │
│  │  正文 (扩充到 150-200 字/节)           │    │
│  │                                      │    │
│  │  h2: 分节标题 2                       │    │
│  │  正文                                │    │
│  │                                      │    │
│  │  h2: 分节标题 3+ (新增更多节)          │    │
│  │  正文                                │    │
│  │                                      │    │
│  │  [可选: 内联数据示例或城市对比表格]     │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  CTA 区                                       │
│  ┌──────────────────────────────────────┐    │
│  │  h2: "See it in action"               │    │
│  │  p: "Explore solar noon for real      │    │
│  │      cities with our interactive      │    │
│  │      calculator."                     │    │
│  │  [Primary CTA: Open Solar Noon Tool]  │    │
│  │  [Secondary: Browse city pages]       │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  相关指南推荐                                  │
│  ┌──────────────────────────────────────┐    │
│  │  "Related guides"                     │    │
│  │  2-3 张指南卡片                        │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  PopularCityLinks                             │
│  Footer                                      │
└──────────────────────────────────────────────┘
```

**关键变化**:
1. 新增阅读时间预估 (建立信任)
2. 内容节数从 2 节扩充到 3-5 节 (增加 SEO 深度)
3. CTA 文案从 "Continue with the interactive tool" 改为更直接的 "See it in action"
4. 新增相关指南推荐区 (增加内链和页面停留)
5. 删除 "The guide explains the concept in crawlable HTML" 等技术文案

---

## 五、导航与用户路径

### 5.1 全局导航结构

```
┌─────────────────────────────────────────────────────────┐
│  ☀ Where Is The Sun    Locations  Tools ▾  Guides ▾     │
│                                                         │
│  (Mobile: ☀ Logo                        ☰ Menu)         │
└─────────────────────────────────────────────────────────┘

Tools 下拉:
├── Sun Position Calculator
│   "Find the sun's altitude and azimuth"
├── Daylight Hours Calculator
│   "Compare sunrise, sunset, and day length"
└── Solar Noon Calculator
    "When does the sun reach its highest point"

Guides 下拉:
├── What Is Solar Noon?
├── What Is Sun Azimuth?
├── Why Daylight Hours Change
└── (新增指南...)
```

**导航设计规则**:
- 固定在顶部 (`sticky`)，滚动时保持可见
- 桌面端：Logo + 4 个顶级入口 + 下拉菜单
- 移动端：Logo + 汉堡菜单（抽屉式展开）
- 当前页面在导航中高亮 (`aria-current="page"`)
- 下拉菜单包含简短描述辅助选择
- 导航高度：桌面 64px / 移动 56px，内容区相应 `pt` 补偿

### 5.2 面包屑策略

所有 2 级及以上深度的页面都包含面包屑：

```
城市页: Home → Locations → Stockholm
工具页: Home → Tools → Sun Position Calculator
指南页: Home → Guides → What Is Solar Noon
```

面包屑同时生成 `BreadcrumbList` JSON-LD 结构化数据。

### 5.3 页面内导航 (城市页/工具页)

对于长页面（城市页、工具页），在交互区之前增加可选的锚点导航：

```
┌──────────────────────────────────────┐
│  On this page:                       │
│  Today's Data · 3D Simulator ·       │
│  Yearly Chart · About This City      │
└──────────────────────────────────────┘
```

### 5.4 Footer 结构

```
┌──────────────────────────────────────────────┐
│  ☀ Where Is The Sun                          │
│  "Sun position, sunrise & sunset data        │
│   for cities worldwide."                     │
│                                              │
│  Locations        Tools              Guides  │
│  Stockholm        Sun Position       Solar Noon │
│  Paris            Daylight Hours     Azimuth │
│  London           Solar Noon         Daylight│
│  New York                                    │
│  Tokyo                                       │
│  + View all                                  │
│                                              │
│  © 2026 Where Is The Sun                     │
└──────────────────────────────────────────────┘
```

---

## 六、语义化 HTML 与结构化数据

### 6.1 HTML 语义标签使用规范

```html
<!-- 页面骨架 -->
<body>
  <header role="banner">           <!-- SiteHeader -->
    <nav aria-label="Main">        <!-- 主导航 -->
  </header>

  <main id="main-content">        <!-- 主内容 -->
    <nav aria-label="Breadcrumb">  <!-- 面包屑 -->
      <ol>...</ol>
    </nav>

    <article>                      <!-- 指南页用 article -->
      <header>                     <!-- 页面头部 -->
        <h1>...</h1>
      </header>
      <section>                    <!-- 内容分节 -->
        <h2>...</h2>
      </section>
    </article>

    <aside>                        <!-- 侧边/相关内容 -->
      <h2>Related guides</h2>
    </aside>
  </main>

  <footer role="contentinfo">     <!-- 页脚 -->
  </footer>
</body>
```

### 6.2 Heading 层级规范

| 页面类型 | h1 | h2 | h3 |
|----------|-----|-----|-----|
| 首页 | "Where is the sun right now?" | "Today's snapshot" / "Explore by city" / "Sun calculators" / "Learn about sunlight" | 城市名 / 工具名 / 指南标题 |
| 城市页 | "Sun Times in {City} Today" | "Explore the sun's path..." / "Daylight in {City} through the year" / "Compare with other cities" | "Key sun facts" / 工具名 |
| 工具页 | "{Tool Name}" | "How to use this tool" / "Want to understand {concept}?" | 步骤标题 |
| 指南页 | "{Guide Title}" | 各内容分节标题 / "See it in action" / "Related guides" | - |

**严格规则**: 不允许跳级（h1→h3），每页仅一个 h1。

### 6.3 JSON-LD 结构化数据

**每个页面都添加**:

```jsonc
// 面包屑 (所有子页面)
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whereisthesun.org/" },
    { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://whereisthesun.org/locations/" },
    { "@type": "ListItem", "position": 3, "name": "Stockholm" }
  ]
}
```

```jsonc
// 网站 (首页)
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Where Is The Sun",
  "url": "https://whereisthesun.org",
  "description": "...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://whereisthesun.org/locations/{search_term}",
    "query-input": "required name=search_term"
  }
}
```

```jsonc
// 工具页 (WebApplication)
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sun Position Calculator",
  "url": "https://whereisthesun.org/tools/sun-position-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

```jsonc
// 指南页 (Article)
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is Solar Noon?",
  "description": "...",
  "datePublished": "2026-01-15",
  "dateModified": "2026-03-16",
  "publisher": {
    "@type": "Organization",
    "name": "Where Is The Sun",
    "url": "https://whereisthesun.org"
  }
}
```

**补充规则**:

- `/locations`、`/tools`、`/guides` 三个集合页使用 `CollectionPage` 或 `ItemList`，反映真实可见的列表内容。
- `FAQPage` 仅在页面上存在用户可见、逐条展开的 FAQ 模块时使用；不为 SEO 单独伪造 FAQ 结构化数据。
- 结构化数据字段必须与页面可见内容一致，尤其是 `headline`、`description`、`url`、`dateModified`、面包屑名称。
- 同一页面只输出与页面类型匹配的 schema，避免堆叠与页面无关的类型。
- 所有 schema URL 必须使用正式 canonical 地址，不使用相对路径、不使用临时参数 URL。

### 6.4 语义 HTML 优化清单

- [ ] 所有交互元素有正确的 `aria-label`
- [ ] 图标按钮有 `aria-label` 或 `sr-only` 文字
- [ ] 3D 模拟器区域有 `aria-label="Interactive 3D sun simulator"`
- [ ] 时间滑块有 `aria-label="Time of day"` + `aria-valuemin/max/now`
- [ ] 所有链接卡片使用正确的 `<a>` 标签
- [ ] 表格数据使用 `<table>` + `<th scope>`
- [ ] Skip link: `<a href="#main-content" class="sr-only focus:not-sr-only">`

---

## 七、内容策略与文案方向

### 7.1 文案语调 (Tone of Voice)

| 维度 | 方向 | 示例 |
|------|------|------|
| **清晰** vs 华丽 | 清晰优先 | "The sun rises at 06:32" 而非 "Dawn breaks at..." |
| **友好** vs 正式 | 友好但专业 | "Check where the sun is" 而非 "Utilize our solar computation engine" |
| **直接** vs 委婉 | 直接 | "Sunrise: 06:32 · Sunset: 18:47" 而非 "Today's approximate illumination period..." |
| **实用** vs 装饰 | 实用至上 | 每一行文案都应传递信息或引导行动 |

### 7.2 需要重写的文案清单

| 位置 | 当前文案 | 问题 | 新文案方向 |
|------|---------|------|-----------|
| 首页 Hero p | "...preserved interactive simulator wrapped in crawlable Next.js routes" | 技术术语 | "Track the sun's position, check sunrise and sunset times, and compare daylight hours for cities worldwide." |
| 城市页 h2 | "Preserved simulator and detail modules for {city}" | 无意义 | "Explore the sun's path across {city}'s sky" |
| 城市页 p | "The city route keeps the current UI as its interactive source of truth..." | 技术术语 | "Use the 3D simulator to watch how the sun moves through {city}'s sky, from sunrise to sunset." |
| 工具页 Info Card | "This route uses the existing calculator components instead of a rewritten tool UI" | 技术术语 | "Real-time sun position data with interactive 3D visualization" |
| 工具页 Info Card | "The interactive view starts with {city} and can be changed from the preserved city controls" | 技术术语 | "Starts with {city} — change to any location using the controls below" |
| 指南页 CTA p | "The guide explains the concept in crawlable HTML. The live simulator remains available on the corresponding tool route." | 技术术语 | "See this concept in action with real data from any city." |
| 所有页面 | 多处出现 "preserved" | 完全无需出现 | 删除所有该词 |

### 7.3 城市页独特内容模板

每个城市页需要 200-300 字的差异化描述，模板：

```markdown
## Daylight in {City} through the year

{City} sits at {latitude}° {N/S}, placing it in the {region description}.
{1-2 句描述该城市日照特征}.

{关于季节差异的具体数据描述：夏至最长日照 vs 冬至最短日照}

{该城市独特的太阳相关文化或实用信息 — 如斯德哥尔摩的 Midsommar，
雷克雅未克的极夜/极昼，新加坡全年近乎恒定的日照}

### Key sun facts for {City}
- Longest day: {date} — {hours} of daylight
- Shortest day: {date} — {hours} of daylight
- Annual daylight range: {difference}
- Solar noon range: {earliest} to {latest}
```

---

## 八、响应式与性能策略

### 8.1 断点系统

```
sm:  640px   — 大手机横屏
md:  768px   — 平板竖屏
lg:  1024px  — 平板横屏 / 小笔记本
xl:  1280px  — 标准桌面
2xl: 1440px  — 大桌面
```

### 8.2 响应式布局规则

| 元素 | 移动端 (< 768px) | 桌面端 (≥ 1024px) |
|------|-----------------|-------------------|
| 数据卡网格 | 2×2 | 1×4 |
| 城市卡网格 | 2 列 | 3-4 列 |
| Tools + Guides | 堆叠 | 并排 2 列 |
| 3D 模拟器 | 全宽，高度 300px | 全宽，高度 500px |
| 导航 | 汉堡菜单 | 水平展开 |
| Footer | 堆叠 | 3 列 |
| 内容最大宽度 | 100% - 32px padding | max-w-6xl (1152px) |

### 8.3 性能优化策略

| 策略 | 实施方式 |
|------|----------|
| **3D 模拟器懒加载** | `next/dynamic` + `ssr: false` + loading skeleton（已有，保持） |
| **图表懒加载** | Chart 组件独立 `dynamic` 边界 |
| **地图懒加载** | Maps.jsx 仅在展开输入面板时加载 |
| **字体优化** | `font-display: swap` + 预加载关键字重 |
| **图片优化** | 城市卡片如需缩略图使用 `next/image` + WebP |
| **CSS 关键路径** | Tailwind purge + 首屏关键 CSS 内联 |
| **moment-timezone** | 长期替换为 `Intl.DateTimeFormat`（减少 ~300KB） |

### 8.4 加载状态设计

```
3D 模拟器 Loading:
┌──────────────────────────────────────┐
│  ┌──────────────────────────────┐    │
│  │      ☀                       │    │
│  │   Loading sun simulator...   │    │
│  │   ━━━━━━━━━░░░░░░           │    │
│  └──────────────────────────────┘    │
│  ──────────────── (slider skeleton)  │
└──────────────────────────────────────┘

图表 Loading:
┌──────────────────────────────────────┐
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░██    │
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░██    │
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░██    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  Jan  Mar  May  Jul  Sep  Nov       │
└──────────────────────────────────────┘
```

---

## 九、实施优先级

### Phase 2a: 文案与结构修复 (Quick Wins — 不改架构)

| # | 任务 | 影响 | 复杂度 |
|---|------|------|--------|
| 1 | 重写所有页面文案，消除技术术语 | 高 (UX + SEO) | 低 |
| 2 | 优化每个页面的 metadata (title + description) | 高 (SEO) | 低 |
| 3 | 修正 heading 层级 (消除跳级) | 中 (SEO + A11y) | 低 |
| 4 | 首页信息层级重排：数据卡 → 模拟器 → 城市 → 工具/指南 | 高 (UX) | 中 |
| 5 | 添加 JSON-LD 结构化数据 (BreadcrumbList + WebSite + WebApplication + Article) | 高 (SEO) | 中 |

### Phase 2b: 内容深化 (Content Depth)

| # | 任务 | 影响 | 复杂度 |
|---|------|------|--------|
| 6 | 为 12 个城市页撰写独特描述内容 (200-300 字/城市) | 高 (SEO) | 中 |
| 7 | 扩充现有 3 篇指南内容 (从 2 节扩展到 4-5 节) | 高 (SEO) | 中 |
| 8 | 完善内链策略：每个页面添加语境化的交叉链接 | 高 (SEO) | 低 |

### Phase 2c: 视觉优化 (Visual Refinement)

| # | 任务 | 影响 | 复杂度 |
|---|------|------|--------|
| 9 | 更新 CSS 变量为新色彩系统 | 中 (UX) | 低 |
| 10 | 城市列表页改为卡片网格（含预览数据） | 中 (UX) | 中 |
| 11 | 优化 Footer 结构（分栏 + 站内链接） | 中 (SEO + UX) | 低 |
| 12 | 添加 3D 模拟器和图表的 loading skeleton | 中 (UX) | 中 |

### Phase 2d: 新内容页面

| # | 任务 | 影响 | 复杂度 |
|---|------|------|--------|
| 13 | 新增指南: "Sun Angle for Photography & Golden Hour" | 中 (SEO) | 中 |
| 14 | 新增指南: "How Sunrise and Sunset Times Are Calculated" | 中 (SEO) | 中 |
| 15 | 新增指南: "Daylight Hours by Latitude — A Visual Comparison" | 中 (SEO) | 中 |

### Phase 2e: SEO 验收与监控

| # | 任务 | 影响 | 复杂度 |
|---|------|------|--------|
| 16 | 为正式索引页建立 canonical / robots / 404 / 301 规则清单 | 高 (SEO) | 低 |
| 17 | 校验 sitemap 仅包含可索引 canonical 页面，不含参数页和异常页 | 高 (SEO) | 低 |
| 18 | 将 `npm run verify:seo` 纳入上线前检查，验证 title、description、canonical、单一 h1、内链、sitemap、404 | 高 (SEO) | 低 |
| 19 | 上线后 14 天内复盘 Search Console：`discovered - currently not indexed`、`soft 404`、`duplicate without user-selected canonical`、CTR 偏低页面 | 高 (SEO) | 低 |

### 9.1 SEO 上线验收标准

- 所有正式页面都能在初始 HTML 中看到唯一 `title`、`meta description`、canonical、单一 `h1`。
- 所有正式页面至少有一组可抓取的站内链接，且锚文本具备语义。
- `/sitemap.xml` 返回 XML，且只包含正式 canonical URL。
- `/robots.txt` 指向正式 sitemap，并且没有误拦截正式内容目录。
- 任意无效 slug 返回真实 `404`，而不是空白页或兜底页。
- 城市页、工具页、指南页的模板变量不会泄漏到生产 metadata 或可见文案中。
- 结构化数据通过语法校验，且与页面可见内容一致。

---

## 附录 A: 设计系统文件位置

设计系统已持久化到项目中：
- 主设计系统: `design-system/where-is-the-sun/MASTER.md`
- 页面覆盖: `design-system/where-is-the-sun/pages/` (按需创建)

---

## 附录 B: 与第一阶段审计的对照

| 第一阶段发现的问题 | 本方案的对应解决 |
|-------------------|----------------|
| 页面文案含技术术语 | §7.2 文案重写清单 |
| Guide 内容薄 | §2.1 支柱模型 + §4.4 扩充计划 |
| 缺少 JSON-LD | §6.3 完整结构化数据方案 |
| 城市页无独特内容 | §7.3 城市页内容模板 |
| 信息层级不匹配用户意图 | §4.1-4.4 页面重设计 |
| 首页交互器位置不当 | §4.1 首页重设计 |

---

*本文档为第二阶段「重新设计」的规格说明，作为后续实施阶段的蓝图。请评审后确认方向，再进入编码实施。*
