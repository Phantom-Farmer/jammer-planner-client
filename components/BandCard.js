/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleBand } from '../utils/data/bandData';

export default function BandCard({ bObj, onUpdate }) {
  const deleteThisBandCard = () => {
    if (window.confirm('Are you sure you want to delete this Band?')) {
      deleteSingleBand(bObj.id).then(onUpdate);
    }
  };

  return (
    <>
      <Card className="sc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'lightblue' }}>
          <Card.Text>
            {bObj.name}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="cardFooter">
          <Link href="/" passHref>
            <Button onClick={deleteThisBandCard} className="m-3">
              delete
            </Button>
          </Link>
          <Link href={`/band/edit/${bObj.id}`} passHref>
            <Button className="m-3">
              edit
            </Button>
          </Link>
          <Link href={`song/new/${bObj.id}`} passHref>
            <Button className="m-3">
              add song
            </Button>
          </Link>
          <Link href={`set/new/${bObj.id}`} passHref>
            <Button className="m-3">
              add setlist
            </Button>
          </Link>
          <Link href={`rehearsal/${bObj.id}`} passHref>
            <Button className="m-3">
              rehearsals
            </Button>
          </Link>
          <Link href={`song/${bObj.id}`} passHref>
            <Button className="m-3">
              song list
            </Button>
          </Link>
          <Link href={`set/${bObj.id}`} passHref>
            <Button className="m-3">
              set lists
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

BandCard.propTypes = {
  bObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    author: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
