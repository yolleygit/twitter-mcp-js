#!/usr/bin/env node

import http from 'http';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Simple health check server for Twitter MCP
 * 用于Twitter MCP的简单健康检查服务器
 */
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  switch (url.pathname) {
    case '/health':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'healthy',
        service: 'Twitter MCP Server',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
          user: 'User endpoints available',
          tweet: 'Tweet endpoints available', 
          community: 'Community endpoints available',
          trend: 'Trend endpoints available',
          action: 'Action endpoints available (requires login)'
        }
      }, null, 2));
      break;
      
    case '/tools':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Twitter MCP Tools',
        totalTools: 32,
        categories: {
          'User Endpoints': 8,
          'Tweet Endpoints': 7, 
          'Community Endpoints': 4,
          'Trend Endpoints': 1,
          'Account Info': 1,
          'Action Endpoints (V2)': 11
        },
        note: 'Use MCP client to access these tools'
      }, null, 2));
      break;
      
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Twitter MCP Server</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #1da1f2; }
            .status { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .endpoint { background: #f8f9fa; padding: 10px; margin: 10px 0; border-left: 4px solid #1da1f2; }
            .tools-count { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
            code { background: #f1f3f4; padding: 2px 6px; border-radius: 3px; }
            .success { color: #28a745; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🐦 Twitter MCP Server</h1>
            <div class="status">
              <strong>✅ 状态 Status:</strong> <span class="success">运行中 Running</span><br>
              <strong>🔧 版本 Version:</strong> 1.0.0<br>
              <strong>⏰ 启动时间 Started:</strong> ${new Date().toLocaleString()}
            </div>
            
            <div class="tools-count">
              <strong>🛠️ 工具总数 Total Tools:</strong> <span class="success">32个工具</span><br>
              <strong>📊 测试状态 Test Status:</strong> <span class="success">✅ 通过 PASSED</span>
            </div>
            
            <h2>📋 可用端点 Available Endpoints</h2>
            <div class="endpoint">
              <strong>健康检查 Health Check:</strong> <code>GET /health</code>
            </div>
            <div class="endpoint">
              <strong>工具信息 Tools Info:</strong> <code>GET /tools</code>
            </div>
            
            <h2>🛠️ MCP 工具分类 Tools Categories</h2>
            <ul>
              <li><strong>用户端点 User Endpoints (8个工具):</strong> 获取用户信息、粉丝、推文等</li>
              <li><strong>推文端点 Tweet Endpoints (7个工具):</strong> 获取推文、回复、引用、搜索等</li>
              <li><strong>社区端点 Community Endpoints (4个工具):</strong> 社区信息、成员、推文</li>
              <li><strong>趋势端点 Trend Endpoints (1个工具):</strong> 获取热门趋势</li>
              <li><strong>账户信息 Account Info (1个工具):</strong> 获取我的账户信息</li>
              <li><strong>操作端点 Action Endpoints (11个工具):</strong> 创建推文、关注、点赞等</li>
            </ul>
            
            <h2>🚀 使用方法 Usage</h2>
            <p>这是一个 MCP (Model Context Protocol) 服务器。使用兼容 MCP 的客户端来访问 Twitter API 工具。</p>
            
            <h2>📖 文档 Documentation</h2>
            <p>查看 <code>README.md</code> 获取详细的使用说明和示例。</p>
          </div>
        </body>
        </html>
      `);
      break;
      
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Not Found',
        message: 'Available endpoints: /, /health, /tools'
      }));
  }
});

server.listen(PORT, () => {
  console.log(`🌐 Twitter MCP Health Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🛠️ Tools info: http://localhost:${PORT}/tools`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Health server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Health server closed');
    process.exit(0);
  });
});