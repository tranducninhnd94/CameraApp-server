module.exports = {
  infoCreate: obj => {
    return {
      name: obj.name,
      namespace: obj.namespace,
      resolution: obj.resolution,
      fileOutput: obj.fileOutput,
      uri: obj.uri,
      location: obj.location
    };
  },

  infoUpdate: obj => {
    return {
      id: obj.id,
      name: obj.name,
      namespace: obj.namespace,
      resolution: obj.resolution,
      fileOutput: obj.fileOutput,
      uri: obj.uri,
      location: obj.location
    };
  },

  infoResponse: obj => {
    return {
      id: obj.id,
      name: obj.name,
      namespace: obj.namespace,
      resolution: obj.resolution,
      fileOutput: obj.fileOutput,
      uri: obj.uri,
      location: obj.location,
      create_at: obj.create_at,
      update_at: obj.update_at
    };
  }
};
