module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
    
      id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
        
      },
  
     
    
  
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
  
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
  

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },


      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },


      account_created: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  
      account_updated: {
        type: Sequelize.DATE,
        allowNull: false,
       
      },

    },
    {createdAt: 'account_created',
      updatedAt: 'account_updated'
    }
    );

    return User;
  };