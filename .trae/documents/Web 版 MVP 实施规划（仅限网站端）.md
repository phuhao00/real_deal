## 目标
- 在无真实用户数据的情况下，构造高质量测试数据，全部落库（MongoDB）并通过后端 API 提供给前端展示；绝不在前端写死。
- 同步准备对象存储中的示例图片/视频（MinIO 本地），并与数据库媒体元数据关联。

## 数据与媒体类型（覆盖核心场景）
- 用户与身份：求职者/招聘者/企业管理员的用户档案，部分绑定第三方登录（provider/subject/email_verified）。
- 公司与认证：2–3 家示例公司（含执照字段占位、域名/企业邮箱验证状态、认证等级）。
- 内容与媒体：
  - `media_assets`：示例照片（多分辨率）、短视频（30–60s）、封面与字幕文件；指纹与来源字段。
  - `projects`/`products`：作品/产品卡片与详情，技术栈/里程碑/成果。
  - `posts`：短帖/长文，含标签与引用关系。
- 职位与申请：
  - `jobs`：不同行业/职级/地点/薪资范围、合同类型、合规状态；
  - `applications`：对话式申请样例（对话摘要/预约记录）。
- VC/YC 模块：
  - `investor_profiles`：投资论点/阶段/额度/地域偏好；
  - `pitch_pages` 与 `deal_room`：水印/审计占位、NDA 状态字段。
- AI/RAG：
  - `kb_chunks`：从示例页面生成的文段与来源；
  - `citations` 与 `feedbacks`：引用与纠错样例。
- 互动与通信：`follows`、`likes`、`comments`、`bookmarks`、`inbox_items`、`notification_preferences`；默认静默与安静时段设定。
- 计费与用量：`usage_meters`、`quotas`、`capacity_packs`、`charge_records`、`job_slots`；免费基线与示例容量包/职位包记录。

## 数据生成与落库
- 种子目录：`/seeds` 存放 JSON/YAML fixture（易读可审）；
- Go 种子程序：`cmd/seed` 读取 fixture → 校验 → 幂等写入 MongoDB（以唯一键去重，如 `external_id`）；
- 媒体上载：
  - 本地 MinIO：通过 `minio-go` SDK 批量上传示例图片/视频/字幕；
  - 将对象键/URL 写入 `media_assets` 并回填引用到 `projects/products/posts`；
- 可选生成：若无视频样本，使用 `ffmpeg` 生成占位视频（色卡+字幕），保障流程可测。

## 后端 API（只读展示为主）
- 列表与检索：
  - `/api/explore`：聚合热门作品/产品/公司/职位（分页）。
  - `/api/users/:id`、`/api/companies/:id`：基础档案与媒体关联。
  - `/api/projects`、`/api/products`、`/api/posts`：分页/筛选（标签/技能/行业）。
  - `/api/jobs`：职位查询（地点/职级/技能/薪资范围）。
- 详情：`/api/projects/:id`、`/api/products/:id`、`/api/posts/:id`、`/api/jobs/:id`。
- 媒体：`/api/media/:id` 返回元数据与可访问 URL（签名/公开策略按配置）。
- 合规与认证（样例只读）：`/api/company-verifications/:companyId`、`/api/job-compliance/:jobId`、`/api/content-moderation/:id`。
- 通信与偏好：`/api/inbox`、`/api/notification-preferences`（默认静默）。
- 用量与计费：`/api/usage`、`/api/quota`、`/api/capacity-packs`、`/api/job-slots`、`/api/charges`。

## 环境与配置
- 本地：Docker Compose 启动 MongoDB/Redis/MinIO/NATS/FFmpeg；`SEED_MODE=local` 控制种子程序运行；
- 存储与队列：统一接口抽象，切换 MinIO→S3/OSS、NATS→RabbitMQ 只改环境变量；
- 密钥：全部走环境变量（ `.env.local` ），不在代码中硬编码。

## 验收
- 前端页面全部通过 API 获取数据，无任何静态写死；
- 媒体对象与数据库关联一致，示例图片/视频可正常加载与播放；
- 列表/详情/检索接口分页与筛选可用；
- 用量与计费、认证与合规、通信偏好接口返回示例数据；
- 种子程序幂等可重复执行（不产生重复记录）。

如认可该“数据在库＋API 驱动＋MinIO 媒体”的本地测试数据方案，我将继续输出 fixture 结构规范、种子程序字段约定与示例 API 响应格式草案，以便进入实现阶段。