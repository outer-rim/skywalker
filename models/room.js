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
      blockfloor: {
        type: DataTypes.INTEGER,
        references: {
          model: "block",
          key: "floor",
        },
      },
      blockcode: {
        type: DataTypes.INTEGER,
        references: {
          model: "block",
          key: "code",
        },
      },
      cost: DataTypes.INTEGER,
    },
    {
      tableName: "room",
      timestamps: false,
    }
  );
}
