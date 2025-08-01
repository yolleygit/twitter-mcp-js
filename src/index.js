#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { TwitterAPI } from './twitter-api.js';
import { createTwitterTools } from './tools.js';

// Load environment variables
dotenv.config();

/**
 * Twitter MCP Server
 * Provides comprehensive Twitter API functionality through MCP protocol
 */
class TwitterMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'twitter-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.twitterAPI = new TwitterAPI({
      apiKey: process.env.TWITTER_API_KEY,
      baseURL: 'https://api.twitterapi.io'
    });

    this.tools = createTwitterTools();
    this.setupHandlers();
  }

  /**
   * Setup MCP request handlers
   */
  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools,
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const result = await this.handleToolCall(name, args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error.message}`
        );
      }
    });
  }

  /**
   * Handle individual tool calls
   * @param {string} name - Tool name
   * @param {object} args - Tool arguments
   * @returns {Promise<object>} Tool execution result
   */
  async handleToolCall(name, args) {
    switch (name) {
      // User Endpoints
      case 'twitter_get_user_info':
        return await this.twitterAPI.getUserInfo(args.userName);
      
      case 'twitter_batch_get_users':
        return await this.twitterAPI.batchGetUsers(args.userIds);
      
      case 'twitter_get_user_tweets':
        return await this.twitterAPI.getUserTweets(args);
      
      case 'twitter_get_user_followers':
        return await this.twitterAPI.getUserFollowers(args);
      
      case 'twitter_get_user_followings':
        return await this.twitterAPI.getUserFollowings(args);
      
      case 'twitter_get_user_mentions':
        return await this.twitterAPI.getUserMentions(args);
      
      case 'twitter_check_follow_relationship':
        return await this.twitterAPI.checkFollowRelationship(args);
      
      case 'twitter_search_users':
        return await this.twitterAPI.searchUsers(args.query);

      // Tweet Endpoints
      case 'twitter_get_tweets':
        return await this.twitterAPI.getTweets(args.tweet_ids);
      
      case 'twitter_get_tweet_replies':
        return await this.twitterAPI.getTweetReplies(args);
      
      case 'twitter_get_tweet_quotes':
        return await this.twitterAPI.getTweetQuotes(args);
      
      case 'twitter_get_tweet_retweeters':
        return await this.twitterAPI.getTweetRetweeters(args);
      
      case 'twitter_get_tweet_thread':
        return await this.twitterAPI.getTweetThread(args);
      
      case 'twitter_get_article':
        return await this.twitterAPI.getArticle(args.tweet_id);
      
      case 'twitter_advanced_search':
        return await this.twitterAPI.advancedSearch(args);

      // Community Endpoints
      case 'twitter_get_community_info':
        return await this.twitterAPI.getCommunityInfo(args.community_id);
      
      case 'twitter_get_community_members':
        return await this.twitterAPI.getCommunityMembers(args.community_id);
      
      case 'twitter_get_community_moderators':
        return await this.twitterAPI.getCommunityModerators(args.community_id);
      
      case 'twitter_get_community_tweets':
        return await this.twitterAPI.getCommunityTweets(args);

      // Trend Endpoints
      case 'twitter_get_trends':
        return await this.twitterAPI.getTrends(args);

      // Account Info
      case 'twitter_get_my_info':
        return await this.twitterAPI.getMyInfo();

      // Action Endpoints (V2)
      case 'twitter_login':
        return await this.twitterAPI.login(args);
      
      case 'twitter_create_tweet':
        return await this.twitterAPI.createTweet(args);
      
      case 'twitter_send_dm':
        return await this.twitterAPI.sendDM(args);
      
      case 'twitter_retweet':
        return await this.twitterAPI.retweet(args);
      
      case 'twitter_delete_tweet':
        return await this.twitterAPI.deleteTweet(args);
      
      case 'twitter_follow_user':
        return await this.twitterAPI.followUser(args);
      
      case 'twitter_unfollow_user':
        return await this.twitterAPI.unfollowUser(args);
      
      case 'twitter_like_tweet':
        return await this.twitterAPI.likeTweet(args);
      
      case 'twitter_unlike_tweet':
        return await this.twitterAPI.unlikeTweet(args);
      
      case 'twitter_create_community':
        return await this.twitterAPI.createCommunity(args);
      
      case 'twitter_delete_community':
        return await this.twitterAPI.deleteCommunity(args);
      
      case 'twitter_join_community':
        return await this.twitterAPI.joinCommunity(args);
      
      case 'twitter_leave_community':
        return await this.twitterAPI.leaveCommunity(args);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  /**
   * Start the MCP server
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Twitter MCP server running on stdio');
  }
}

// Start the server
const server = new TwitterMCPServer();
server.run().catch(console.error);