import clsx from 'clsx';
import React, { CSSProperties, FC, useCallback, useState } from 'react';

import { Button, MultilineEllipsis, ShipLoader, ShipLoaderTwo } from '~/components';

import styles from './Tabs.module.scss';

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus iste magni sunt. Ad dicta eius expedita explicabo hic iusto laborum maxime minima nam nostrum, obcaecati quaerat voluptatem. Fuga, in, molestiae. Alias amet atque, autem consequatur cupiditate debitis distinctio doloremque eos, fuga fugiat itaque magnam maxime nam neque odio pariatur perferendis quae quod ratione, sapiente sint tempore totam voluptates. Et, inventore. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus iste magni sunt. Ad dicta eius expedita explicabo hic iusto laborum maxime minima nam nostrum, obcaecati quaerat voluptatem. Fuga, in, molestiae. Alias amet atque, autem consequatur cupiditate debitis distinctio doloremque eos, fuga fugiat itaque magnam maxime nam neque odio pariatur perferendis quae quod ratione, sapiente sint tempore totam voluptates. Et, inventore. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus iste magni sunt. Ad dicta eius expedita explicabo hic iusto laborum maxime minima nam nostrum, obcaecati quaerat voluptatem. Fuga, in, molestiae. Alias amet atque, autem consequatur cupiditate debitis distinctio doloremque eos, fuga fugiat itaque magnam maxime nam neque odio pariatur perferendis quae quod ratione, sapiente sint tempore totam voluptates. Et, inventore. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus iste magni sunt. Ad dicta eius expedita explicabo hic iusto laborum maxime minima nam nostrum, obcaecati quaerat voluptatem. Fuga, in, molestiae. Alias amet atque, autem consequatur cupiditate debitis distinctio doloremque eos, fuga fugiat itaque magnam maxime nam neque odio pariatur perferendis quae quod ratione, sapiente sint tempore totam voluptates. Et, inventore.';
const TABS = [
  'Ship loader with background image implementation',
  'Ship loader with svg path implementation',
  'Sliced text',
];

export const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [fakeQueryMax, setFakeQueryMax] = useState(0);
  const [fakeQueryCounter, setFakeQueryCounter] = useState(0);

  const wrapperSlicedText = (width: number | string, height: number | string): CSSProperties => ({
    width,
    height,
    borderWidth: '1px',
    borderColor: 'var(--white)',
    borderStyle: 'solid',
    resize: 'both',
    overflow: 'hidden',
  });

  const handleImitateQuery = useCallback((max: number) => {
    setFakeQueryCounter(0);
    setFakeQueryMax(0);
    setFakeQueryMax(max);
    const interval = setInterval(() => {
      setFakeQueryCounter(prevState => {
        if (prevState + 1 === max) {
          clearInterval(interval);
        }
        return prevState + 1;
      });
    }, 20);
  }, []);

  const renderContent = useCallback(() => {
    if (activeTab === TABS[0]) {
      return (
        <>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Fixed value 2500000 / 150000000</h2>
            <ShipLoader current={2500000} max={150000000} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Minimum value</h2>
            <ShipLoader current={0} max={150000} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Maximum value</h2>
            <ShipLoader current={150000} max={150000} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Imitate query</h2>
            <ShipLoader current={fakeQueryCounter} max={fakeQueryMax} />
            <Button onClick={() => handleImitateQuery(300)} label="Imitate query" />
          </div>

          <h1 className={styles.section__h1}>Resizable</h1>

          <div className={styles.section_small}>
            <div className={styles.section}>
              <h2 className={styles.section__title}>Fixed value 25000 / 150000</h2>
              <ShipLoader current={25000} max={150000} />
            </div>
            <div className={styles.section}>
              <h2 className={styles.section__title}>Minimum value</h2>
              <ShipLoader current={0} max={150000} />
            </div>
            <div className={styles.section}>
              <h2 className={styles.section__title}>Maximum value</h2>
              <ShipLoader current={150000} max={150000} />
            </div>
            <div className={styles.section}>
              <h2 className={styles.section__title}>Imitate query</h2>
              <ShipLoader current={fakeQueryCounter} max={fakeQueryMax} />
              <Button onClick={() => handleImitateQuery(300)} label="Imitate query" />
            </div>
          </div>
        </>
      );
    }
    if (activeTab === TABS[1]) {
      return (
        <>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Fixed value 50 / 1500</h2>
            <ShipLoaderTwo current={100} max={1500} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Fixed value 750 / 1500</h2>
            <ShipLoaderTwo current={750} max={1500} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Minimum value</h2>
            <ShipLoaderTwo current={0} max={150000} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Maximum value</h2>
            <ShipLoaderTwo current={150000} max={150000} />
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Imitate query</h2>
            <ShipLoaderTwo current={fakeQueryCounter} max={fakeQueryMax} />
            <Button onClick={() => handleImitateQuery(300)} label="Imitate query" />
          </div>
        </>
      );
    }
    if (activeTab === TABS[2]) {
      return (
        <>
          <h1 className={styles.section__h1}>All blocks can be resized</h1>

          <div className={styles.section}>
            <h2 className={styles.section__title}>Parent width: 300px height: 400px</h2>
            <div style={wrapperSlicedText('100%', 400)}>
              <MultilineEllipsis text={TEXT} />
            </div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Parent width: 200px height: 200px</h2>
            <div style={wrapperSlicedText(200, 200)}>
              <MultilineEllipsis text={TEXT} />
            </div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__title}>Parent width: 500px height: 200px</h2>
            <div style={wrapperSlicedText(500, 200)}>
              <MultilineEllipsis text={TEXT} />
            </div>
          </div>
        </>
      );
    }

    return <></>;
  }, [activeTab, fakeQueryCounter, fakeQueryMax, handleImitateQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {TABS.map(item => (
          <div
            role="button"
            key={item}
            className={clsx(styles.tabs__item, item === activeTab && styles.tabs__item_active)}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};
