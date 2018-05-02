module.exports = {
    infoCreate: obj => {
      return {
        uri: obj.uri,
        location: obj.location
      };
    },
  
    infoUpdate: obj => {
      return {
        id: obj.id,
        uri: obj.uri,
        location: obj.location
      };
    },
  
    infoResponse: obj => {
      return {
        id: obj.id,
        uri: obj.uri,
        location: obj.location,
        create_at: obj.create_at,
        update_at: obj.update_at
      };
    }
  };
  