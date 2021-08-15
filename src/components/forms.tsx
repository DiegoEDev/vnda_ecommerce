import React, { useState } from 'react';
import { Form, Input, Button, Radio,Select,message } from 'antd';
import { AddUser,editUser } from "./functions/users";

const { Option } = Select;
interface dados {
    incluir: boolean,
    showModal: Function;
    objeto: {id: any, role: any}
}
const FormL: React.FC<dados> = (dados) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        if (dados.incluir) {
          let respost = await AddUser(values);

          if (respost.message) {
            message.error("Cadastro já existe!")
          } else {
            message.success("Cadastro efetuado com sucesso!")
            dados.showModal();
          }
        } else {
          let respost = await editUser(dados.objeto.id, values);

          if (respost.message) {
            message.error("Erro ao editar o usúario")
          } else {
            message.success("Edição efetuada com sucesso!")
            dados.showModal();
          }
        }
    };
    const ddd = [];
    for (var i = 10;i <= 100; i++) {
        ddd.push(i);
    }
    const prefixSelector = ( 
        <Form.Item name="phone_area" noStyle>
            <Select style={{ width: 100 }} placeholder="(+DDD)">
                {
                    ddd.map( dd => {
                        return (
                            <Option key={dd} value={dd}>+{dd}</Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    )

  return (
    <Form
      form={form}
      layout="vertical"
      name="grava_user"
      onFinish={onFinish}
      initialValues={{
        ...dados.objeto,
        role_name: dados.objeto.role === 0 ? 'Agente' : dados.objeto.role === 1 ? 'Gestor' : 'Local'
      }}
    >
      <Form.Item label="Nome" name="name">
        <Input placeholder="Nome" />
      </Form.Item>
      <Form.Item label="E-mail" name="email">
        <Input placeholder="E-mail" />
      </Form.Item>
      {
          dados.incluir &&
          <>
            <Form.Item
                name="password"
                label="Senha"
                rules={[
                {
                    required: true,
                    message: 'Por favor insira sua senha',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="password_confirmation"
                label="Confirme a senha"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'As senhas precisão ser iguais!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas precisão ser iguais'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </>
      }
      <Form.Item
        name="phone"
        label="Telefone"
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="role_name" label="Permisão">
            <Select>
                <Option key="1" value="Agente">Agente</Option>
                <Option key="2" value="Gestor">Gestor</Option>
                <Option key="3" value="Local">Local</Option>
            </Select>
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form.Item>
    </Form>
  );
};

export default FormL;