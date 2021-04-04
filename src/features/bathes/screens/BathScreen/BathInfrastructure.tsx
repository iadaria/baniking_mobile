import React from 'react';
import { Block } from '~/src/app/common/components/UI';
import { AppText } from '~/src/app/common/components/UI/AppText/AppText';
import { HotelIcon, LaundryIcon, ParkingIcon } from '~/src/assets';
import { styles } from './styles';

interface IInfastructureBath {
  has_laundry: boolean;
  laundry_address: string | null;
  has_parking: boolean;
  parking_address: string | null;
  has_hotel: boolean;
  hotel_address: string | null;
}

interface IProps {
  infastructureBath: Partial<IInfastructureBath>;
}

export default function BathInfrastructure({
  infastructureBath: { has_hotel, hotel_address, has_laundry, laundry_address, has_parking, parking_address },
}: IProps) {
  let hotel;
  if (has_hotel) {
    hotel = (
      <Block margin={[0.5, 1]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Отель рядом
        </AppText>
        <AppText margin={[1, 3]} tag>
          {hotel_address}
        </AppText>
        <HotelIcon style={styles.infrastructureIcon} />
      </Block>
    );
  }
  let laundry;
  if (has_laundry) {
    laundry = (
      <Block margin={[0.5, 1]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Прачечная
        </AppText>
        <AppText margin={[1, 3]} tag>
          {laundry_address}
        </AppText>
        <LaundryIcon style={styles.infrastructureIcon} />
      </Block>
    );
  }
  let parking;
  if (has_laundry) {
    parking = (
      <Block margin={[0.5, 1]} style={styles.infrastructure}>
        <AppText margin={[1, 3, 0]} golder>
          Парковка
        </AppText>
        <AppText margin={[1, 3]} tag>
          {parking_address}
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
