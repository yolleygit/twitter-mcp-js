import axios from 'axios';

/**
 * Twitter API Client
 * Implements all Twitter API endpoints as documented in twitterapi.io
 */
export class TwitterAPI {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://api.twitterapi.io';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Make API request with error handling
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters or request body
   * @returns {Promise<object>} API response
   */
  async makeRequest(method, endpoint, params = {}) {
    try {
      const config = {
        method,
        url: endpoint
      };

      if (method.toLowerCase() === 'get') {
        config.params = params;
      } else {
        config.data = params;
      }

      const response = await this.client(config);
      return response.data;
    } catch (error) {
      throw new Error(`Twitter API Error: ${error.response?.data?.msg || error.message}`);
    }
  }

  // ==================== User Endpoints ====================

  /**
   * Get user info by username
   * @param {string} userName - User's screen name
   * @returns {Promise<object>} User profile information
   */
  async getUserInfo(userName) {
    return await this.makeRequest('GET', '/twitter/user/info', { userName });
  }

  /**
   * Batch get user info by user IDs
   * @param {string} userIds - Comma-separated user IDs
   * @returns {Promise<object>} Multiple user profiles
   */
  async batchGetUsers(userIds) {
    return await this.makeRequest('GET', '/twitter/user/batch_info_by_ids', { userIds });
  }

  /**
   * Get user's recent tweets
   * @param {object} params - Request parameters
   * @returns {Promise<object>} User's tweets
   */
  async getUserTweets(params) {
    const { userId, userName, cursor, includeReplies = false } = params;
    return await this.makeRequest('GET', '/twitter/user/last_tweets', {
      userId,
      userName,
      cursor,
      includeReplies
    });
  }

  /**
   * Get user's followers
   * @param {object} params - Request parameters
   * @returns {Promise<object>} User's followers
   */
  async getUserFollowers(params) {
    const { userName, cursor, pageSize = 200 } = params;
    return await this.makeRequest('GET', '/twitter/user/followers', {
      userName,
      cursor,
      pageSize
    });
  }

  /**
   * Get user's followings
   * @param {object} params - Request parameters
   * @returns {Promise<object>} User's followings
   */
  async getUserFollowings(params) {
    const { userName, cursor, pageSize = 200 } = params;
    return await this.makeRequest('GET', '/twitter/user/followings', {
      userName,
      cursor,
      pageSize
    });
  }

  /**
   * Get mentions of a user
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Mentions
   */
  async getUserMentions(params) {
    const { userName, sinceTime, untilTime, cursor } = params;
    return await this.makeRequest('GET', '/twitter/user/mentions', {
      userName,
      sinceTime,
      untilTime,
      cursor
    });
  }

  /**
   * Check follow relationship between users
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Follow relationship status
   */
  async checkFollowRelationship(params) {
    const { source_user_name, target_user_name } = params;
    return await this.makeRequest('GET', '/twitter/user/check_follow_relationship', {
      source_user_name,
      target_user_name
    });
  }

  /**
   * Search users by keyword
   * @param {string} query - Search keyword
   * @returns {Promise<object>} Search results
   */
  async searchUsers(query) {
    return await this.makeRequest('GET', '/twitter/user/search', { query });
  }

  // ==================== Tweet Endpoints ====================

  /**
   * Get tweets by IDs
   * @param {string} tweet_ids - Comma-separated tweet IDs
   * @returns {Promise<object>} Tweet information
   */
  async getTweets(tweet_ids) {
    return await this.makeRequest('GET', '/twitter/tweets', { tweet_ids });
  }

  /**
   * Get tweet replies
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Tweet replies
   */
  async getTweetReplies(params) {
    const { tweetId, sinceTime, untilTime, cursor } = params;
    return await this.makeRequest('GET', '/twitter/tweet/replies', {
      tweetId,
      sinceTime,
      untilTime,
      cursor
    });
  }

  /**
   * Get tweet quotes
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Tweet quotes
   */
  async getTweetQuotes(params) {
    const { tweetId, sinceTime, untilTime, includeReplies = true, cursor } = params;
    return await this.makeRequest('GET', '/twitter/tweet/quotes', {
      tweetId,
      sinceTime,
      untilTime,
      includeReplies,
      cursor
    });
  }

  /**
   * Get tweet retweeters
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Users who retweeted
   */
  async getTweetRetweeters(params) {
    const { tweetId, cursor } = params;
    return await this.makeRequest('GET', '/twitter/tweet/retweeters', {
      tweetId,
      cursor
    });
  }

  /**
   * Get tweet thread context
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Thread context
   */
  async getTweetThread(params) {
    const { tweetId, cursor } = params;
    return await this.makeRequest('GET', '/twitter/tweet/thread_context', {
      tweetId,
      cursor
    });
  }

  /**
   * Get article (long-form tweet)
   * @param {string} tweet_id - Article tweet ID
   * @returns {Promise<object>} Article content
   */
  async getArticle(tweet_id) {
    return await this.makeRequest('GET', '/twitter/article', { tweet_id });
  }

  /**
   * Advanced search for tweets
   * @param {object} params - Search parameters
   * @returns {Promise<object>} Search results
   */
  async advancedSearch(params) {
    const { query, queryType = 'Latest', cursor } = params;
    return await this.makeRequest('GET', '/twitter/tweet/advanced_search', {
      query,
      queryType,
      cursor
    });
  }

  // ==================== Community Endpoints ====================

  /**
   * Get community info
   * @param {string} community_id - Community ID
   * @returns {Promise<object>} Community information
   */
  async getCommunityInfo(community_id) {
    return await this.makeRequest('GET', '/twitter/community/info', { community_id });
  }

  /**
   * Get community members
   * @param {string} community_id - Community ID
   * @returns {Promise<object>} Community members
   */
  async getCommunityMembers(community_id) {
    return await this.makeRequest('GET', '/twitter/community/members', { community_id });
  }

  /**
   * Get community moderators
   * @param {string} community_id - Community ID
   * @returns {Promise<object>} Community moderators
   */
  async getCommunityModerators(community_id) {
    return await this.makeRequest('GET', '/twitter/community/moderators', { community_id });
  }

  /**
   * Get community tweets
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Community tweets
   */
  async getCommunityTweets(params) {
    const { community_id, cursor } = params;
    return await this.makeRequest('GET', '/twitter/community/tweets', {
      community_id,
      cursor
    });
  }

  // ==================== Trend Endpoints ====================

  /**
   * Get trends for a location
   * @param {object} params - Request parameters
   * @returns {Promise<object>} Trending topics
   */
  async getTrends(params) {
    const { woeid, count } = params;
    return await this.makeRequest('GET', '/twitter/trends', { woeid, count });
  }

  // ==================== My Account ====================

  /**
   * Get my account info
   * @returns {Promise<object>} Account information
   */
  async getMyInfo() {
    return await this.makeRequest('GET', '/oapi/my/info');
  }

  // ==================== Action Endpoints (V2) ====================

  /**
   * Login to Twitter
   * @param {object} params - Login parameters
   * @returns {Promise<object>} Login result with cookie
   */
  async login(params) {
    const { user_name, email, password, totp_secret, proxy } = params;
    return await this.makeRequest('POST', '/twitter/user_login_v2', {
      user_name,
      email,
      password,
      totp_secret,
      proxy
    });
  }

  /**
   * Create a new tweet
   * @param {object} params - Tweet parameters
   * @returns {Promise<object>} Created tweet info
   */
  async createTweet(params) {
    const {
      login_cookies,
      tweet_text,
      reply_to_tweet_id,
      attachment_url,
      community_id,
      is_note_tweet,
      media_ids,
      proxy
    } = params;
    
    return await this.makeRequest('POST', '/twitter/create_tweet_v2', {
      login_cookies,
      tweet_text,
      reply_to_tweet_id,
      attachment_url,
      community_id,
      is_note_tweet,
      media_ids,
      proxy
    });
  }

  /**
   * Send direct message
   * @param {object} params - DM parameters
   * @returns {Promise<object>} Message info
   */
  async sendDM(params) {
    const {
      login_cookie,
      user_id,
      text,
      media_ids,
      proxy,
      reply_to_message_id
    } = params;
    
    return await this.makeRequest('POST', '/twitter/send_dm_to_user', {
      login_cookie,
      user_id,
      text,
      media_ids,
      proxy,
      reply_to_message_id
    });
  }

  /**
   * Retweet a tweet
   * @param {object} params - Retweet parameters
   * @returns {Promise<object>} Retweet result
   */
  async retweet(params) {
    const { login_cookies, tweet_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/retweet_tweet_v2', {
      login_cookies,
      tweet_id,
      proxy
    });
  }

  /**
   * Delete a tweet
   * @param {object} params - Delete parameters
   * @returns {Promise<object>} Delete result
   */
  async deleteTweet(params) {
    const { login_cookies, tweet_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/delete_tweet_v2', {
      login_cookies,
      tweet_id,
      proxy
    });
  }

  /**
   * Follow a user
   * @param {object} params - Follow parameters
   * @returns {Promise<object>} Follow result
   */
  async followUser(params) {
    const { login_cookies, user_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/follow_user_v2', {
      login_cookies,
      user_id,
      proxy
    });
  }

  /**
   * Unfollow a user
   * @param {object} params - Unfollow parameters
   * @returns {Promise<object>} Unfollow result
   */
  async unfollowUser(params) {
    const { login_cookies, user_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/unfollow_user_v2', {
      login_cookies,
      user_id,
      proxy
    });
  }

  /**
   * Like a tweet
   * @param {object} params - Like parameters
   * @returns {Promise<object>} Like result
   */
  async likeTweet(params) {
    const { login_cookies, tweet_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/like_tweet_v2', {
      login_cookies,
      tweet_id,
      proxy
    });
  }

  /**
   * Unlike a tweet
   * @param {object} params - Unlike parameters
   * @returns {Promise<object>} Unlike result
   */
  async unlikeTweet(params) {
    const { login_cookies, tweet_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/unlike_tweet_v2', {
      login_cookies,
      tweet_id,
      proxy
    });
  }

  /**
   * Create a community
   * @param {object} params - Community parameters
   * @returns {Promise<object>} Created community info
   */
  async createCommunity(params) {
    const { login_cookie, name, description, proxy } = params;
    return await this.makeRequest('POST', '/twitter/create_community_v2', {
      login_cookie,
      name,
      description,
      proxy
    });
  }

  /**
   * Delete a community
   * @param {object} params - Delete parameters
   * @returns {Promise<object>} Delete result
   */
  async deleteCommunity(params) {
    const { login_cookie, community_id, community_name, proxy } = params;
    return await this.makeRequest('POST', '/twitter/delete_community_v2', {
      login_cookie,
      community_id,
      community_name,
      proxy
    });
  }

  /**
   * Join a community
   * @param {object} params - Join parameters
   * @returns {Promise<object>} Join result
   */
  async joinCommunity(params) {
    const { login_cookie, community_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/join_community_v2', {
      login_cookie,
      community_id,
      proxy
    });
  }

  /**
   * Leave a community
   * @param {object} params - Leave parameters
   * @returns {Promise<object>} Leave result
   */
  async leaveCommunity(params) {
    const { login_cookie, community_id, proxy } = params;
    return await this.makeRequest('POST', '/twitter/leave_community_v2', {
      login_cookie,
      community_id,
      proxy
    });
  }
}