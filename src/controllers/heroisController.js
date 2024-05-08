const pool = require('../config/dbConfig');

async function todosHerois(req, body) {
    try {
        const resultado = await pool.query('SELECT * FROM herois');
        res.json({
            total: resultado.rowCount,
            herois: resultado.rows,
        });
    } catch (error) {
        console.error('erro a obter todos os herois', error);
        res.status(500).send('erro ao obter os herois');
    }
};
async function criarHerois(req, body) {
    try {
        const { nome, power, level, hp, equipe, editora } = req.body;
        if (!nome || !power || !level || !hp) {
            res.status(401).send({ mensagem: 'os campos : nome, power, level e hp, devem ser preenchidos!' });

        } else if (nome.length < 3) {
            res.status(401).send({ mensagem: 'o nome não pode ter menos que 3 letras' });
        }
        else if (level < 0) {
            res.status(401).send({ mensagem: 'o level não pode ser menor que 0' });
        }
        else if (hp < 0) {
            res.status(401).send({ mensagem: 'o hp não pode ser menor que 0' });
        }
        else {
            await pool.query('INSERT INTO herois (nome, power, level, hp, equipe, editora) VALUES ($1, $2, $3, $4, $5, $6)', [nome, power, level, hp, equipe, editora]);
            res.status(201).send({ mensagem: 'heroi criado com sucesso' });
        }
    }
    catch (error) {
        console.error('erro ao inserir heroi', error);
        res.status(500).send('erro ao inserir heroi');
    }
};