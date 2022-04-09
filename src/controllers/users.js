const { fetchAll } = require('../middlewares/postgres.js');
const path = require('path');
const { nextTick } = require('process');
let d = new Date();

const GET = async(req, res) => {
	const users = await req.fetch(`
        select user_id, username from users
    `);
    res.json({status: 200, data: users});
}

const POST = async(req,res, next) => {
    try{
        const { files } = req.files;
        const {from_userid, to_userid, caption } = req.body;

        const fileName = d.getTime() + files.name.replace(/\s/g, '');

        let ok = await req.fetch(`
            insert into files (file_name, from_userid, to_userid, caption) values
            ($1,$2,$3,$4) 
            returning *
        `,'/data/files/'+fileName, from_userid, to_userid, caption );

        if(ok) files.mv( path.join(process.cwd(),'src','files', fileName));

        req.to_userid = to_userid;
        req.fileName = '/data/files/'+fileName;

        res.status(200)
            .json({
                status: 200, 
                message: 'Added',
                data: ok
            });
        next()
    }catch(err){
        res.status(400)
            .json({
                status: 400,
                message: err.message
            });
    }
}

const REG = async (req, res ) => {
    try{
        const { username, password } = req.body;

        let user = await req.fetch(`
            select * from users
            where username = $1 and password = crypt($2, password)
        `,username, password );

        if(user.length) throw new Error('The user already exists')

        let ok = await req.fetch(`
            insert into users(username, password) values
            ($1,crypt($2, gen_salt('bf'))) 
            returning *
        `,username, password );

        res.status(200)
            .json({
                status: 200, 
                message: 'Added',
                data: ok
            });
    }catch(err){
        res.status(400)
            .json({
                status: 400,
                message: err.message
            });
    }
}

const AUTH = async(req, res) => {
    try{
        const { username, password } = req.body;

        let ok = await req.fetch(`
            select * from users
            where username = $1 and password = crypt($2, password)
        `,username, password );
        if (ok.length) res.status(200)
            .json({
                status: 200, 
                message: 'ok',
            });
        else throw new Error('Wrong username or password!')
        
    }catch(err){
        res.status(401)
            .json({
                status: 401,
                message: err.message
            });
    }
}

const SOCKET = async(io, socket, req, res) => {
    try {
        socket.on('users:get', async (userId) => {
            await fetchAll(`
                update users set
                    user_socket_id = $1
                where user_id = $2
            `, socket.id, userId)
        })
        if(req){
            let socketId = await fetchAll(`
                select user_socket_id from users
                where user_id = $1
            `, req?.to_userid)
            io.to(socketId).emit('new message', req.fileName)
        }
    }catch (err){
        res.status(400)
            .json({
                status: 400,
                message: err.message
            });
    }
}

module.exports = {
    SOCKET,
    POST,
    AUTH,
    REG,
    GET
}