module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        brand: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        taste: DataTypes.TEXT,
        production: DataTypes.STRING,
    })
    return Blog
}