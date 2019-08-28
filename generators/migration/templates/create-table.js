module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('<%= tableName %>', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    <%_ attributes.forEach((attribute, index) => { _%>
    <%= attribute.fieldName %>: {
      type: Sequelize.<%= attribute.dataType.toUpperCase() %>,
    },
    <%_ }) _%>

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('<%= tableName %>'),
};
