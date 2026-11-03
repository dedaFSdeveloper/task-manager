import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../src/components/TodoList'
import type { Task } from '../src/types'

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

const baseTask: Task = {
  id: '1',
  title: 'Comprar libros',
  description: 'Para la libreria',
  completed: false,
  createdAt: new Date('2026-01-01'),
  userId: 'u1',
  priority: 'alta',
  dueDate: '2026-12-01',
}

const setup = (tasks: Task[] = [baseTask]) => {
  const handlers = { onToggle: vi.fn(), onDelete: vi.fn(), onEdit: vi.fn() }
  render(<TodoList tasks={tasks} {...handlers} />)
  return handlers
}

describe('TodoList', () => {
  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra titulo, descripcion, prioridad y fecha de vencimiento', () => {
    setup()
    expect(screen.getByText('Comprar libros')).toBeInTheDocument()
    expect(screen.getByText('Para la libreria')).toBeInTheDocument()
    expect(screen.getByText('alta')).toBeInTheDocument()
    expect(screen.getByText(/vence: 2026-12-01/)).toBeInTheDocument()
  })

  it('usa prioridad "media" por defecto si la tarea no tiene prioridad', () => {
    setup([{ ...baseTask, priority: undefined as unknown as Task['priority'] }])
    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('llama a onToggle con el id y el estado actual al marcar la tarea', async () => {
    const { onToggle } = setup()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1', false)
  })

  it('borra la tarea solo si el usuario confirma', async () => {
    const { onDelete } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'borrar' }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('no borra la tarea si el usuario cancela la confirmacion', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const { onDelete } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'borrar' }))
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('permite editar el titulo y guardar el cambio', async () => {
    const { onEdit } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'editar' }))
    const input = screen.getByDisplayValue('Comprar libros')
    await userEvent.clear(input)
    await userEvent.type(input, 'Comprar cuadernos')
    await userEvent.click(screen.getByRole('button', { name: 'guardar' }))
    expect(onEdit).toHaveBeenCalledWith('1', 'Comprar cuadernos')
  })

  it('no guarda una edicion con titulo vacio', async () => {
    const { onEdit } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'editar' }))
    await userEvent.clear(screen.getByDisplayValue('Comprar libros'))
    await userEvent.click(screen.getByRole('button', { name: 'guardar' }))
    expect(onEdit).not.toHaveBeenCalled()
  })

  it('cancelar la edicion vuelve a mostrar el titulo original', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: 'editar' }))
    await userEvent.click(screen.getByRole('button', { name: 'cancelar' }))
    expect(screen.getByText('Comprar libros')).toBeInTheDocument()
  })
})
