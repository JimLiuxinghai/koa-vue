const port = Number.parseInt(process.env.PORT) || 5000;

export default {
    port: port,
    db: {
      // analytics: {
      //   host: '10.6.5.137',
      //   port: 3306,
      //   username: 'join_web',
      //   password: 'JS2o2q!dT3HLfnUm',
      //   database: 'mysql_joinwisdom',
      //   charset: 'utf8',
      //   dateStrings: 'DATE',
      //   comments: 'analytics'
      // },
      analytics: {
        host: '192.168.19.57',
        port: '3306',
        user: 'admin',
        password: 'passwd',
        database: 'bw_monit',
        charset: 'utf8'
      },
      like: {
        host: '192.168.19.57',
        port: '3306',
        user: 'admin',
        password: 'passwd',
        database: 'collect_like',
        charset: 'utf8',
        dateStrings: 'DATE'
      },
      bwHotel: {
          host: '10.10.153.162',
          port: 3306,
          user: 'bwHotel',
          password: 'HSh8qPs8TU7JbMNn',
          database: 'bw_hotel',
          charset: 'utf8',
          comments: 'dev'
      }
    }
}