/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleSet } from '../utils/data/setData';
// import { getSongsByBand } from '../utils/data/songData';

export default function SetCard({ setObj, onUpdate }) {
  const deleteThisSetCard = () => {
    if (window.confirm('Are you sure?')) {
      deleteSingleSet(setObj.id).then(onUpdate);
    }
  };

  return (
    <>
      <Card className="stc" style={{ width: '50rem' }}>
        <Card.Body style={{ backgroundColor: 'rgb(184, 231, 184)' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- notes: {setObj.note}</h4>
          </div>
          <div>
            <h4>- songs: </h4>
          </div>
          {setObj?.songs?.length > 0
            ? setObj?.songs?.map((song) => {
              console.log(song);
              return (
                <h1 style={{ marginLeft: '60px', fontSize: '60px' }} key={song.id} className="good">
                  {song.title}
                </h1>
              );
            })
            : ''}
          <Link href={`/setlist/edit/${setObj.id}`} passHref>
            <Button className="m-6">
              edit
            </Button>
          </Link>
          <Link href={`/setlist/band/${setObj.band.id}`} passHref>
            <Button onClick={deleteThisSetCard} className="m-5">
              delete
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

SetCard.propTypes = {
  setObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    songs: PropTypes.array,
    note: PropTypes.string,
    band: PropTypes.string,
    author: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SetCard.defaultProps = {
  setObj: PropTypes.shape({
    id: '',
    title: '',
    songs: '',
    note: '',
    band: '',
    author: '',
  }),

};
