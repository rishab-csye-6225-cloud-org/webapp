module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
  
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
  
      },
  
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   notNull: true,
        //   notEmpty: true,
        // },
      },
  
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   notNull: true,
        //   notEmpty: true,
        // },
      },
  
  
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
       unique: true,
      //  validate: {
      //   notNull: true,
      //   notEmpty: true,
      // },
       
      },



      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
      },


      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // validate: {
        //   max : 100,
        //   min : {
        //     arg : 0,
        //     msg: 'Quantity check in sequelize'
        //   }
        
        //need to add the range as well min and max  
      },
      date_added: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  
      date_last_updated: {
        type: Sequelize.DATE,
        allowNull: false,
  
      },

      owner_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false

      }
  
    },
      {
        createdAt: 'date_added',
        updatedAt: 'date_last_updated'
      }
    );
  
    return Product;
  };