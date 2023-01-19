module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product is not empty",
          },
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Quantity is not empty",
          },
        },
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction is not empty",
          },
        },
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
      tableName: "orders",
      timestamps: true,
    }
  );

  Order.associate = function (models) {
    // Category.belongsToMany(models.Supplier, {
    //   through: models.CategorySupplier,
    //   foreignKey: "categoryId",
    //   as: "supplier",
    // });
    Order.belongsTo(models.Product, {
      as: "product",
    });
    Order.belongsTo(models.Transaction, {
      as: "transaction",
    });
    // Category.hasMany(models.CategorySupplier, {
    //   foreignKey: "categoryId",
    //   as: "categorysupplier",
    // });
  };

  return Order;
};
