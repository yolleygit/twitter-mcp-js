# Twitter MCP Server
[![npm version](https://img.shields.io/npm/v/twitter-mcp-js)](https://www.npmjs.com/package/twitter-mcp-js)
[![GitHub license](https://img.shields.io/github/license/yolleygit/twitter-mcp-js)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yolleygit/twitter-mcp-js?style=social)](https://github.com/yolleygit/twitter-mcp-js/stargazers)

一个完整的Twitter API MCP服务器，基于twitterapi.io提供的API端点实现。

## 功能特性 / Features

### 用户端点 / User Endpoints
- ✅ 获取用户信息 / Get user info
- ✅ 批量获取用户信息 / Batch get users
- ✅ 获取用户推文 / Get user tweets
- ✅ 获取用户粉丝 / Get user followers
- ✅ 获取用户关注列表 / Get user followings
- ✅ 获取用户提及 / Get user mentions
- ✅ 检查关注关系 / Check follow relationship
- ✅ 搜索用户 / Search users

### 推文端点 / Tweet Endpoints
- ✅ 按ID获取推文 / Get tweets by IDs
- ✅ 获取推文回复 / Get tweet replies
- ✅ 获取引用推文 / Get tweet quotes
- ✅ 获取转推用户 / Get tweet retweeters
- ✅ 获取推文线程 / Get tweet thread
- ✅ 获取长推文/文章 / Get articles
- ✅ 高级搜索 / Advanced search

### 社区端点 / Community Endpoints
- ✅ 获取社区信息 / Get community info
- ✅ 获取社区成员 / Get community members
- ✅ 获取社区管理员 / Get community moderators
- ✅ 获取社区推文 / Get community tweets

### 趋势端点 / Trend Endpoints
- ✅ 获取地区热门趋势 / Get trending topics

### 账户信息 / Account Info
- ✅ 获取我的账户信息 / Get my account info

### 操作端点 (V2) / Action Endpoints (V2)
- ✅ 登录 / Login
- ✅ 创建推文 / Create tweet
- ✅ 发送私信 / Send DM
- ✅ 转发推文 / Retweet
- ✅ 删除推文 / Delete tweet
- ✅ 关注用户 / Follow user
- ✅ 取消关注 / Unfollow user
- ✅ 点赞推文 / Like tweet
- ✅ 取消点赞 / Unlike tweet
- ✅ 创建社区 / Create community
- ✅ 删除社区 / Delete community
- ✅ 加入社区 / Join community
- ✅ 退出社区 / Leave community

## 安装 / Installation

1. 克隆项目 / Clone the repository:
```bash
git clone <repository-url>
cd twitter-mcp-js

```

2. 安装依赖 / Install dependencies:
```bash
npm install
```

3. 配置环境变量 / Configure environment variables:
```bash
cp .env.example .env
# 编辑 .env 文件，添加你的 Twitter API 密钥
# Edit .env file and add your Twitter API key
```

## 配置 / Configuration

在 `.env` 文件中配置以下变量 / Configure the following variables in `.env`:

```env
# Twitter API Configuration
TWITTER_API_KEY=your_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

## 使用方法 / Usage

### 启动服务器 / Start the server

```bash
# 开发模式 / Development mode
npm run dev

# 生产模式 / Production mode
npm start
```

### MCP客户端配置 / MCP Client Configuration

#### 本地开发配置 / Local Development Configuration
适用于本地开发和调试 / For local development and debugging:

```json
{
  "$schema": "https://github.com/modelcontextprotocol/specification/blob/main/schema/mcp_config_schema.json",
  "description": "Twitter MCP Server Configuration for Local Development",
  "mcpServers": {
    "twitter-mcp-server": {
      "command": "node",
      "args": ["/path/to/twitter-mcp-js/src/index.js"],
      "env": {
        "TWITTER_API_KEY": "your_twitter_api_key_here"
      },
      "description": "Complete Twitter API integration with 32 tools for social media automation",
      "capabilities": {
        "tools": true
      }
    }
  }
}
```

#### NPX远程配置 / NPX Remote Configuration
适用于快速部署和测试 / For quick deployment and testing:

```json
{
  "$schema": "https://github.com/modelcontextprotocol/specification/blob/main/schema/mcp_config_schema.json",
  "description": "Twitter MCP Server Configuration using NPX",
  "mcpServers": {
    "twitter-mcp-server": {
      "command": "npx",
      "args": ["twitter-mcp-js"],
      "env": {
        "TWITTER_API_KEY": "your_api_key_here"
      },
      "description": "Twitter MCP Server - Complete Twitter API integration with 32 tools for social media automation and analytics"
    }
  }
}
```

## API使用示例 / API Usage Examples

### 获取用户信息 / Get User Info
```javascript
// 通过MCP调用
{
  "tool": "twitter_get_user_info",
  "arguments": {
    "userName": "elonmusk"
  }
}
```

### 搜索推文 / Search Tweets
```javascript
{
  "tool": "twitter_advanced_search",
  "arguments": {
    "query": "AI technology",
    "queryType": "Latest"
  }
}
```

### 创建推文 / Create Tweet
```javascript
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "Hello from MCP!"
  }
}
```

## 项目结构 / Project Structure

```
twitter-mcp-js/
├── src/
│   ├── index.js          # MCP服务器主文件 / Main MCP server
│   ├── twitter-api.js    # Twitter API客户端 / Twitter API client
│   ├── tools.js          # 工具定义 / Tool definitions
│   └── health-server.js  # 健康检查服务器 / Health check server
├── .github/
│   └── workflows/
│       └── security.yml  # 安全扫描工作流 / Security scan workflow
├── mcp-config-local.json # 本地开发配置 / Local development config
├── mcp-config-npx.json   # NPX远程配置 / NPX remote config
├── examples.md           # 详细使用示例 / Detailed examples
├── twitterapi_io.md      # API文档参考 / API documentation
├── package.json          # 项目配置 / Project configuration
├── README.md            # 项目文档 / Project documentation
└── LICENSE              # 许可证 / License
```

## 错误处理 / Error Handling

服务器包含完整的错误处理机制 / The server includes comprehensive error handling:

- API请求错误 / API request errors
- 参数验证错误 / Parameter validation errors
- 网络连接错误 / Network connection errors
- 认证错误 / Authentication errors

## 开发指南 / Development Guide

### 添加新工具 / Adding New Tools

1. 在 `src/tools.js` 中定义工具schema / Define tool schema in `src/tools.js`
2. 在 `src/twitter-api.js` 中实现API方法 / Implement API method in `src/twitter-api.js`
3. 在 `src/index.js` 中添加工具处理逻辑 / Add tool handling logic in `src/index.js`

### 代码规范 / Code Standards

- 使用ES6+ 语法 / Use ES6+ syntax
- 遵循JSDoc注释规范 / Follow JSDoc comment standards
- 保持代码模块化和可测试性 / Keep code modular and testable

## 许可证 / License

MIT License

## 贡献 / Contributing

欢迎提交Issue和Pull Request / Issues and Pull Requests are welcome!

## 支持 / Support

如有问题，请查看 / For issues, please check:
1. API文档 / API documentation
2. 环境变量配置 / Environment variable configuration
3. 网络连接状态 / Network connection status
4. API密钥有效性 / API key validity