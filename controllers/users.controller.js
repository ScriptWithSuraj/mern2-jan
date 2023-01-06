const { data } = require("../DB/user.json");
const { getQueryErrors } = require('../middleware/users.validator')

const getAllUsers = (req, res) => {
    return res.json(data);
};

const getUsersByUuid = (req, res) => {
    const { uuid } = req.params;
    const result = data.find((item) => item.login.uuid === uuid);
    if (result) {
        return res.json(result);
    } else {
        return res.sendStatus(404);
    }
};

const searchUsersByQuery = (req, res) => {
    const { gender, age } = req.query;

    const error = getQueryErrors({ gender, age });

    if (error) {
        return res.status(422).json(error)
    }

    if (gender && age) {
        const results = data.filter(
            (item) => item.gender === gender && Number(item.dob.age) >= Number(age)
        );
        return res.json(results);
    } else if (gender) {
        const results = data.filter((item) => item.gender === gender);
        return res.json(results);
    } else if (age) {
        const results = data.filter((item) => Number(item.dob.age) >= Number(age));
        return res.json(results);
    } else {
        res.sendStatus(404);
    }
};

module.exports = { getAllUsers, getUsersByUuid, searchUsersByQuery };