module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
      image_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

      },
  
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
  
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
  
      s3_bucket_path: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
  
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true,
        },
      },
    },
    {
        createdAt: 'date_created'
    }
    );
  
    return Image;
  };