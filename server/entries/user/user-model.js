module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authToken: {
            type: DataTypes.STRING,
        },
    }, {});
    User.associate = models => {
        // associations can be defined here
    };
    return User;
};
