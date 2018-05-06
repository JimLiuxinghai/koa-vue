export default {
    port: 9003,
    db: {
      analytics: {
        host: '10.6.5.137',
        port: 3306,
        username: 'join_web',
        password: 'JS2o2q!dT3HLfnUm',
        database: 'mysql_joinwisdom',
        charset: 'utf8',
        dateStrings: 'DATE',
        comments: 'analytics'
      },
      hunter: {
        host: '192.168.19.57',
        port: '3306',
        user: 'admin',
        password: 'passwd',
        database: 'hunter',
        charset: 'utf8'
      }
    }
}