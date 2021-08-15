import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {  } from 'next/link'
import FormL from './forms';

interface dados {
    textoBotao: String;
    title: String;
    acao: String;
    reloadList: Function;
    objUser: { id: any };
}

const ModalForm: React.FC<dados> = (dados) => {
      const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
      
      const showModal = () => {
        setIsModalVisible(true);
        
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
        dados.reloadList();
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      return (
        <div>
          <Button type="primary" onClick={showModal}>
            {dados.textoBotao}
          </Button>
          <Modal title={dados.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <FormL incluir={dados.objUser.id ? false : true } objeto={{...dados.objUser}} showModal={() => handleOk()} />
          </Modal>
        </div>
      );
}

export default ModalForm;