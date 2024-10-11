module.exports = (sequelize, DataTypes) => {
    const Noodle = sequelize.define('Noodle', {
        brand: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        taste: DataTypes.STRING,
        production: DataTypes.TEXT,
    })
    return Noodle
}