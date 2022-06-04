const config = {
   development: {
       BASE_URL: 'http://localhost:3000/'
   },
   production: {
    BASE_URL: 'http://localhost:5500/'
}
}

const nodeEnv = process.env.nodeEnv

module.exports = config[nodeEnv]