const { connect, set } = require('mongoose');

(async () => {
  await set('strictQuery', true);
  await connect(process.env.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).catch(console.error);
})();
