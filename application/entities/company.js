
module.exports = class Company {

    user_id;
    name;
    legal_status;
    tin;
    sector;
    score;


    constructor({
        user_id,
        name,
        legal_status,
        tin,
        sector,
        score
    }) {

        this.user_id = user_id;
        this.name = name;
        this.legal_status = legal_status;
        this.tin = tin;
        this.sector = sector;
        this.score = score;
    }


}
