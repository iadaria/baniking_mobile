import React from 'react';
import { Block } from '~/src/app/common/components/UI';
import { AppText } from '~/src/app/common/components/UI/AppText/AppText';
import { IBathDetailed } from '~/src/app/models/bath';
import { HotelIcon, LaundryIcon, ParkingIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bath: IBathDetailed;
}

export function BathInfrastructure({ bath }: IProps) {
  let hotel;
  if (bath.has_hotel) {
    hotel = (
      <Block margin={[0.5, 0]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Отель рядом
        </AppText>
        <AppText margin={[1, 3]} tag>
          {bath.hotel_address}
        </AppText>
        <HotelIcon style={styles.infrastructureIcon} />
      </Block>
    );
  }
  let laundry;
  if (bath.has_laundry) {
    laundry = (
      <Block margin={[0.5, 0]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Прачечная
        </AppText>
        <AppText margin={[1, 3]} tag>
          {bath.laundry_address}
        </AppText>
        <LaundryIcon style={styles.infrastructureIcon} />
      </Block>
    );
  }
  let parking;
  if (bath.has_parking) {
    parking = (
      <Block margin={[0.5, 0]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Парковка
        </AppText>
        <AppText margin={[1, 3]} tag>
          {bath.parking_address}
        </AppText>
        <ParkingIcon style={styles.infrastructureIcon} />
      </Block>
    );
  }
  return (
    <>
      {hotel}
      {laundry}
      {parking}
    </>
  );
}
