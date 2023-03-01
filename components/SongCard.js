/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleSong } from '../utils/data/songData';

export default function SongCard({ sObj, onUpdate }) {
  const deleteThisSongCard = () => {
    if (window.confirm('Are you sure?')) {
      deleteSingleSong(sObj.id).then(onUpdate);
    }
  };
  return (
    <>
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'peachpuff' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {sObj.title}
          </Card.Text>
          <Link href={`/song/detail/${sObj.id}`} passHref>
            <Button className="m-2">
              view details
            </Button>
          </Link>
          <Link href={`/song/edit/${sObj.id}`} passHref>
            <Button className="m-6">
              edit
            </Button>
          </Link>
          <Link href={`/song/band/${sObj.band.id}`} passHref>
            <Button onClick={deleteThisSongCard} className="m-5">
              delete
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

SongCard.propTypes = {
  sObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    key: PropTypes.string,
    signature: PropTypes.string,
    vibe: PropTypes.string,
    lyric: PropTypes.string,
    band: PropTypes.string,
    author: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SongCard.defaultProps = {
  sObj: PropTypes.shape({
    id: '',
    title: '',
    key: '',
    signature: '',
    vibe: '',
    lyric: '',
    band: '',
    author: '',
  }),

};
