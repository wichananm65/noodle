module.exports = (sequelize, DataTypes) => {
    const Noodle = sequelize.define('Noodle', {
        brand: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        taste: DataTypes.TEXT,
        production: DataTypes.STRING,
    })
    return Noodle
}