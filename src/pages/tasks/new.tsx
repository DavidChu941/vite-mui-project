import { Box } from '@mui/material'
import TaskForm from '@/components/Form/TaskForm'
import { styled } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/components/Form/TaskForm'
import { useCreateTask } from '@/hooks/useTasks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const CreateTask = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const form = useForm<Inputs>()
  const { isCreating, isCreated, createTaskMutation } = useCreateTask()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createTaskMutation({
      ...data,
      start_date: data.start_date ? data.start_date.toDate() : null,
      end_date: data.end_date ? data.end_date.toDate() : null,
    })
  }

  useEffect(() => {
    if (isCreated) {
      enqueueSnackbar('Task Created!', { variant: 'success' })
      navigate('/tasks')
    }
  }, [isCreated])

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create task</Title>

      <TaskForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isCreating}
      />
    </Box>
  )
}

export default CreateTask
