import React from 'react';
import { useRouter } from 'next/router';
import NewSongForm from '../../../components/NewSongForm';

export default function NewSong() {
  const router = useRouter();
  const { id } = router.query;
  console.warn(router);
  return (
    <NewSongForm bcId={id} />
  );
}
