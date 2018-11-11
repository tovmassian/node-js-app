function model(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    User.associate = models => {
        // associations can be defined here
    };

    return User;
}

module.exports = model;
