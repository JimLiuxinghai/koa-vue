export default {
    port: 9050,
    db: {
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
        charset: 'utf8'
      }
    }
}