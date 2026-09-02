import { Accessories } from './components/Accessories'
import { Anthem } from './components/Anthem'
import { BumpTrade } from './components/BumpTrade'
import { DnaLedger } from './components/DnaLedger'
import { EyeGallery } from './components/EyeGallery'
import { FanFirst } from './components/FanFirst'
import { FlickArena } from './components/FlickArena'
import { Footer } from './components/Footer'
import { Hardware } from './components/Hardware'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { NeuralLab } from './components/NeuralLab'
import { Preorder } from './components/Preorder'
import { Story } from './components/Story'
import { StoreProvider } from './store'

export default function App() {
  return (
    <StoreProvider>
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Story />
        <NeuralLab />
        <Hardware />
        <Accessories />
        <EyeGallery />
        <BumpTrade />
        <FlickArena />
        <DnaLedger />
        <FanFirst />
        <Anthem />
      </main>
      <Footer />
      <Preorder />
    </StoreProvider>
  )
}
