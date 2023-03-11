import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSet } from '../../../utils/data/setData';
import NewSetForm from '../../../components/NewSetForm';

export default function UpdateSetCard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleSet(id).then(setEditItem);
  }, [id]);

  if (editItem.id) {
    return (<NewSetForm obj={editItem} />);
  }

  return null;
}
