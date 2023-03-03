import React from 'react';
import { useRouter } from 'next/router';
import NewRehearsalForm from '../../../components/NewRehearsalForm';

export default function NewRehearsal() {
  const router = useRouter();
  const { id } = router.query;
  console.warn(router);
  return (
    <NewRehearsalForm bcId={id} />
  );
}
