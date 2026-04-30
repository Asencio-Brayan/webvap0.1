import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres.aqpjtrxhtqxdkauoxdjl',
  password: 'Asencio%2F211906',
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err)
  } else {
    console.log('Connected to database:', res.rows)
  }
  pool.end()
})
