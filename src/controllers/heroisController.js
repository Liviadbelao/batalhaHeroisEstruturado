const pool = require('../config/dbConfig.js');

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
async function editarHerois(req, body) {
    try {
        const { id } = req.params;
        const { nome, power, level, hp, equipe, editora } = req.body;
  
        if(!nome || !power || !level || !hp){
            res.status(401).send({ mensagem: 'os campos : nome, power, level e hp, devem ser preenchidos!' });
        
           } else if (nome.length < 3){
            res.status(401).send({ mensagem: 'o nome não pode ter menos que 3 letras' });
           }
            else if ( level < 0){
            res.status(401).send({ mensagem: 'o level não pode ser menor que 0' });
           }
            else if ( hp < 0){
            res.status(401).send({ mensagem: 'o hp não pode ser menor que 0' });
           }
    
           else{
            await pool.query('UPDATE herois SET nome = $1, power = $2, level = $3, hp = $4, equipe = $5, editora = $6 WHERE id = $7', [nome, power, level, hp, equipe, editora, id]);
            res.status(200).send({ mensagem: 'heroi atualizado' });
           }
    } catch (error) {
        console.error('erro ao atualizar heroi', error);
        res.status(500).send('erro ao atualizar heroi');
    }
};
async function deletarHerois(req, body) {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM herois WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'heroi deletado' });
    } catch (error) {
        console.error('erro ao excluir heroi', error);
        res.status(500).send('erro ao excluir heroi');
    }
};

module.exports = { criarHerois, todosHerois, editarHerois, deletarHerois };