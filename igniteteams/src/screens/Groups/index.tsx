import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import React from 'react';

import {
  Container
} from './styles';

export function Groups(){
   return (
     <Container>
      <Header/>
      <HighLight
      title='Turmas'
      subtitle='Jogue com sua turma'
      />
      <GroupCard
      title= 'Galera do ignite'
      />
     </Container>
  );
}