# TPA Esports v4 — Complete Database

这是重新设计后的 GitHub Pages 静态赛事数据库。

## 本版重点
- 参考职业赛事官网的信息架构：赛事中心 / 赛程 / 战队 / 排名 / 历届 / 赛事详情 / bracket。
- 54 支 PDF 档案战队全部可浏览。
- PDF 中的 2024–2026 国际赛事结果保留；2013–2023 全球 Competition Finals 城市、年份、冠军、比分、亚军全部进入历史库。
- 四大赛区 CN / Pacific / EMEA / AMER 的冠军历史全部可视化。
- 选手名单全部来自 PDF 当前档案；国籍没有明确记录的选手显示“档案未注明”，不根据姓名猜测。
- 原 PDF 队标做了透明背景、统一尺寸、高清化和锐化处理，避免黑色方框。
- 2026 赛历以 PDF 的 “2026 Competition Calendar” 作为赛季时间轴。
- 未在 PDF 中出现的历史逐场比分不会伪造；页面会明确显示档案缺失。

## 真实数据口径
2013–2023 全球历史来自 PDF 第 15 页 Competition Finals 表；2024–2026 国际赛冠军/亚军/决赛比分来自同页及对应赛事页。具体引用关系见原始 PDF。

## GitHub Pages
上传/替换仓库根目录中的：
- `index.html`
- `app.js`
- `data.js`
- `style.css`
- `assets/`

然后 GitHub Pages 继续使用 `main / (root)`。
