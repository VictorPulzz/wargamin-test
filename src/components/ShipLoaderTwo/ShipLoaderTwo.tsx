import React, { CSSProperties, FC, useMemo, useRef, useState } from 'react';

import logo from '~/assets/images/boat.png';
import { useWindowDimensions } from '~/hooks/useWindowResize';

import styles from './ShipLoaderTwo.module.scss';

interface ShipLoaderProps {
  max: number;
  current: number;
}

const SHIP_SIZE = 80;
const SHIP_SIZE_HALF = SHIP_SIZE / 2;
const CELL_HEIGHT = 9;
const CELL_MULTIPLE = 2.2;
const CELL_COLOR = '#1F1F25';
const CELL_COLOR_ACTIVE = '#FA660C';
const BG_LINE = '#ffe88b';

export const ShipLoaderTwo: FC<ShipLoaderProps> = ({ max, current }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [widthContainer, setWidthContainer] = useState(0);

  useWindowDimensions(() => {
    if (refContainer.current) {
      setWidthContainer(refContainer.current.offsetWidth);
    }
  });

  const currentInPx = useMemo(
    () => (current * widthContainer) / max,
    [current, max, widthContainer],
  );

  const generateCells = (divider = 0): number[] => {
    return Array.from(Array(Math.ceil(divider / CELL_MULTIPLE)).keys());
  };

  const cellCount = useMemo(() => generateCells(widthContainer), [widthContainer]);
  const cellActiveCount = useMemo(() => generateCells(~~currentInPx), [currentInPx]);
  const cellColor = (index: number): string =>
    cellActiveCount.includes(index) ? CELL_COLOR_ACTIVE : CELL_COLOR;

  const getContentWithDigit = useMemo(
    () => current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    [current],
  );

  const shipStyle = useMemo(
    (): CSSProperties => ({
      width: `${SHIP_SIZE}px`,
      left:
        SHIP_SIZE_HALF > currentInPx
          ? 0
          : SHIP_SIZE_HALF + currentInPx >= widthContainer
          ? widthContainer - SHIP_SIZE
          : currentInPx - SHIP_SIZE_HALF,
    }),
    [currentInPx, widthContainer],
  );

  return (
    <div ref={refContainer} className={styles.container}>
      <div className={styles['ship-block']} style={shipStyle}>
        <span className={styles['ship-block__label']}>{getContentWithDigit}</span>
        <img src={logo} alt="ship" width="100%" />
      </div>
      <div className={styles.wave} />
      <svg
        width={widthContainer}
        height={CELL_HEIGHT}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.progress}
      >
        <rect width={currentInPx} height={CELL_HEIGHT} fill={BG_LINE} />

        {/* Active line top */}
        <line y1={0.5} y2={0.5} x2={currentInPx} stroke={CELL_COLOR_ACTIVE} />

        <line x1={0.5} x2={0.5} y2={CELL_HEIGHT} stroke={cellColor(0)} />
        {cellCount.slice(1).map(item => (
          <React.Fragment key={item}>
            <line
              x1={item * CELL_MULTIPLE}
              x2={item * CELL_MULTIPLE}
              y2={CELL_HEIGHT}
              stroke={cellColor(item)}
            />
          </React.Fragment>
        ))}
        <line
          x1={widthContainer}
          x2={widthContainer}
          y2={CELL_HEIGHT}
          stroke={cellColor(cellCount.length - 1)}
        />

        {/* Active line bottom */}
        <line
          y1={CELL_HEIGHT - 0.5}
          y2={CELL_HEIGHT - 0.5}
          x2={currentInPx}
          stroke={CELL_COLOR_ACTIVE}
        />
      </svg>
    </div>
  );
};
