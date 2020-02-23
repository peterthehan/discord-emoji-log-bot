module.exports = class JoinDataBuilder {
  constructor() {
    this.joinData = null;
  }

  setJoinData(joinData) {
    this.joinData = joinData;
    return this;
  }

  build() {
    return {
      id: this.joinData.id,
      name: this.joinData.name
    };
  }
};
