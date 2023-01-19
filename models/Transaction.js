module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User is not empty",
          },
        },
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Total Amount is not empty",
          },
        },
      },
      invoiceDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction Date is not empty",
          },
        },
      },
      status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "WAITING PAYMENT",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "transactions",
      timestamps: true,
    }
  );

  Transaction.associate = function (models) {
    Transaction.hasMany(models.Order, {
      foreignKey: "transactionId",
      as: "order",
    });
  };

  return Transaction;
};
