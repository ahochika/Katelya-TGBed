# Katelya-TGBed

> 🖼️ 免费图片/文件托管解决方案，基于 Cloudflare Pages 和 Telegram

[English](README-EN.md) | 中文

---

## ✨ 功能特性

- 📦 **无限存储** - 不限数量的图片和文件上传
- 💰 **完全免费** - 托管于 Cloudflare，免费额度内零成本
- 🌐 **免费域名** - 使用 `*.pages.dev` 二级域名，也支持自定义域名
- 🔒 **内容审核** - 可选的图片审核 API，自动屏蔽不良内容
- 📁 **多格式支持** - 图片、视频、音频、文档、压缩包等
- 🚀 **分片上传** - 支持最大 100MB 文件（配合 R2）
- 🎨 **多种视图** - 网格、列表、瀑布流多种管理界面
- 🗂️ **存储分类** - 直观区分 Telegram 和 R2 存储的文件

---

## 🚀 快速部署

### 前置要求

- Cloudflare 账户
- Telegram 账户

### 第一步：获取 Telegram 凭据

1. **获取 Bot Token**
   - 向 [@BotFather](https://t.me/BotFather) 发送 `/newbot`
   - 按提示创建机器人，获得 `BOT_TOKEN`

2. **创建频道并添加机器人**
   - 创建一个新的 Telegram 频道
   - 将机器人添加为频道管理员

3. **获取 Chat ID**
   - 向 [@VersaToolsBot](https://t.me/VersaToolsBot) 或 [@GetTheirIDBot](https://t.me/GetTheirIDBot) 发送消息获取频道 ID

### 第二步：部署到 Cloudflare

1. **Fork 本仓库**

2. **创建 Pages 项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 `Workers 和 Pages` → `创建应用程序` → `Pages` → `连接到 Git`
   - 选择 Fork 的仓库，点击部署

3. **配置环境变量**
   - 进入项目 `设置` → `环境变量`
   - 添加必需变量：

| 变量名 | 说明 | 必需 |
| --- | --- | --- |
| `TG_Bot_Token` | Telegram Bot Token | ✅ |
| `TG_Chat_ID` | Telegram 频道 ID | ✅ |
| `BASIC_USER` | 管理后台用户名 | 可选 |
| `BASIC_PASS` | 管理后台密码 | 可选 |

**重新部署** - 修改环境变量后需重新部署生效

---

## 📦 存储配置

### KV 存储（图片管理）

启用图片管理功能需要配置 KV：

1. 进入 Cloudflare Dashboard → `Workers 和 Pages` → `KV`
2. 点击 `创建命名空间`，命名为 `katelya-tgbed`
3. 进入 Pages 项目 → `设置` → `函数` → `KV 命名空间绑定`
4. 添加绑定：变量名 `img_url`，选择创建的命名空间
5. 重新部署项目

### R2 存储（大文件支持，可选）

配置 R2 可支持最大 100MB 文件上传：

1. **创建存储桶**
   - Cloudflare Dashboard → `R2 对象存储` → `创建存储桶`
   - 命名为 `katelya-files`

2. **绑定到项目**
   - Pages 项目 → `设置` → `函数` → `R2 存储桶绑定`
   - 变量名 `R2_BUCKET`，选择存储桶

3. **启用 R2**
   - `设置` → `环境变量` → 添加 `USE_R2` = `true`
   - 重新部署

---

## 🔧 高级配置

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `ModerateContentApiKey` | 图片审核 API Key（从 [moderatecontent.com](https://moderatecontent.com) 获取） | - |
| `WhiteList_Mode` | 白名单模式，仅白名单图片可加载 | `false` |
| `USE_R2` | 启用 R2 存储 | `false` |
| `disable_telemetry` | 禁用遥测 | - |

---

## 📱 页面说明

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页/上传 | `/` | 批量上传、拖拽、粘贴上传 |
| 图片浏览 | `/gallery.html` | 图片网格浏览 |
| 管理后台 | `/admin.html` | 文件管理、黑白名单 |
| 文件预览 | `/preview.html` | 多格式文件预览 |
| 登录页 | `/login.html` | 后台登录 |

---

## ⚠️ 使用限制

**Cloudflare 免费额度：**

- 每日 100,000 次请求
- KV 每日 1,000 次写入、100,000 次读取、1,000 次列出
- 超出后需升级付费计划（$5/月起）

**Telegram 限制：**

- 通过 Telegram 上传最大 20MB/文件
- 配合 R2 可支持最大 100MB/文件

---

## 🔗 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [问题反馈](https://github.com/katelya77/Katelya-TGBed/issues)

---

## 📄 许可证

MIT License
