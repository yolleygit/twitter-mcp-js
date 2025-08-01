/**
 * Twitter MCP Tools Definition
 * Defines all available tools with their schemas and descriptions
 */

export function createTwitterTools() {
  return [
    // ==================== User Endpoints ====================
    {
      name: 'twitter_get_user_info',
      description: 'Get user profile information by username (获取用户资料信息)',
      inputSchema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'User\'s screen name (用户名)'
          }
        },
        required: ['userName']
      }
    },
    {
      name: 'twitter_batch_get_users',
      description: 'Batch get user info by user IDs (批量获取用户信息)',
      inputSchema: {
        type: 'object',
        properties: {
          userIds: {
            type: 'string',
            description: 'Comma-separated list of user IDs (用逗号分隔的用户ID列表)'
          }
        },
        required: ['userIds']
      }
    },
    {
      name: 'twitter_get_user_tweets',
      description: 'Get user\'s recent tweets (获取用户最近推文)',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (用户ID)'
          },
          userName: {
            type: 'string',
            description: 'User\'s screen name (用户名)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          },
          includeReplies: {
            type: 'boolean',
            description: 'Include replies (是否包含回复)',
            default: false
          }
        }
      }
    },
    {
      name: 'twitter_get_user_followers',
      description: 'Get user\'s followers (获取用户粉丝)',
      inputSchema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'User\'s screen name (用户名)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          },
          pageSize: {
            type: 'integer',
            description: 'Number of followers per page (分页大小)',
            default: 200
          }
        },
        required: ['userName']
      }
    },
    {
      name: 'twitter_get_user_followings',
      description: 'Get user\'s followings (获取用户关注列表)',
      inputSchema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'User\'s screen name (用户名)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          },
          pageSize: {
            type: 'integer',
            description: 'Number of followings per page (分页大小)',
            default: 200
          }
        },
        required: ['userName']
      }
    },
    {
      name: 'twitter_get_user_mentions',
      description: 'Get tweets mentioning the user (获取提及用户的推文)',
      inputSchema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'User\'s screen name (用户名)'
          },
          sinceTime: {
            type: 'string',
            description: 'Start time filter (ISO8601) (起始时间过滤)'
          },
          untilTime: {
            type: 'string',
            description: 'End time filter (ISO8601) (结束时间过滤)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['userName']
      }
    },
    {
      name: 'twitter_check_follow_relationship',
      description: 'Check if one user follows another (检查关注关系)',
      inputSchema: {
        type: 'object',
        properties: {
          source_user_name: {
            type: 'string',
            description: 'Follower\'s screen name (关注者用户名)'
          },
          target_user_name: {
            type: 'string',
            description: 'Followed user\'s screen name (被关注者用户名)'
          }
        },
        required: ['source_user_name', 'target_user_name']
      }
    },
    {
      name: 'twitter_search_users',
      description: 'Search users by keyword (按关键字搜索用户)',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search keyword (搜索关键字)'
          }
        },
        required: ['query']
      }
    },

    // ==================== Tweet Endpoints ====================
    {
      name: 'twitter_get_tweets',
      description: 'Get tweets by IDs (按ID获取推文)',
      inputSchema: {
        type: 'object',
        properties: {
          tweet_ids: {
            type: 'string',
            description: 'Comma-separated tweet IDs (用逗号分隔的推文ID列表)'
          }
        },
        required: ['tweet_ids']
      }
    },
    {
      name: 'twitter_get_tweet_replies',
      description: 'Get replies to a tweet (获取推文回复)',
      inputSchema: {
        type: 'object',
        properties: {
          tweetId: {
            type: 'string',
            description: 'Tweet ID (推文ID)'
          },
          sinceTime: {
            type: 'string',
            description: 'Start time filter (起始时间过滤)'
          },
          untilTime: {
            type: 'string',
            description: 'End time filter (结束时间过滤)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['tweetId']
      }
    },
    {
      name: 'twitter_get_tweet_quotes',
      description: 'Get quote tweets of a tweet (获取引用推文)',
      inputSchema: {
        type: 'object',
        properties: {
          tweetId: {
            type: 'string',
            description: 'Tweet ID (推文ID)'
          },
          sinceTime: {
            type: 'string',
            description: 'Start time filter (起始时间过滤)'
          },
          untilTime: {
            type: 'string',
            description: 'End time filter (结束时间过滤)'
          },
          includeReplies: {
            type: 'boolean',
            description: 'Include replies (是否包含回复)',
            default: true
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['tweetId']
      }
    },
    {
      name: 'twitter_get_tweet_retweeters',
      description: 'Get users who retweeted a tweet (获取转推用户)',
      inputSchema: {
        type: 'object',
        properties: {
          tweetId: {
            type: 'string',
            description: 'Tweet ID (推文ID)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['tweetId']
      }
    },
    {
      name: 'twitter_get_tweet_thread',
      description: 'Get tweet thread context (获取推文线程上下文)',
      inputSchema: {
        type: 'object',
        properties: {
          tweetId: {
            type: 'string',
            description: 'Tweet ID (推文ID)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['tweetId']
      }
    },
    {
      name: 'twitter_get_article',
      description: 'Get long-form tweet/article (获取长推文/文章)',
      inputSchema: {
        type: 'object',
        properties: {
          tweet_id: {
            type: 'string',
            description: 'Article tweet ID (文章推文ID)'
          }
        },
        required: ['tweet_id']
      }
    },
    {
      name: 'twitter_advanced_search',
      description: 'Advanced search for tweets (高级搜索推文)',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query (搜索词)'
          },
          queryType: {
            type: 'string',
            description: 'Result type: Latest or Top (结果类型)',
            default: 'Latest'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['query']
      }
    },

    // ==================== Community Endpoints ====================
    {
      name: 'twitter_get_community_info',
      description: 'Get community information (获取社区信息)',
      inputSchema: {
        type: 'object',
        properties: {
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          }
        },
        required: ['community_id']
      }
    },
    {
      name: 'twitter_get_community_members',
      description: 'Get community members (获取社区成员)',
      inputSchema: {
        type: 'object',
        properties: {
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          }
        },
        required: ['community_id']
      }
    },
    {
      name: 'twitter_get_community_moderators',
      description: 'Get community moderators (获取社区管理员)',
      inputSchema: {
        type: 'object',
        properties: {
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          }
        },
        required: ['community_id']
      }
    },
    {
      name: 'twitter_get_community_tweets',
      description: 'Get community tweets (获取社区推文)',
      inputSchema: {
        type: 'object',
        properties: {
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          },
          cursor: {
            type: 'string',
            description: 'Pagination cursor (分页游标)'
          }
        },
        required: ['community_id']
      }
    },

    // ==================== Trend Endpoints ====================
    {
      name: 'twitter_get_trends',
      description: 'Get trending topics for a location (获取地区热门趋势)',
      inputSchema: {
        type: 'object',
        properties: {
          woeid: {
            type: 'integer',
            description: 'Where-On-Earth ID (地点ID)'
          },
          count: {
            type: 'integer',
            description: 'Number of trends to return (返回趋势数量)'
          }
        },
        required: ['woeid']
      }
    },

    // ==================== My Account ====================
    {
      name: 'twitter_get_my_info',
      description: 'Get my account information (获取我的账户信息)',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },

    // ==================== Action Endpoints (V2) ====================
    {
      name: 'twitter_login',
      description: 'Login to Twitter account (登录Twitter账户)',
      inputSchema: {
        type: 'object',
        properties: {
          user_name: {
            type: 'string',
            description: 'Username (用户名)'
          },
          email: {
            type: 'string',
            description: 'Email address (邮箱地址)'
          },
          password: {
            type: 'string',
            description: 'Account password (账户密码)'
          },
          totp_secret: {
            type: 'string',
            description: '2FA secret (二次验证秘钥)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['password']
      }
    },
    {
      name: 'twitter_create_tweet',
      description: 'Create a new tweet (创建新推文)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie from login API (登录cookie)'
          },
          tweet_text: {
            type: 'string',
            description: 'Tweet content (推文内容)'
          },
          reply_to_tweet_id: {
            type: 'string',
            description: 'Reply to this tweet ID (回复的推文ID)'
          },
          attachment_url: {
            type: 'string',
            description: 'URL to attach (附件URL)'
          },
          community_id: {
            type: 'string',
            description: 'Community ID to post in (发布到的社区ID)'
          },
          is_note_tweet: {
            type: 'boolean',
            description: 'Whether it is a long note tweet (是否为长推文)'
          },
          media_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Media IDs from upload API (媒体ID列表)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'tweet_text']
      }
    },
    {
      name: 'twitter_send_dm',
      description: 'Send direct message (发送私信)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookie: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          user_id: {
            type: 'string',
            description: 'Recipient user ID (接收者用户ID)'
          },
          text: {
            type: 'string',
            description: 'Message text (消息正文)'
          },
          media_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Media attachments (媒体ID数组)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          },
          reply_to_message_id: {
            type: 'string',
            description: 'Reply to message ID (回复的消息ID)'
          }
        },
        required: ['login_cookie', 'user_id']
      }
    },
    {
      name: 'twitter_retweet',
      description: 'Retweet a tweet (转发推文)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          tweet_id: {
            type: 'string',
            description: 'Tweet ID to retweet (要转发的推文ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'tweet_id']
      }
    },
    {
      name: 'twitter_delete_tweet',
      description: 'Delete a tweet (删除推文)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          tweet_id: {
            type: 'string',
            description: 'Tweet ID to delete (要删除的推文ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'tweet_id']
      }
    },
    {
      name: 'twitter_follow_user',
      description: 'Follow a user (关注用户)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          user_id: {
            type: 'string',
            description: 'User ID to follow (要关注的用户ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'user_id']
      }
    },
    {
      name: 'twitter_unfollow_user',
      description: 'Unfollow a user (取消关注用户)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          user_id: {
            type: 'string',
            description: 'User ID to unfollow (要取消关注的用户ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'user_id']
      }
    },
    {
      name: 'twitter_like_tweet',
      description: 'Like a tweet (点赞推文)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          tweet_id: {
            type: 'string',
            description: 'Tweet ID to like (要点赞的推文ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'tweet_id']
      }
    },
    {
      name: 'twitter_unlike_tweet',
      description: 'Unlike a tweet (取消点赞推文)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookies: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          tweet_id: {
            type: 'string',
            description: 'Tweet ID to unlike (要取消点赞的推文ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookies', 'tweet_id']
      }
    },
    {
      name: 'twitter_create_community',
      description: 'Create a new community (创建社区)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookie: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          name: {
            type: 'string',
            description: 'Community name (社区名称)'
          },
          description: {
            type: 'string',
            description: 'Community description (社区描述)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookie', 'name']
      }
    },
    {
      name: 'twitter_delete_community',
      description: 'Delete a community (删除社区)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookie: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          },
          community_name: {
            type: 'string',
            description: 'Community name (社区名称)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookie', 'community_id']
      }
    },
    {
      name: 'twitter_join_community',
      description: 'Join a community (加入社区)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookie: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookie', 'community_id']
      }
    },
    {
      name: 'twitter_leave_community',
      description: 'Leave a community (退出社区)',
      inputSchema: {
        type: 'object',
        properties: {
          login_cookie: {
            type: 'string',
            description: 'Login cookie (登录cookie)'
          },
          community_id: {
            type: 'string',
            description: 'Community ID (社区ID)'
          },
          proxy: {
            type: 'string',
            description: 'Proxy server (代理服务器)'
          }
        },
        required: ['login_cookie', 'community_id']
      }
    }
  ];
}