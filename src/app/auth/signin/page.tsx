import {
  Container
} from '@mantine/core';
import SigninForm from './SigninForm';
import { Suspense } from 'react';

export default function AuthenticationForm() {

  return (
    <Container h="100vh" style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <Suspense>
        <SigninForm />
      </Suspense>
    </Container>
  );
}