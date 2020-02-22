module.exports = class JoinDataBuilder {
  constructor() {
    this.id = null;
    this.name = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  build() {
    return {
      id: this.id,
      name: this.name
    };
  }
};
