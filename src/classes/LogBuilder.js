module.exports = class LogBuilder {
  constructor() {
    this.emojiId = null;
    this.userId = null;
    this.channel = null;
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

  setChannel(channel) {
    this.channel = channel;
    return this;
  }

  setIsReaction(isReaction) {
    this.isReaction = isReaction;
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
      channelId: this.channel.id,
      guildId: this.channel.guild.id,
      isReaction: this.isReaction,
      isAnimated: this.isAnimated,
      timestamp: this.timestamp
    };
  }
};
