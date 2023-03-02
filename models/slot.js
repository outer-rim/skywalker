export function SlotModel(sequelize, DataTypes) {
  return sequelize.define(
    "SLOT",
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "doctor",
          key: "id",
        },
      },
      starttime: DataTypes.DATE,
      endtime: DataTypes.DATE,
    },
    {
      tableName: "slot",
      timestamps: false,
    }
  );
}
