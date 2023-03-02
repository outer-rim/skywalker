export function RoomModel(sequelize, DataTypes) {
  return sequelize.define(
    "ROOM",
    {
      room_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      cost: DataTypes.INTEGER,
      block_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "block",
          key: "id",
        },
      },
    },
    {
      tableName: "room",
      timestamps: false,
    }
  );
}
