import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import React from 'react';

import {
  Container,
  Content,
  Icon,
} from './styles';

export function NewGroup(){
   return (
     <Container>
      <Header showBackButton />

      <Content>
        <Icon/>

        <HighLight
        title="Nova turma"
        subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input/>
        <Button
        title="Criar"
        style={{marginTop: 20}}
        />
      </Content>

     </Container>
  );
}