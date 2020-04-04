const env = process.env.NODE_ENV; // 'dev' or 'test'
const dev = {
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