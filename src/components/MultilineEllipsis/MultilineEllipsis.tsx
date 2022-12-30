import React, { FC, useEffect, useRef, useState } from 'react';

import { useResizeComponent } from '~/hooks/useResizeComponent';
import { useWindowDimensions } from '~/hooks/useWindowResize';

import styles from './MultilineEllipsis.module.scss';

interface MultilineEllipsisProps {
  text: string;
}

export const MultilineEllipsis: FC<MultilineEllipsisProps> = ({ text }) => {
  const refText = useRef<HTMLSpanElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [widthContainer, setWidthContainer] = useState(0);
  const [lines, setLines] = useState(0);

  const getPossibleLines = (): void => {
    if (refContainer.current) {
      setWidthContainer(refContainer.current.offsetHeight);
    }
    if (refText.current) {
      const getFontSize = parseFloat(
        window.getComputedStyle(refText.current, null).getPropertyValue('font-size'),
      );
      const getLineHeight = parseFloat(
        window.getComputedStyle(refText.current, null).getPropertyValue('line-height'),
      );
      setLines((getLineHeight > getFontSize ? getLineHeight : getFontSize) + 1);
    }
  };

  useEffect(() => {
    getPossibleLines();
  }, []);

  useWindowDimensions(() => {
    getPossibleLines();
  });

  useResizeComponent({
    ref: refContainer,
    callback: () => {
      getPossibleLines();
    },
  });

  return (
    <div ref={refContainer} className={styles.container}>
      <span
        ref={refText}
        className={styles.text}
        style={{ WebkitLineClamp: ~~Math.ceil(widthContainer / lines) }}
      >
        {text}
      </span>
    </div>
  );
};
