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
      videos: obj.video,
      created_at: obj.created_at,
      updated_at: obj.created_at
    };
  }
};
