/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SetCard({ setObj }) {
  return (
    <>
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'rgb(184, 231, 184)' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- songs:</h4>
          </div>
          {setObj.songs.length > 0
            ? setObj?.songs?.map((song) => {
              console.log(song);
              return (
                <h1 key={song.id} className="good">
                  {song.title}
                </h1>
              );
            })
            : ''}
        </Card.Body>
      </Card>
    </>
  );
}

SetCard.propTypes = {
  setObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    songs: PropTypes.string,
    note: PropTypes.string,
    band: PropTypes.number,
    author: PropTypes.number,
  }),
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
