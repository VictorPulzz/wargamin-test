import React, { CSSProperties, FC, useMemo, useRef, useState } from 'react';

import logo from '~/assets/images/boat.png';
import { useWindowDimensions } from '~/hooks/useWindowResize';

import styles from './ShipLoader.module.scss';

interface ShipLoaderProps {
  max: number;
  current: number;
}

const SHIP_SIZE = 80;

export const ShipLoader: FC<ShipLoaderProps> = ({ max, current }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [widthContainer, setWidthContainer] = useState(0);

  const translation = useMemo(() => {
    return max === 0 ? 0 : (current * 100) / max;
  }, [current, max]);

  useWindowDimensions(() => {
    if (refContainer.current) {
      setWidthContainer(refContainer.current.offsetWidth);
    }
  });

  const shipSizeInPercent = useMemo(() => {
    return ((SHIP_SIZE / 2) * 100) / widthContainer;
  }, [widthContainer]);

  const shipStyle = useMemo(
    (): CSSProperties => ({
      left:
        translation <= shipSizeInPercent
          ? 0
          : translation + shipSizeInPercent >= 100
          ? `calc(100% - ${shipSizeInPercent * 2}%)`
          : `calc(${translation - shipSizeInPercent}%)`,
      width: `${SHIP_SIZE}px`,
    }),
    [shipSizeInPercent, translation],
  );

  const progressStyle = useMemo(
    (): CSSProperties => ({
      width: `${translation}%`,
    }),
    [translation],
  );

  const getContentWithDigit = useMemo(
    () => current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    [current],
  );

  return (
    <div ref={refContainer} className={styles.container}>
      <div className={styles['ship-block']} style={shipStyle}>
        <span className={styles['ship-block__label']}>{getContentWithDigit}</span>
        <img src={logo} alt="ship" width="100%" />
      </div>
      <div className={styles.progress} />
      <div style={progressStyle} className={styles.progress_active} />
      <div className={styles.wave} />
    </div>
  );
};
