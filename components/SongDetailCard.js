/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function SongDetailCard({ sObj }) {
  return (
    <>
      <Card className="dc" style={{ width: '90rem' }}>
        <Card.Body style={{ backgroundColor: 'peachpuff' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {sObj.title}
          </Card.Text>
          <div>
            <h4>- key:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{sObj.key}</h3>
          </div>
          <div>
            <h4>- signature:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{sObj.signature}</h3>
          </div>
          <div>
            <h4>- vibe:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{sObj.vibe}</h3>
          </div>
          <div>
            <h4>- lyric:</h4>
            <h3 className="songwords" style={{ marginLeft: '4rem' }}>{sObj.lyric}</h3>
          </div>
          {/* <Link href={`/song/band/${sObj.band.id}`} passHref>
            <Button className="m-2">
              song list
            </Button>
  </Link> */}
          <Link href={`/song/edit/${sObj.id}`} passHref>
            <Button className="m-2">
              edit
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

SongDetailCard.propTypes = {
  sObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    key: PropTypes.string,
    signature: PropTypes.string,
    vibe: PropTypes.string,
    lyric: PropTypes.string,
    band: PropTypes.string,
    author: PropTypes.number,
  }).isRequired,

};
