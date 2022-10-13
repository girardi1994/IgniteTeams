import React from 'react';

type Props = {
  title: string,
  subtitle: string,
}

import {
  Container,
  Title,
  SubTitle,
} from './styles';

export function HighLight({title, subtitle}: Props){
   return (
     <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
     </Container>
  );
}