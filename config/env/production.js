const port = Number.parseInt(process.env.PORT) || 5022;

export default {
  port: port,
  db: {
    analytics: {
      database: 'collected_likes',
      user: 'join_web',
      password: 'mysql_joinwisdom',
      port: '3306',
      host: '10.6.5.137',
      comments: 'Collect_like',
      dateStrings: 'DATE'
    },
    like: {
      database: 'collected_likes',
      user: 'join_web',
      password: 'mysql_joinwisdom',
      port: '3306',
      host: '10.6.5.137',
      comments: 'Collect_like',
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
    },
    bwMonit: {
      host: '10.10.171.180',
      port: 5432,
      user: 'maidian_testing',
      password: 'Cyd6xu5wa3IwBzoK',
      database: 'JW_BI',
      charset: 'utf8',
      comments: 'dev'
    }
  }
}