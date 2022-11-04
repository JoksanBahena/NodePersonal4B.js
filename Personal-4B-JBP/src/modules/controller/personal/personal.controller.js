const {Response, Router} = require('express');
const {findAll, findById, save} = require('./personal.gateway');
const { validateError } = require("../../../utils/functions");

const getAll = async (request, res = Response) => {
    try{
        const results = await findAll();
        res.status(200).json(results);

    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});

    }
};

const getById = async (request, res = Response) => {
    try{
        const {id} = request.params;
        const results = await findById(id);
        res.status(200).json(results);

    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});

    }
};

const insert = async (request, res = Response) => {
    try{
        const {
            name, surname, lastname, birthday, salary, position_id
        } = request.body;
        const results = await save({name, surname, lastname, birthday, salary, position_id});
        res.status(200).json(results);

    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});

    }
};

const personalRouter = Router();
personalRouter.get(`/`, [], getAll);
personalRouter.get(`/:id`, [], getById);
personalRouter.post(`/`, [], insert);

module.exports = {
    personalRouter
};