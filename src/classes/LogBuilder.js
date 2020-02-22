module.exports = class LogBuilder {
  constructor() {
    this.emojiId = null;
    this.userId = null;
    this.channelId = null;
    this.guildId = null;
    this.isReaction = null;
    this.isAnimated = null;
    this.timestamp = null;
  }

  setEmojiId(emojiId) {
    this.emojiId = emojiId;
    return this;
  }

  setUserId(userId) {
    this.userId = userId;
    return this;
  }

  setChannelId(channelId) {
    this.channelId = channelId;
    return this;
  }

  setGuildId(guildId) {
    this.guildId = guildId;
    return this;
  }

  isReactionEmoji() {
    this.isReaction = true;
    return this;
  }

  isMessageEmoji() {
    this.isReaction = false;
    return this;
  }

  setIsAnimated(isAnimated) {
    this.isAnimated = isAnimated;
    return this;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  build() {
    return {
      emojiId: this.emojiId,
      userId: this.userId,
      channelId: this.channelId,
      guildId: this.guildId,
      isReaction: this.isReaction,
      isAnimated: this.isAnimated,
      timestamp: this.timestamp
    };
  }
};
