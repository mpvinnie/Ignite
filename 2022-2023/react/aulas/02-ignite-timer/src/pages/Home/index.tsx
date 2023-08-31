import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer } from './styles'
import { Button } from '../../components/Button'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!')
})

type NewCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <Button type="button" variant="stop" onClick={interruptCurrentCycle}>
            <HandPalm size={24} /> Interromper
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitDisabled} variant="start">
            <Play size={24} />
            Começar
          </Button>
        )}
      </form>
    </HomeContainer>
  )
}
