# 网站功能与服务说明文档（逆向审计）

> **审计基准分支**: `main` (当前工作分支: `refactor/seo_latout`)
> **审计日期**: 2026-03-16
> **网站域名**: https://whereisthesun.org
> **项目名**: SunTracker / "Where Is The Sun"

---

## 一、核心业务价值

### 1.1 我们在提供什么服务？

**一句话定义**: 为全球用户提供基于地理位置的太阳位置实时计算与可视化服务——包括日出/日落时间、太阳方位角/仰角、日照时长、太阳正午时刻，并以 3D 模拟器、交互式时间轴和年度日照图表呈现。

### 1.2 核心价值主张（Value Proposition）

| 维度 | 描述 |
|------|------|
| **实时太阳追踪** | 基于任意经纬度或预设城市，计算当前太阳的精确位置（方位角 + 仰角） |
| **日出日落查询** | 提供指定地点和日期的日出、日落、太阳正午时间 |
| **日照时长对比** | 跨城市、跨季节对比日照时长变化趋势 |
| **3D 太阳模拟器** | Three.js 驱动的交互式 3D 场景，可拖动时间轴观察太阳轨迹 |
| **教育性内容** | 太阳正午、方位角、日照变化等概念的结构化指南 |
| **城市维度切入** | 12 个全球代表性城市的预设页面，覆盖不同纬度和半球 |

### 1.3 目标用户

- **高纬度地区居民**（北欧、冰岛等）——日照变化剧烈，太阳信息有日常实用价值
- **摄影/户外爱好者** ——需要 Golden Hour、太阳方位信息
- **建筑/房产从业者** ——需要了解采光角度与阴影方向
- **教育/科普受众** ——理解日照变化的天文原理
- **旅行者** ——出行目的地的日出日落时间查询

---

## 二、网站信息架构 (Information Architecture)

### 2.1 路由结构总览

```
/                              首页（Hero + 城市入口 + 工具/指南列表 + 交互模拟器）
/locations                     城市列表页（12 个城市网格）
/locations/[slug]              城市详情页（太阳快照 + 完整交互体验）
/tools                         工具列表页（3 个工具卡片）
/tools/[slug]                  工具页（任务聚焦的计算器体验）
/guides                        指南列表页（3 篇概念指南）
/guides/[slug]                 指南详情页（概念文章 + 关联工具 CTA）
/sitemap.xml                   动态站点地图
/robots.txt                    爬虫协议
```

### 2.2 页面层级与语义关系

```
Home (/)
├── Locations Hub (/locations)
│   ├── Stockholm (/locations/stockholm)
│   ├── Paris (/locations/paris)
│   ├── London (/locations/london)
│   ├── New York (/locations/new-york)
│   ├── Tokyo (/locations/tokyo)
│   ├── Sydney (/locations/sydney)
│   ├── Cape Town (/locations/cape-town)
│   ├── Los Angeles (/locations/los-angeles)
│   ├── Singapore (/locations/singapore)
│   ├── Reykjavik (/locations/reykjavik)
│   ├── Dubai (/locations/dubai)
│   └── Mexico City (/locations/mexico-city)
├── Tools Hub (/tools)
│   ├── Sun Position Calculator (/tools/sun-position-calculator)
│   ├── Daylight Hours Calculator (/tools/daylight-hours-calculator)
│   └── Solar Noon Calculator (/tools/solar-noon-calculator)
└── Guides Hub (/guides)
    ├── What Is Solar Noon (/guides/what-is-solar-noon)
    ├── What Is Sun Azimuth (/guides/what-is-sun-azimuth)
    └── Why Daylight Hours Change (/guides/why-daylight-hours-change)
```

### 2.3 内容三角模型

网站建立了 **城市 ↔ 工具 ↔ 指南** 的三角交叉引用结构：

```
           城市页 (Locations)
          /                \
   工具页 (Tools) ——— 指南页 (Guides)
```

- **城市页** → 链接到相关工具（Sun Position、Daylight Hours）和指南
- **工具页** → 链接到相关指南，并以某城市为默认交互上下文
- **指南页** → 链接到关联工具的 CTA，引导用户进入交互体验

---

## 三、用户路径分析 (User Flow)

### 3.1 主路径 A：城市导向（"我想查斯德哥尔摩的日出时间"）

```
首页 Hero → 点击 "Stockholm" 城市标签
  → /locations/stockholm
  → 查看太阳快照卡片（当前位置、本地时间、日出日落、太阳正午）
  → 向下滚动进入 3D 模拟器
  → 拖动时间滑块观察太阳全天轨迹
  → 查看年度日照图表对比月度变化
  → 通过底部链接跳转到其他城市或工具
```

### 3.2 主路径 B：工具导向（"我想计算太阳方位角"）

```
首页 → 导航菜单 Tools → Sun Position Calculator
  → /tools/sun-position-calculator
  → 查看工具说明和信息卡片
  → 使用 3D 模拟器 + 时间滑块进行交互
  → 阅读关联指南链接了解方位角概念
```

### 3.3 主路径 C：知识导向（"为什么日照时长会变化"）

```
首页 → 导航菜单 Guides → Why Daylight Hours Change
  → /guides/why-daylight-hours-change
  → 阅读概念说明文章
  → 点击 CTA "Open the related tool" → /tools/daylight-hours-calculator
  → 在交互工具中验证和探索概念
```

### 3.4 主路径 D：首页探索（"我就看看这个网站能干什么"）

```
首页 Hero（了解网站是做什么的）
  → 浏览热门城市标签
  → 向下滚动体验 3D 模拟器（homepage 模式）
  → 继续看 Tools 列表和 Guides 列表
  → 选择感兴趣的入口深入
```

### 3.5 交叉导航路径

| 从 | 到 | 机制 |
|----|-----|------|
| 任意页面 | 任意主要分区 | 全局 SiteHeader 导航 |
| 城市页 | 其他城市 | PopularCityLinks 组件 |
| 城市页 | 工具页 | "Continue exploring" 区块 |
| 工具页 | 指南页 | "Related guide" 信息卡 |
| 工具页 | 城市页 | PopularCityLinks 组件 |
| 指南页 | 工具页 | CTA 按钮 "Open the related tool" |
| 指南页 | 城市列表 | CTA 按钮 "Browse city pages" |

---

## 四、组件功能归属映射

### 4.1 架构三层模型

项目采用 **三层并存架构**，理解这一点是后续重构的关键：

| 层级 | 目录 | 职责 | 渲染方式 |
|------|------|------|----------|
| **路由入口层** | `app/` | URL 映射、metadata 生成、`generateStaticParams` | Server Component |
| **页面展示层** | `components/pages/` | 页面排版、内容组装、SEO 结构 | Server Component |
| **交互功能层** | `src/components/` | 3D 模拟器、时间滑块、地图、图表等核心交互 | Client Component (`"use client"`) |

桥接层 `components/client/` 通过 `next/dynamic` + `ssr: false` 将旧交互组件接入 Next.js。

### 4.2 全局共用组件

| 组件 | 路径 | 功能 |
|------|------|------|
| **SiteHeader** | `components/navigation/SiteHeader.js` | 全站顶部导航栏（Logo、桌面端菜单、移动端汉堡菜单、Tools/Guides 下拉） |
| **Breadcrumbs** | `components/seo/Breadcrumbs.js` | 面包屑导航（SEO 友好，结构化数据） |
| **PopularCityLinks** | `components/navigation/PopularCityLinks.js` | 热门城市标签组（可配置数量限制） |
| **Footer** | `src/components/Footer.jsx` | 全站页脚 |

### 4.3 页面级组件

| 组件 | 路径 | 对应路由 | 装配内容 |
|------|------|----------|----------|
| **HomePage** | `components/pages/HomePage.js` | `/` | Hero + 城市标签 + SunExperience(homepage) + Tools 网格 + Guides 网格 |
| **CityPage** | `components/pages/CityPage.js` | `/locations/[slug]` | Breadcrumbs + 太阳快照 4 卡片 + SunExperience(city) + 交叉链接 |
| **ToolPage** | `components/pages/ToolPage.js` | `/tools/[slug]` | Breadcrumbs + 工具说明 + 3 信息卡 + SunExperience(mode) |
| **GuidePage** | `components/pages/GuidePage.js` | `/guides/[slug]` | Breadcrumbs + 文章头 + 内容 sections + 工具 CTA |
| **ToolsPage** | `components/pages/ToolsPage.js` | `/tools` | 工具列表 |
| **GuidesPage** | `components/pages/GuidesPage.js` | `/guides` | 指南列表 |

### 4.4 交互客户端桥接层

| 组件 | 路径 | 职责 |
|------|------|------|
| **SunExperience** | `components/client/SunExperience.js` | 动态加载入口（`next/dynamic`, `ssr: false`），避免 SSR 水合问题 |
| **InteractiveSunExperience** | `components/client/InteractiveSunExperience.js` | 模式化组合器——根据 `mode` 参数决定显示哪些子组件 |

**模式配置矩阵**:

| Mode | CityHeader | 3D 模拟器 (MainCom) | 时间滑块 (TimeSlider) | 输入控件 (Input) | 图表 (Chart) |
|------|-----------|---------------------|----------------------|-----------------|-------------|
| `homepage` | - | ✓ | ✓ | ✓ | ✓ |
| `city` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `sun-position-calculator` | ✓ | ✓ | ✓ | - | - |
| `daylight-hours-calculator` | ✓ | - | - | ✓ | ✓ |
| `solar-noon-calculator` | ✓ | ✓ | ✓ | ✓ | - |

### 4.5 核心交互组件（src/components/）

| 组件 | 路径 | 功能 | 依赖 Store |
|------|------|------|-----------|
| **CityHeader** | `src/components/CityHeader.jsx` | 显示当前选中城市/位置信息 | inputStore |
| **MainCom** | `src/components/MainCom.jsx` | 3D 太阳模拟器容器（包裹 ModelComponent） | sunSalcStore, renderStore |
| **ModelComponent** | `src/components/Simulator/ModelComponent.jsx` | Three.js 3D 场景（天空、地面、房屋、太阳球、指南针） | renderStore, sunSalcStore |
| **TimeSlider-B** | `src/components/TimeSlider-B.jsx` | 24 小时时间滑块（拖动实时更新太阳位置） | timeStore, sunSalcStore |
| **InputComponent** | `src/components/InputComponent.jsx` | 位置搜索 + 日期选择 + 时区检测 | inputStore |
| **AddressSearch** | `src/components/input/locationInput/AddressSearch.jsx` | 地址搜索输入框（Nominatim） | inputStore |
| **LocationButton** | `src/components/input/locationInput/LocationButton.jsx` | 浏览器地理定位按钮 | inputStore |
| **Maps** | `src/components/input/locationInput/Maps.jsx` | Leaflet 交互地图（点击选位） | inputStore |
| **DayPicker** | `src/components/input/DayPicker.jsx` | 日期选择器 | inputStore |
| **SunTimes** | `src/components/input/SunTimes.jsx` | 日出/日落时间卡片显示 | sunSalcStore, inputStore |
| **Chart** | `src/components/sunData/Chart.jsx` | Recharts 年度日照模式图 | inputStore, sunSalcStore |
| **SimulatorDateTime** | `src/components/Simulator/SimulatorDateTime.jsx` | 模拟器内日期时间显示 | timeStore, inputStore |
| **LocationInfo** | `src/components/Simulator/LocationInfo.jsx` | 模拟器内位置信息卡片 | inputStore |

### 4.6 3D 场景子组件（src/components/Simulator/components3D/）

| 组件 | 功能 |
|------|------|
| **Sky** | 天空渲染 |
| **Ground** | 地面平面 |
| **House** | 参考建筑物 |
| **Sphere** | 太阳球体 |
| **Compass** | 方位指南针 |
| **Coordinates** | 坐标辅助线 |
| **FadePlane** | 场景过渡效果 |

---

## 五、状态管理（Zustand Stores）

### 5.1 Store 总览

| Store | 路径 | 核心职责 |
|-------|------|----------|
| **inputStore** | `src/stores/inputStore.js` | 位置（经纬度）、城市名、地址、时区、日期、加载状态 |
| **sunSalcStore** | `src/stores/sunSalcStore.js` | 太阳计算结果（日出/日落时间、方位角/仰角） |
| **timeStore** | `src/stores/timeStore.js` | 当前时间、时间格式化工具、500ms 更新循环 |
| **renderStore** | `src/stores/renderStore.js` | 3D 坐标转换（方位角→xyz）、相机位置、天空配置 |

### 5.2 数据流转

```
用户选择城市/位置
  → inputStore 更新 (lat, lon, city, timeZone, date)
    → sunSalcStore.calculateSunData() 重新计算
      → renderStore.convertSunCoordinates() 转换 3D 坐标
        → ModelComponent 渲染更新

用户拖动时间滑块
  → timeStore 更新当前时间
    → sunSalcStore 重新计算当前时刻的太阳位置
      → renderStore → 3D 场景更新
```

---

## 六、数据层

### 6.1 静态数据源（data/）

所有数据为本地硬编码，非 API 驱动：

| 文件 | 内容 | 条目数 |
|------|------|--------|
| `data/locations.js` | 城市列表（slug、名称、国家、经纬度、时区、区域、摘要） | 12 个城市 |
| `data/tools.js` | 工具配置（slug、名称、标题、描述、体验模式） | 3 个工具 |
| `data/guides.js` | 指南内容（slug、标题、摘要、分节正文、关联工具） | 3 篇指南 |
| `data/navigation.js` | 导航菜单结构（从 tools/guides 动态生成菜单项） | 3 个分区 |

### 6.2 外部集成

| 服务 | 用途 | 调用方式 |
|------|------|----------|
| **SunCalc 库** | 太阳位置和时间计算 | `suncalc` npm 包，纯客户端 |
| **Nominatim（OpenStreetMap）** | 逆地理编码（经纬度→地址） | HTTP API 调用 |
| **时区 API** | 经纬度→时区转换 | HTTP API 调用 |
| **calculateSunSnapshot** | 服务端太阳快照（城市页 SSR 数据） | `lib/sun/calculateSunSnapshot.js` |

### 6.3 覆盖城市列表

| 城市 | 纬度 | 区域 | 特殊意义 |
|------|------|------|----------|
| Stockholm | 59.3°N | 北欧 | 高纬度代表，季节性日照差异极大 |
| Paris | 48.9°N | 西欧 | 温带平衡参照城市 |
| London | 51.5°N | 西欧 | 温带纬度日出日落对比 |
| New York | 40.7°N | 北美 | 高搜索量城市 |
| Tokyo | 35.7°N | 东亚 | 密集城市区太阳位置实用场景 |
| Sydney | 33.9°S | 大洋洲 | **南半球**——季节反转参照 |
| Cape Town | 33.9°S | 南非 | **南半球**——非北半球默认视角 |
| Los Angeles | 34.1°N | 北美 | Golden Hour / 摄影需求 |
| Singapore | 1.4°N | 东南亚 | **近赤道**——日照几乎恒定参照 |
| Reykjavik | 64.1°N | 北欧 | **极端高纬度**——极昼极夜参照 |
| Dubai | 25.2°N | 中东 | 全年高温/阳光直射城市 |
| Mexico City | 19.4°N | 北美 | 亚热带纬度日照变化参照 |

---

## 七、技术架构概要

### 7.1 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| UI 库 | React 18 |
| 样式 | Tailwind CSS 3 + CSS 变量设计系统 |
| 3D | Three.js + React Three Fiber + Drei |
| 图表 | Recharts |
| 地图 | Leaflet + react-leaflet |
| 状态 | Zustand 5 |
| 太阳计算 | suncalc |
| 时间处理 | moment-timezone / date-fns / dayjs（多库并存） |
| UI 组件 | MUI（部分） + lucide-react 图标 |
| 字体 | Geist Sans / Geist Mono |

### 7.2 渲染策略

| 路由 | 渲染方式 | 说明 |
|------|----------|------|
| `/` | SSG + 客户端交互 | 静态页面壳 + 动态加载交互模块 |
| `/locations/[slug]` | ISR (revalidate=60) | 服务端计算太阳快照 + 客户端交互 |
| `/tools/[slug]` | SSG + 客户端交互 | 静态参数预生成 + 动态交互 |
| `/guides/[slug]` | SSG | 纯静态内容页面 |
| `/locations`, `/tools`, `/guides` | SSG | 列表页，静态生成 |

### 7.3 SEO 基础设施

| 设施 | 路径 | 说明 |
|------|------|------|
| Metadata 构建器 | `lib/seo/metadata.js` | 每个路由生成 title/description/OG/Twitter |
| 站点配置 | `lib/seo/site.js` | 全站 URL、名称、默认元数据模板 |
| 面包屑 | `components/seo/Breadcrumbs.js` | 语义化面包屑（暗含 JSON-LD 潜力） |
| Sitemap | `app/sitemap.js` | 动态生成，包含所有路由 |
| Robots | `app/robots.js` | 爬虫访问控制 |
| Canonical URLs | 各路由 metadata | `alternates.canonical` 配置 |

---

## 八、当前问题与改进机会摘要

### 8.1 已识别的技术问题

| # | 问题 | 影响 | 位置 |
|---|------|------|------|
| 1 | 路由→Store 同步使用 mount-effect（先闪 Stockholm 默认值再切换） | 城市页首次加载闪烁 | `InteractiveSunExperience.js` |
| 2 | 地理定位回调参数错误 | 浏览器定位可能失败 | `LocationButton.jsx` |
| 3 | 模拟器相机更新逻辑有误 | 太阳位置变化时 3D 视角不同步 | `ModelComponent.jsx` |
| 4 | 全 Store 订阅（非 selector）导致不必要重渲染 | 性能 | 多个组件 |
| 5 | moment-timezone / date-fns / dayjs 三库并存 | bundle 体积冗余 | 多处 |
| 6 | Leaflet CSS 全局加载 | 首屏 CSS 浪费 | `app/layout.js` |

### 8.2 SEO 改进机会

| # | 机会 | 说明 |
|---|------|------|
| 1 | 页面文案仍含"preserved"、"migration"等技术术语 | 应替换为用户友好语言 |
| 2 | Guide 内容较薄（每篇仅 2 个 section） | 可扩充以增加内容深度和长尾关键词覆盖 |
| 3 | 缺少 JSON-LD 结构化数据 | 面包屑、FAQ 等 schema 可提升搜索展示 |
| 4 | 城市页无独特长文本内容 | 增加城市特色太阳描述可帮助 SEO |
| 5 | 工具页描述较泛 | 可针对具体搜索意图优化文案 |
| 6 | 缺少 alt text 策略 | 暂无图片但未来扩展需考虑 |

### 8.3 用户体验改进机会

| # | 机会 | 说明 |
|---|------|------|
| 1 | 首页交互模块位于中间，Tools/Guides 被推到底部 | 信息层级可优化 |
| 2 | 城市页 "Preserved simulator and detail modules" 标题无实际用户价值 | 应聚焦用户意图 |
| 3 | 无真正的搜索功能 | 用户无法通过名称搜索非预设城市 |
| 4 | 移动端 3D 模拟器体验未知 | 需验证触摸交互和性能 |

---

## 九、文件清单索引

### 路由入口
- `app/layout.js` — 根布局（挂载 SiteHeader）
- `app/page.js` — 首页路由
- `app/locations/page.js` — 城市列表路由
- `app/locations/[slug]/page.js` — 城市详情路由
- `app/tools/page.js` — 工具列表路由
- `app/tools/[slug]/page.js` — 工具详情路由
- `app/guides/page.js` — 指南列表路由
- `app/guides/[slug]/page.js` — 指南详情路由

### 页面组件
- `components/pages/HomePage.js`
- `components/pages/CityPage.js`
- `components/pages/ToolPage.js`
- `components/pages/GuidePage.js`
- `components/pages/ToolsPage.js`
- `components/pages/GuidesPage.js`

### 客户端桥接
- `components/client/SunExperience.js`
- `components/client/InteractiveSunExperience.js`

### 导航与 SEO
- `components/navigation/SiteHeader.js`
- `components/navigation/PopularCityLinks.js`
- `components/seo/Breadcrumbs.js`

### 核心交互
- `src/components/CityHeader.jsx`
- `src/components/MainCom.jsx`
- `src/components/TimeSlider-B.jsx`
- `src/components/InputComponent.jsx`
- `src/components/sunData/Chart.jsx`
- `src/components/Simulator/ModelComponent.jsx`
- `src/components/input/locationInput/AddressSearch.jsx`
- `src/components/input/locationInput/LocationButton.jsx`
- `src/components/input/locationInput/Maps.jsx`

### 状态管理
- `src/stores/inputStore.js`
- `src/stores/sunSalcStore.js`
- `src/stores/timeStore.js`
- `src/stores/renderStore.js`

### 数据层
- `data/locations.js`
- `data/tools.js`
- `data/guides.js`
- `data/navigation.js`

### 配置
- `lib/seo/site.js`
- `lib/seo/metadata.js`
- `lib/sun/calculateSunSnapshot.js`

---

*本文档为第一阶段「逆向审计与文档化」的产出物，后续阶段将基于此文档进行 SEO 重构规划和执行。*
