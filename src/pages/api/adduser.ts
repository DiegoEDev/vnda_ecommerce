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
    let json = JSON.stringify(req.body)
    
        var config = {
            method: 'post',
            url: `${process.env.API_URL}/users`,
            headers: { 
                'Authorization': `Bearer ${process.env.TOKKEN}`,
                'Content-Type': 'application/json'
            },
            data: json
        };
        
        var resp = axios(config).then(function (response: any) {
            res.status(200).json(response.data)
          })
          .catch(function (error: any) {
            res.status(200).json(error)
          });
}
