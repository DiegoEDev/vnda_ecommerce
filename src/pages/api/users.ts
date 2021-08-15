// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var axios = require('axios');

type Data = {
  name: string,
  resp: []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if ( req.method === 'GET') {
    var config = {
      method: 'get',
      url: `${process.env.API_URL}/users`,
      headers: { 
        'Authorization': `Bearer ${process.env.TOKKEN}`
      }
    };
    var resp = await axios(config)
    res.status(200).json(resp.data)
  }
}
