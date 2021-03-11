import React from 'react';
import { AppText, Block } from '../UI';
import Star from './Star';

interface IProps {
  rating: number;
}

export function Stars({ rating }: IProps) {
  const getActive = (_rating: number, _star: number) => {
    // Exactly star
    if (_rating / _star === 1) {
      return 1;
    }

    // Exactly zero
    if (_rating / _star <= 0.7) {
      return 0;
    }

    // const _active = _rating / _star > 1 ? 1 : 1 - _rating / _star;
    const _active = _rating / _star > 1 ? 1 : _rating % 1;
    // console.log(`\n rating=${_rating} star=${_star} active=${_active} rating/star=${_rating / _star}`);
    return _active;
  };

  const getDeactive = (_rating: number, _star: number) => {
    const _deactive = _rating / _star > 1 ? 0 : _rating / _star;
    return _deactive;
  };

  const stars = [1, 2, 3, 4, 5];
  return (
    <Block margin={[0.9, 0]} row center>
      {stars.map((star: number) => {
        return (
          <>
            <Star
              id={`item-${star}`}
              key={`item-${star}`}
              active={getActive(rating, star)}
              // deactive={getDeactive(rating, star)}
            />
            <Block key={`item-block-${star}`} margin={[0, 0.5]} />
          </>
        );
      })}
      <AppText margin={[0, 0, 0, 2.5]} medium tag>
        {rating}
      </AppText>
    </Block>
  );
}

/** TODO Test snapshot
 * {[3.1, 2.1, 1, 1.5, 5, 4.5, 4.9, 1.8, 1.1, 1.5, 1.7, 2.8, 2.3].map((rating: number) => (
          <Stars key={`key=${rating}`} rating={rating} />
        ))}
 *
 */
