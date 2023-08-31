import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer } from './styles'
import { Button } from '../../components/Button'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedAt: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  // function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task,
  //     minutesAmount,
  //     startedAt: new Date()
  //   }

  //   setCycles(state => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedAt: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" /*onSubmit={handleSubmit(handleCreateNewCycle) }*/>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished
          }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <Button type="button" variant="stop" onClick={handleInterruptCycle}>
            <HandPalm size={24} /> Interromper
          </Button>
        ) : (
          <Button
            type="submit"
            /* disabled={isSubmitDisabled} */ variant="start"
          >
            <Play size={24} />
            Começar
          </Button>
        )}
      </form>
    </HomeContainer>
  )
}
