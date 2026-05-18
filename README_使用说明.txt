Baozuan 网站询盘后端版本 - 使用说明

这个版本已经新增：
1. 前端表单提交逻辑：assets/inquiry.js
2. Cloudflare Pages Function 后端接口：functions/api/inquiry.js
3. Google Apps Script 邮件 + 表格接收代码：google-apps-script.js

重要：
- GitHub Pages 不能运行 functions/api/inquiry.js。
- 必须部署到 Cloudflare Pages，后端接口 /api/inquiry 才会工作。

上传到 GitHub：
1. 解压这个 zip。
2. 把里面所有内容上传到 GitHub 仓库最外层。
3. 最外层应该包含：index.html、style.css、assets、functions、google-apps-script.js、README_使用说明.txt

Google 表格设置：
1. 打开 Google Sheets，新建一个表格，比如 Baozuan Website Inquiries。
2. 复制表格网址中的 Sheet ID。
   例如：https://docs.google.com/spreadsheets/d/这里就是SHEET_ID/edit
3. 打开 script.google.com，新建 Apps Script。
4. 把 google-apps-script.js 里面的全部代码复制进去。
5. 把 PASTE_YOUR_GOOGLE_SHEET_ID_HERE 替换成你的 Sheet ID。
6. 保存。
7. 部署 → 新建部署 → 类型选择 Web app。
8. Execute as / 执行身份：Me / 我。
9. Who has access / 访问权限：Anyone / 任何人。
10. 部署后复制 Web app URL。

Cloudflare 设置：
1. 打开 Cloudflare Pages 项目。
2. Settings → Environment variables。
3. 添加变量：GOOGLE_SCRIPT_URL
4. 值填写刚刚复制的 Apps Script Web app URL。
5. 保存后，重新部署一次 Cloudflare Pages。

测试：
1. 打开 https://你的域名/api/inquiry
2. 如果显示 Baozuan inquiry API is running，说明 Cloudflare 后端正常。
3. 打开网站表单，填写测试内容并提交。
4. 检查 info@baozuanhardware.com 是否收到邮件。
5. 检查 Google Sheet 是否新增一行。

如果表单显示发送失败：
1. 检查 Cloudflare 是否已经设置 GOOGLE_SCRIPT_URL。
2. 检查 Apps Script 是否部署为 Web app。
3. 检查 Apps Script 权限是否选择 Anyone。
4. 检查 Apps Script 里的 SHEET_ID 是否替换正确。
