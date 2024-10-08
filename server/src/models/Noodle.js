module.exports = (sequelize, DataTypes) => {
    const Noodle = sequelize.define('Noodle', {
        brand: DataTypes.STRING,
        taste: DataTypes.STRING,
        production: DataTypes.STRING,
    })

    return Noodle
}