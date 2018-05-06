export default {
    port : 9002,
    db : {
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