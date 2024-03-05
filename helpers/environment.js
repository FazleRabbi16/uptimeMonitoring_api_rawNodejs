// module scaffolding
const environments = {};
// staging environment
environments.staging={
 port:8080,
 envName:"staging",
 secretKey:'kajaj'
}
// production environment
environments.production={
    port:5000,
    envName:"staging",
    secretKey:'assdfes'
   }
// Determine which environment was passed
const currentEnv = typeof(process.env.NODE_ENV) ==='string' ? process.env.NODE_ENV : "staging";          
const environementToExport = typeof(environments[currentEnv])=== 'object' ? environments[currentEnv] : environments.staging;
//export environment
module.exports = environementToExport;