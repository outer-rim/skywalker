export function BlockModel(sequelize, DataTypes) {
  return sequelize.define(
    "BLOCK",
    {
      floor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: "block",
      timestamps: false,
    }
  );
}
