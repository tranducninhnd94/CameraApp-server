module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "type"
    }
  );

  Type.associate = models => {
    models.Type.hasMany(models.Product, {
      as: "products"
    });
  };

  return Type;
};
