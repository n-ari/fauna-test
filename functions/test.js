const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = function(event, context) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });
  const flagName = event.path.match(/([^\/]*)\/*$/)[0];
  return client.query(
    q.Paginate(
      q.Match(q.Index("flags_by_name"), flagName)
    )
  ).then((res)=>{
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  }).catch((err)=>{
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  });
};

