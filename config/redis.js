module.exports = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    db_logs: 1,
    db_cache: 2,
    db_transaction: 3
}