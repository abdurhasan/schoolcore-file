let environment = new Object;


environment.development = {
    ENV_NAME: 'DEVELOPMENT',    
    DEBUG:true,
    PORT:8000,    
    HOST:'localhost',
    BASE_URL:'http://127.0.0.1:8000',
    API_VERSION:'api/v1',
    DATABASE:'mongodb://ccc:jamsembilan00@52.221.198.120:28018/c3',          
    REDIS_PORT:6379,
    REDIS_HOST:'52.221.198.120',
    JWT_SECRET:'DHhgzPcgH6xWD4baUpGH837ewYWxZwD7zzj4wDT4Uscq6jtuXfgeEMCT8eCDT4qz3',
    JWT_SAMPLE_TOKEN:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI0OGUzZjRiNC1iZDk1LTExZTktOTllYi0zOGY5ZDMzYWNlNjYiLCJ1c2VybmFtZSI6InJvb3QiLCJyb2xlcyI6WyJyb290IiwiYWRtaW4iXSwiYnVja2V0IjoiaW1hZ2UiLCJleHAiOjE1NjY5ODcxMTl9.yQwVcdQ9sWrx0MNpxc-8cWPc1YY-XN87NpA0RMSK-uo'
    
}
environment.test = {
    ENV_NAME: 'TESTING',    
    PORT:5000,
    JWT_SECRET:'DHhgzPcgH6xWD4baUpGH837ewYWxZwD7zzj4wDT4Uscq6jtuXfgeEMCT8eCDT4qz3',
    // HOST:'http://127.0.0.1',
    // BASE_URL:'localhost',
    // DATABASE:'mongodb://admin:admin123@ds235788.mlab.com:35788/schoolcore_service_file',          
    REDIS_PORT:6379,
    REDIS_HOST:'52.221.198.120',
    SAMPLE_TOKEN:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0OGUzZjRiNC1iZDk1LTExZTktOTllYi0zOGY5ZDMzYWNlNjYiLCJ1c2VybmFtZSI6InJvb3QiLCJyb2xlcyI6WyJyb290IiwiYWRtaW4iXSwiZXhwIjoxNTY2OTg3MTE5fQ.joN-dQFu_QSv8HTaDETfgc4bGbtXqo2EwwzjrpeSp2Y'
    
}


const appenv = process.env.APP_ENV ? process.env.APP_ENV.toLowerCase() : 'development';

const currentEnv = environment[appenv] ? environment[appenv] : environment['development'];

module.exports = currentEnv