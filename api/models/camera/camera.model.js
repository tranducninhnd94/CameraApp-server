module.exports = (sequelize, DataTypes) => {
  const Camera = sequelize.define(
    "Camera",
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
      tableName: "camera"
    }
  );

  Camera.associate = models => {
    models.Camera.belongsToMany(models.Product, {
      as: "products",
      through: models.ProductCamera,
      foreignKey: "camera_id"
    });

    models.Camera.hasMany(models.Video, {
      as: "videos"
    });
  };

  return Camera;
};
