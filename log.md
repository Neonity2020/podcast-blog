# 开发日志

## 2025-12-26 项目初始化和问题修复

### 1. Git 仓库推送

将项目推送到新的 GitHub 仓库：
- 原仓库：`https://github.com/shutiao-org/shutiao-life.git`
- 新仓库：`https://github.com/Neonity2020/podcast-blog.git`

操作步骤：
```bash
git remote set-url origin https://github.com/Neonity2020/podcast-blog.git
git push -u origin main
```

### 2. 开发服务器启动

使用 Bun 启动开发服务器：
```bash
bun dev
```
服务器运行在：http://localhost:3000/

### 3. 问题修复

#### 问题 1: Hydration 错误
**错误信息：**
```
Hydration failed because the server rendered text didn't match the client.
```

**原因：**
- 服务器端检测到的语言是中文（zh）
- 客户端初始语言是英文（en）
- `LanguageProvider` 使用 `useEffect` 异步设置语言，导致首屏不匹配

**解决方案：**
修改 `src/components/language/provider.tsx`，在渲染前同步设置语言：

```typescript
// 修改前
useEffect(() => {
  if (typeof window !== 'undefined' && language) {
    if (isValidLocale(language)) {
      i18n.changeLanguage(language)
    }
  }
}, [language])

// 修改后
if (language && isValidLocale(language) && i18n.language !== language) {
  i18n.changeLanguage(language)
}
```

**文件：** `src/components/language/provider.tsx`

#### 问题 2: RSS 解析错误
**错误信息：**
```
Cannot read properties of undefined (reading 'image')
```

**原因：**
- RSS feed 返回 500 错误或格式不符合预期
- `channel` 为 undefined 时仍尝试访问 `channel.image`

**解决方案：**
在 `src/lib/podcast.ts` 中添加对 `channel` 的检查：

```typescript
const channel = result.rss?.channel || result.feed

if (!channel) {
  return {
    title: '',
    description: '',
    link: '',
    cover: '',
  }
}

const image = channel.image?.url || channel['itunes:image']?.['@_href']
```

**文件：** `src/lib/podcast.ts:23-31`

#### 问题 3: 空字符串警告
**错误信息：**
```
An empty string ("") was passed to the src attribute.
```

**原因：**
- 当播客没有封面图片时，`cover` 为空字符串
- React 警告不要渲染空字符串的 `src` 属性

**解决方案：**
在 `src/components/podcast/info.tsx` 中添加检查：

```typescript
// PodcastInfoDesktop 组件
if (!cover) {
  return null
}

// PodcastInfoMobile 组件
if (!cover) {
  return null
}
```

**文件：** `src/components/podcast/info.tsx:47-49, 163-165`

#### 问题 4: 环境变量未更新
**问题：**
- 更新 `.env.local` 中的 `VITE_PODCAST_RSS` 后
- 开发服务器仍在使用旧的 RSS URL

**解决方案：**
重启开发服务器以加载新的环境变量：
```bash
# 终止旧服务器
# 重新启动
bun dev
```

### 4. 播客数据配置

#### RSS 订阅地址
更新 `.env.local`：
```env
VITE_PODCAST_RSS="https://feed.xyzfm.space/eemhg343b8gj"
```

#### 播客配置
修改 `src/config/index.tsx`：
- **标题：** 整点薯条吧
- **描述：** 人生的意义就是去码头整点薯条
- **链接：** https://shutiao.life
- **主持人：** Guoqi Sun (https://guoqi.dev)
- **收听平台：**
  - 小宇宙
  - Apple Podcasts
  - Spotify
  - Bilibili
  - YouTube
  - RSS (https://feed.xyzfm.space/eemhg343b8gj)

### 5. 数据加载验证

测试 RSS 解析：
```bash
node test-rss.js
```

**结果：**
- ✅ 标题：整点薯条吧
- ✅ 封面：https://image.xyzcdn.net/Fp3R6Nf0fOq1EvTDjM8vUUPxunwS.png
- ✅ 剧集数：3
  - 002. 我的成长：创业就是要趁早，世界是我们的！
  - 001. 我的奋斗：年轻人一定要出去闯闯，哪怕碰得鼻青脸肿！
  - 000. 开篇词：人生的意义就是去码头整点薯条 🍟

### 6. 调试日志

添加调试日志到 `src/lib/podcast.ts`：
```typescript
console.log('[getPodcast] Fetching RSS from:', env.VITE_PODCAST_RSS)
console.log('[getPodcast] Parsed podcast info:', {
  title: podcastInfo.title,
  cover: podcastInfo.cover,
})
```

**服务器日志输出：**
```
[getPodcast] Fetching RSS from: https://feed.xyzfm.space/eemhg343b8gj
[getPodcast] Parsed podcast info: {
  title: '整点薯条吧',
  cover: 'https://image.xyzcdn.net/Fp3R6Nf0fOq1EvTDjM8vUUPxunwS.png'
}
```

### 7. 最终状态

✅ 所有问题已解决
✅ 开发服务器正常运行
✅ 播客数据成功加载
✅ 页面正常显示

---

## 技术栈

- **框架：** React + Vite
- **路由：** TanStack Router
- **状态管理：** TanStack Store
- **国际化：** react-i18next
- **样式：** Tailwind CSS
- **构建工具：** Vite
- **包管理器：** Bun
- **部署：** Netlify

## 项目结构

```
src/
├── components/       # React 组件
│   ├── cmdk/        # 命令面板
│   ├── common/      # 通用组件
│   ├── episodes/    # 剧集相关组件
│   ├── image-lightbox/  # 图片灯箱
│   ├── language/    # 国际化提供者
│   ├── player/      # 播放器组件
│   ├── podcast/     # 播客相关组件
│   ├── theme/       # 主题切换
│   └── ui/          # UI 组件
├── config/          # 配置文件
├── hooks/           # 自定义 Hooks
├── i18n/            # 国际化配置
├── lib/             # 工具函数
│   └── podcast.ts   # RSS 解析和播客数据获取
├── routes/          # 路由页面
├── stores/          # 状态管理
├── types/           # TypeScript 类型定义
└── env.ts           # 环境变量验证
```

## 环境变量

```env
# 必需：播客的 RSS 订阅地址
VITE_PODCAST_RSS="your-rss-feed-url"

# 可选：Umami 分析
# VITE_UMAMI_SCRIPT="https://analytics.example.com/script.js"
# VITE_UMAMI_WEBSITE_ID="your-website-id"
```