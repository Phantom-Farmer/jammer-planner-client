import React from 'react';
import { useRouter } from 'next/router';
import NewSetSongForm from '../../../components/NewSetSongForm';

export default function NewSetSong() {
  const router = useRouter();
  const { id } = router.query;
  console.warn(router);
  return (
    <NewSetSongForm bcId={id} />
  );
}
