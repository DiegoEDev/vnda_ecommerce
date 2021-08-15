var axios = require('axios');
export async function listUser() 
{
    let result = await axios({
        url: "/api/users"
    });
    return result.data;
    
}

export async function AddUser(dados) 
{
    let result = await axios.post("/api/adduser",{...dados})

    return result.data;
}

export async function deletUser(id) 
{
    let result = await axios.post(`/api/users_actions/${id}`,{desativar: true});

    return result.data;
}

export async function editUser(id, values) {
    let result = await axios.post(`/api/users_actions/${id}`,{editar: true,dados: values});

    return result.data;
}