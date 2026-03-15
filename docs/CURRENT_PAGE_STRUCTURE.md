# 当前页面结构说明

这个项目现在是一个 `Next.js app router` 外壳，加上一层保留的旧交互组件。

## 1. 路由层

```text
app/
├── layout.js                     # 全站根布局
├── page.js                       # 首页 /
├── locations/page.js             # 城市列表页 /locations
├── locations/[slug]/page.js      # 城市详情页 /locations/:slug
├── tools/[slug]/page.js          # 工具页 /tools/:slug
├── guides/[slug]/page.js         # 指南页 /guides/:slug
├── not-found.js                  # 404
├── sitemap.js                    # sitemap
└── robots.js                     # robots
```

说明：
- `app/*` 负责路由入口、metadata、静态参数和页面级数据选择。
- 真正的页面 UI 大多不直接写在 `app/*`，而是转交给 `components/pages/*`。

## 2. 页面组件层

```text
components/pages/
├── HomePage.js   # 首页主体
├── CityPage.js   # 城市详情页主体
├── ToolPage.js   # 工具页主体
└── GuidePage.js  # 指南页主体
```

当前页面装配关系：
- `/` -> `app/page.js` -> `components/pages/HomePage.js`
- `/locations` -> `app/locations/page.js`
- `/locations/[slug]` -> `components/pages/CityPage.js`
- `/tools/[slug]` -> `components/pages/ToolPage.js`
- `/guides/[slug]` -> `components/pages/GuidePage.js`

这些页面大多共用：
- `components/seo/Breadcrumbs.js`
- `components/navigation/PopularCityLinks.js`
- `src/components/Footer.jsx`

## 3. 保留的旧交互层

```text
components/client/
├── SunExperience.js
└── InteractiveSunExperience.js

src/components/
├── CityHeader.jsx
├── MainCom.jsx
├── TimeSlider-B.jsx
├── InputComponent.jsx
├── sunData/Chart.jsx
└── ...
```

关系是：
- `SunExperience.js` 用 `dynamic(..., { ssr: false })` 挂载客户端交互区。
- `InteractiveSunExperience.js` 按 `mode` 组合旧组件。
- 真正的太阳模拟器、时间滑块、地图、图表都还在 `src/components/*`。

可以把这一层理解为“旧应用核心功能层”，现在只是被新的 Next.js 页面包起来了。

## 4. 数据层

```text
data/
├── locations.js
├── tools.js
└── guides.js
```

作用：
- `locations.js` 提供城市列表和城市基础信息
- `tools.js` 提供工具页配置，并决定 `experienceMode`
- `guides.js` 提供指南页内容

所以当前很多页面不是从 API 拉数据，而是直接吃本地配置数据。

## 5. 样式层

全站公共样式主要在：
- `app/globals.css`

这里定义了当前页面骨架常用类：
- `.page-shell`：页面主体最大宽度和上下间距
- `.content-card`：通用卡片容器
- `.btn-primary` / `.btn-secondary`
- `.tag` / `.info-card` / `.link-card`

这意味着新导航如果要做成“全站一致”，最好也复用这套样式语言。

## 6. 当前首页结构

首页 `HomePage.js` 目前大致是：

```text
HomePage
├── Hero
├── PopularCityLinks
├── Tools 列表
├── Guides 列表
└── SunExperience(mode="homepage")
```

特点：
- 现在没有真正的全站顶部导航
- 首页内容区直接从 hero 开始
- 页脚是全站复用的 `Footer`

## 7. 如果要加导航栏，推荐放哪里

最合适的做法是新增一个全站头部组件，例如：

```text
components/navigation/SiteHeader.js
```

然后在：
- `app/layout.js`

里统一挂载，位置放在 `{children}` 前面。

原因：
- 这样首页、城市页、工具页、指南页都会自动有同一套导航
- 后面如果要做菜单管理、移动端菜单、active 状态，也只需要维护一处
- 不要把全站导航写进 `HomePage.js`，否则其他页面还得重复补

## 8. 结构上最需要先统一的点

目前最容易让人混乱的是三层并存：
- `app/*` 是路由入口层
- `components/pages/*` 是页面展示层
- `src/components/*` 是旧交互功能层

简化理解可以直接记成：
- `app` 决定“哪个 URL 对应哪个页面”
- `components/pages` 决定“这个页面怎么排版”
- `src/components` 决定“交互模块本身怎么工作”

## 9. 一个实际可执行的下一步

如果你准备做首页导航或菜单管理，我建议下一步直接做这 3 件事：

1. 先抽一个全站 `SiteHeader`
2. 把导航项集中到一个配置文件，例如 `data/navigation.js`
3. 在 `app/layout.js` 挂载全局头部，首页只保留内容，不再承担导航职责

这样后面加：
- 顶部菜单
- 移动端抽屉菜单
- 当前页面高亮
- Guide / Tools / Locations 分组导航

都会顺很多。
