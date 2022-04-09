const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port:5432,
    user: 'postgres',
    password: '2003',
    database: 'system'
})

const data = (req,res,next) => { 
    req.fetch = async function ( query, ...params ){
        const client = await pool.connect()
        try {
            const { rows } = await client.query(query, params.length ? params : null)
            return rows
        } catch(error){
            res.status(400).json({database_error:error.message})
        } finally {
            client.release()
        }
    }
    return next()
}

async function fetchAll (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}

module.exports = {
    fetchAll,
    data
}