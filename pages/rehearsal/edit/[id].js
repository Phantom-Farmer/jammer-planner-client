import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRehearsal } from '../../../utils/data/rehearsalData';
import NewRehearsalForm from '../../../components/NewRehearsalForm';

export default function UpdateRehearsalCard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRehearsal(id).then(setEditItem, () => {});
  }, [id]);

  return (<NewRehearsalForm rObj={editItem} />);
}
