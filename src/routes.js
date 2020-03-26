import { Game } from './pages/Game/Game'
import { Gameover } from './pages/Gameover/Gameover'
import { Results } from './pages/Results/Results'
import { Start } from './pages/Start/Start'

export const routes = [
  { isExact: true, component: Game, path: '/game', label: 'Game' },
  { isExact: true, component: Gameover, path: '/gameover', label: 'Gameover' },
  { isExact: true, component: Results, path: '/results', label: 'Results' },
  { isExact: true, component: Start, path: '/', label: 'Start' }
]
