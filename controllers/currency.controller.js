const { data } = require("../DB/currency.json");

const verifyAuth = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return false;
    }
    console.log(process.env.PASSWORD)
    if (authorization !== process.env.PASSWORD) {
        return false;
    }
    return true;
};


const getCurrencyTitle = (req, res) => {
    if (!verifyAuth(req)) {
        return res.status(403).json({ message: "Unauthorized Request" });
    }
    res.send("<h1>Currency Database</h1>");
}

const getCurrencies = (req, res) => {
    if (!verifyAuth(req)) {
        return res.status(403).json({ message: "Unauthorized Request" });
    }

    const { min_value } = req.query;
    if (min_value) {
        const result = data.filter(
            (item) => Number(item.min_size) === Number(min_value)
        );
        res.json(result);
    } else {
        res.json(data);
    }
}

const getCurrencyWithSymbol = (req, res) => {
    if (!verifyAuth(req)) {
        return res.status(403).json({ message: "Unauthorized Request" });
    }

    const { symbol } = req.params;
    const result = data.find((item) => item.id.toLowerCase() === symbol.toLowerCase());
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).send('Aise hi, man kiya');
    }
}

module.exports = { getCurrencyTitle, getCurrencies, getCurrencyWithSymbol };
