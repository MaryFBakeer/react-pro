import { BrowserRouter } from 'react-router';
import { Tooltip, TooltipPosition } from '~shared/ui/Tooltip';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <h1>Задание 1: Tooltip</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 32,
            padding: 80,
          }}
        >
          <Tooltip content="Подсказка сверху" position={TooltipPosition.TOP}>
            <button type="button">Сверху</button>
          </Tooltip>
          <Tooltip content="Подсказка снизу" position={TooltipPosition.BOTTOM}>
            <button type="button">Снизу</button>
          </Tooltip>
          <Tooltip content="Подсказка слева" position={TooltipPosition.LEFT}>
            <button type="button">Слева</button>
          </Tooltip>
          <Tooltip content="Подсказка справа" position={TooltipPosition.RIGHT}>
            <button type="button">Справа</button>
          </Tooltip>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
