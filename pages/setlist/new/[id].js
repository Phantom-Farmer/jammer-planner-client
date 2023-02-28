import React from 'react';
import { useRouter } from 'next/router';
import NewSetForm from '../../../components/NewSetForm';

export default function NewSet() {
  const router = useRouter();
  const { id } = router.query;
  console.warn(router);
  return (
    <NewSetForm bcId={id} />
  );
}
