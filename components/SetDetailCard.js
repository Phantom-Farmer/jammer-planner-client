/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SetCard({ setObj }) {
  return (
    <>
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'peachpuff' }}>
          <Card.Text>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- songs:</h4>
            <h3>{setObj.song}</h3>
          </div>
          <div>
            <h4>- notes:</h4>
            <h3>{setObj.note}</h3>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

SetCard.propTypes = {
  setObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    song: PropTypes.string,
    note: PropTypes.string,
    band: PropTypes.string,
    author: PropTypes.number,
  }),
};

SetCard.defaultProps = {
  setObj: PropTypes.shape({
    id: '',
    title: '',
    song: '',
    note: '',
    band: '',
    author: '',
  }),

};
