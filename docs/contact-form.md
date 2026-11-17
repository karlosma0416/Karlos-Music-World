# Contact 留言表单

本机可预览三语表单；未配置时发送按钮禁用，不会发送或伪造成功状态。

## 接通邮件

1. 在 Formspree 创建表单，将收件人设为 <mahaoyanghk@outlook.com>，并自行完成邮箱验证。
2. 获取公开的表单地址（<https://formspree.io/f/> 加表单 ID），不需要 Outlook 密码或私密 API key。
3. 已将用户提供的公开地址 <https://formspree.io/f/xoeddjkr> 配置在 src/data/site.ts 的 messageEndpoint；更改后须重新构建。地址公开是正常设计，不是私密密钥。
4. 可使用构建环境变量 NEXT_PUBLIC_FORMSPREE_ENDPOINT 覆盖默认地址；空字符串可禁用发送。不必修改 GitHub Pages 工作流即可使用默认配置，本次未修改部署设置。
5. 在服务端控制台启用适用的垃圾过滤、来源域名限制及配额提醒；隐藏字段仅为辅助防护。
6. 获得授权后使用测试信息提交一次，确认 Formspree 接收及 Outlook 实际收信（包括垃圾邮件目录）。

表单直接发送到 Formspree；姓名、邮箱、留言均不保存在站点或 localStorage。
匿名开关开启时隐藏并禁用姓名、邮箱，提交时再次剔除这两个字段，携带 anonymous=yes；留言及同意选项仍必填。关闭匿名可恢复尚未提交的姓名、邮箱；成功后清空并恢复普通模式。
匿名仅指不提交姓名、邮箱，不能回信；Formspree 仍可能记录 IP 等技术资料，并非完全匿名。
失败或超时保留输入；只有收到服务成功确认才清空表单。超时不代表服务一定未接收。
不要在真实服务配置前宣称已完成端到端收信测试。
