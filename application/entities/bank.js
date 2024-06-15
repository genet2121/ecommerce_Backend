

module.exports = class Bank {

    user_id;
    name;
    image;
    logoColor;

    constructor({
        user_id,
        name,
        image,
        logoColor
    }) {

        this.user_id = user_id;
        this.name = name;
        this.image = image;
        this.logoColor = logoColor;
    }

}
