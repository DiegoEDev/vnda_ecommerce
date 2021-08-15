import type { NextApiRequest, NextApiResponse } from 'next'
var axios = require('axios');

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id_user } = req.query;
    let json = req.body

    if (json.desativar) {
        let config = {
            method: 'post',
            url: `${process.env.API_URL}/users/${id_user}/deactivate`,
            headers: { 
                'Authorization': `Bearer ${process.env.TOKKEN}`,
                'Content-Type': 'application/json'
            }
        };
        
        let resp = axios(config).then(function (response: any) {
            res.status(200).json(response.data)
          })
          .catch(function (error: any) {
            res.status(404).json(error)
          });
    }
    if (json.editar) {
        var dados = JSON.stringify(json.dados);
        let config = {
            method: 'put',
            url: `${process.env.API_URL}/users/${id_user}`,
            headers: { 
                'Authorization': `Bearer ${process.env.TOKKEN}`,
                'Content-Type': 'application/json'
            },
            data: dados
        };
        
        let resp = axios(config).then(function (response: any) {
            res.status(200).json(response.data)
          })
          .catch(function (error: any) {
            res.status(404).json(error)
          });
    }
  }