#!/usr/bin/env node

import { spawn } from 'child_process';

// 测试NPX命令
console.log('Testing NPX configuration...');

const npxProcess = spawn('npx', ['twitter-mcp-js@latest'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    TWITTER_API_KEY: '816574cc53fd4bc792d57e016657277f'
  }
});

// 发送初始化请求
const initRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {
      name: "test",
      version: "1.0.0"
    }
  }
};

npxProcess.stdin.write(JSON.stringify(initRequest) + '\n');

let response = '';
npxProcess.stdout.on('data', (data) => {
  response += data.toString();
  if (response.includes('"jsonrpc"')) {
    try {
      const result = JSON.parse(response);
      console.log('✅ NPX MCP Server Response:', JSON.stringify(result, null, 2));
      npxProcess.kill();
    } catch (e) {
      console.log('Raw response:', response);
    }
  }
});

npxProcess.stderr.on('data', (data) => {
  console.log('stderr:', data.toString());
});

npxProcess.on('close', (code) => {
  console.log(`NPX process exited with code ${code}`);
}); 