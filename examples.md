# Twitter MCP 使用示例 / Usage Examples

本文档提供了Twitter MCP服务器的详细使用示例。

## 基础配置 / Basic Configuration

### 1. 环境变量配置 / Environment Setup

```bash
# .env 文件
TWITTER_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### 2. MCP客户端配置 / MCP Client Configuration

```json
{
  "mcpServers": {
    "twitter": {
      "command": "node",
      "args": ["/path/to/Twitter_MCP/src/index.js"],
      "env": {
        "TWITTER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## 用户相关操作 / User Operations

### 获取用户信息 / Get User Information

```javascript
// 获取单个用户信息
{
  "tool": "twitter_get_user_info",
  "arguments": {
    "userName": "elonmusk"
  }
}

// 批量获取用户信息
{
  "tool": "twitter_batch_get_users",
  "arguments": {
    "userIds": "44196397,813286,783214"
  }
}
```

### 获取用户推文 / Get User Tweets

```javascript
// 获取用户最新推文
{
  "tool": "twitter_get_user_tweets",
  "arguments": {
    "userName": "elonmusk",
    "includeReplies": false
  }
}

// 获取用户推文（包含回复）
{
  "tool": "twitter_get_user_tweets",
  "arguments": {
    "userId": "44196397",
    "includeReplies": true,
    "cursor": "next_page_token"
  }
}
```

### 获取关注关系 / Get Follow Relationships

```javascript
// 获取粉丝列表
{
  "tool": "twitter_get_user_followers",
  "arguments": {
    "userName": "elonmusk",
    "pageSize": 50
  }
}

// 获取关注列表
{
  "tool": "twitter_get_user_followings",
  "arguments": {
    "userName": "elonmusk",
    "pageSize": 100
  }
}

// 检查关注关系
{
  "tool": "twitter_check_follow_relationship",
  "arguments": {
    "source_user_name": "user1",
    "target_user_name": "user2"
  }
}
```

### 搜索用户 / Search Users

```javascript
{
  "tool": "twitter_search_users",
  "arguments": {
    "query": "AI researcher"
  }
}
```

## 推文相关操作 / Tweet Operations

### 获取推文信息 / Get Tweet Information

```javascript
// 按ID获取推文
{
  "tool": "twitter_get_tweets",
  "arguments": {
    "tweet_ids": "1234567890,9876543210"
  }
}

// 获取推文回复
{
  "tool": "twitter_get_tweet_replies",
  "arguments": {
    "tweetId": "1234567890",
    "sinceTime": "2024-01-01T00:00:00Z"
  }
}

// 获取引用推文
{
  "tool": "twitter_get_tweet_quotes",
  "arguments": {
    "tweetId": "1234567890",
    "includeReplies": true
  }
}
```

### 获取推文互动 / Get Tweet Interactions

```javascript
// 获取转推用户
{
  "tool": "twitter_get_tweet_retweeters",
  "arguments": {
    "tweetId": "1234567890"
  }
}

// 获取推文线程
{
  "tool": "twitter_get_tweet_thread",
  "arguments": {
    "tweetId": "1234567890"
  }
}
```

### 搜索推文 / Search Tweets

```javascript
// 高级搜索
{
  "tool": "twitter_advanced_search",
  "arguments": {
    "query": "AI technology",
    "queryType": "Latest"
  }
}

// 搜索热门推文
{
  "tool": "twitter_advanced_search",
  "arguments": {
    "query": "machine learning",
    "queryType": "Top"
  }
}
```

### 获取长推文 / Get Articles

```javascript
{
  "tool": "twitter_get_article",
  "arguments": {
    "tweet_id": "1234567890"
  }
}
```

## 社区相关操作 / Community Operations

### 获取社区信息 / Get Community Information

```javascript
// 获取社区基本信息
{
  "tool": "twitter_get_community_info",
  "arguments": {
    "community_id": "1234567890"
  }
}

// 获取社区成员
{
  "tool": "twitter_get_community_members",
  "arguments": {
    "community_id": "1234567890"
  }
}

// 获取社区管理员
{
  "tool": "twitter_get_community_moderators",
  "arguments": {
    "community_id": "1234567890"
  }
}

// 获取社区推文
{
  "tool": "twitter_get_community_tweets",
  "arguments": {
    "community_id": "1234567890"
  }
}
```

## 趋势分析 / Trend Analysis

### 获取热门趋势 / Get Trending Topics

```javascript
// 获取全球趋势
{
  "tool": "twitter_get_trends",
  "arguments": {
    "woeid": 1,
    "count": 10
  }
}

// 获取特定地区趋势
{
  "tool": "twitter_get_trends",
  "arguments": {
    "woeid": 2487956,  // 旧金山
    "count": 20
  }
}
```

## 账户操作 / Account Operations

### 获取账户信息 / Get Account Info

```javascript
{
  "tool": "twitter_get_my_info",
  "arguments": {}
}
```

### 登录操作 / Login Operations

```javascript
// 用户名密码登录
{
  "tool": "twitter_login",
  "arguments": {
    "user_name": "your_username",
    "password": "your_password"
  }
}

// 邮箱登录
{
  "tool": "twitter_login",
  "arguments": {
    "email": "your_email@example.com",
    "password": "your_password"
  }
}

// 带2FA的登录
{
  "tool": "twitter_login",
  "arguments": {
    "user_name": "your_username",
    "password": "your_password",
    "totp_secret": "your_2fa_secret"
  }
}
```

## 发布和互动操作 / Publishing and Interaction Operations

### 创建推文 / Create Tweets

```javascript
// 发布简单推文
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "Hello from Twitter MCP! 🚀"
  }
}

// 回复推文
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "Great point! Thanks for sharing.",
    "reply_to_tweet_id": "1234567890"
  }
}

// 发布长推文
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "This is a long-form tweet with detailed content...",
    "is_note_tweet": true
  }
}

// 发布到社区
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "Community update!",
    "community_id": "1234567890"
  }
}
```

### 互动操作 / Interaction Operations

```javascript
// 转发推文
{
  "tool": "twitter_retweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_id": "1234567890"
  }
}

// 点赞推文
{
  "tool": "twitter_like_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_id": "1234567890"
  }
}

// 取消点赞
{
  "tool": "twitter_unlike_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_id": "1234567890"
  }
}

// 删除推文
{
  "tool": "twitter_delete_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_id": "1234567890"
  }
}
```

### 关注操作 / Follow Operations

```javascript
// 关注用户
{
  "tool": "twitter_follow_user",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "user_id": "44196397"
  }
}

// 取消关注
{
  "tool": "twitter_unfollow_user",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "user_id": "44196397"
  }
}
```

### 私信操作 / Direct Message Operations

```javascript
// 发送私信
{
  "tool": "twitter_send_dm",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "user_id": "44196397",
    "text": "Hello! Thanks for the follow."
  }
}

// 回复私信
{
  "tool": "twitter_send_dm",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "user_id": "44196397",
    "text": "You're welcome!",
    "reply_to_message_id": "message_123"
  }
}
```

### 社区管理 / Community Management

```javascript
// 创建社区
{
  "tool": "twitter_create_community",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "name": "AI Enthusiasts",
    "description": "A community for AI researchers and enthusiasts"
  }
}

// 加入社区
{
  "tool": "twitter_join_community",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "community_id": "1234567890"
  }
}

// 退出社区
{
  "tool": "twitter_leave_community",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "community_id": "1234567890"
  }
}

// 删除社区
{
  "tool": "twitter_delete_community",
  "arguments": {
    "login_cookie": "your_login_cookie",
    "community_id": "1234567890",
    "community_name": "AI Enthusiasts"
  }
}
```

## 高级用法 / Advanced Usage

### 分页处理 / Pagination Handling

```javascript
// 第一页
let response1 = {
  "tool": "twitter_get_user_tweets",
  "arguments": {
    "userName": "elonmusk"
  }
};

// 使用返回的cursor获取下一页
let response2 = {
  "tool": "twitter_get_user_tweets",
  "arguments": {
    "userName": "elonmusk",
    "cursor": "cursor_from_previous_response"
  }
};
```

### 时间过滤 / Time Filtering

```javascript
// 获取特定时间范围的提及
{
  "tool": "twitter_get_user_mentions",
  "arguments": {
    "userName": "elonmusk",
    "sinceTime": "2024-01-01T00:00:00Z",
    "untilTime": "2024-01-31T23:59:59Z"
  }
}
```

### 代理使用 / Proxy Usage

```javascript
// 使用代理进行操作
{
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "your_login_cookie",
    "tweet_text": "Tweet via proxy",
    "proxy": "http://proxy-server:port"
  }
}
```

## 错误处理 / Error Handling

### 常见错误类型 / Common Error Types

1. **API密钥错误** / API Key Error
```json
{
  "error": "Twitter API Error: Invalid API key"
}
```

2. **用户不存在** / User Not Found
```json
{
  "error": "Twitter API Error: User not found"
}
}
```

3. **推文不存在** / Tweet Not Found
```json
{
  "error": "Twitter API Error: Tweet not found"
}
}
```

4. **登录凭证过期** / Login Credentials Expired
```json
{
  "error": "Twitter API Error: Login credentials expired"
}
}
```

### 最佳实践 / Best Practices

1. **API限制** / API Rate Limits
   - 合理控制请求频率
   - 使用分页避免大量数据请求
   - 缓存常用数据

2. **错误重试** / Error Retry
   - 实现指数退避重试机制
   - 区分临时错误和永久错误
   - 记录错误日志便于调试

3. **数据处理** / Data Processing
   - 验证返回数据的完整性
   - 处理空值和异常数据
   - 适当的数据转换和格式化

4. **安全考虑** / Security Considerations
   - 安全存储API密钥和登录凭证
   - 使用HTTPS传输敏感数据
   - 定期更新登录凭证

## 完整工作流示例 / Complete Workflow Examples

### 社交媒体监控 / Social Media Monitoring

```javascript
// 1. 搜索相关推文
const searchResult = {
  "tool": "twitter_advanced_search",
  "arguments": {
    "query": "your_brand_name",
    "queryType": "Latest"
  }
};

// 2. 获取推文详情
const tweetDetails = {
  "tool": "twitter_get_tweets",
  "arguments": {
    "tweet_ids": "tweet_ids_from_search"
  }
};

// 3. 获取推文作者信息
const authorInfo = {
  "tool": "twitter_get_user_info",
  "arguments": {
    "userName": "author_username"
  }
};

// 4. 获取推文互动数据
const interactions = {
  "tool": "twitter_get_tweet_replies",
  "arguments": {
    "tweetId": "tweet_id"
  }
};
```

### 内容发布工作流 / Content Publishing Workflow

```javascript
// 1. 登录账户
const login = {
  "tool": "twitter_login",
  "arguments": {
    "user_name": "your_username",
    "password": "your_password"
  }
};

// 2. 发布主推文
const mainTweet = {
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "login_cookie_from_step1",
    "tweet_text": "Main tweet content"
  }
};

// 3. 发布回复推文（线程）
const replyTweet = {
  "tool": "twitter_create_tweet",
  "arguments": {
    "login_cookies": "login_cookie_from_step1",
    "tweet_text": "Reply tweet content",
    "reply_to_tweet_id": "main_tweet_id_from_step2"
  }
};

// 4. 监控互动
const checkReplies = {
  "tool": "twitter_get_tweet_replies",
  "arguments": {
    "tweetId": "main_tweet_id_from_step2"
  }
};
```

这些示例展示了Twitter MCP服务器的强大功能和灵活性。根据你的具体需求，可以组合使用这些工具来实现复杂的Twitter自动化任务。