module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uri: {
        type: DataTypes.STRING,
        require: true
      },
      location: {
        type: DataTypes.STRING,
        require: true
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "video"
    }
  );

  Video.associate = models => {
    models.Video.belongsTo(models.Camera, {
      as: "camera",
      foreignKey: "camera_id"
    });
  };

  return Video;
};
