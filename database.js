const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://gaizzsxi:tT_OMZ4Oa0dMojPANQ1Bgquf9HHQzUAf@pellefant.db.elephantsql.com:5432/gaizzsxi');

sequelize
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

  const Organizations = sequelize.define('organization', {
    orgId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    orgName: { type: Sequelize.STRING, unique: { args: true, message: 'Organization name must be unique.'}},
    orgRepoName: { type: Sequelize.STRING },
    keywordRelevance: { type: Sequelize.ARRAY(Sequelize.ENUM) },
    score: { type: Sequelize.INTEGER },
    sentiment: { type: Sequelize.STRING }
  });

  exports.Organizations = Organizations;
  