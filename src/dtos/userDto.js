module.exports = class  UserDto {
    email;
    constructor(model) {
        this.email = model.email
    }
}