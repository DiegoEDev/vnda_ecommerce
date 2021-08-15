import React from 'react';
import { Table, Space, Popconfirm, message, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { listUser,deletUser } from './functions/users';
import ModalForm from './modalForm';
import Styled from 'styled-components'

interface User {
  key: number;
  name: string;
  email: string;
  phone: string;
}

const Style = Styled.div`
  padding: 10px 0;
  width: 100%;
`
const StyleTela = Styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
`

const Stylespin = Styled.div`
    width: 100%;
    height: 80vh;
    align-items: center;
    display: flex;
    justify-content: center;
`

const Users: React.FC = () => 
  {
    const [ users, setUser ] = React.useState([]);
    const [ load, setLoad] = React.useState(false);
    React.useEffect( () => {
      async function execute() {
        let ListUsers = await listUser();
        setUser(
          ListUsers.map( (user: any,index: any) => ({key: index,...user}))
        )
      }
      execute()
    },[])
    const columns: ColumnsType<User> = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
      },
      {
        key: 'email',
        title: 'E-mail',
        dataIndex: 'email',
      },
      {
        key: 'phone',
        title: 'Telefone',
        dataIndex: 'phone',
      },
      {
        key: 'acao',
        title: 'ação',
        dataIndex: 'acao',
        render(text, record): JSX.Element{ 
          return (
          <Space key="2" size="middle">
            <ModalForm textoBotao="Editar" acao="editar" objUser={{id: null,...record}} title="Editar usuário" reloadList={reloadList} />
            <Popconfirm
              title="Gostaria de deletar este usuario ?"
              onConfirm={() => confirm(record)}
              okText="Sim"
              cancelText="Não"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </Space>
        )
      }
      },
    ];
    async function confirm(Resq: any) {
      setLoad(true)
      await deletUser(Resq.id);
      let list = users.splice(Resq.key,1);
      setUser(users)
      message.success('Usuario deletado!');
      setLoad(false)
    }
    
    async function reloadList() {
      setLoad(true)
      let ListUsers = await listUser();
      
      setUser(
        ListUsers.map( (user: any,index: any) => ({key: index,...user}))
      )
      setLoad(false)
    }
    return(
        <StyleTela>
          <Style>
            <ModalForm key="1" textoBotao="Adicionar usuário" acao="editar" objUser={{id: null}} reloadList={reloadList} title="Adicionar usuário"/>
          </Style>
          {
            load ?
            <Stylespin>
              <Spin />
            </Stylespin>
            :
            <Style>
              <Table<User> columns={columns} dataSource={users} />
            </Style>
          }
        </StyleTela>
    )
  }
export default Users;