

module.exports = class Personal {

    user_id;
    tin;
    age;
    education;
    marital_status;
    dependants;
    criminal;
    score;
//ADD SCORE
    constructor({
        user_id,
        tin,
        age,
        education,
        marital_status,
        dependants,
        criminal,
        score
    }) {

        this.user_id = user_id;
        this.tin = tin;
        this.age = age;
        this.education = education;
        this.marital_status = marital_status;
        this.dependants = dependants;
        this.criminal = criminal;
        this.score = score;
    }


}