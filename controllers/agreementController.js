let Agreement = require("../app/models/agreement.js");
let mongoose = require('mongoose');

module.exports = {
    getAgreements: function(req, res) {
        Agreement
            .find({})
            .exec().then(function(agree, err) {
                if(err){
                    return res.status(400).send({ status: false, message: JSON.stringify(err) })
                }
                return res.status(200).send({ status: true, data: agree });
            });
    },
    getAgreement: function(req, res) {
        Agreement
            .findOne({ _id: req.body.id })
            .exec().then(function(agree, err) {
                if(err){
                    return res.status(400).send({ status: false, message: JSON.stringify(err) })
                }
                return res.status(200).send({ status: true, data: agree });
            });
    },
    saveAgreement: function(req, res) {
        try{
            if(req.body.name && req.body.status){
                var newAgreement = new Agreement();

                // set the Department's
                newAgreement.name = req.body.name;
                newAgreement.start_date = req.body.startDate;
                newAgreement.end_date = req.body.endDate;
                newAgreement.value = req.body.value;
                newAgreement.status = req.body.status;
                newAgreement.date_Created = Date.now();
                newAgreement.date_Modified = Date.now();

                newAgreement.save(function(err) {
                    err = (err && err.error) ? err.error : err;
                    if (err)
                        return res.status(400).send({ status: false, message: JSON.stringify(err) })
                    return req.res.status(200).send({status:true, data: newAgreement});
                });
            }else{
                return res.status(400).send({ status: false, message: "Input not proper" })
            }
        }catch(e){
            console.log(e);
            return res.status(400).send({ status: false, message: e })
        }
    },
    updateAgreement: function(req, res) {
        try{
            let where = req.body.id;
            if(where){
                Agreement.findOne({ _id : where }, function(err, agreement) {
                    if (!agreement) {
                        return res.status(500).send({ status: false, message: "Data not found." });
                    }
                    agreement.name = req.body.name;
                    agreement.start_date = req.body.startDate;
                    agreement.end_date = req.body.endDate;
                    agreement.value = req.body.value;
                    agreement.status = req.body.status;
                    agreement.date_Modified = Date.now();

                    agreement.save(function(err) {
                        err = (err && err.error) ? err.error : err;
                        if (err)
                            return res.status(400).send({ status: false, message: JSON.stringify(err) })
                        return req.res.status(200).send({status:true, data: agreement});
                    });
                });
            }else{
                return res.status(400).send({ status: false, message: "Please pass require fields." })
            }
        }catch(e){
            console.log(e);
            return res.status(400).send({ status: false, message: e })
        }
    },
    deleteAgreement: function(req, res) {
        let where = req.body.id;
        if(where){
            Agreement.remove(
                    {_id: where}, function(err, agreement){
                    if(err)
                        return res.status(400).send({ status: false, message: JSON.stringify(err) });
                    return req.res.status(200).send({ status: true, data: agreement });
                });
        }else{
            return res.status(400).send({ status: false, message: "Please pass require fields." })
        }
    },
    filterAgreement: function(req, res) {
        let fields = req.body.fields || undefined,
            operator = req.body.operator,
            value = req.body.value;

        let filterObj = {};
        if(fields == "value"){
            value = parseInt(value);
        }
        filterObj[fields] = value;

        if(operator == "Equal To"){
            filterObj[fields] = value;
        } else if(operator == "Not Equal To"){
            filterObj[fields] = { $ne: value };
        } else if(operator == "Contains"){
            filterObj[fields] = new RegExp(value, 'gi');
        } else if(operator == "Greater than equal to"){
            filterObj[fields] = { $gte: value };
        } else if(operator == "Less than equal to"){
            filterObj[fields] = { $lte: value };
        }
        Agreement
            .aggregate([
                {
                    $match: filterObj
                }
            ])
            .then(function(agreements, err) {
                if (err) {
                    return res.status(400).send({ status: false, message: JSON.stringify(err) })
                }
                return res.status(200).send({ status: true,  data: agreements });
            });
    }
}