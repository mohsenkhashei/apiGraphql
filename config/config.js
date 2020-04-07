const env = process.env.NODE_ENV; // 'dev' or 'test'
const dev = {
    db:{
        mysql:{
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'travia_api'
        },
        mongo:{
            connection: 'mongodb://localhost:27017/',
            database: 'apigraphql'
        }
    },
    jwt:{
        secret_key : process.env.SECRET_KEY,
        expires_in : '30s',
    },
    app: {
      port: 5000 
    }
};
const test = {
    jwt:{
        secret_key : process.env.SECRET_KEY,
        expires_in : '30s',
    },
    app: {
      port: 5000 
    }
};

const config = {
    dev,
    test
};

module.exports = config[`dev`];