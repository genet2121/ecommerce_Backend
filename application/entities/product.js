

module.exports = class Product {

    short_description;
    description;
    image;
    price;

    constructor({
        short_description,
        description,
        image,
        price
    }) {
        this.short_description = short_description;
        this.description = description;
        this.image = image;
        this.price = price;
    }

}
