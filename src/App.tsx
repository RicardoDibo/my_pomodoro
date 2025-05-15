import './styles/theme.css'
import './styles/global.css'
import { Heading } from './components/Heading'
import { TimerIcon } from 'lucide-react';

function App() {
  return (
    <>
      <Heading>
        Components with Props
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id a, qui nesciunt nam inventore culpa nobis magni, voluptatum incidunt unde totam et sint repellendus deserunt repellat possimus nemo recusandae fugiat?
      </p>
    </>
  )
}

export { App };
