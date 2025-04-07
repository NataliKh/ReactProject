import { useState, createElement } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const date = new Date().getFullYear();

  return createElement(
    'div',
    null,
    [
      createElement('h1', { key: 'title' }, 'Vite + React'),
      createElement(
        'div', 
        { className: 'card', key: 'card' }, 
        createElement(
          'button', 
          { onClick: () => setCount((count) => count + 1) },
          'count ' + count
        )
      ),
      createElement(
        'p',
        { className: 'read-the-docs', key: 'docs' },
        'Click on the Vite and React logos to learn more'
      ),
      createElement('p', { key: 'date' }, date)
    ]
  )
}

export default App
