# Real Deal

面向初创公司、投资人和人才的专业社交与融资平台。

## 概览

Real Deal 是一个综合性平台，连接初创公司与投资人、公司与人才，促进专业社交网络。平台支持多提供商 OAuth 认证、公司验证、职位管理、VC/YC 融资流程、AI 智能推荐和分层计费等功能。

## 核心功能

### 认证与用户管理
- 多提供商 OAuth/OIDC（微信、Apple、Google、GitHub、LinkedIn）
- 账户合并与绑定
- 安全会话管理
- 基于角色的访问控制

### 职位与招聘
- 职位发布与管理
- 公司简介与认证
- 职位合规与审核
- AI 智能职位匹配

### 融资平台（VC/YC）
- 投资人简介（含可用性信息）
- 创始人 Pitch 页面
- 带访问控制的 Deal Room
- AI 智能投资人-创始人匹配
- 双方同意的介绍机制

### 内容与媒体
- 项目与产品展示
- 博客文章与更新
- 媒体资源管理（MinIO）
- 内容审核

### 计费与配额管理
- 分层存储限制
- 容量包
- 职位配额
- 使用计量与跟踪
- 充值记录

### AI 功能
- 智能推荐
- AI 客服
- 自然语言查询理解
- 内容个性化

### 主题市场
- 自定义主题与皮肤
- 样式标记系统
- 主题验证与审核
- 创作者收益分成

## 技术栈

### 后端
- **语言**: Go 1.23.0
- **框架**: Gin v1.10.1
- **数据库**: MongoDB（主数据库）、Redis（缓存/会话）
- **对象存储**: MinIO v7.0.60
- **消息队列**: NATS 2.10
- **配置**: godotenv

### 前端
- **框架**: Next.js 14.2.4（App Router）
- **UI 库**: React 18.2.0
- **语言**: TypeScript 5.3.3
- **样式**: Tailwind CSS 3.4.3 + CSS 变量

### 基础设施
- **容器化**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **部署**: 已准备好云端部署

## 快速开始

### 前置要求
- Docker & Docker Compose
- Go 1.23+
- Node.js 18+
- Git

### 安装

```bash
# 克隆仓库
git clone <repo-url>
cd real_deal

# 启动基础设施服务
docker-compose up -d mongodb redis minio nats

# 等待服务就绪（10-20秒）
sleep 15

# 初始化数据库
docker-compose --profile seed up seed

# 启动后端服务器（终端 1）
go run cmd/server/main.go

# 启动前端开发服务器（终端 2）
cd web
npm install
npm run dev
```

### 访问地址

- **前端**: http://localhost:3000
- **后端 API**: http://localhost:8080
- **MinIO 控制台**: http://localhost:9001 (miniouser/miniopass123)
- **MongoDB**: mongodb://localhost:27017
- **Redis**: localhost:6379

## 项目结构

```
real_deal/
├── .skills/              # 开发技能（指南）
├── .agents/              # 自动化代理（工具）
├── cmd/                  # 应用入口点
│   ├── server/           # 后端服务器
│   └── seed/            # 数据库初始化
├── internal/            # 内部包
│   ├── config/          # 配置管理
│   ├── db/              # 数据库连接
│   ├── handlers/        # API 路由处理器
│   └── storage/         # MinIO 存储接口
├── web/                 # Next.js 前端
│   ├── app/            # App Router 页面
│   ├── components/      # React 组件
│   └── lib/            # 工具（API 客户端）
├── seeds/               # 初始化数据 JSON 文件
├── scripts/             # 实用脚本
├── docker-compose.yml    # Docker 服务
├── go.mod              # Go 模块定义
├── go.sum              # Go 依赖
└── README.md           # 英文文档
```

## 开发

### 技能与代理

本项目包含专门的技能和代理，用于高效开发：

- [技能](.skills/) - 领域特定的开发指南
- [代理](.agents/) - 自动化工作流和工具

### 后端开发

```bash
# 运行后端服务器
go run cmd/server/main.go

# 运行测试
go test ./...

# 运行带覆盖率的测试
go test -cover ./...

# 格式化代码
gofmt -w .

# 代码检查
golangci-lint run
```

### 前端开发

```bash
cd web

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test

# 类型检查
npx tsc --noEmit
```

### 使用技能

技能提供特定上下文的指导：

- 开发 Go 后端 → `backend-skill` 激活
- 创建 React 组件 → `frontend-skill` 激活
- 实现登录 → `auth-skill` 激活
- 设置计费 → `billing-skill` 激活

### 使用代理

代理自动化常见任务：

```bash
# 代码审查
bash .agents/code-review-agent/scripts/review-all.sh

# 运行所有测试
bash .agents/testing-agent/scripts/run-all-tests.sh

# 生成文档
bash .agents/documentation-agent/scripts/generate-all.sh
```

## API 文档

完整 API 文档请参阅 [API 端点参考](.skills/backend-skill/references/api-endpoints.md)。

### 快速 API 示例

#### 认证
```bash
# 登录
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}' \
  -c cookies.txt

# 获取当前用户
curl http://localhost:8080/api/me -b cookies.txt
```

#### 内容
```bash
# 获取探索内容
curl http://localhost:8080/api/explore

# 获取职位
curl http://localhost:8080/api/jobs

# 获取公司详情
curl http://localhost:8080/api/companies/company_001
```

## 数据库架构

完整的架构文档请参阅 [MongoDB 集合参考](.skills/backend-skill/references/mongodb-collections.md)。

### 主要集合

- `users` - 用户账户和简介
- `projects` - 项目列表
- `products` - 产品列表
- `posts` - 博客文章
- `jobs` - 职位列表
- `companies` - 公司简介
- `pitch_pages` - Pitch 页面
- `deal_rooms` - Deal Room
- `investors` - 投资人简介
- `company_verifications` - 验证记录
- `job_compliance` - 职位合规记录
- `content_moderation` - 内容审核记录

## 测试

### 后端测试

```bash
# 运行所有测试
go test ./... -v

# 运行带覆盖率的测试
go test -cover ./...

# 运行特定包的测试
go test ./internal/handlers -v
```

### 前端测试

```bash
cd web

# 运行测试
npm test

# 运行带覆盖率的测试
npm test -- --coverage

# 运行 E2E 测试
npx playwright test
```

### 使用测试代理

```bash
# 运行所有测试（后端 + 前端）
bash .agents/testing-agent/scripts/run-all-tests.sh

# 生成覆盖率报告
bash .agents/testing-agent/scripts/generate-coverage.sh
```

## 部署

### Docker 部署

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

### 生产部署

1. 配置环境变量
2. 构建 Docker 镜像
3. 运行安全扫描
4. 部署到预发布环境
5. 运行集成测试
6. 部署到生产环境

详细部署指南请参阅 [deployment-agent](.agents/deployment-agent/)。

## 安全

### 最佳实践

- 永不提交密钥或凭证
- 使用环境变量进行配置
- 实施适当的认证和授权
- 验证和清理所有输入
- 生产环境使用 HTTPS
- 定期安全审计

### 安全审计

使用 [security-audit-agent](.agents/security-audit-agent/) 运行安全审计：

```bash
# Go 漏洞扫描
govulncheck ./...

# Node.js 审计
cd web
npm audit

# 运行安全代理
# （参见 security-audit-agent 文档）
```

## 文档

- [技能文档](.skills/README.md) - 完整技能指南
- [代理文档](.agents/) - 自动化工具
- [后端技能](.skills/backend-skill/) - Go 后端开发
- [前端技能](.skills/frontend-skill/) - React/Next.js 开发
- [API 参考](.skills/backend-skill/references/api-endpoints.md)

## 贡献

1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 运行测试：`bash .agents/testing-agent/scripts/run-all-tests.sh`
5. 运行代码审查：`bash .agents/code-review-agent/scripts/review-all.sh`
6. 提交 Pull Request

### 贡献指南

- 遵循现有代码规范
- 为新功能添加测试
- 更新文档
- 运行安全审计
- 确保所有测试通过

## 故障排除

### 常见问题

#### 后端无法启动
```bash
# 检查 MongoDB 是否运行
docker-compose ps

# 检查后端日志
docker-compose logs app

# 重启后端
docker-compose restart app
```

#### 前端构建失败
```bash
cd web
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 数据库连接错误
```bash
# 重启 MongoDB
docker-compose restart mongodb

# 检查 MongoDB 日志
docker-compose logs mongodb

# 验证连接
mongosh mongodb://localhost:27017
```

## 许可证

[在此添加许可证信息]

## 联系方式

获取支持和提问：
- GitHub Issues: [创建问题]
- 邮箱: support@realdeal.com
- 文档: [文档链接]

---

**版本**: 1.0.0
**最后更新**: 2026年1月18日
