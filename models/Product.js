module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is not empty",
          },
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
              msg: "Qty is not empty",
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
              msg: "Price is not empty",
          }
        }
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
      tableName: "products",
      timestamps: true,
    }
  );

  Product.associate = function (models) {
    Product.hasMany(models.Order, {
      as: "order",
      foreignKey: "productId"
    });
  };

  return Product;
};
