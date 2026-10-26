# Calooartist — 独立网站

已将 www.calooartist.com 的公开作品集迁移为普通 HTML、CSS、JavaScript 网站。页面、图片、GIF、10 段视频和简历 PDF 均在本目录中；运行网站无需 Wix、数据库、npm 包或付费服务。内容来自 2026-10-25 抓取的公开网站。

## 查看网站

直接打开 `index.html` 即可查看首页。部署到服务器后，通过导航浏览各页。完整测试建议运行任意静态文件服务器，例如在本目录执行：

```sh
python3 -m http.server 8000
```

然后打开 http://localhost:8000。

## 免费部署到 GitHub Pages

1. 在自己的 GitHub 账户中建立一个 **Public** 仓库。推荐命名为 `你的用户名.github.io`，也可用 `calooartist` 作为项目仓库名。
2. 用 [GitHub Desktop](https://desktop.github.com/) 将仓库克隆到电脑。
3. 把本目录的**内容**复制到仓库根目录，让 `index.html` 直接位于根目录。包含隐藏文件 `.nojekyll`，不要上传外层文件夹或交付 ZIP。
4. 在 GitHub Desktop 中提交这些文件，再点击 Push origin。视频中有超过 25 MB 的文件，因此使用 GitHub Desktop 或 Git 上传，不要用网页拖拽上传整个站点。
5. 打开仓库的 **Settings → Pages**，Source 选择 **Deploy from a branch**，Branch 选择 **main / (root)**，保存。
6. 等待部署完成，打开 Pages 显示的地址，核对导航、图库、视频和简历。

普通访问网站不需要 Node.js，也不需要构建服务。链接使用相对路径，支持 `用户名.github.io/` 和 `用户名.github.io/calooartist/` 两种部署方式。原来的 `/projects`、`/fishbob`、`/about-1` 等路径均保留为目录，服务器可能自动补充结尾 `/`。

GitHub Free 的 Pages 使用公开仓库，仓库中的作品和视频文件也会公开。当前站点约 276 MB，最大的单文件约 76 MB，低于 GitHub 普通 Git 单文件 100 MiB 和 Pages 发布网站 1 GB 的限制。视频设为点击播放后才加载。GitHub Pages 有流量限额，因此这里的免费托管并非无限流量。

官方说明：[Pages 入门](https://docs.github.com/en/pages/quickstart) · [Pages 限额](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## 继续使用 www.calooartist.com

先让 GitHub Pages 的临时地址正常工作，再切换域名：

1. 在 GitHub 账户中验证域名所有权。
2. 在仓库 **Settings → Pages → Custom domain** 填入 `www.calooartist.com` 并保存。使用分支发布时，GitHub 会在仓库中生成 `CNAME` 文件；之后同步回本地并保留它。
3. 在域名的 DNS 管理处，将 `www` 的 CNAME 指向 `你的用户名.github.io`，不包含协议和仓库路径。
4. 若也希望 `calooartist.com` 生效，为根域名配置 GitHub 官方文档列出的 A 记录。只改网站记录，保留邮箱使用的 MX/TXT 等记录。
5. 等待 DNS 与 HTTPS 检查通过，在 Pages 中开启 Enforce HTTPS。分别检查带 www、不带 www 和旧页面链接。
6. 确认新网站可用并保存原站备份后，再处理 Wix 网站套餐。

GitHub 托管无需付费；保留自己的 `.com` 域名仍需向注册商续费。此次交付未修改域名、DNS 或 Wix 套餐，也未上传到任何 GitHub 仓库。

官方操作依据：[GitHub 自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## 后续修改

- 页面文字、图片顺序及视频信息：编辑 `content.json`，然后在本目录执行 `node build.mjs`，重新生成全部 HTML。此脚本只用 Node 内置模块，无需安装 npm 包。
- 布局、颜色和字体：编辑 `styles.css`。
- 图库放大、视频互斥播放、Read more：编辑 `site.js`。
- 图片、GIF、视频、简历：位于 `assets/`，可替换文件并更新 `content.json`。
- 社交链接、页脚、公共导航：编辑 `build.mjs`，再运行生成命令。
- 也可直接编辑 HTML；下次运行生成脚本会覆盖这些直接修改。

## 与 Wix 版的差异

尽量保留了原有左侧标志与导航、白色背景、作品顺序、粉色栏目标签，以及主要文字和作品图片。图片转为最大边 2400 像素的 WebP，GIF 保留动画，视频保留原 MP4。字体使用设备自带字体，因此字形和换行可能略有差异。

Wix 播放器已替换为浏览器原生播放器。图库可点击放大，用左右按钮或方向键切换，Esc 关闭；原分页图库的所有项目放在同一页。小屏幕改为顶部导航和自适应列。

按迁移时的选择，联系区域保留原 Facebook、Instagram、LinkedIn 链接，移除了依赖 Wix 后端的提交表单。没有添加第三方表单服务、分析脚本或外部字体。关于页的介绍及简历保留原内容，未擅自更新个人信息。

## 验证范围

已检查全部生成页面的本地文件引用、相对链接和 JavaScript 语法；浏览器确认了首页本地视频播放、项目列表、详情页、图库放大/切换/Esc 关闭，以及 390 像素宽度下的首页布局。未逐段播放全部视频，也未在实际手机设备上测试。GitHub 发布和域名 HTTPS 验证需在部署后进行。
